import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useMagneticHover } from "@/hooks/useAnimation";
import { trackEvent } from "@/lib/analytics";

const VARIANTS = {
  primary: "btn btn-primary",
  dark: "btn btn-dark",
  outline: "btn btn-outline",
  outlineDark: "btn btn-outline-dark",
  accent: "btn btn-accent",
};

export const Button = ({ to, href, children, variant = "primary", className = "", icon = "right", onClick, track, magnetic = true, ...rest }) => {
  const { ref, x, y, onMove, onLeave } = useMagneticHover(magnetic ? 0.18 : 0);
  const Icon = icon === "external" ? ArrowUpRight : ArrowRight;
  const handleClick = (e) => {
    if (track) trackEvent("cta_click", { label: typeof children === "string" ? children : track, destination: to || href });
    onClick?.(e);
  };
  const content = (
    <>
      <span>{children}</span>
      {icon && <Icon className="arrow" size={16} strokeWidth={2} aria-hidden="true" />}
    </>
  );
  const cls = `${VARIANTS[variant]} ${className}`;
  const motionProps = { ref, style: { x, y }, onMouseMove: onMove, onMouseLeave: onLeave, "data-cursor": "cta", onClick: handleClick, ...rest };
  if (to) return <motion.span {...motionProps} className="inline-flex"><Link to={to} className={cls}>{content}</Link></motion.span>;
  if (href) return <motion.a {...motionProps} href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>{content}</motion.a>;
  return <motion.button type="button" {...motionProps} className={cls}>{content}</motion.button>;
};
