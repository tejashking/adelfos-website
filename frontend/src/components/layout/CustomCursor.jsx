import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery, useReducedMotion } from "@/hooks/useAnimation";

const LABELS = { view: "View", cta: "", "3d": "Explore", read: "Read", drag: "Drag" };

export const CustomCursor = () => {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useReducedMotion();
  const [state, setState] = useState("default");
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });

  useEffect(() => {
    if (!fine || reduced) { document.body.classList.remove("has-custom-cursor"); return; }
    document.body.classList.add("has-custom-cursor");
    const move = (e) => {
      x.set(e.clientX); y.set(e.clientY); setVisible(true);
      const el = e.target.closest?.("[data-cursor]");
      const interactive = e.target.closest?.("a,button,[role=button],input,textarea,select,label");
      setState(el ? el.dataset.cursor : interactive ? "cta" : "default");
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => { window.removeEventListener("mousemove", move); document.documentElement.removeEventListener("mouseleave", leave); document.body.classList.remove("has-custom-cursor"); };
  }, [fine, reduced, x, y]);

  if (!fine || reduced) return null;
  const big = ["view", "3d", "read", "drag"].includes(state);
  const size = big ? 88 : state === "cta" ? 18 : 12;
  return (
    <motion.div
      data-testid="custom-cursor"
      aria-hidden="true"
      className="fixed top-0 left-0 z-[200] pointer-events-none flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.2em]"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}
    >
      <motion.div
        animate={{ width: size, height: size, backgroundColor: big ? "#ff3131" : state === "cta" ? "rgba(255,49,49,0)" : "#ff3131", borderColor: state === "cta" ? "#ff3131" : "rgba(255,49,49,0)" }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="rounded-full border flex items-center justify-center text-white mix-blend-normal"
      >
        {big && <span>{LABELS[state]}</span>}
      </motion.div>
    </motion.div>
  );
};
