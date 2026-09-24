import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TRIANGLES } from "@/components/common/LogoMark";
import { useReducedMotion } from "@/hooks/useAnimation";

export const PageTransition = () => {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  const first = useRef(true);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (reduced) return;
    setActive(true);
    const t = setTimeout(() => setActive(false), 520);
    return () => clearTimeout(t);
  }, [pathname, reduced]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div data-testid="page-transition" className="fixed inset-0 z-[90] pointer-events-none flex items-center justify-center" aria-hidden="true">
          <motion.div className="absolute inset-0 bg-black" initial={{ scaleY: 0, originY: 1 }} animate={{ scaleY: 1, originY: 1 }} exit={{ scaleY: 0, originY: 0 }} transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }} />
          <motion.svg viewBox="-20 -20 140 140" className="w-16 h-16 relative" initial={{ opacity: 0, rotate: -90, scale: 0.6 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, scale: 1.4 }} transition={{ duration: 0.3 }}>
            {TRIANGLES.map((p, i) => <polygon key={i} points={p} fill="#ff3131" />)}
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
