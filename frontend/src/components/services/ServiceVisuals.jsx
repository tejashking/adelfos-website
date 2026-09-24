import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, MapPin, Star } from "lucide-react";
import { TRIANGLES } from "@/components/common/LogoMark";
import { DemoBadge, Stagger, StaggerItem } from "@/components/common/Motion";
import { useReducedMotion } from "@/hooks/useAnimation";

const Frame = ({ children, label, className = "" }) => (
  <div className={`relative border border-[#e5e5e5] bg-[#f3f3f3] p-6 sm:p-10 overflow-hidden ${className}`}>
    <div className="flex items-center justify-between mb-8"><span className="eyebrow">{label}</span><DemoBadge label="Demo / placeholder data" /></div>
    {children}
  </div>
);

// Demo funnel numbers are illustrative only.
export const Funnel = ({ steps = [["Impressions", "120,000"], ["Clicks", "4,800"], ["Landing page", "3,900"], ["Leads / purchases", "312"], ["Revenue", "$48k"]] }) => (
  <Frame label="Campaign funnel">
    <Stagger className="space-y-3" stagger={0.12}>
      {steps.map(([l, v], i) => (
        <StaggerItem key={l} className="relative">
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }} style={{ width: `${100 - i * 16}%`, originX: 0 }} className={`h-14 sm:h-16 flex items-center justify-between px-5 ${i === steps.length - 1 ? "bg-[#ff3131] text-white" : "bg-[#e6e6e6]"}`}>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em]">{l}</span><span className="font-display font-bold text-lg sm:text-xl tabular-nums">{v}</span>
          </motion.div>
        </StaggerItem>
      ))}
    </Stagger>
  </Frame>
);

export const SearchResults = () => (
  <Frame label="Local search, visualized">
    <div className="bg-white text-black p-4 sm:p-6 max-w-xl">
      <div className="flex items-center gap-3 border border-neutral-300 rounded-full px-4 py-2 text-sm text-neutral-600"><Search size={16} />marketing agency calgary</div>
      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mt-6 flex gap-4 items-start">
        <img src="/images/brand/logo-mark.png" alt="" className="w-10 h-10 border border-neutral-200" />
        <div><p className="font-semibold">Adelfos Marketing</p><p className="text-xs text-neutral-500 flex items-center gap-1"><Star size={12} className="fill-[#ff3131] text-[#ff3131]" /> Reviews · Marketing agency · Calgary, AB</p><p className="text-xs text-neutral-600 mt-1 flex items-center gap-1"><MapPin size={12} />Calgary · By appointment</p></div>
      </motion.div>
      {["adelfosmarketing.com › services › seo", "adelfosmarketing.com › services › digital-advertising"].map((u, i) => (
        <motion.div key={u} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.7 + i * 0.2 }} className="mt-6 border-t border-neutral-200 pt-4"><p className="text-xs text-neutral-500">{u}</p><p className="text-[#1a0dab] text-lg leading-snug mt-1">{i === 0 ? "SEO Agency Calgary | Local & Technical SEO Services" : "Digital Advertising Calgary | Google & Meta Ads Agency"}</p><div className="h-2 bg-neutral-200 mt-2 w-3/4" /></motion.div>
      ))}
    </div>
  </Frame>
);

export const SocialGrid = () => (
  <Frame label="Content system (demo)">
    <Stagger className="grid grid-cols-3 gap-2 sm:gap-3 max-w-lg" stagger={0.06}>
      {Array.from({ length: 9 }, (_, i) => (
        <StaggerItem key={i} className={`aspect-square flex items-end p-3 ${i % 4 === 0 ? "bg-[#ff3131]" : i % 3 === 0 ? "bg-white text-black" : "bg-[#e6e6e6]"}`}>
          <span className="font-display font-extrabold text-[10px] sm:text-xs leading-none">{["Reel", "Story", "Carousel", "Quote", "BTS", "Offer", "Tip", "Event", "Team"][i]}</span>
        </StaggerItem>
      ))}
    </Stagger>
  </Frame>
);

