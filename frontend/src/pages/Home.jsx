import { useState } from "react";
import { SEO } from "@/components/layout/SEO";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { Attention } from "@/components/home/Attention";
import { MethodSection } from "@/components/home/MethodSection";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { RealEstateSection } from "@/components/real-estate/RealEstateSection";
import { FeaturedWork } from "@/components/work/CaseStudyCard";
import { Stats } from "@/components/common/Stats";
import { TestimonialSlider } from "@/components/common/TestimonialSlider";
import { InsightsPreview } from "@/components/blog/ArticleCard";
import { CTASection } from "@/components/common/CTASection";

export default function Home() {
  const [ready, setReady] = useState(() => !!sessionStorage.getItem("adelfos-loaded"));
  return (
    <>
      <SEO title="Adelfos Marketing | Calgary Marketing Agency" description="Adelfos Marketing is a Calgary digital marketing agency building digital empires for local business: digital advertising, SEO, web design, brand building, app development and real estate marketing." path="/" />
      <LoadingScreen onDone={() => setReady(true)} />
      <Hero ready={ready} />
      <TrustBar />
      <Attention />
      <MethodSection />
      <ServicesGrid />
      <RealEstateSection />
      <FeaturedWork />
      <Stats />
      <TestimonialSlider />
      <InsightsPreview />
      <CTASection />
    </>
  );
}
