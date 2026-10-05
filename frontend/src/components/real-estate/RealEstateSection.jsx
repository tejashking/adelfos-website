import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/common/Button";
import { Eyebrow, DemoBadge } from "@/components/common/Motion";
import { useMediaQuery, useReducedMotion } from "@/hooks/useAnimation";
import { trackEvent } from "@/lib/analytics";

const RealEstateScene = lazy(() => import("./RealEstateScene"));

const STAGES = [
  { n: "01", title: "Wide exterior", body: "Every project begins as a first impression. We make sure it is a deliberate one." },
  { n: "02", title: "Approach", body: "Positioning decides which story the property tells and to whom." },
  { n: "03", title: "Architecture, revealed", body: "3D visualization and drawings let buyers understand what does not exist yet." },
  { n: "04", title: "Layers of detail", body: "Floor plans, finishes and context become marketing assets, not attachments." },
  { n: "05", title: "Marketing capabilities", body: "Brand, website, advertising and social launch as one coordinated system." },
  { n: "06", title: "From attention to inquiry", body: "Landing pages, lead capture and reporting turn interest into pipeline." },
];
const LABELS = ["Design", "Visibility", "Presentation", "Lead generation", "Conversion"];

const hasWebGL = () => { try { const c = document.createElement("canvas"); return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl"))); } catch { return false; } };

const Fallback = () => (
  <div className="absolute inset-0" data-testid="real-estate-fallback">
    <img src="https://images.unsplash.com/photo-1757840589823-5e074cc2bab6?auto=format&fit=crop&w=1800&q=80" alt="Modern luxury home exterior at dusk" className="w-full h-full object-cover opacity-70 animate-in fade-in zoom-in-105" style={{ animationDuration: "2000ms" }} />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
  </div>
);

export const RealEstateSection = () => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const mobile = useMediaQuery("(max-width: 1023px)");
  const [near, setNear] = useState(false);
  const [webgl, setWebgl] = useState(true);
  const [stage, setStage] = useState(0);
  const stageRef = useRef(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const labelOpacity = useTransform(scrollYProgress, [0.6, 0.72], [0, 1]);
  const ctaOpacity = useTransform(scrollYProgress, [0.82, 0.95], [0, 1]);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(5, Math.max(0, Math.floor(v * 6)));
    if (next !== stageRef.current) {
      stageRef.current = next;
      setStage(next);
    }
  });

  useEffect(() => {
    setWebgl(hasWebGL());
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect(); trackEvent("real_estate_view"); } }, { rootMargin: "600px 0px" });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id="real-estate" data-testid="real-estate-3d-section" className="relative bg-black text-white border-t border-[#1f1f1f]" style={{ height: reduced ? "auto" : "600vh" }}>
      <div className={`${reduced ? "relative min-h-screen" : "sticky top-0 h-screen"} overflow-hidden`}>
        {near && webgl && !reduced ? (
          <Suspense fallback={<Fallback />}><RealEstateScene progressMV={scrollYProgress} mobile={mobile} /></Suspense>
        ) : <Fallback />}

        <div className="absolute inset-x-0 top-0 pt-28 sm:pt-32 pointer-events-none">
          <div className="container-x flex flex-wrap items-center gap-4">
            <Eyebrow>Signature capability — Real estate</Eyebrow>
            <DemoBadge label="Placeholder 3D model" />
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 pb-10 sm:pb-14 pointer-events-none">
          <div className="container-x grid lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-6">
              <motion.div key={stage} initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} data-testid={`real-estate-stage-${stage}`}>
                <span className="font-mono text-xs text-[#ff3131]">{STAGES[stage].n} / 06</span>
                <h2 className="display-md mt-3">{STAGES[stage].title}</h2>
                <p className="mt-4 text-neutral-300 max-w-md text-base sm:text-lg leading-relaxed">{STAGES[stage].body}</p>
              </motion.div>
              <motion.div style={{ opacity: reduced ? 1 : ctaOpacity }} className="mt-8 flex flex-wrap gap-3 pointer-events-auto">
                <Button to="/services/real-estate" variant="dark" className="!min-h-[2.75rem] !px-4 !py-2 !text-[10px] !tracking-[0.22em] !uppercase" data-testid="real-estate-cta">Explore</Button>
                <Button to="/work/northline-developments" variant="outlineDark" className="!min-h-[2.75rem] !px-4 !py-2 !text-[10px] !tracking-[0.22em] !uppercase !bg-white/8 !border-white/80 !text-white hover:!bg-white hover:!text-black" data-testid="real-estate-case">See a demo project</Button>
              </motion.div>
            </div>
            <motion.ul style={{ opacity: reduced ? 1 : labelOpacity }} className="lg:col-span-5 lg:col-start-8 flex flex-wrap lg:flex-col gap-2 lg:gap-3 lg:items-end" aria-label="Real estate marketing capabilities">
              {LABELS.map((l, i) => <li key={l} className="font-display font-bold tracking-tight text-lg sm:text-2xl lg:text-3xl border-b border-[#ff3131]/40 pb-1 flex gap-3"><span className="font-mono text-[10px] text-[#ff3131] self-center">0{i + 1}</span>{l}</li>)}
            </motion.ul>
          </div>
        </div>
        <p className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:block font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500 [writing-mode:vertical-rl] pointer-events-none">Move cursor to orbit · scroll to explore</p>
      </div>
    </section>
  );
};
