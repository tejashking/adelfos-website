import { Marquee, ScrollReveal } from "@/components/common/Motion";

// Platforms and tools we work in — not partner badges or client logos (none fabricated).
const PLATFORMS = ["Google Ads", "Meta Ads", "TikTok Ads", "Google Analytics 4", "Google Business Profile", "Shopify", "WordPress", "Webflow", "HubSpot", "Figma", "Adobe Creative Cloud", "Three.js"];

export const TrustBar = () => (
  <section data-testid="trust-bar" className="bg-white border-y border-[#e5e5e5]">
    <div className="container-x py-10">
      <ScrollReveal><p className="text-center eyebrow">Platforms we build and advertise on</p></ScrollReveal>
      <Marquee items={PLATFORMS.map((p) => <span key={p} className="font-display font-bold text-lg sm:text-xl text-neutral-400">{p}</span>)} className="mt-6" duration={45} separator="·" />
    </div>
  </section>
);
