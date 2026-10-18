const fs = require("fs");
const http = require("http");
const path = require("path");
const puppeteer = require("puppeteer");
const routeManifest = require("../seo-routes.json");

const frontendRoot = path.resolve(__dirname, "..");
const buildRoot = path.join(frontendRoot, "build");
const routes = routeManifest.pages.filter((page) => page.prerender !== false);
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const sendFile = (response, filePath) => {
  response.writeHead(200, {
    "Cache-Control": "no-store",
    "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream",
  });
  fs.createReadStream(filePath).pipe(response);
};

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, "http://127.0.0.1");
  const segments = decodeURIComponent(requestUrl.pathname).split("/").filter(Boolean);
  let filePath = path.resolve(buildRoot, ...segments);

  if (filePath !== buildRoot && !filePath.startsWith(`${buildRoot}${path.sep}`)) {
    response.writeHead(400).end();
    return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    sendFile(response, filePath);
    return;
  }

  if (request.headers.accept?.includes("text/html")) {
    sendFile(response, path.join(buildRoot, "index.html"));
    return;
  }

  response.writeHead(404).end();
});

const run = async () => {
  if (!fs.existsSync(path.join(buildRoot, "index.html"))) {
    throw new Error("Production build was not found. Run the CRA build before prerendering.");
  }

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();
  const origin = `http://127.0.0.1:${address.port}`;
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });
  const indexableTitles = new Set();
  const indexableDescriptions = new Set();
  const routePaths = new Set(routes.map((page) => page.path));
  const internalLinks = new Set();
  const warnings = [];

  try {
    for (const route of routes) {
      const page = await browser.newPage();
      const pageErrors = [];
      page.on("pageerror", (error) => pageErrors.push(error.message));
      await page.setViewport({ width: 1365, height: 900, deviceScaleFactor: 1 });
      await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
      await page.setRequestInterception(true);
      page.on("request", (request) => {
        const url = new URL(request.url());
        if (url.origin === origin || url.protocol === "data:" || url.protocol === "blob:") {
          request.continue();
        } else {
          request.abort();
        }
      });

      const response = await page.goto(`${origin}${route.path}`, { waitUntil: "domcontentloaded", timeout: 45000 });
      if (!response || response.status() >= 400) {
        throw new Error(`Could not load ${route.path} for prerendering.`);
      }

      await page.waitForFunction(() => {
        return document.querySelector("#main h1")
          && document.querySelector('link[rel="canonical"][href]')
          && document.querySelector('meta[name="description"][content]')
          && !document.querySelector('[data-testid="loading-screen"]');
      }, { timeout: 45000 });
      await new Promise((resolve) => setTimeout(resolve, 120));

      const result = await page.evaluate(() => {
        const descriptions = [...document.querySelectorAll('meta[name="description"]')];
        const canonicals = [...document.querySelectorAll('link[rel="canonical"]')];
        const description = descriptions.at(-1)?.content || "";
        const canonical = canonicals.at(-1)?.href || "";
        const lastMeta = (selector, attribute) => [...document.querySelectorAll(selector)].at(-1)?.getAttribute(attribute) || "";
        const robots = document.querySelector('meta[name="robots"]')?.content || "";
        const jsonLd = [...document.querySelectorAll('script[type="application/ld+json"]')].map((script) => {
          try { JSON.parse(script.textContent); return null; } catch { return script.textContent; }
        }).filter(Boolean);

        for (const selector of [
          'meta[name="description"]',
          'link[rel="canonical"]',
          'meta[property="og:type"]',
          'meta[property="og:site_name"]',
          'meta[property="og:title"]',
          'meta[property="og:description"]',
          'meta[property="og:url"]',
          'meta[property="og:image"]',
          'meta[name="twitter:card"]',
          'meta[name="twitter:title"]',
          'meta[name="twitter:description"]',
          'meta[name="twitter:image"]',
        ]) {
          const duplicates = [...document.querySelectorAll(selector)];
          duplicates.slice(0, -1).forEach((element) => element.remove());
        }

        return {
          title: document.title,
          description,
          canonical,
          ogTitle: lastMeta('meta[property="og:title"]', "content"),
          ogDescription: lastMeta('meta[property="og:description"]', "content"),
          ogUrl: lastMeta('meta[property="og:url"]', "content"),
          ogImage: lastMeta('meta[property="og:image"]', "content"),
          twitterCard: lastMeta('meta[name="twitter:card"]', "content"),
          twitterTitle: lastMeta('meta[name="twitter:title"]', "content"),
          twitterDescription: lastMeta('meta[name="twitter:description"]', "content"),
          twitterImage: lastMeta('meta[name="twitter:image"]', "content"),
          robots,
          h1Count: document.querySelectorAll("#main h1").length,
          missingAltCount: document.querySelectorAll("img:not([alt])").length,
          jsonLdErrors: jsonLd,
          bodyTextLength: document.querySelector("#main")?.innerText.trim().length || 0,
          links: [...document.querySelectorAll("a[href]")].map((link) => link.href),
        };
      });

      const expectedCanonical = `${routeManifest.siteUrl}${route.path}`;
      if (!result.title || !result.description || result.canonical !== expectedCanonical) {
        throw new Error(`Missing or incorrect metadata on ${route.path}: ${JSON.stringify({ title: result.title, description: result.description, canonical: result.canonical, expectedCanonical })}`);
      }
      if (
        result.ogTitle !== result.title
        || result.ogDescription !== result.description
        || result.ogUrl !== result.canonical
        || !result.ogImage.startsWith("https://")
        || result.twitterCard !== "summary_large_image"
        || result.twitterTitle !== result.title
        || result.twitterDescription !== result.description
        || !result.twitterImage.startsWith("https://")
      ) {
        throw new Error(`Open Graph or Twitter metadata is missing or inconsistent on ${route.path}: ${JSON.stringify(result)}`);
      }
      if (result.h1Count !== 1 || result.bodyTextLength < 100) {
        throw new Error(`Expected one meaningful H1 and page content on ${route.path}; found ${result.h1Count} H1(s).`);
      }
      if (Boolean(result.robots.toLowerCase().includes("noindex")) === route.indexable) {
        throw new Error(`Indexability metadata does not match the route manifest for ${route.path}.`);
      }
      if (result.missingAltCount || result.jsonLdErrors.length) {
        throw new Error(`Missing image alt text or invalid JSON-LD found on ${route.path}.`);
      }
      if (pageErrors.length) {
        throw new Error(`Browser runtime errors on ${route.path}: ${pageErrors.join("; ")}`);
      }

      if (route.indexable) {
        if (indexableTitles.has(result.title) || indexableDescriptions.has(result.description)) {
          throw new Error(`Duplicate indexable metadata found on ${route.path}.`);
        }
        indexableTitles.add(result.title);
        indexableDescriptions.add(result.description);
        if (result.title.length > 70 || result.description.length > 170) {
          warnings.push(`${route.path}: title ${result.title.length} chars, description ${result.description.length} chars`);
        }
      }

      for (const href of result.links) {
        const link = new URL(href);
        if (link.origin === origin) {
          const linkedPath = link.pathname.replace(/\/+$/, "") || "/";
          if (!routePaths.has(linkedPath)) internalLinks.add(`${route.path} -> ${linkedPath}`);
        }
      }

      await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
      const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
      if (mobileOverflow) throw new Error(`Horizontal overflow found at the mobile viewport on ${route.path}.`);

      const outputDirectory = path.join(buildRoot, ...route.path.split("/").filter(Boolean));
      const outputPath = route.path === "/" ? path.join(buildRoot, "index.html") : path.join(outputDirectory, "index.html");
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, await page.content(), "utf8");
      await page.close();
      console.log(`Prerendered ${route.path}${route.indexable ? "" : " (noindex)"}`);
    }

    if (internalLinks.size) {
      throw new Error(`Internal links point to routes missing from the manifest:\n${[...internalLinks].join("\n")}`);
    }
    if (warnings.length) console.warn(`Metadata length review recommended:\n${warnings.join("\n")}`);
    console.log(`SEO prerender complete: ${routes.length} routes, ${indexableTitles.size} indexable.`);
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});