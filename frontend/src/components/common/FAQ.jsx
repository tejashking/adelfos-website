import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Eyebrow, AnimatedHeading } from "./Motion";

export const FAQ = ({ items, title = ["Questions,", "answered."], light = false }) => {
  const [open, setOpen] = useState(0);
  const ld = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <section data-testid="faq-section" className={`${light ? "bg-[#f7f7f7] text-black" : "bg-white text-black"} border-t ${light ? "border-[#e5e5e5]" : "border-[#e5e5e5]"}`}>
      <Helmet><script type="application/ld+json">{JSON.stringify(ld)}</script></Helmet>
      <div className="container-x section-pad grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <Eyebrow light={light}>FAQ</Eyebrow>
          <AnimatedHeading lines={title} className="display-md mt-6" />
        </div>
        <div className="lg:col-span-8">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={`border-b ${light ? "border-[#d9d9d9]" : "border-[#e5e5e5]"}`}>
                <button type="button" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} aria-controls={`faq-${i}`} data-testid={`faq-toggle-${i}`} className="w-full flex items-start justify-between gap-6 py-6 text-left group">
                  <span className="font-display font-bold text-lg sm:text-xl tracking-tight group-hover:text-[#ff3131] transition-colors">{f.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="shrink-0 mt-1 text-[#ff3131]"><Plus size={20} /></motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div id={`faq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                      <p className={`pb-8 max-w-2xl leading-relaxed ${light ? "text-neutral-600" : "text-neutral-600"}`}>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