export const BrandSystem = () => (
  <Frame label="Identity system">
    <div className="grid sm:grid-cols-2 gap-6">
      <svg viewBox="-20 -20 140 140" className="w-full max-w-[240px]">{TRIANGLES.map((p, i) => <motion.polygon key={i} points={p} fill={i === 1 ? "#111" : "#ff3131"} initial={{ x: (i % 2 ? 40 : -40), y: (i < 2 ? -40 : 40), opacity: 0 }} whileInView={{ x: 0, y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }} />)}</svg>
      <div className="space-y-4">
        <div className="flex gap-2">{["#000000", "#FF3131", "#FFFFFF", "#F7F7F7"].map((c) => <div key={c} className="flex-1"><div className="h-12 border border-[#d9d9d9]" style={{ background: c }} /><p className="font-mono text-[10px] mt-1 text-neutral-500">{c}</p></div>)}</div>
        <p className="font-display font-extrabold text-3xl leading-none">Aa Bb</p>
        <p className="text-xl text-neutral-700">Positioning, voice, system.</p>
        <p className="font-mono text-xs text-neutral-500">01 / Type · 02 / Colour · 03 / Motion</p>
      </div>
    </div>
  </Frame>
);

const Screen = ({ w, label }) => (
  <div className="bg-[#f7f7f7] border border-[#d9d9d9] overflow-hidden" style={{ width: w }}>
    <div className="h-6 border-b border-[#d9d9d9] flex items-center gap-1.5 px-3"><span className="w-2 h-2 rounded-full bg-[#ff3131]" /><span className="w-2 h-2 rounded-full bg-neutral-600" /><span className="w-2 h-2 rounded-full bg-neutral-600" /></div>
    <div className="p-4 space-y-3"><div className="h-3 w-1/3 bg-neutral-300" /><div className="h-8 w-3/4 bg-neutral-900" /><div className="h-2 w-2/3 bg-neutral-300" /><div className="h-2 w-1/2 bg-neutral-300" /><div className="h-7 w-24 bg-[#ff3131]" /><div className="grid grid-cols-3 gap-2 pt-2"><div className="aspect-video bg-neutral-200" /><div className="aspect-video bg-neutral-200" /><div className="aspect-video bg-neutral-200" /></div></div>
    <p className="font-mono text-[10px] text-neutral-500 px-4 pb-3 uppercase tracking-widest">{label}</p>
  </div>
);

export const BrowserShowcase = () => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const width = useTransform(scrollYProgress, [0.2, 0.5, 0.8], reduced ? ["100%", "100%", "100%"] : ["100%", "62%", "34%"]);
  const label = useTransform(scrollYProgress, (v) => (v < 0.4 ? "Desktop" : v < 0.65 ? "Tablet" : "Mobile"));
  return (
    <Frame label="Responsive by design">
      <div ref={ref} className="flex justify-center py-6">
        <motion.div style={{ width }} className="max-w-3xl transition-none">
          <div className="bg-[#f7f7f7] border border-[#d9d9d9] overflow-hidden">
            <div className="h-7 border-b border-[#d9d9d9] flex items-center gap-1.5 px-3"><span className="w-2 h-2 rounded-full bg-[#ff3131]" /><span className="w-2 h-2 rounded-full bg-neutral-600" /><span className="w-2 h-2 rounded-full bg-neutral-600" /><motion.span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-neutral-500">{label}</motion.span></div>
            <div className="p-5 space-y-3"><div className="h-3 w-1/4 bg-neutral-300" /><div className="h-10 w-2/3 bg-neutral-900" /><div className="h-2 w-1/2 bg-neutral-300" /><div className="h-8 w-28 bg-[#ff3131]" /><div className="grid grid-cols-3 gap-2 pt-3"><div className="aspect-video bg-neutral-200" /><div className="aspect-video bg-neutral-200" /><div className="aspect-video bg-neutral-200" /></div></div>
          </div>
        </motion.div>
      </div>
    </Frame>
  );
};

