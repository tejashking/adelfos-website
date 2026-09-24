import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { method } from "@/data/site";
import { Eyebrow, AnimatedHeading } from "@/components/common/Motion";
import { TRIANGLES } from "@/components/common/LogoMark";

const Visual = ({ i }) => {
  const spread = [0, 14, 28, 6, 0][i];
  const rot = [0, 90, 180, 270, 360][i];
  const off = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
  return (
    <motion.svg viewBox="-40 -40 180 180" className="w-full h-full" aria-hidden="true" animate={{ rotate: rot }} transition={{ type: "spring", stiffness: 50, damping: 14 }}>
      {TRIANGLES.map((p, k) => (
        <motion.polygon key={k} points={p} animate={{ x: off[k][0] * spread, y: off[k][1] * spread, fill: k === i % 4 ? "#ff3131" : "#111111", opacity: i === 3 && k !== 3 ? 0.35 : 1 }} transition={{ type: "spring", stiffness: 60, damping: 16 }} />
      ))}
    </motion.svg>
  );
};

export const MethodSection = () => {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.4", "end 0.8"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(method.length - 1, Math.floor(v * method.length))));

  return (
    <section ref={ref} data-testid="adelfos-method-section" className="bg-white border-t border-[#e5e5e5]">
      <div className="container-x grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-5"><div className="lg:sticky lg:top-28 flex flex-col py-20 lg:py-0">
          <Eyebrow>How we work</Eyebrow>
          <AnimatedHeading lines={["The Adelfos method"]} className="display-md mt-4" />
          <p className="mt-4 text-neutral-600 max-w-sm">Five stages, one accountable team. Scroll to see how a project moves from discovery to optimization.</p>
          <div className="mt-10 lg:mt-14 w-36 h-36 sm:w-48 sm:h-48"><Visual i={active} /></div>
          <div className="mt-10 flex items-center gap-6" aria-hidden="true">
            <AnimatePresence mode="wait"><motion.span key={active} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.35 }} className="font-display font-extrabold text-6xl leading-none text-[#ff3131] tabular-nums">{method[active].n}</motion.span></AnimatePresence>
            <div className="flex-1 h-px bg-[#1f1f1f] relative"><motion.div className="absolute inset-y-0 left-0 bg-[#ff3131]" animate={{ width: `${((active + 1) / method.length) * 100}%` }} transition={{ duration: 0.5 }} /></div>
            <span className="font-mono text-xs text-neutral-500">0{method.length}</span>
          </div>
        </div></div>
        <ol className="lg:col-span-7 lg:py-[40vh] space-y-[16vh] lg:space-y-[36vh] pb-20">
          {method.map((m, i) => (
            <li key={m.n} data-testid={`method-step-${i}`} className={`transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-30"}`}>
              <span className="font-mono text-xs text-[#ff3131]">{m.n}</span>
              <h3 className="display-md mt-3">{m.title}</h3>
              <p className="mt-6 text-neutral-600 text-base sm:text-lg leading-relaxed max-w-lg">{m.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
