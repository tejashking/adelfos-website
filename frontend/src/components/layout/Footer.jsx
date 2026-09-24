import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { nav, site } from "@/data/site";
import { services } from "@/data/services";
import { LogoMark } from "@/components/common/LogoMark";
import { useScrollReveal, useReducedMotion } from "@/hooks/useAnimation";
import { trackEvent } from "@/lib/analytics";

export const Footer = () => {
  const [ref, inView] = useScrollReveal({ margin: "0px 0px -20% 0px" });
  const reduced = useReducedMotion();
  return (
    <footer data-testid="footer" className="relative bg-black text-white border-t border-[#1f1f1f] overflow-hidden" ref={ref}>
      <div className="container-x pt-20 lg:pt-28 pb-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-5">
            <img src="/images/brand/wordmark-white.png" alt="Adelfos Marketing — Beyond boundaries, beyond expectation" width="260" height="86" className="w-56 sm:w-64 h-auto" loading="lazy" />
            <p className="display-md mt-10 max-w-md">We build digital empires<br />for local business.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href={`mailto:${site.email}`} onClick={() => trackEvent("email_click")} data-testid="footer-email" className="link-underline font-mono text-xs uppercase tracking-[0.2em] text-neutral-300 hover:text-white">{site.email}</a>
              <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("whatsapp_click")} data-testid="footer-whatsapp" className="link-underline font-mono text-xs uppercase tracking-[0.2em] text-neutral-300 hover:text-white">WhatsApp {site.whatsappDisplay}</a>
            </div>
          </div>
          <div className="lg:col-span-2 lg:col-start-7">
            <h3 className="eyebrow mb-6">Navigate</h3>
            <ul className="space-y-3">
              {[{ label: "Home", to: "/" }, ...nav, { label: "Contact", to: "/contact" }].map((n) => (
                <li key={n.to}><Link to={n.to} className="link-underline text-sm text-neutral-300 hover:text-white" data-testid={`footer-nav-${n.label.toLowerCase()}`}>{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h3 className="eyebrow mb-6">Services</h3>
            <ul className="space-y-3 columns-1">
              {services.map((s) => (
                <li key={s.slug}><Link to={`/services/${s.slug}`} className="link-underline text-sm text-neutral-300 hover:text-white">{s.title}</Link></li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h3 className="eyebrow mb-6">Contact</h3>
            <address className="not-italic text-sm text-neutral-300 space-y-3">
              <p>Calgary, Alberta<br />Canada</p>
              <p>Hours: {site.hours}</p>
              {site.social.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 link-underline hover:text-white" data-testid="footer-social-facebook">{s.label} <ArrowUpRight size={14} /></a>
              ))}
            </address>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-[#1f1f1f] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
          <p>© {new Date().getFullYear()} Adelfos Marketing. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
      <motion.div
        className="absolute -bottom-24 -right-20 lg:right-10 pointer-events-none"
        initial={reduced ? false : { opacity: 0, rotate: -20, scale: 0.8 }}
        animate={inView ? { opacity: 0.08, rotate: 0, scale: 1 } : undefined}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        <LogoMark size={360} color="#ff3131" />
      </motion.div>
    </footer>
  );
};
