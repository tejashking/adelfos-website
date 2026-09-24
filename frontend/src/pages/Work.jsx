import { SEO, breadcrumbLd } from "@/components/layout/SEO";
import { PageHero } from "@/components/common/PageHero";
import { CaseStudyCard } from "@/components/work/CaseStudyCard";
import { CTASection } from "@/components/common/CTASection";
import { caseStudies } from "@/data/caseStudies";
import { DemoBadge } from "@/components/common/Motion";

const crumbs = [{ label: "Home", to: "/" }, { label: "Work", to: "/work" }];

export default function Work() {
  return (
    <>
      <SEO title="Case Studies | Marketing Work for Calgary Businesses" description="Case studies from Adelfos Marketing: brand, web design, SEO, digital advertising and real estate marketing projects for Calgary and Alberta businesses." path="/work" jsonLd={[breadcrumbLd(crumbs)]} />
      <PageHero crumbs={crumbs} eyebrow="Work" lines={["Case", "studies."]} body="Each project below is a demonstration of how we approach a category: the problem, the strategy, the execution and what we learned.">
        <div className="mt-6"><DemoBadge label="All projects shown are demo content — real client work will replace them" /></div>
      </PageHero>
      <section className="bg-white border-t border-[#e5e5e5]">
        <div className="container-x py-20 lg:py-28 grid md:grid-cols-12 gap-x-8 gap-y-20">
          {caseStudies.map((c, i) => (
            <CaseStudyCard key={c.slug} c={c} index={i} priority={i < 2} className={i % 3 === 0 ? "md:col-span-7" : i % 3 === 1 ? "md:col-span-5 md:mt-28" : "md:col-span-12 lg:col-span-8 lg:col-start-3"} />
          ))}
        </div>
      </section>
      <CTASection lines={["Your project", "could be next."]} />
    </>
  );
}
