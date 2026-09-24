import { Helmet } from "react-helmet-async";
import { site } from "@/data/site";

const ORG = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "MarketingAgency"],
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo: `${site.url}${site.logos.mark}`,
  image: `${site.url}${site.logos.wordmarkColour}`,
  email: site.email,
  telephone: site.whatsappDisplay,
  slogan: site.positioning,
  description: site.description,
  address: { "@type": "PostalAddress", addressLocality: site.location.city, addressRegion: site.location.regionCode, addressCountry: site.location.countryCode },
  areaServed: [{ "@type": "City", name: "Calgary" }, { "@type": "AdministrativeArea", name: "Alberta" }],
  sameAs: site.social.map((s) => s.href),
  openingHours: "Mo-Fr By appointment",
};

const WEBSITE = { "@context": "https://schema.org", "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, publisher: { "@id": `${site.url}/#organization` } };

export const breadcrumbLd = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.label, item: `${site.url}${it.to}` })),
});

export const SEO = ({ title, description, path = "/", image, type = "website", jsonLd = [], noindex = false }) => {
  const url = `${site.url}${path}`;
  const fullTitle = title.includes("Adelfos") ? title : `${title} | Adelfos Marketing`;
  const img = image || `${site.url}${site.logos.wordmarkColour}`;
  const ld = path === "/" ? [ORG, WEBSITE, ...jsonLd] : jsonLd;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,follow" />}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:locale" content="en_CA" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      <meta name="geo.region" content="CA-AB" />
      <meta name="geo.placename" content="Calgary" />
      {ld.map((obj, i) => <script key={i} type="application/ld+json">{JSON.stringify(obj)}</script>)}
    </Helmet>
  );
};
