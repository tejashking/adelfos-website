// REAL BRAND CONTENT — sourced from adelfosmarketing.com and official assets.
export const site = {
  name: "Adelfos Marketing",
  legalName: "Adelfos Marketing",
  url: process.env.REACT_APP_SITE_URL || "https://adelfosmarketing.com",
  positioning: "We build digital empires for local business.",
  tagline: "Beyond boundaries, beyond expectation.",
  description:
    "Adelfos Marketing is a Calgary marketing agency combining strategy, creative, technology and performance to grow local businesses across Alberta.",
  email: "adelfosmarketing@gmail.com",
  whatsapp: "+13062506732",
  whatsappDisplay: "+1 (306) 250-6732",
  whatsappUrl: "https://wa.me/13062506732",
  location: { city: "Calgary", region: "Alberta", regionCode: "AB", country: "Canada", countryCode: "CA" },
  hours: "By appointment",
  social: [{ label: "Facebook", href: "https://www.facebook.com/adelf" }],
  logos: {
    mark: "/images/brand/logo-mark.png",
    wordmarkColour: "/images/brand/logo-tagline-colour.png",
    wordmarkBlack: "/images/brand/logo-tagline-black.png",
  },
  ctaPrimary: "Start a project",
  ctaSecondary: "Explore our work",
};

export const nav = [
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "Insights", to: "/insights" },
  { label: "Audit", to: "/audit" },
];

export const method = [
  { n: "01", title: "Discover", body: "We map your market, your customers and your competition before a single pixel or dollar moves. Calgary is specific; your strategy should be too.", visual: "grid" },
  { n: "02", title: "Strategize", body: "Positioning, channels, budget and the sequence of work are locked into a plan with measurable checkpoints, not a slide deck of intentions.", visual: "lines" },
  { n: "03", title: "Create", body: "Brand, web, content and campaign creative are built as one system, so every touchpoint says the same thing with the same conviction.", visual: "blocks" },
  { n: "04", title: "Launch", body: "Tracking is verified, pages are tested, campaigns go live in controlled stages and the first data arrives within days, not quarters.", visual: "pulse" },
  { n: "05", title: "Optimize", body: "We read the numbers weekly, cut what underperforms, scale what works and report in plain language about what changed and why.", visual: "loop" },
];

// DEMO DATA — placeholder metrics until real Adelfos figures are supplied.
export const stats = [
  { value: 0, suffix: "+", label: "Clients", demo: true },
  { value: 0, suffix: "+", label: "Projects delivered", demo: true },
  { value: 0, suffix: "%", label: "Avg. campaign improvement", demo: true },
  { value: 0, suffix: "+", label: "Industries served", demo: true },
];
