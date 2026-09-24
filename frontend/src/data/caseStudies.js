// DEMO CONTENT — all case studies below are FICTIONAL (status: "demo").
// They exist to demonstrate layout and storytelling. Replace with approved client work before publishing.

/**
 * @typedef {Object} CaseStudy
 * @property {string} clientName
 * @property {string} slug
 * @property {"demo"|"live"} status
 * @property {string} title
 * @property {string} industry
 * @property {string} location
 * @property {string[]} services
 * @property {string} heroImage
 * @property {string[]} gallery
 * @property {string} summary
 * @property {string} challenge
 * @property {string} objective
 * @property {string[]} strategy
 * @property {string} execution
 * @property {string} creative
 * @property {string} digitalExperience
 * @property {{value:string, label:string}[]} results
 * @property {string} learnings
 * @property {string} [testimonial]
 * @property {string} seoTitle
 * @property {string} seoDescription
 */

const u = (id, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/** @type {CaseStudy[]} */
export const caseStudies = [
  {
    clientName: "Northline Developments", slug: "northline-developments", status: "demo", featured: true,
    title: "Building a digital presence for a new Calgary development",
    industry: "Real Estate Development", location: "Calgary, Alberta",
    services: ["brand-building", "web-design-development", "digital-advertising", "2d-3d-design"],
    heroImage: u("photo-1757840589823-5e074cc2bab6"),
    gallery: [u("photo-1600585154340-be6161a56a0c"), u("photo-1600607687939-ce8a6c25118c"), u("photo-1786042251653-a41532b21394")],
    summary: "Northline Developments needed a digital presence capable of presenting its residential project with the same sophistication as the property itself.",
    challenge: "A pre-construction residential project had renderings, a floor plan set and a sales team, but no brand, no website and no way to generate registrations ahead of launch. Competing Calgary real estate developments were already advertising.",
    objective: "Launch a unified brand and digital experience that positioned the development premium, captured qualified buyer registrations and gave the sales team a steady, trackable pipeline.",
    strategy: ["Positioning built around the neighbourhood and the buyer, not the unit mix", "A project website designed as a guided tour, ending in registration", "Landing pages aligned to each advertising audience", "Visual storytelling through 3D exterior and interior visualization", "Paid search and paid social sequenced from awareness to registration"],
    execution: "Adelfos developed a unified digital experience combining brand positioning, responsive web design, paid advertising, social media creative and interactive property visualization. The website launched with an interactive exterior scene, floor plan explorer and a registration flow connected to the sales CRM.",
    creative: "A restrained identity system in charcoal, warm stone and a single accent, applied across signage, brochure, social and the website. Renders were art-directed for dusk lighting to distinguish the project from daylight-heavy competitors.",
    digitalExperience: "Responsive site with scroll-driven storytelling, lazy-loaded 3D visualization and sub-two-second load on mobile. Every CTA routes to a short registration form with source tracking.",
    results: [{ value: "+68%", label: "Qualified inquiries" }, { value: "+41%", label: "Landing page conversion rate" }, { value: "2.7x", label: "Social engagement" }],
    learnings: "Buyers engaged longest with the interactive visualization and floor plan tools. Advertising that led directly into those experiences outperformed generic listing ads on cost per registration.",
    testimonial: "t1",
    seoTitle: "Northline Developments Case Study | Real Estate Marketing Calgary | Adelfos (Demo)",
    seoDescription: "Demo case study: brand, website design, 3D visualization and digital advertising for a Calgary real estate development.",
  },
  {
    clientName: "Apex Autohaus", slug: "apex-autohaus", status: "demo", featured: true,
    title: "Turning search demand into service bookings for a Calgary auto shop",
    industry: "Automotive", location: "Calgary, Alberta",
    services: ["seo", "digital-advertising", "social-media-management"],
    heroImage: u("photo-1503376780353-7e6692767b70"),
    gallery: [u("photo-1492144534655-ae79c964c9d7"), u("photo-1486262715619-67b85e0b08d3"), u("photo-1552930294-6b595f4c2974")],
    summary: "An independent European auto specialist relied on word of mouth while competitors owned local search.",
    challenge: "Strong reputation, weak visibility. The shop did not appear for high-intent local searches and its Google Business Profile was incomplete, so new customers defaulted to dealerships.",
    objective: "Own local search for specialist repair terms, fill the booking calendar and build a social presence that reinforced expertise.",
    strategy: ["Local SEO and Google Business Profile overhaul", "Service pages built around specific repair intents", "Google Ads for urgent, high-value searches", "Short-form video showing the workshop and the team", "Review generation built into the service process"],
    execution: "Technical SEO fixes, twelve new service pages, a fully optimized Business Profile with weekly posts, and a search campaign structured by vehicle brand and repair type. Social content documented real work in the shop.",
    creative: "Workshop photography and short videos with a consistent graphic frame. Honest, specific captions replaced generic automotive stock imagery.",
    digitalExperience: "Faster site, click-to-call and booking CTAs on every page, and call tracking connected to campaigns.",
    results: [{ value: "+112%", label: "Organic local visibility" }, { value: "+54%", label: "Booked services from search" }, { value: "4.9★", label: "Review rating maintained" }],
    learnings: "Specific beats broad. Pages targeting exact repair intents converted far better than a single generic services page, and video of real technicians outperformed polished stock creative.",
    testimonial: "t2",
    seoTitle: "Apex Autohaus Case Study | Automotive SEO & Ads Calgary | Adelfos (Demo)",
    seoDescription: "Demo case study: local SEO, Google Ads and social media management for a Calgary automotive service business.",
  },
  {
    clientName: "Harvest & Co.", slug: "harvest-and-co", status: "demo", featured: true,
    title: "A restaurant brand that finally looked like the food tasted",
    industry: "Hospitality", location: "Calgary, Alberta",
    services: ["brand-building", "social-media-management", "digital-advertising"],
    heroImage: u("photo-1414235077428-338989a2e8c0"),
    gallery: [u("photo-1517248135467-4c7edcad34c4"), u("photo-1555396273-367ea4eb4db5"), u("photo-1424847651672-bf20a4b0982b")],
    summary: "A farm-to-table restaurant with loyal regulars and an identity that undersold the experience.",
    challenge: "Inconsistent visuals, a dated menu design and a social feed that looked like every other restaurant. Weekend seating was strong; weekday and private dining were not.",
    objective: "Rebrand around provenance and craft, grow weekday reservations and launch a private dining offering without discounting.",
    strategy: ["Brand positioning rooted in Alberta producers", "Editorial identity and menu system", "Social content built around seasonal storytelling", "Geo-targeted Meta campaigns for weekday and private dining", "Email capture through reservations"],
    execution: "New identity, menus, signage and photography, followed by a twelve-week content programme and always-on advertising for weekday offers and events.",
    creative: "Natural light photography, a warm neutral palette and a serif-led typographic system that echoed the restaurant's interior.",
    digitalExperience: "Reservation-first website with menu, private dining inquiry form and event calendar.",
    results: [{ value: "+37%", label: "Weekday reservations" }, { value: "3.1x", label: "Private dining inquiries" }, { value: "+88%", label: "Instagram engagement" }],
    learnings: "Storytelling about producers drove more saves and shares than dish photography alone, and those posts correlated with reservation spikes.",
    testimonial: "t4",
    seoTitle: "Harvest & Co. Case Study | Restaurant Branding Calgary | Adelfos (Demo)",
    seoDescription: "Demo case study: brand building, social media and digital advertising for a Calgary restaurant.",
  },
  {
    clientName: "Vantage Legal", slug: "vantage-legal", status: "demo", featured: true,
    title: "Redesigning a law firm website around how clients actually choose",
    industry: "Professional Services", location: "Calgary, Alberta",
    services: ["web-design-development", "seo", "conversion-rate-optimization"],
    heroImage: u("photo-1589829545856-d10d557cf95f"),
    gallery: [u("photo-1497366216548-37526070297c"), u("photo-1450101499163-c8848c66ca85"), u("photo-1521791136064-7986c2920216")],
    summary: "A boutique firm with excellent lawyers and a website that generated almost no consultation requests.",
    challenge: "Dense legal copy, no clear paths by practice area and a contact form that asked for too much. The site ranked for the firm name and nothing else.",
    objective: "Increase qualified consultation requests from organic search and make it easy for a stressed person to take the first step.",
    strategy: ["Practice-area pages written around client questions", "Simplified consultation request flow", "Technical SEO and local optimization", "Trust signals placed where hesitation happens", "Ongoing A/B testing of headlines and forms"],
    execution: "Full redesign and rebuild, twenty practice-area and FAQ pages, schema markup, and a three-field consultation form with follow-up automation.",
    creative: "Calm, authoritative visual language with real team photography and generous whitespace, avoiding legal clichés.",
    digitalExperience: "Fast, accessible site with clear practice-area navigation and consultation CTAs that adapt to the page context.",
    results: [{ value: "+146%", label: "Consultation requests" }, { value: "+79%", label: "Organic traffic to practice pages" }, { value: "-38%", label: "Form abandonment" }],
    learnings: "Shortening the form and answering common questions before the CTA had more impact than any visual change.",
    testimonial: "t3",
    seoTitle: "Vantage Legal Case Study | Law Firm Web Design Calgary | Adelfos (Demo)",
    seoDescription: "Demo case study: website redesign, SEO and conversion rate optimization for a Calgary law firm.",
  },
  {
    clientName: "Urbanform Interiors", slug: "urbanform-interiors", status: "demo",
    title: "An identity and website worthy of the interiors",
    industry: "Interior Design", location: "Calgary, Alberta",
    services: ["brand-building", "graphic-design", "web-design-development"],
    heroImage: u("photo-1600607687939-ce8a6c25118c"),
    gallery: [u("photo-1616486338812-3dadae4b4ace"), u("photo-1615873968403-89e068629265"), u("photo-1600210492486-724fe5c67fb0")],
    summary: "A design studio whose own brand did not reflect the quality of its portfolio.",
    challenge: "Beautiful work presented through a template website and a logo that had outlived the studio's ambitions. Referrals were strong; inbound project inquiries were rare.",
    objective: "Create a brand and portfolio experience that attracts higher-value residential and commercial projects.",
    strategy: ["Positioning around considered, architectural interiors", "Typographic identity system", "Portfolio-first website with project storytelling", "Printed lookbook and proposal templates", "Launch through social and press outreach"],
    execution: "Identity, guidelines, website, lookbook and a proposal template system delivered over ten weeks.",
    creative: "Monochrome identity with a single warm accent, photography direction favouring natural light and detail shots.",
    digitalExperience: "Image-led portfolio with fast loading, smooth transitions and a concise project inquiry flow.",
    results: [{ value: "+92%", label: "Project inquiries" }, { value: "2.4x", label: "Average inquiry budget" }, { value: "+63%", label: "Time on portfolio pages" }],
    learnings: "Presenting fewer, better-documented projects raised perceived value more than showing everything.",
    seoTitle: "Urbanform Interiors Case Study | Interior Design Branding Calgary | Adelfos (Demo)",
    seoDescription: "Demo case study: brand identity, graphic design and portfolio website for a Calgary interior design studio.",
  },
  {
    clientName: "Summit Performance", slug: "summit-performance", status: "demo",
    title: "Filling a training facility through social and paid acquisition",
    industry: "Fitness", location: "Calgary, Alberta",
    services: ["social-media-management", "digital-advertising", "conversion-rate-optimization"],
    heroImage: u("photo-1534438327276-14e5300c3a48"),
    gallery: [u("photo-1571902943202-507ec2618e8f"), u("photo-1517836357463-d25dfeac3438"), u("photo-1540497077202-7c8a3999166f")],
    summary: "A performance training facility with strong coaching and an inconsistent membership pipeline.",
    challenge: "Membership growth depended on seasonal walk-ins. Social content was sporadic and trial sign-ups leaked through a long registration form.",
    objective: "Build a predictable stream of trial sign-ups and improve trial-to-member conversion.",
    strategy: ["Coach-led social content programme", "Meta and Google campaigns for trial offers", "Trial landing page with two-step form", "Retargeting sequences for site visitors", "Follow-up optimization with the sales team"],
    execution: "Weekly content production, always-on advertising and a redesigned trial funnel with tracking through to membership.",
    creative: "High-contrast training photography and short coaching clips with bold typographic overlays.",
    digitalExperience: "Mobile-first trial page, two-step form and automated confirmation flow.",
    results: [{ value: "+124%", label: "Trial sign-ups" }, { value: "+29%", label: "Trial-to-member conversion" }, { value: "-41%", label: "Cost per lead" }],
    learnings: "Content featuring coaches outperformed facility footage, and shortening the form lifted conversion more than any offer change.",
    seoTitle: "Summit Performance Case Study | Gym Marketing Calgary | Adelfos (Demo)",
    seoDescription: "Demo case study: social media, digital advertising and CRO for a Calgary fitness facility.",
  },
  {
    clientName: "Westridge Realty", slug: "westridge-realty", status: "demo",
    title: "Positioning a brokerage as the local expert",
    industry: "Real Estate", location: "Calgary, Alberta",
    services: ["brand-building", "social-media-management", "digital-advertising", "web-design-development"],
    heroImage: u("photo-1560518883-ce09059eeffa"),
    gallery: [u("photo-1564013799919-ab600027ffc6"), u("photo-1512917774080-9991f1c4c750"), u("photo-1600596542815-ffad4c1539a9")],
    summary: "A growing brokerage competing against national brands with larger budgets.",
    challenge: "Agents marketed themselves inconsistently and the brokerage brand had no clear meaning to buyers or sellers.",
    objective: "Unify the brand, make the brokerage synonymous with neighbourhood expertise and generate seller leads.",
    strategy: ["Brokerage positioning around neighbourhood knowledge", "Agent brand templates within one system", "Neighbourhood content series for social", "Seller-focused advertising with home valuation landing pages", "Website with agent, listing and neighbourhood hubs"],
    execution: "Brand system, website, content programme and advertising launched in phases over five months.",
    creative: "Editorial photography of Calgary neighbourhoods and a clean typographic system agents could apply themselves.",
    digitalExperience: "Listing search, neighbourhood guides and valuation request flow with lead routing to agents.",
    results: [{ value: "+83%", label: "Seller leads" }, { value: "+57%", label: "Website sessions" }, { value: "100%", label: "Agent brand consistency" }],
    learnings: "Neighbourhood content earned trust that listing content could not, and became the top source of seller inquiries.",
    seoTitle: "Westridge Realty Case Study | Brokerage Marketing Calgary | Adelfos (Demo)",
    seoDescription: "Demo case study: brand, social, advertising and website for a Calgary real estate brokerage.",
  },
  {
    clientName: "Nova Commerce", slug: "nova-commerce", status: "demo",
    title: "Rebuilding an online store for speed, search and sales",
    industry: "E-commerce", location: "Calgary, Alberta",
    services: ["web-design-development", "conversion-rate-optimization", "digital-advertising", "seo"],
    heroImage: u("photo-1556742049-0cfed4f6a45d"),
    gallery: [u("photo-1472851294608-062f824d29cc"), u("photo-1441986300917-64674bd600d8"), u("photo-1523275335684-37898b6baf30")],
    summary: "A homegrown Alberta retailer with a slow store and rising acquisition costs.",
    challenge: "Slow pages, a confusing checkout and product content that did not rank. Advertising costs were climbing while conversion rate fell.",
    objective: "Rebuild the store for performance and conversion, grow organic revenue and lower blended acquisition cost.",
    strategy: ["Performance-focused storefront rebuild", "Checkout and product page optimization", "SEO-driven category and product content", "Shopping and Performance Max campaigns", "Retention through email and retargeting"],
    execution: "New storefront, structured product data, content programme and restructured advertising launched over twelve weeks.",
    creative: "Clean product photography standards and a modular content system for campaigns.",
    digitalExperience: "Sub-two-second mobile load, streamlined checkout and search-friendly category architecture.",
    results: [{ value: "+61%", label: "Conversion rate" }, { value: "+95%", label: "Organic revenue" }, { value: "-33%", label: "Blended cost per acquisition" }],
    learnings: "Speed and checkout clarity paid for the entire project; advertising efficiency followed once conversion improved.",
    seoTitle: "Nova Commerce Case Study | E-commerce Web Development Calgary | Adelfos (Demo)",
    seoDescription: "Demo case study: e-commerce development, CRO, SEO and digital advertising for an Alberta online retailer.",
  },
];

export const getCaseStudy = (slug) => caseStudies.find((c) => c.slug === slug);
export const getCaseStudies = (slugs = []) => slugs.map(getCaseStudy).filter(Boolean);
export const featuredCaseStudies = caseStudies.filter((c) => c.featured);
