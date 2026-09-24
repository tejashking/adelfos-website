import { SEO } from "@/components/layout/SEO";
import { PageHero } from "@/components/common/PageHero";
import { site } from "@/data/site";

const COPY = {
  privacy: {
    title: "Privacy Policy",
    lines: ["Privacy", "policy."],
    sections: [
      ["Information we collect", `When you submit our contact form we collect the details you provide: name, email, phone, company, website, service interest, budget range and project details. We may also collect anonymous usage analytics if analytics tools are enabled.`],
      ["How we use it", "We use contact details solely to respond to your inquiry and discuss potential work. We do not sell personal information."],
      ["Retention & requests", `Inquiries are retained for business purposes and deleted on request. Contact ${site.email} to access, correct or delete your data.`],
      ["Third parties", "Form notifications may be delivered through an email service provider; analytics may use Google or Meta tools where configured. Each operates under its own privacy policy."],
    ],
  },
  terms: {
    title: "Terms of Use",
    lines: ["Terms", "of use."],
    sections: [
      ["Use of this website", "Content on this site is provided for general information about Adelfos Marketing's services. It does not constitute a binding offer; engagements are governed by individual agreements."],
      ["Demo content", "Case studies, testimonials and metrics labelled as demo are illustrative placeholders and do not represent actual clients or results."],
      ["Intellectual property", "Adelfos Marketing branding and original content are the property of Adelfos Marketing. Third-party imagery is used under their respective licences."],
      ["Contact", `Questions about these terms can be sent to ${site.email}.`],
    ],
  },
};

export default function Legal({ kind }) {
  const c = COPY[kind];
  return (
    <>
      <SEO title={c.title} description={`${c.title} for the Adelfos Marketing website.`} path={`/${kind}`} noindex />
      <PageHero eyebrow="Legal" lines={c.lines} crumbs={[{ label: "Home", to: "/" }, { label: c.title, to: `/${kind}` }]} />
      <section className="bg-white border-t border-[#e5e5e5]"><div className="container-x py-20 max-w-3xl space-y-10">
        {c.sections.map(([h, p]) => <div key={h}><h2 className="font-display font-bold text-2xl tracking-tight">{h}</h2><p className="mt-4 text-neutral-600 leading-relaxed">{p}</p></div>)}
        <p className="font-mono text-xs text-neutral-500">Last updated: June 2026</p>
      </div></section>
    </>
  );
}
