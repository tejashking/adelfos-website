import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { nav, site } from "@/data/site";
import { Button } from "@/components/common/Button";
import { MobileMenu } from "./MobileMenu";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <a href="#main" className="sr-only sr-only-focusable font-mono text-xs uppercase tracking-widest">Skip to content</a>
      <motion.header
        data-testid="navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-[60] transition-[background-color,border-color,box-shadow] duration-500 ${scrolled || open ? "bg-white/90 backdrop-blur-md border-b border-[#e5e5e5] shadow-[0_10px_30px_-20px_rgba(0,0,0,0.25)]" : "bg-white/0 border-b border-transparent"}`}
      >
        <nav className={`container-x flex items-center justify-between transition-[padding] duration-500 ${scrolled ? "py-3" : "py-5"}`} aria-label="Primary">
          <Link to="/" className="flex items-center gap-3 group" data-testid="nav-logo" aria-label="Adelfos Marketing home">
            <img src="/images/brand/logo-mark-transparent.png" alt="" width="36" height="36" className="w-8 h-8 sm:w-9 sm:h-9 transition-transform duration-500 group-hover:rotate-90" />
            <span className="font-display font-extrabold tracking-tight text-base sm:text-lg leading-none text-[#111]">Adelfos <span className="font-semibold text-neutral-500">Marketing</span></span>
          </Link>
          <ul className="hidden lg:flex items-center gap-9">
            {nav.map((n) => (
              <li key={n.to}>
                <NavLink to={n.to} data-testid={`nav-link-${n.label.toLowerCase()}`} className={({ isActive }) => `link-underline text-sm font-semibold transition-colors ${isActive ? "text-[#ff3131]" : "text-neutral-700 hover:text-black"}`}>{n.label}</NavLink>
              </li>
            ))}
            <li><NavLink to="/contact" data-testid="nav-link-contact" className={({ isActive }) => `link-underline text-sm font-semibold transition-colors ${isActive ? "text-[#ff3131]" : "text-neutral-700 hover:text-black"}`}>Contact</NavLink></li>
          </ul>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block"><Button to="/contact" className="!py-2.5 !px-5" data-testid="nav-cta" track="nav-cta">{site.ctaPrimary}</Button></div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              data-testid="mobile-menu-toggle"
              className={`lg:hidden relative w-11 h-11 flex flex-col items-center justify-center gap-[6px] border rounded-md ${open ? "border-white/30" : "border-[#d9d9d9]"}`}
            >
              <motion.span animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} className={`block w-5 h-[2px] origin-center ${open ? "bg-white" : "bg-[#111]"}`} />
              <motion.span animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} className={`block w-5 h-[2px] origin-center ${open ? "bg-white" : "bg-[#111]"}`} />
            </button>
          </div>
        </nav>
      </motion.header>
      <AnimatePresence>{open && <MobileMenu onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
};
