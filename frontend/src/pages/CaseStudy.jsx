import { useRef } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SEO, breadcrumbLd } from "@/components/layout/SEO";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Eyebrow, AnimatedHeading, ScrollReveal, DemoBadge, Stagger, StaggerItem } from "@/components/common/Motion";
import { CTASection } from "@/components/common/CTASection";
import { getCaseStudy, caseStudies } from "@/data/caseStudies";
import { getServices } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { useReducedMotion, useCounterAnimation, useScrollReveal } from "@/hooks/useAnimation";

const Row = ({ label, children, light }) => (
  <ScrollReveal className={`grid lg:grid-cols-12 gap-6 py-12 border-t ${light ? "border-[#d9d9d9]" : "border-[#e5e5e5]"}`}>
    <div className="lg:col-span-3"><Eyebrow light={light}>{label}</Eyebrow></div>
    <div className="lg:col-span-8 lg:col-start-5">{children}</div>
  </ScrollReveal>
);

const Result = ({ r, i, start }) => {
  const num = parseFloat(r.value.replace(/[^0-9.]/g, ""));
  const v = useCounterAnimation(Number.isFinite(num) ? Math.round(num * 10) : 0, { start });
  const shown = Number.isFinite(num) ? r.value.replace(/[0-9.]+/, (v / 10).toFixed(num % 1 ? 1 : 0)) : r.value;
  return (
    <ScrollReveal delay={i * 0.1} className="border-l border-[#ff3131]/50 pl-6 py-2" data-testid={`result-${i}`}>
      <p className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-tighter leading-none tabular-nums">{shown}</p>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-600">{r.label}</p>
    </ScrollReveal>
  );
};

