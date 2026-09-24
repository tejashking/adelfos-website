import { SEO, breadcrumbLd } from "@/components/layout/SEO";
import { PageHero } from "@/components/common/PageHero";
import { Eyebrow, AnimatedHeading, ScrollReveal, Stagger, StaggerItem, Marquee } from "@/components/common/Motion";
import { CTASection } from "@/components/common/CTASection";
import { Stats } from "@/components/common/Stats";
import { method } from "@/data/site";
import { Button } from "@/components/common/Button";
import { useParallax } from "@/hooks/useAnimation";
import { motion } from "framer-motion";

const crumbs = [{ label: "Home", to: "/" }, { label: "About", to: "/about" }];
const VALUES = [
  ["Commercially honest", "We recommend the smallest amount of work that achieves the goal, and we say so when a channel is wrong for you."],
  ["Design with intent", "Every visual decision serves a business decision. Beauty that does not convert is decoration."],
  ["Technology as leverage", "We build with modern tools, from performance-first websites to interactive 3D, because craft is a competitive advantage for local business."],
  ["Measured, always", "If it cannot be tracked, it is not a strategy. Reporting is written in plain language, not dashboards for their own sake."],
];

export default function About() {
  const { ref, y } = useParallax(50);
  return (
    <>
      <SEO title="About Adelfos Marketing | Calgary Creative & Performance Agency" description="Adelfos Marketing is a Calgary-based agency combining strategy, creative, technology and performance to build digital empires for local businesses across Alberta." path="/about" jsonLd={[breadcrumbLd(crumbs)]} />
      <PageHero crumbs={crumbs} eyebrow="About" lines={["Beyond boundaries,", "beyond expectation."]} body="Adelfos Marketing was built on a simple observation: local businesses deserve the same strategic and creative standard as national brands. We bring that standard to Calgary, without the agency theatre." />
      <Marquee items={["Strategy", "Creative", "Technology", "Performance"]} className="border-y border-[#e5e5e5] py-5 font-display font-bold text-lg sm:text-2xl tracking-tight text-neutral-500" duration={30} />
      <section ref={ref} className="bg-white"><div className="container-x section-pad grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5"><Eyebrow>Who we are</Eyebrow><AnimatedHeading lines={["A creative", "technology agency", "for local business."]} className="display-md mt-6" /></div>
        <div className="lg:col-span-6 lg:col-start-7 space-y-6 text-neutral-600 text-base sm:text-lg leading-relaxed">
          <ScrollReveal as="p">The name Adelfos comes from the Greek for brother. It describes how we work: as a partner that carries the weight of your digital growth alongside you, not a vendor that hands over a report and disappears.</ScrollReveal>
          <ScrollReveal as="p" delay={0.1}>Our team combines marketing strategy, brand and graphic design, web and app development, 2D and 3D visualization and paid performance. That range lets us design complete systems, from the first impression to the tracked inquiry, and execute them without handing your project between agencies.</ScrollReveal>
          <ScrollReveal as="p" delay={0.2}>We are based in Calgary, Alberta and work with businesses across the province: developers, brokerages, restaurants, clinics, trades, professional firms and retailers who want to be found, remembered and chosen.</ScrollReveal>
        </div>
        <motion.div style={{ y }} className="lg:col-span-12 grid sm:grid-cols-2 gap-6 mt-8">
          <div className="aspect-[4/3] overflow-hidden"><img src="https://images.unsplash.com/photo-1688071458340-448d56949b79?auto=format&fit=crop&w=1400&q=80" alt="Calgary skyline" className="w-full h-full object-cover img-editorial" loading="lazy" /></div>
          <div className="aspect-[4/3] overflow-hidden sm:mt-16"><img src="https://images.unsplash.com/photo-1700672481083-edffef7d5282?auto=format&fit=crop&w=1400&q=80" alt="Creative team collaborating in a studio" className="w-full h-full object-cover img-editorial" loading="lazy" /></div>
        </motion.div>
      </div></section>
      <section className="bg-[#f7f7f7] text-black"><div className="container-x section-pad">
        <Eyebrow light>What we believe</Eyebrow>
        <Stagger className="grid md:grid-cols-2 gap-px bg-[#d9d9d9] mt-10 border border-[#d9d9d9]">
          {VALUES.map(([h, p], i) => <StaggerItem key={h} className="bg-[#f7f7f7] p-8 lg:p-12 hover:bg-white transition-colors"><span className="font-mono text-xs text-[#ff3131]">0{i + 1}</span><h3 className="font-display font-bold text-2xl tracking-tight mt-3">{h}</h3><p className="mt-4 text-neutral-600 leading-relaxed">{p}</p></StaggerItem>)}
        </Stagger>
      </div></section>
      <section className="bg-white border-t border-[#e5e5e5]"><div className="container-x section-pad">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8"><div><Eyebrow>The Adelfos method</Eyebrow><AnimatedHeading lines={["Five stages.", "No shortcuts."]} className="display-lg mt-6" /></div><Button to="/#real-estate" variant="outline">See it in motion</Button></div>
        <ol className="grid md:grid-cols-5 gap-px bg-[#1f1f1f] border border-[#e5e5e5] mt-14">
          {method.map((m) => <li key={m.n} className="bg-white p-6 lg:p-8 hover:bg-[#f0f0f0] transition-colors"><span className="font-mono text-xs text-[#ff3131]">{m.n}</span><h3 className="font-display font-bold text-xl mt-3">{m.title}</h3><p className="mt-4 text-sm text-neutral-600 leading-relaxed">{m.body}</p></li>)}
        </ol>
      </div></section>
      <Stats />
      <CTASection lines={["Work with a team", "that executes."]} />
    </>
  );
}
