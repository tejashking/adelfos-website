import { Link } from "react-router-dom";
import { SEO, breadcrumbLd } from "@/components/layout/SEO";
import { PageHero } from "@/components/common/PageHero";
import { CalendlyEmbed } from "@/components/calendly/CalendlyEmbed";
import { site } from "@/data/site";

const crumbs = [{ label: "Home", to: "/" }, { label: "Book a call", to: "/book-a-call" }];

export default function BookCall() {
  return (
    <>
      <SEO
        title="Book a Marketing Consultation in Calgary | Adelfos"
        description="Book a consultation with Adelfos Marketing to discuss digital marketing, SEO, web design, advertising, branding or your business growth goals."
        path="/book-a-call"
        jsonLd={[
          breadcrumbLd(crumbs),
          { "@context": "https://schema.org", "@type": "WebPage", name: "Book a Consultation", url: `${site.url}/book-a-call`, isPartOf: { "@id": `${site.url}/#website` } },
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="A first conversation"
        lines={["Book a", "consultation."]}
        body="Book a consultation with Adelfos Marketing to discuss digital marketing, SEO, web design, advertising, branding or your growth goals. We will learn about your business and talk through a practical next step."
      />
      <section className="border-t border-[#e5e5e5] bg-white">
        <div className="container-x section-pad">
          <div className="mx-auto max-w-4xl">
            <h2 className="display-md">Choose a time</h2>
            <p className="mt-4 mb-8 max-w-2xl leading-relaxed text-neutral-600">Use the calendar below to choose a time that works for you. If you would rather speak with us directly, email <a className="link-underline font-semibold text-[#111]" href={`mailto:${site.email}`}>{site.email}</a> or <a className="link-underline font-semibold text-[#111]" href={site.whatsappUrl} target="_blank" rel="noopener noreferrer">message us on WhatsApp</a>.</p>
            <CalendlyEmbed />
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#e5e5e5] pt-6 text-sm font-semibold">
              <Link className="link-underline" to="/services">Explore our services</Link>
              <Link className="link-underline" to="/contact">Send a project inquiry</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}