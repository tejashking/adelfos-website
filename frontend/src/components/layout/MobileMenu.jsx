import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { nav, site } from "@/data/site";
import { LogoMark } from "@/components/common/LogoMark";

const ease = [0.76, 0, 0.24, 1];

export const MobileMenu = ({ onClose }) => {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      id="mobile-menu"
      data-testid="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-[55] bg-black text-white flex flex-col pt-28 pb-10 px-6 sm:px-8 overflow-y-auto"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.6, ease }}
    >
      <LogoMark size={280} color="#ff3131" className="absolute -right-16 -bottom-16 opacity-[0.07] pointer-events-none" />
      <ul className="flex flex-col gap-2 relative">
        {[{ label: "Home", to: "/" }, ...nav, { label: "Contact", to: "/contact" }].map((n, i) => (
          <motion.li key={n.to} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <Link to={n.to} onClick={onClose} data-testid={`mobile-nav-${n.label.toLowerCase()}`} className="group flex items-baseline gap-4 py-2 border-b border-[#1f1f1f]">
              <span className="font-mono text-xs text-[#ff3131]">0{i + 1}</span>
              <span className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight group-hover:text-[#ff3131] transition-colors">{n.label}</span>
            </Link>
          </motion.li>
        ))}
      </ul>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-auto pt-10 flex flex-col gap-6">
        <Link to="/contact" onClick={onClose} className="btn btn-primary w-full" data-testid="mobile-menu-cta"><span>{site.ctaPrimary}</span><span aria-hidden="true">→</span></Link>
        <div className="flex flex-col gap-1 font-mono text-xs text-neutral-500 uppercase tracking-widest">
          <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>
          <a href={site.whatsappUrl} className="hover:text-white">WhatsApp {site.whatsappDisplay}</a>
          <span>Calgary, Alberta, Canada</span>
        </div>
      </motion.div>
    </motion.div>
  );
};
