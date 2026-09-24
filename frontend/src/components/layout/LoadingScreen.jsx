import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TRIANGLES } from "@/components/common/LogoMark";
import { useReducedMotion } from "@/hooks/useAnimation";

const KEY = "adelfos-loaded";

export const LoadingScreen = ({ onDone }) => {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(() => !sessionStorage.getItem(KEY));

  useEffect(() => {
    if (!show || reduced) { sessionStorage.setItem(KEY, "1"); setShow(false); onDone?.(); return; }
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => { sessionStorage.setItem(KEY, "1"); setShow(false); document.body.style.overflow = ""; onDone?.(); }, 1050);
    return () => { clearTimeout(t); document.body.style.overflow = ""; };
  }, [show, reduced, onDone]);

  const offsets = [[-120, -120], [120, -120], [-120, 120], [120, 120]];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          data-testid="loading-screen"
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          aria-label="Loading"
          role="status"
        >
          <svg viewBox="-20 -20 140 140" className="w-24 h-24 sm:w-32 sm:h-32">
            {TRIANGLES.map((pts, i) => (
              <motion.polygon
                key={i}
                points={pts}
                fill="#ff3131"
                initial={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
                animate={{ opacity: [0, 1, 1, 1], scale: [0.2, 1, 1, 1.4], x: [0, 0, 0, offsets[i][0]], y: [0, 0, 0, offsets[i][1]] }}
                transition={{ duration: 1.0, times: [0, 0.35, 0.6, 1], delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              />
            ))}
          </svg>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.9, times: [0, 0.5, 1] }} className="absolute bottom-10 font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-500">Adelfos Marketing</motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
