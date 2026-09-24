import { SEO, breadcrumbLd } from "@/components/layout/SEO";
import { PageHero } from "@/components/common/PageHero";
import { AuditForm } from "@/components/audit/AuditForm";
import { Eyebrow } from "@/components/common/Motion";
import { site } from "@/data/site";

const crumbs = [{ label: "Home", to: "/" }, { label: "Audit", to: "/audit" }];

export default function Audit() {
  return (
    <>
      <SEO title="Marketing Audit | Adelfos Marketing" description="Get a fast digital growth audit for your Calgary business. Review your channels, website, goals and budget with a clear roadmap." path="/audit" jsonLd={[breadcrumbLd(crumbs), { "@context": "https://schema.org", "@type": "Service", url: `${site.url}/audit`, name: "Marketing Audit" }]} />
      <PageHero crumbs={crumbs} eyebrow="Audit" lines={["See where your", "growth leaks."]} body="Tell us how you are currently attracting customers, what you are trying to achieve and where the gaps are. We will turn that into a simple score and a clear action plan." />

      <section className="bg-[#f7f7f7] border-t border-[#e5e5e5]">
        <div className="container-x section-pad grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <Eyebrow>What you get</Eyebrow>
            <ul className="mt-8 space-y-6 text-neutral-700">
              {[
                "A clear digital growth score based on your current website, offer and channels.",
                "Priority issues that explain the biggest friction in your acquisition funnel.",
                "Practical recommendations that work for a realistic budget and timeline.",
              ].map((item) => (
                <li key={item} className="flex gap-4">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#ff3131]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <AuditForm />
          </div>
        </div>
      </section>
    </>
  );
}
