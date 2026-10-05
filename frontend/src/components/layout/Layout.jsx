import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ReactLenis, useLenis } from "lenis/react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CustomCursor } from "./CustomCursor";
import { PageTransition } from "./PageTransition";
import { useReducedMotion } from "@/hooks/useAnimation";
import { trackPageView } from "@/lib/analytics";

const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) { lenis ? lenis.scrollTo(el, { offset: -80 }) : el.scrollIntoView(); return; }
    }
    lenis ? lenis.scrollTo(0, { immediate: true, force: true }) : window.scrollTo(0, 0);
    trackPageView(pathname);
  }, [pathname, hash, lenis]);
  return null;
};

export const Layout = () => {
  const reduced = useReducedMotion();
  const { pathname } = useLocation();

  const content = (
    <>
      <ScrollManager />
      <CustomCursor />
      <PageTransition />
      <Navbar />
      <main id="main" key={pathname} className="animate-in fade-in duration-700">
        <Outlet />
      </main>
      <Footer />
    </>
  );
  if (reduced) return content;
  return <ReactLenis root options={{ lerp: 0.08, duration: 0.9, smoothWheel: true, wheelMultiplier: 0.9, touchMultiplier: 1.15 }}>{content}</ReactLenis>;
};
