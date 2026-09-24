import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import { SEO, breadcrumbLd } from "@/components/layout/SEO";
import { PageHero } from "@/components/common/PageHero";
import { Eyebrow, AnimatedHeading, ScrollReveal, Stagger, StaggerItem } from "@/components/common/Motion";
import { FAQ } from "@/components/common/FAQ";
import { CTASection } from "@/components/common/CTASection";
import { CaseStudyCard } from "@/components/work/CaseStudyCard";
import { ServiceVisual } from "@/components/services/ServiceVisuals";
import { RealEstateSection } from "@/components/real-estate/RealEstateSection";
import { getService, getServices } from "@/data/services";
import { getCaseStudies } from "@/data/caseStudies";
import { site } from "@/data/site";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const Block = ({ id, eyebrow, lines, children, light = false, className = "" }) => (
  <section id={id} className={`${light ? "bg-[#f7f7f7] text-black border-[#e5e5e5]" : "bg-white border-[#e5e5e5]"} border-t ${className}`}>
    <div className="container-x section-pad grid lg:grid-cols-12 gap-12">
      <div className="lg:col-span-4"><Eyebrow light={light}>{eyebrow}</Eyebrow><AnimatedHeading lines={lines} className="display-md mt-6" /></div>
      <div className="lg:col-span-8">{children}</div>
    </div>
  </section>
);