export default function CaseStudy() {
  const { slug } = useParams();
  const c = getCaseStudy(slug);
  const heroRef = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.15]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "20%"]);
  const [resRef, resIn] = useScrollReveal();
  if (!c) return <Navigate to="/404" replace />;
  const idx = caseStudies.findIndex((x) => x.slug === c.slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];
  const services = getServices(c.services);
  const quote = testimonials.find((t) => t.id === c.testimonial);
  const crumbs = [{ label: "Home", to: "/" }, { label: "Work", to: "/work" }, { label: c.clientName, to: `/work/${c.slug}` }];

  return (
    <article>
      <SEO title={c.seoTitle} description={c.seoDescription} path={`/work/${c.slug}`} image={c.heroImage} type="article" jsonLd={[breadcrumbLd(crumbs)]} />
      <header ref={heroRef} className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-black text-white">
        <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0"><img src={c.heroImage} alt={`${c.clientName} project`} className="w-full h-full object-cover opacity-50" /></motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        <div className="container-x relative pb-16 pt-40">
          <div className="flex flex-wrap items-center gap-4"><Breadcrumbs items={crumbs.slice(0, 2)} /><DemoBadge label="Demo project — fictional client" /></div>
          <p className="eyebrow mt-10">{c.clientName}</p>
          <AnimatedHeading as="h1" lines={[c.title]} className="font-display font-extrabold tracking-tight leading-[0.95] text-3xl sm:text-5xl lg:text-6xl xl:text-7xl mt-6 max-w-5xl" data-testid="case-study-title" />
          <dl className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 border-t border-white/10 pt-8">
            {[["Client", c.clientName], ["Industry", c.industry], ["Location", c.location], ["Services", services.map((s) => s.title).join(", ")]].map(([k, v]) => <div key={k}><dt className="eyebrow">{k}</dt><dd className="mt-2 text-sm sm:text-base">{v}</dd></div>)}
          </dl>
        </div>
      </header>

      <section className="bg-white"><div className="container-x pb-8">
        <Row label="Challenge"><p className="text-xl sm:text-2xl lg:text-3xl leading-snug font-light">{c.challenge}</p></Row>
        <Row label="Objective"><p className="text-lg sm:text-xl text-neutral-700 leading-relaxed">{c.objective}</p></Row>
      </div></section>

      <section className="bg-[#f7f7f7] text-black"><div className="container-x py-8">
        <Row label="Strategy" light>
          <Stagger className="space-y-0">{c.strategy.map((s, i) => <StaggerItem key={s} className="flex gap-6 items-baseline py-4 border-b border-[#d9d9d9]"><span className="font-mono text-xs text-[#ff3131]">0{i + 1}</span><span className="font-display font-bold text-lg sm:text-xl tracking-tight">{s}</span></StaggerItem>)}</Stagger>
        </Row>
        <Row label="Execution" light><p className="text-lg text-neutral-700 leading-relaxed">{c.execution}</p></Row>
      </div></section>

      <section className="bg-white"><div className="container-x py-8">
        <Row label="Creative"><p className="text-lg text-neutral-700 leading-relaxed">{c.creative}</p></Row>
        <Row label="Digital experience"><p className="text-lg text-neutral-700 leading-relaxed">{c.digitalExperience}</p></Row>
      </div></section>

      <section ref={resRef} data-testid="case-study-results" className="bg-white border-t border-[#e5e5e5]"><div className="container-x section-pad">
        <div className="flex flex-wrap items-center gap-4 mb-14"><Eyebrow>Results</Eyebrow><DemoBadge label="Demo / placeholder metrics" /></div>
        <div className="grid sm:grid-cols-3 gap-10">{c.results.map((r, i) => <Result key={r.label} r={r} i={i} start={resIn} />)}</div>
        <ScrollReveal className="mt-16 grid lg:grid-cols-12 gap-6"><div className="lg:col-span-3"><Eyebrow>Learnings</Eyebrow></div><p className="lg:col-span-8 lg:col-start-5 text-lg text-neutral-700 leading-relaxed">{c.learnings}</p></ScrollReveal>
      </div></section>

      <section className="bg-white"><div className="container-x pb-24 grid md:grid-cols-12 gap-4 sm:gap-6">
        {c.gallery.map((g, i) => <ScrollReveal key={g} delay={i * 0.08} className={i === 0 ? "md:col-span-8 aspect-[16/10]" : "md:col-span-4 aspect-[4/5] md:aspect-auto"}><img src={g} alt={`${c.clientName} gallery ${i + 1}`} loading="lazy" className="w-full h-full object-cover img-editorial" /></ScrollReveal>)}
      </div></section>

      {quote && <section className="bg-[#f7f7f7] text-black"><div className="container-x section-pad"><div className="flex items-center gap-4 mb-8"><Eyebrow light>Client voice</Eyebrow><DemoBadge label="Demo testimonial" /></div><blockquote className="font-display font-bold text-2xl sm:text-4xl leading-tight tracking-tight max-w-4xl">“{quote.quote}”<footer className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 font-normal">{quote.name} — {quote.role}</footer></blockquote></div></section>}

      <section className="bg-white border-t border-[#e5e5e5]"><div className="container-x py-16 flex flex-col md:flex-row md:items-center gap-6 md:gap-12"><Eyebrow>Services used</Eyebrow><ul className="flex flex-wrap gap-3">{services.map((s) => <li key={s.slug}><Link to={`/services/${s.slug}`} data-testid={`case-service-${s.slug}`} className="inline-flex items-center gap-2 border border-[#d9d9d9] px-4 py-3 font-display font-bold text-sm tracking-tight hover:border-[#ff3131] hover:text-[#ff3131] transition-colors">{s.title}<ArrowUpRight size={14} /></Link></li>)}</ul></div></section>

      <Link to={`/work/${next.slug}`} data-cursor="view" data-testid="next-case-study" className="group block relative bg-white border-t border-[#e5e5e5] overflow-hidden">
        <img src={next.heroImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000" />
        <div className="container-x py-24 lg:py-32 relative"><p className="eyebrow">Next case study</p><p className="display-lg mt-6 group-hover:translate-x-4 transition-transform duration-700">{next.clientName}</p><p className="mt-4 text-neutral-600">{next.industry}</p></div>
      </Link>
      <CTASection />
    </article>
  );
}
