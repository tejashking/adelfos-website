import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/common/Button";
import { TRIANGLES } from "@/components/common/LogoMark";
import { textRevealVariants, useReducedMotion } from "@/hooks/useAnimation";
import { site } from "@/data/site";

const LINES = ["We build digital empires", "for local business."];
const POINTS = ["Get found by customers already searching", "Build a brand people remember", "Turn website visitors into inquiries", "Track results, not just impressions"];

export const Hero = ({ ready = true }) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const spread = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 90]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 30]);
  const neg = useTransform(spread, (v) => -v);
  const tri = [{ x: neg, y: neg }, { x: spread, y: neg }, { x: neg, y: spread }, { x: spread, y: spread }];
  const state = ready ? "visible" : "hidden";

  return (
    <section ref={ref} data-testid="hero-section" className="relative bg-white overflow-hidden pt-32 sm:pt-40 pb-16 sm:pb-24">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(255,49,49,0.08),transparent_55%)]" aria-hidden="true" />
      <div className="container-x relative grid lg:grid-cols-12 gap-12 items-center">
        <motion.div style={{ y: yText, opacity }} className="lg:col-span-8">
          <motion.div initial={reduced ? "visible" : "hidden"} animate={state} variants={textRevealVariants.container(0.1, 0.15)}>
            <motion.p variants={textRevealVariants.fade} className="eyebrow">Calgary digital marketing agency</motion.p>
            <h1 className="display-xl mt-5 text-[#111]" data-testid="hero-headline">
              {LINES.map((l, i) => (
                <span key={i} className="mask-line"><motion.span variants={textRevealVariants.line} className={i === 1 ? "text-[#ff3131]" : ""}>{l}</motion.span></span>
              ))}
            </h1>
            <motion.p variants={textRevealVariants.fade} className="mt-6 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl">
              Strategy, creative, technology and performance, engineered to turn attention into action. Adelfos helps Calgary businesses get found, be remembered and convert.
            </motion.p>
            <motion.ul variants={textRevealVariants.fade} className="mt-8 grid sm:grid-cols-2 gap-3 max-w-xl">
              {POINTS.map((p) => <li key={p} className="flex items-start gap-3 bg-[#f7f7f7] rounded-md px-4 py-3 text-sm font-semibold text-[#111]"><CheckCircle2 size={18} className="text-[#ff3131] shrink-0 mt-0.5" aria-hidden="true" />{p}</li>)}
            </motion.ul>
            <motion.div variants={textRevealVariants.fade} className="mt-10 flex flex-wrap gap-4">
              <Button to="/contact" data-testid="hero-cta-primary" track="hero-primary">{site.ctaPrimary}</Button>
              <Button to="/work" variant="outline" data-testid="hero-cta-secondary" track="hero-secondary">{site.ctaSecondary}</Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div style={{ rotate }} className="lg:col-span-4 relative flex justify-center lg:justify-end pointer-events-none" aria-hidden="true">
          <svg viewBox="-60 -60 220 220" className="w-[60vw] max-w-[320px] lg:max-w-[440px] lg:w-full aspect-square overflow-visible">
            {TRIANGLES.map((p, i) => (
              <motion.polygon key={i} points={p} fill="#ff3131" style={tri[i]} initial={reduced ? false : { opacity: 0, scale: 0.6 }} animate={ready ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }} />
            ))}
          </svg>
        </motion.div>
      </div>
    </section>
  );
};
