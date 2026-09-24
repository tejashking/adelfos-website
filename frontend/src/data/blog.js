// DEMO CONTENT — articles are demo editorial written for Adelfos. Review before publishing.
const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

/**
 * @typedef {Object} Article
 * @property {string} title
 * @property {string} slug
 * @property {string} excerpt
 * @property {string} category
 * @property {string} date
 * @property {string} author
 * @property {string} heroImage
 * @property {string} readTime
 * @property {{h2:string, p:string[]}[]} content
 * @property {string[]} relatedServices
 * @property {string[]} relatedCaseStudies
 */

/** @type {Article[]} */
export const articles = [
  {
    title: "How Local Businesses in Calgary Can Build a Stronger Digital Presence",
    slug: "calgary-local-business-digital-presence",
    excerpt: "Visibility, credibility and conversion are three different problems. Here is how Calgary businesses can solve them in the right order.",
    category: "Strategy", date: "2026-05-12", author: "Adelfos Marketing", readTime: "6 min", heroImage: u("photo-1688071458340-448d56949b79"),
    content: [
      { h2: "Start with how customers actually find you", p: ["Most Calgary businesses assume their digital presence starts with a website. It starts earlier, with a search on a phone, a recommendation in a community group or a scroll past a video. Mapping those first moments tells you where to invest.", "Search your own category the way a customer would. If competitors appear in Maps and you do not, your Google Business Profile is the first fix, not a new logo."] },
      { h2: "Fix credibility before you buy traffic", p: ["Advertising sends people to your website and social profiles. If those look dated or inconsistent, you are paying to lose trust. Consistent branding, current photography and clear service pages are prerequisites for paid growth.", "Reviews matter here too. A steady flow of recent, specific reviews does more for a local business than any headline."] },
      { h2: "Make the next step obvious", p: ["Every page and profile should have one clear action: call, book, request a quote. Conversion rate optimization is not an enterprise luxury; it is the difference between traffic and customers.", "Once visibility, credibility and conversion are working together, advertising and SEO stop competing for budget and start compounding."] },
    ],
    relatedServices: ["seo", "web-design-development", "brand-building"], relatedCaseStudies: ["apex-autohaus", "vantage-legal"],
  },
  {
    title: "Google Ads vs Meta Ads: Which Is Better for Calgary Businesses?",
    slug: "google-ads-vs-meta-ads-calgary",
    excerpt: "One captures demand, the other creates it. The right answer depends on how your customers buy.",
    category: "Digital Advertising", date: "2026-04-28", author: "Adelfos Marketing", readTime: "7 min", heroImage: u("photo-1460925895917-afdab827c52f"),
    content: [
      { h2: "Google Ads: intent you can measure", p: ["When someone in Calgary searches for an emergency plumber or a family lawyer, the intent is explicit. Google Search ads put you in that moment. Cost per click can be high in competitive categories, but the leads are ready to act.", "Search works best for services people need now, comparison-driven purchases and anything where the customer already knows what they want."] },
      { h2: "Meta Ads: demand you can build", p: ["Instagram and Facebook are where people discover restaurants, gyms, developments and brands they were not looking for. Creative quality matters more than bidding here. A good video will outperform a large budget with poor creative.", "Meta is strongest for visual businesses, longer consideration cycles and retargeting people who visited your website but did not convert."] },
      { h2: "The honest answer", p: ["Most local businesses need both, weighted to their buying cycle. A dental clinic may put seventy percent into search; a new residential development may lean the other way. Testing with tracked conversions, not opinions, settles the question within a quarter."] },
    ],
    relatedServices: ["digital-advertising", "conversion-rate-optimization"], relatedCaseStudies: ["summit-performance", "nova-commerce"],
  },
  {
    title: "How Local SEO Helps Calgary Businesses Generate High-Intent Leads",
    slug: "local-seo-calgary-high-intent-leads",
    excerpt: "Local SEO is the most cost-efficient channel most Calgary businesses underinvest in. Here is what it involves.",
    category: "SEO", date: "2026-04-09", author: "Adelfos Marketing", readTime: "6 min", heroImage: u("photo-1432888622747-4eb9a8efeb07"),
    content: [
      { h2: "What local SEO actually means", p: ["Local SEO is the practice of appearing for searches with location intent: 'near me' queries, neighbourhood searches and Maps results. It combines your Google Business Profile, on-site content, reviews, citations and local links.", "Unlike broad SEO, it rewards specificity. A Calgary business with complete, active profiles and pages for each service and area can outrank national brands for local intent."] },
      { h2: "The signals that move the needle", p: ["Complete Business Profile information, accurate categories, regular posts and photos, a consistent flow of reviews, service pages that name the areas you serve and structured data on your website.", "Speed and mobile experience matter because most local searches happen on phones and Google measures the page experience."] },
      { h2: "Why the leads are better", p: ["Someone searching for a service in their area is usually ready to act. Local SEO leads tend to convert faster and cost less over time than paid leads, which is why we treat it as a foundation rather than an add-on."] },
    ],
    relatedServices: ["seo", "web-design-development"], relatedCaseStudies: ["apex-autohaus", "vantage-legal"],
  },
  {
    title: "7 Website Conversion Mistakes That Cost Local Businesses Customers",
    slug: "website-conversion-mistakes-local-businesses",
    excerpt: "Traffic is expensive. These common mistakes waste it, and every one of them is fixable.",
    category: "Conversion", date: "2026-03-21", author: "Adelfos Marketing", readTime: "5 min", heroImage: u("photo-1551288049-bebda4e38f71"),
    content: [
      { h2: "1. A headline that describes instead of promises", p: ["'Welcome to our website' tells a visitor nothing. Lead with the outcome you deliver and who it is for."] },
      { h2: "2. Hidden or inconsistent calls to action", p: ["If a visitor has to hunt for how to contact you, many will not. One primary action, visible on every page."] },
      { h2: "3. Forms that ask for too much", p: ["Every extra field lowers completion. Ask for what you need to respond, nothing more."] },
      { h2: "4. Slow pages, especially on mobile", p: ["Seconds of delay cost conversions and rankings. Compress images, remove bloat, use modern hosting."] },
      { h2: "5. No proof", p: ["Reviews, project examples and specifics build trust. Place them where hesitation happens, near the CTA."] },
      { h2: "6. Generic stock imagery", p: ["People can tell. Real photography of your team and work converts better than perfect strangers."] },
      { h2: "7. Not measuring", p: ["Without conversion tracking you are guessing. Install analytics, track calls and forms, and review monthly. Conversion rate optimization begins with knowing your numbers."] },
    ],
    relatedServices: ["conversion-rate-optimization", "web-design-development"], relatedCaseStudies: ["vantage-legal", "nova-commerce"],
  },
  {
    title: "Real Estate Marketing in Calgary: From Listing to Lead Generation",
    slug: "real-estate-marketing-calgary-listing-to-leads",
    excerpt: "Developments, brokerages and agents compete for the same attention. Presentation and process decide who wins it.",
    category: "Real Estate", date: "2026-03-03", author: "Adelfos Marketing", readTime: "8 min", heroImage: u("photo-1560518883-ce09059eeffa"),
    content: [
      { h2: "Position before you promote", p: ["Every project and brokerage has a story: location, design, lifestyle, value. Deciding which story to tell, and to whom, makes every asset that follows sharper. Real estate marketing in Calgary rewards clarity because buyers compare constantly."] },
      { h2: "Show what words cannot", p: ["3D visualization, virtual tours and interactive experiences let buyers understand a property before it exists or before they visit. For pre-construction developments this is not optional; it is the product until completion."] },
      { h2: "Build a lead engine, not a listing page", p: ["Landing pages aligned to each campaign audience, short registration forms, immediate follow-up and CRM integration turn interest into pipeline. Track cost per qualified inquiry, not impressions.", "Combine paid social for awareness, search for active buyers and retargeting for everyone in between. Report weekly, adjust monthly."] },
    ],
    relatedServices: ["real-estate", "2d-3d-design", "digital-advertising"], relatedCaseStudies: ["northline-developments", "westridge-realty"],
  },
];

export const getArticle = (slug) => articles.find((a) => a.slug === slug);
