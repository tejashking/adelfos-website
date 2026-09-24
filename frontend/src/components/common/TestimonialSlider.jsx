import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { testimonials } from "@/data/testimonials";
import { Eyebrow, DemoBadge } from "./Motion";
import { LogoMark } from "./LogoMark";

export const TestimonialSlider = () => {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const go = useCallback((d) => { setDir(d); setI((v) => (v + d + testimonials.length) % testimonials.length); }, []);
  useEffect(() => {
    const onKey = (e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    const el = document.getElementById("testimonials");
    el?.addEventListener("keydown", onKey);
    return () => el?.removeEventListener("keydown", onKey);
  }, [go]);
  const t = testimonials[i];
  return (
    <section id="testimonials" data-testid="testimonials-section" tabIndex={0} aria-roledescription="carousel" aria-label="Client testimonials" className="bg-[#f7f7f7] text-black relative overflow-hidden focus:outline-none">
      <LogoMark size={420} color="#000" className="absolute -left-32 -top-32 opacity-[0.04] pointer-events-none" />
      <div className="container-x section-pad relative">
        <div className="flex items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4"><Eyebrow light>What clients say</Eyebrow><DemoBadge label="Demo testimonial" /></div>
          <div className="flex gap-2">
            <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" data-testid="testimonial-prev" className="w-12 h-12 border border-black/20 flex items-center justify-center hover:bg-[#111] hover:text-black transition-colors"><ArrowLeft size={18} /></button>
            <button type="button" onClick={() => go(1)} aria-label="Next testimonial" data-testid="testimonial-next" className="w-12 h-12 border border-black/20 flex items-center justify-center hover:bg-[#111] hover:text-black transition-colors"><ArrowRight size={18} /></button>
          </div>
        </div>
        <div className="min-h-[300px] sm:min-h-[260px] relative">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.blockquote
              key={t.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => { if (info.offset.x < -60) go(1); else if (info.offset.x > 60) go(-1); }}
              initial={{ opacity: 0, x: 60 * dir }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 * dir }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              data-cursor="drag"
              data-testid="testimonial-quote"
              className="cursor-grab active:cursor-grabbing select-none"
            >
              <p className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-tight max-w-5xl">“{t.quote}”</p>
              <footer className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
                <span className="text-black">{t.name}</span>
                <span>{t.role}</span>
                {t.caseStudy && <Link to={`/work/${t.caseStudy}`} className="link-underline text-[#ff3131]">View project</Link>}
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <div className="mt-10 flex gap-2" role="tablist" aria-label="Testimonial pagination">
          {testimonials.map((x, k) => (
            <button key={x.id} type="button" role="tab" aria-selected={k === i} aria-label={`Testimonial ${k + 1}`} onClick={() => { setDir(k > i ? 1 : -1); setI(k); }} className={`h-[3px] transition-all duration-500 ${k === i ? "w-12 bg-[#ff3131]" : "w-6 bg-white/20 hover:bg-white/40"}`} />
          ))}
        </div>
      </div>
    </section>
  );
};