export const DeviceMockup = ({ steps = ["Discover", "Design", "Develop", "Test", "Launch", "Optimize"] }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const idx = useTransform(scrollYProgress, [0.15, 0.85], [0, steps.length - 1]);
  const y = useTransform(idx, (v) => `-${Math.round(v) * 100}%`);
  const rot = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  return (
    <Frame label="Product journey">
      <div ref={ref} className="grid sm:grid-cols-2 gap-10 items-center">
        <motion.div style={{ rotate: rot }} className="mx-auto w-[220px] h-[440px] border-[6px] border-[#d9d9d9] bg-white overflow-hidden relative">
          <motion.div style={{ y }} className="absolute inset-0">
            {steps.map((s, i) => <div key={s} className={`h-full flex flex-col justify-end p-5 ${i % 2 ? "bg-[#ff3131]" : "bg-[#e6e6e6]"}`}><span className="font-mono text-[10px]">0{i + 1}</span><span className="font-display font-extrabold text-2xl">{s}</span></div>)}
          </motion.div>
        </motion.div>
        <ol className="space-y-3">{steps.map((s, i) => <li key={s} className="flex gap-4 items-baseline border-b border-[#e5e5e5] pb-3"><span className="font-mono text-xs text-[#ff3131]">0{i + 1}</span><span className="font-display font-bold text-xl">{s}</span></li>)}</ol>
      </div>
    </Frame>
  );
};

export const Roadmap = ({ items = ["Audit", "Positioning", "Channel strategy", "Growth roadmap", "Campaign plan", "Performance review"] }) => (
  <Frame label="Strategic roadmap">
    <div className="relative pl-6">
      <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} className="absolute left-0 top-0 bottom-0 w-px bg-[#ff3131] origin-top" />
      <Stagger className="space-y-6" stagger={0.15}>{items.map((it, i) => <StaggerItem key={it} className="relative"><span className="absolute -left-[27px] top-2 w-2 h-2 bg-[#ff3131] rotate-45" /><p className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">Q{(i % 4) + 1}</p><p className="font-display font-bold text-xl">{it}</p></StaggerItem>)}</Stagger>
    </div>
  </Frame>
);

export const Gallery = ({ items = ["Advertising creatives", "Social graphics", "Brochures", "Presentations", "Posters", "Marketing collateral", "Campaign visuals"] }) => (
  <Frame label="Editorial gallery (placeholders)">
    <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-3" stagger={0.06}>
      {items.map((it, i) => <StaggerItem key={it} className={`${i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-[4/5]"} border border-[#d9d9d9] p-4 flex flex-col justify-between hover:border-[#ff3131] transition-colors group`}><span className="font-mono text-[10px] text-neutral-500">0{i + 1}</span><span className="font-display font-bold leading-tight text-sm sm:text-base group-hover:text-[#ff3131] transition-colors">{it}</span></StaggerItem>)}
    </Stagger>
  </Frame>
);

export const Transform2D3D = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rx = useTransform(scrollYProgress, [0.2, 0.7], [0, 58]);
  const rz = useTransform(scrollYProgress, [0.2, 0.7], [0, -35]);
  const lift = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);
  const z0 = useTransform(lift, (v) => v * 36); const z1 = useTransform(lift, (v) => v * 72); const z2 = useTransform(lift, (v) => v * 108);
  const op = useTransform(lift, (v) => Math.min(1, v * 1.5));
  const zs = [z0, z1, z2];
  return (
    <Frame label="2D drawing → 3D form">
      <div ref={ref} className="h-[380px] flex items-center justify-center [perspective:900px]">
        <motion.div style={{ rotateX: rx, rotateZ: rz, transformStyle: "preserve-3d" }} className="relative w-64 h-48">
          <div className="absolute inset-0 border border-[#ff3131]/70 grid grid-cols-4 grid-rows-3">{Array.from({ length: 12 }, (_, i) => <div key={i} className="border border-[#ff3131]/20" />)}</div>
          {[0, 1, 2].map((i) => <motion.div key={i} style={{ translateZ: zs[i], opacity: op }} className={`absolute ${i === 2 ? "inset-x-12 inset-y-8 bg-black" : "inset-4 border border-black/60"}`} />)}
        </motion.div>
      </div>
      <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest text-center">Scroll to extrude</p>
    </Frame>
  );
};

export const CROFunnel = () => <Funnel steps={[["Traffic", "10,000"], ["Experience", "6,400"], ["Action", "1,900"], ["Conversion", "420"], ["Revenue", "$63k"]]} />;

export const ServiceVisual = ({ type }) => {
  switch (type) {
    case "funnel": return <Funnel />;
    case "search": return <SearchResults />;
    case "social": return <SocialGrid />;
    case "brand": return <BrandSystem />;
    case "browser": return <BrowserShowcase />;
    case "device": return <DeviceMockup />;
    case "cro": return <CROFunnel />;
    case "roadmap": return <Roadmap />;
    case "gallery": return <Gallery />;
    case "transform": return <Transform2D3D />;
    default: return null;
  }
};
