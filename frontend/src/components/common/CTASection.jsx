import { Button } from "./Button";
import { AnimatedHeading, ScrollReveal, Eyebrow } from "./Motion";
import { LogoMark } from "./LogoMark";
import { useParallax } from "@/hooks/useAnimation";
import { motion } from "framer-motion";
import { site } from "@/data/site";

export const CTASection = ({ eyebrow = "Next step", lines = ["Let's build something", "worth remembering."], body = "Tell us about your business, your market and what growth looks like. We will come back with a point of view, not a pitch deck.", primary = { label: site.ctaPrimary, to: "/contact" }, secondary = { label: "WhatsApp us", href: site.whatsappUrl }, light = false }) => {
  const { ref, y } = useParallax(60);
  return (
    <section ref={ref} data-testid="final-cta-section" className={`relative overflow-hidden ${light ? "bg-[#f7f7f7] text-black" : "bg-black text-white border-t border-[#1f1f1f]"}`}>
      <motion.div style={{ y }} className="absolute -right-24 top-1/2 -translate-y-1/2 opacity-[0.08] pointer-events-none" aria-hidden="true">
        <LogoMark size={560} color="#ff3131" />
      </motion.div>
      <div className="container-x section-pad relative">
        <Eyebrow light={light}>{eyebrow}</Eyebrow>
        <AnimatedHeading as="h2" lines={lines} className="display-xl mt-8 max-w-5xl" />
        <div className="grid lg:grid-cols-12 gap-10 mt-12">
          <ScrollReveal className="lg:col-span-6 lg:col-start-7">
            <p className={`text-lg sm:text-xl leading-relaxed ${light ? "text-neutral-600" : "text-neutral-400"} max-w-xl`}>{body}</p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Button to={primary.to} variant={light ? "dark" : "primary"} data-testid="cta-primary" track="final-cta">{primary.label}</Button>
              {secondary && <Button href={secondary.href} to={secondary.to} variant={light ? "outlineDark" : "outline"} icon="external" data-testid="cta-secondary" track="final-cta-secondary">{secondary.label}</Button>}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