export default function ServiceDetail() {
  const { slug } = useParams();
  const s = getService(slug);
  useEffect(() => { if (s) trackEvent("service_view", { service: s.slug }); }, [s]);
  if (!s) return <Navigate to="/404" replace />;
  const crumbs = [{ label: "Home", to: "/" }, { label: "Services", to: "/services" }, { label: s.title, to: `/services/${s.slug}` }];
  const related = getServices(s.relatedServices);
  const cases = getCaseStudies(s.relatedCaseStudies);
  const ld = { "@context": "https://schema.org", "@type": "Service", name: s.title, serviceType: s.title, description: s.seoDescription, provider: { "@id": `${site.url}/#organization` }, areaServed: [{ "@type": "City", name: "Calgary" }, { "@type": "AdministrativeArea", name: "Alberta" }], url: `${site.url}/services/${s.slug}` };

  return (
    <>
      <SEO title={s.seoTitle} description={s.seoDescription} path={`/services/${s.slug}`} image={s.image} jsonLd={[ld, breadcrumbLd(crumbs)]} />
      <PageHero crumbs={crumbs} eyebrow={`Service ${s.n} / 11`} lines={s.heroLine} body={s.heroDescription}>
        <div className="mt-8 flex flex-wrap gap-4"><Link to="/contact" className="btn btn-primary" data-testid="service-hero-cta"><span>{site.ctaPrimary}</span><ArrowUpRight size={16} className="arrow" /></Link></div>
      </PageHero>

      <ScrollReveal className="container-x"><div className="aspect-[21/9] overflow-hidden relative"><img src={s.image} alt={`${s.title} — Adelfos Marketing Calgary`} className="w-full h-full object-cover img-editorial" /><span className="absolute inset-0 border border-white/10 pointer-events-none" /></div></ScrollReveal>

      <Block eyebrow="Introduction" lines={["What this", "service does"]} className="!border-t-0">
        <ScrollReveal><p className="text-xl sm:text-2xl leading-snug font-light max-w-2xl">{s.shortDescription}</p><p className="mt-8 text-neutral-600 leading-relaxed max-w-2xl">{s.heroDescription}</p></ScrollReveal>
      </Block>

      <Block eyebrow="The problem" lines={s.problem.title.split(" ").reduce((acc, w, i, arr) => { const half = Math.ceil(arr.length / 2); (i < half ? acc[0] : acc[1]).push(w); return acc; }, [[], []]).map((a) => a.join(" "))} light>
        <ScrollReveal><p className="text-lg sm:text-xl text-neutral-600 leading-relaxed max-w-2xl">{s.problem.body}</p></ScrollReveal>
      </Block>

      <Block eyebrow="The Adelfos approach" lines={["How we", "think about it"]}>
        <Stagger className="grid sm:grid-cols-3 gap-px bg-[#1f1f1f] border border-[#e5e5e5]">{s.approach.map((a, i) => <StaggerItem key={a.title} className="bg-white p-6 lg:p-8 hover:bg-[#f0f0f0] transition-colors"><span className="font-mono text-xs text-[#ff3131]">0{i + 1}</span><h3 className="font-display font-bold text-xl mt-3 tracking-tight">{a.title}</h3><p className="mt-4 text-sm text-neutral-600 leading-relaxed">{a.body}</p></StaggerItem>)}</Stagger>
      </Block>

      {s.visual === "realestate" ? <RealEstateSection /> : (
        <section className="bg-white border-t border-[#e5e5e5]"><div className="container-x section-pad"><ServiceVisual type={s.visual} /></div></section>
      )}

      <Block eyebrow="Capabilities" lines={["What's", "included"]}>
        <Stagger className="grid sm:grid-cols-2 gap-x-10" stagger={0.05}>{s.capabilities.map((c) => <StaggerItem key={c} className="flex gap-4 items-start border-b border-[#e5e5e5] py-4"><Check size={16} className="text-[#ff3131] mt-1 shrink-0" /><span className="text-base">{c}</span></StaggerItem>)}</Stagger>
      </Block>

      <Block eyebrow="Process" lines={["Step by", "step"]} light>
        <ol className="space-y-0">{s.process.map((p, i) => <ScrollReveal key={p.title} as="li" delay={i * 0.06} className="grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_14rem_1fr] gap-4 sm:gap-8 py-6 border-b border-[#d9d9d9] items-baseline"><span className="font-mono text-xs text-[#ff3131]">0{i + 1}</span><h3 className="font-display font-bold text-xl tracking-tight">{p.title}</h3><p className="text-neutral-600 col-span-2 sm:col-span-1">{p.body}</p></ScrollReveal>)}</ol>
      </Block>

      <Block eyebrow="Deliverables & industries" lines={["What you get,", "who it's for"]}>
        <div className="grid sm:grid-cols-2 gap-12">
          <div><p className="eyebrow mb-6">Deliverables</p><ul className="space-y-3">{s.deliverables.map((d) => <li key={d} className="flex gap-3 items-baseline"><span className="w-1.5 h-1.5 bg-[#ff3131] shrink-0" />{d}</li>)}</ul></div>
          <div><p className="eyebrow mb-6">Industries & applications</p><ul className="flex flex-wrap gap-2">{s.industries.map((d) => <li key={d} className="font-mono text-[11px] uppercase tracking-[0.15em] border border-[#d9d9d9] px-3 py-2">{d}</li>)}</ul></div>
        </div>
      </Block>

      <section className="bg-white border-t border-[#e5e5e5]"><div className="container-x section-pad">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14"><div><Eyebrow>Related work</Eyebrow><AnimatedHeading lines={["Demo projects", "using this service"]} className="display-md mt-6" /></div><Link to="/work" className="link-underline font-mono text-xs uppercase tracking-[0.2em]">All case studies</Link></div>
        <div className="grid md:grid-cols-3 gap-8">{cases.map((c, i) => <CaseStudyCard key={c.slug} c={c} index={i} />)}</div>
      </div></section>

      <FAQ items={s.faq} title={[`${s.title}`, "questions"]} />

      <section className="bg-white border-t border-[#e5e5e5]"><div className="container-x py-16 flex flex-col md:flex-row md:items-center gap-6 md:gap-12"><Eyebrow>Related services</Eyebrow><ul className="flex flex-wrap gap-3">{related.map((r) => <li key={r.slug}><Link to={`/services/${r.slug}`} data-testid={`related-service-${r.slug}`} className="inline-flex items-center gap-2 border border-[#d9d9d9] px-4 py-3 font-display font-bold text-sm tracking-tight hover:border-[#ff3131] hover:text-[#ff3131] transition-colors">{r.title}<ArrowUpRight size={14} /></Link></li>)}</ul></div></section>

      <CTASection lines={[`Let's talk`, `${s.title.toLowerCase()}.`]} body={`Tell us about your business and we will outline how ${s.title.toLowerCase()} fits into a growth plan for you, with priorities and a realistic budget.`} />
    </>
  );
}
