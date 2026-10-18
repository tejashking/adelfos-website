const fs = require("fs");
const path = require("path");
const routeManifest = require("../seo-routes.json");

const outputPath = path.join(__dirname, "..", "public", "sitemap.xml");
const siteUrl = (process.env.REACT_APP_SITE_URL || routeManifest.siteUrl).replace(/\/$/, "");
const indexablePages = routeManifest.pages.filter((page) => page.indexable);
const uniquePaths = new Set(indexablePages.map((page) => page.path));

if (uniquePaths.size !== indexablePages.length) {
  throw new Error("SEO route manifest contains duplicate indexable paths.");
}

const parsedSiteUrl = new URL(siteUrl);
if (parsedSiteUrl.protocol !== "https:" || parsedSiteUrl.hostname !== "adelfosmarketing.com") {
  throw new Error(`Unexpected sitemap site URL: ${siteUrl}`);
}

const escapeXml = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const entries = indexablePages
  .map((page) => `  <url><loc>${escapeXml(`${siteUrl}${page.path}`)}</loc></url>`)
  .join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;

fs.writeFileSync(outputPath, sitemap, "utf8");
console.log(`Generated sitemap with ${indexablePages.length} canonical, indexable routes.`);