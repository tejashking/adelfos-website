# Adelfos Marketing — Website PRD

## Original problem statement
Redesign adelfosmarketing.com as a premium, interactive marketing agency website (Calgary, AB). Brand: #000 / #FF3131 / #FFF, official geometric logo. 11 services with dedicated pages, /work with 8 demo case studies, /insights with 5 demo articles, /about, /contact (form → DB + Resend email), 404, SEO (metadata, sitemap, robots, JSON-LD), custom cursor, loading screen, page transitions, Real Estate 3D scroll experience (React Three Fiber), accessibility, reduced motion, responsive.
User follow-up (Jun 2026): switch to a professional, approachable GrowME-style layout — minimal single font (Manrope), light/white theme, centered section headers with red eyebrows, service cards with icons, no overlapping/outlined typography.

## Architecture
- Frontend: React 19 (CRA/craco), React Router 7, Tailwind + shadcn, framer-motion, lenis (smooth scroll), GSAP installed, @react-three/fiber + drei (Real Estate scene, lazy-loaded), react-helmet-async (SEO).
- Backend: FastAPI `/api/contact` (validation, honeypot, timing check, IP rate limit, sanitization, Mongo `contact_submissions`, Resend email when `RESEND_API_KEY` set), `/api/contact/count`.
- Data modules (content separated from UI): `src/data/site.js`, `services-a.js`, `services-b.js`, `services.js`, `caseStudies.js` (status:"demo"), `testimonials.js` (demo), `blog.js`.
- Key components: layout/{Navbar, MobileMenu, Footer, LoadingScreen, PageTransition, CustomCursor, SEO, Layout}, common/{Button, Motion(AnimatedHeading, ScrollReveal, Stagger, Eyebrow, DemoBadge, Marquee), SectionHeader, PageHero, CTASection, FAQ, Stats, TestimonialSlider, Breadcrumbs, LogoMark}, home/{Hero, TrustBar, Attention, MethodSection, ServicesGrid, ServicesIndex}, real-estate/{RealEstateSection, RealEstateScene, BuildingModel, CameraRig, Hotspot}, services/ServiceVisuals, work/CaseStudyCard, blog/ArticleCard, contact/ContactForm.
- Hooks: `hooks/useAnimation.js` (useScrollReveal, useMagneticHover, useParallax, useCounterAnimation, useTextReveal, useMediaQuery, useReducedMotion).
- SEO: per-page title/description/canonical/OG, JSON-LD (Organization+LocalBusiness, WebSite, Service, BreadcrumbList, Article, FAQPage), `public/sitemap.xml` (30 URLs), `public/robots.txt`.
- Analytics: `lib/analytics.js` reads REACT_APP_GA4_ID / GOOGLE_ADS_ID / META_PIXEL_ID (empty by default) and tracks cta_click, contact_submit, email/whatsapp clicks, service/case-study views.

## User personas
- Calgary local business owner evaluating an agency.
- Real estate developer / brokerage seeking marketing + visualization.
- Adelfos team maintaining content (swap demo data in `src/data`).

## Implemented (June 2026)
- All routes: /, /about, /services, /services/:slug (11), /work, /work/:slug (8 demo), /insights, /insights/:slug (5), /contact, /privacy, /terms, 404.
- Homepage: loading screen, sticky nav, hero, trust bar, attention statement, sticky Method section, services card grid, Real Estate 3D scroll section (WebGL fallback image), featured work, demo metrics, testimonial carousel (arrows/drag/keys), insights, CTA, footer.
- Contact form end-to-end (zod validation, honeypot, success/error states) → Mongo. Email is SKIPPED until RESEND_API_KEY is provided.
- Light professional theme (Manrope), custom cursor (desktop), page transition, reduced-motion support, mobile menu.

## Backlog / next
- P0: Provide RESEND_API_KEY + verified sender to enable email notifications; add analytics IDs.
- P1: Replace demo case studies/testimonials/metrics with real content; real GLB model at /public/models/real-estate.glb; real portfolio imagery for services.
- P2: Blog CMS, more articles, per-service visuals with real work, Lighthouse tuning (image CDN, font subsetting).
