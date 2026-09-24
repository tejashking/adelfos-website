import { motion } from "framer-motion";
import { useTextReveal, useScrollReveal, useReducedMotion, textRevealVariants } from "@/hooks/useAnimation";

export const AnimatedHeading = ({ lines = [], as: Tag = "h2", className = "", lineClassName = "", delay = 0, stagger = 0.1, accentIndex = -1, ...rest }) => {
  const r = useTextReveal({ stagger, delay });
  return (
    <Tag className={className} {...rest}>
      <motion.span ref={r.ref} initial={r.initial} animate={r.animate} variants={r.variants} className="block">
        {lines.map((line, i) => (
          <span key={i} className="mask-line">
            <motion.span variants={r.line} className={`${lineClassName} ${i === accentIndex ? "text-[#ff3131]" : ""}`}>{line}</motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
};

export const ScrollReveal = ({ children, className = "", delay = 0, y = 32, as = "div", once = true, ...rest }) => {
  const reduced = useReducedMotion();
  const [ref, inView] = useScrollReveal({ once });
  const Comp = motion[as] || motion.div;
  return (
    <Comp ref={ref} className={className} initial={reduced ? false : { opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }} {...rest}>
      {children}
    </Comp>
  );
};

export const Stagger = ({ children, className = "", stagger = 0.08, delay = 0 }) => {
  const reduced = useReducedMotion();
  const [ref, inView] = useScrollReveal();
  return (
    <motion.div ref={ref} className={className} initial={reduced ? "visible" : "hidden"} animate={inView ? "visible" : "hidden"} variants={textRevealVariants.container(stagger, delay)}>
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = "", as = "div" }) => {
  const Comp = motion[as] || motion.div;
  return <Comp className={className} variants={textRevealVariants.fade}>{children}</Comp>;
};

export const Eyebrow = ({ children, className = "", light = false, ...rest }) => (
  <span className={`eyebrow inline-flex items-center gap-3 ${className}`} {...rest}>
    {children}
  </span>
);

export const DemoBadge = ({ className = "", label = "Demo data" }) => (
  <span className={`font-mono text-[10px] uppercase tracking-[0.2em] border border-[#ff3131]/60 text-[#ff3131] px-2 py-1 inline-block ${className}`} data-testid="demo-badge">{label}</span>
);

export const Marquee = ({ items = [], className = "", duration = 40, separator = "/" }) => (
  <div className={`overflow-hidden whitespace-nowrap ${className}`} aria-hidden="true">
    <div className="marquee-track" style={{ "--marquee-duration": `${duration}s` }}>
      {[0, 1].map((k) => (
        <div key={k} className="flex items-center">
          {items.map((it, i) => (
            <span key={i} className="flex items-center">
              <span className="px-6 sm:px-10">{it}</span>
              <span className="text-[#ff3131]">{separator}</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);
