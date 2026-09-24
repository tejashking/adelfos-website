import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { getServices } from "@/data/services";
import { DemoBadge, ScrollReveal } from "@/components/common/Motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/common/Button";
import { featuredCaseStudies } from "@/data/caseStudies";
import { trackEvent } from "@/lib/analytics";

export const CaseStudyCard = ({ c, className = "", index = 0, priority = false }) => (
  <ScrollReveal delay={index * 0.08} className={className}>
    <Link to={`/work/${c.slug}`} data-cursor="view" data-testid={`case-study-card-${c.slug}`} onClick={() => trackEvent("case_study_click", { slug: c.slug })} className="group block relative overflow-hidden">
      <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#f3f3f3]">
        <motion.img src={c.heroImage} alt={`${c.clientName} — ${c.industry} project visual`} loading={priority ? "eager" : "lazy"} className="absolute inset-0 w-full h-full object-cover img-editorial group-hover:scale-[1.06]" />
        <span className="absolute inset-0 bg-white/20 group-hover:bg-white/0 transition-colors duration-700" aria-hidden="true" />
        <span className="absolute top-4 left-4"><DemoBadge label="Demo project" /></span>
        <span className="absolute bottom-0 left-0 h-[3px] bg-[#ff3131] w-0 group-hover:w-full transition-[width] duration-700 ease-out" aria-hidden="true" />
      </div>
      <div className="pt-6 grid grid-cols-[1fr_auto] gap-4 items-start">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500 flex flex-wrap gap-x-3">
            <span className="text-[#ff3131]">{c.industry}</span>
            <span className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">{getServices(c.services).map((s) => s.title).join(" · ")}</span>
          </p>
          <h3 className="font-display font-extrabold tracking-tight text-2xl sm:text-3xl mt-3 transition-transform duration-500 group-hover:translate-x-2">{c.clientName}</h3>
          <p className="mt-2 text-neutral-600 text-sm max-w-md">{c.summary}</p>
        </div>
        <span className="w-11 h-11 border border-[#d9d9d9] flex items-center justify-center group-hover:bg-[#111] group-hover:text-black transition-colors duration-500"><ArrowUpRight size={18} /></span>
      </div>
    </Link>
  </ScrollReveal>
);

export const FeaturedWork = () => (
  <section data-testid="featured-case-studies-section" className="bg-white border-t border-[#e5e5e5]">
    <div className="container-x section-pad">
      <SectionHeader eyebrow="Selected work" title={["Work that earns attention"]} body="Demo projects that show how we approach a category: the problem, the strategy, the execution and what we learned." />
      <div className="grid md:grid-cols-12 gap-x-8 gap-y-16 mt-16">
        {featuredCaseStudies.map((c, i) => (
          <CaseStudyCard key={c.slug} c={c} index={i} className={i % 4 === 0 ? "md:col-span-7" : i % 4 === 1 ? "md:col-span-5 md:mt-24" : i % 4 === 2 ? "md:col-span-5" : "md:col-span-7 md:-mt-24"} />
        ))}
      </div>
      <div className="mt-16 flex justify-center"><Button to="/work" variant="outline" data-testid="featured-work-all">All case studies</Button></div>
    </div>
  </section>
);
