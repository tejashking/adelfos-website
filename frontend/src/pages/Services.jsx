import { SEO, breadcrumbLd } from "@/components/layout/SEO";
import { PageHero } from "@/components/common/PageHero";
import { ServicesIndex } from "@/components/home/ServicesIndex";
import { CTASection } from "@/components/common/CTASection";

const crumbs = [{ label: "Home", to: "/" }, { label: "Services", to: "/services" }];

export default function Services() {
  return (
    <>
      <SEO title="Marketing Services Calgary | Digital Advertising, SEO, Web Design & More" description="Explore Adelfos Marketing's eleven services for Calgary businesses: digital advertising, social media, SEO, brand building, web design, app development, CRO, advisory, graphic design, 2D & 3D design and real estate marketing." path="/services" jsonLd={[breadcrumbLd(crumbs)]} />
      <PageHero crumbs={crumbs} eyebrow="Services" lines={["Everything a local", "business needs", "to grow online."]} body="Eleven disciplines that work as one system. Strategy decides the sequence; creative and technology deliver it; performance proves it. Choose a starting point below." />
      <ServicesIndex />
      <CTASection lines={["Not sure where", "to start?"]} body="Tell us what growth looks like for your business and we will recommend the right sequence of work, with clear priorities and an honest budget." primary={{ label: "Start a project", to: "/contact" }} secondary={{ label: "Marketing advisory", to: "/services/marketing-advisory" }} />
    </>
  );
}
