import { SEO, breadcrumbLd } from "@/components/layout/SEO";
import { PageHero } from "@/components/common/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { Eyebrow, ScrollReveal } from "@/components/common/Motion";
import { site } from "@/data/site";
import { trackEvent } from "@/lib/analytics";

const crumbs = [{ label: "Home", to: "/" }, { label: "Contact", to: "/contact" }];

export default function Contact() {
  return (
    <>
      <SEO title="Contact Adelfos Marketing | Start a Project in Calgary" description="Start a project with Adelfos Marketing, a Calgary marketing agency. Tell us about your business and goals and we will respond within one business day." path="/contact" jsonLd={[breadcrumbLd(crumbs), { "@context": "https://schema.org", "@type": "ContactPage", url: `${site.url}/contact`, mainEntity: { "@id": `${site.url}/#organization` } }]} />
      <PageHero crumbs={crumbs} eyebrow="Contact" lines={["Let's build something", "worth remembering."]} body="Tell us about your business, your market and what growth looks like. We reply within one business day with a point of view, not a pitch deck." />
      <section className="bg-white border-t border-[#e5e5e5]"><div className="container-x section-pad grid lg:grid-cols-12 gap-16">
        <ScrollReveal className="lg:col-span-7"><ContactForm /></ScrollReveal>
        <aside className="lg:col-span-4 lg:col-start-9 space-y-12">
          <div><Eyebrow>Direct</Eyebrow><ul className="mt-6 space-y-4 text-lg">
            <li><a href={`mailto:${site.email}`} onClick={() => trackEvent("email_click")} data-testid="contact-email" className="link-underline break-all">{site.email}</a></li>
            <li><a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("whatsapp_click")} data-testid="contact-whatsapp" className="link-underline">WhatsApp {site.whatsappDisplay}</a></li>
          </ul></div>
          <div><Eyebrow>Location</Eyebrow><address className="not-italic mt-6 text-neutral-700 leading-relaxed">Calgary, Alberta<br />Canada<br /><span className="text-neutral-500 text-sm">Serving Calgary and businesses across Alberta.</span></address></div>
          <div><Eyebrow>Hours</Eyebrow><p className="mt-6 text-neutral-700">{site.hours}</p></div>
          <div><Eyebrow>What happens next</Eyebrow><ol className="mt-6 space-y-4 text-sm text-neutral-600">{["We review your inquiry and your current digital presence.", "We book a short call to understand goals and constraints.", "You receive a recommended plan with priorities and budget."].map((s, i) => <li key={s} className="flex gap-4"><span className="font-mono text-xs text-[#ff3131]">0{i + 1}</span>{s}</li>)}</ol></div>
        </aside>
      </div></section>
    </>
  );
}
