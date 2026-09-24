import { useEffect, useRef, useState, useCallback } from "react";
import { useInView, useMotionValue, useSpring, useScroll, useTransform, useReducedMotion as useFmReducedMotion } from "framer-motion";

export const useReducedMotion = () => !!useFmReducedMotion();

export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px", ...options });
  return [ref, inView];
}

export function useMagneticHover(strength = 0.25) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });
  const reduced = useReducedMotion();
  const onMove = useCallback((e) => {
    if (reduced || !ref.current || !window.matchMedia("(pointer: fine)").matches) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }, [reduced, strength, x, y]);
  const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);
  return { ref, x: sx, y: sy, onMove, onLeave };
}

export function useParallax(distance = 80, offset = ["start end", "end start"]) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [distance, -distance]);
  return { ref, y, progress: scrollYProgress };
}

export function useCounterAnimation(target, { duration = 1600, start = true } = {}) {
  const [value, setValue] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!start) return;
    if (reduced || target === 0) { setValue(target); return; }
    let raf; const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start, reduced]);
  return value;
}

export const textRevealVariants = {
  container: (stagger = 0.08, delay = 0) => ({ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }),
  line: { hidden: { y: "110%", rotate: 2 }, visible: { y: "0%", rotate: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } },
  word: { hidden: { y: "100%", opacity: 0 }, visible: { y: "0%", opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } },
  fade: { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } },
};

export function useTextReveal({ stagger = 0.08, delay = 0 } = {}) {
  const reduced = useReducedMotion();
  const [ref, inView] = useScrollReveal();
  return {
    ref,
    animate: inView ? "visible" : "hidden",
    initial: reduced ? "visible" : "hidden",
    variants: textRevealVariants.container(stagger, delay),
    line: reduced ? { hidden: {}, visible: {} } : textRevealVariants.line,
    fade: reduced ? { hidden: {}, visible: {} } : textRevealVariants.fade,
  };
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const fn = (e) => setMatches(e.matches);
    mq.addEventListener("change", fn);
    setMatches(mq.matches);
    return () => mq.removeEventListener("change", fn);
  }, [query]);
  return matches;
}
