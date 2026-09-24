import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { Eyebrow, AnimatedHeading, ScrollReveal } from "@/components/common/Motion";
import { Button } from "@/components/common/Button";
import { useMediaQuery, useReducedMotion } from "@/hooks/useAnimation";

export const ServiceRow = ({ s, onEnter, onLeave, light }) => (
  <li className="border-b first:border-t border-[#e5e5e5]" onMouseEnter={onEnter} onMouseLeave={onLeave} onFocus={onEnter} onBlur={onLeave}>
    <Link to={`/services/${s.slug}`} data-testid={`service-row-${s.slug}`} className={`group grid grid-cols-[3rem_1fr_auto] sm:grid-cols-[4rem_1fr_minmax(0,22rem)_3rem] items-center gap-4 sm:gap-8 py-6 sm:py-8 relative overflow-hidden transition-colors duration-500 ${light ? "hover:bg-[#111] hover:text-black" : "hover:bg-[#f0f0f0]"}`}>
      <span className="absolute inset-y-0 left-0 w-[3px] bg-[#ff3131] -translate-x-full group-hover:translate-x-0 transition-transform duration-500" aria-hidden="true" />
      <span className="font-mono text-xs text-[#ff3131] transition-transform duration-500 group-hover:translate-x-2">{s.n}</span>
      <span className="font-display font-bold tracking-tight text-xl sm:text-3xl lg:text-4xl leading-none transition-transform duration-500 group-hover:translate-x-3">{s.title}</span>
      <span className={`hidden sm:block text-sm leading-relaxed ${light ? "text-neutral-500 group-hover:text-neutral-700" : "text-neutral-500 group-hover:text-neutral-700"} transition-colors`}>{s.shortDescription}</span>
      <span className="justify-self-end w-10 h-10 border border-current/20 flex items-center justify-center transition-all duration-500 group-hover:bg-[#ff3131] group-hover:border-[#ff3131] group-hover:text-black group-hover:rotate-45"><ArrowUpRight size={16} /></span>
    </Link>
  </li>
);

export const ServicesIndex = ({ compact = false, light = false }) => {
  const [hover, setHover] = useState(null);
  const ref = useRef(null);
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useReducedMotion();
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 150, damping: 20 }); const y = useSpring(my, { stiffness: 150, damping: 20 });
  const onMove = (e) => { if (!ref.current) return; const r = ref.current.getBoundingClientRect(); mx.set(e.clientX - r.left); my.set(e.clientY - r.top); };
  const active = services.find((s) => s.slug === hover);

  return (
    <section data-testid="services-index-section" className={`${light ? "bg-[#f7f7f7] text-black" : "bg-white"} relative`}>
      <div className="container-x section-pad">
        {!compact && (
          <div className="grid lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-7"><Eyebrow light={light}>What we do</Eyebrow><AnimatedHeading lines={["Eleven disciplines.", "One system."]} className="display-lg mt-6" /></div>
            <ScrollReveal className="lg:col-span-4 lg:col-start-9 self-end"><p className={`${light ? "text-neutral-600" : "text-neutral-600"} leading-relaxed`}>From paid media to 3D visualization, every capability is built to feed the others. Pick one, or let us design the system.</p></ScrollReveal>
          </div>
        )}
        <div ref={ref} onMouseMove={onMove} className="relative">
          <ul>{services.map((s) => <ServiceRow key={s.slug} s={s} light={light} onEnter={() => setHover(s.slug)} onLeave={() => setHover(null)} />)}</ul>
          {fine && !reduced && (
            <AnimatePresence>
              {active && (
                <motion.div key={active.slug} style={{ x, y }} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.35 }} className="pointer-events-none absolute top-0 left-0 z-10 w-64 aspect-[4/3] -translate-y-1/2 translate-x-8 overflow-hidden border border-[#e5e5e5] hidden lg:block" aria-hidden="true">
                  <img src={active.image} alt="" className="w-full h-full object-cover img-editorial" loading="lazy" />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
        {compact && <div className="mt-12"><Button to="/services" variant={light ? "dark" : "outline"} data-testid="services-index-all">All services</Button></div>}
      </div>
    </section>
  );
};
