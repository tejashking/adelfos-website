import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SEO } from "@/components/layout/SEO";
import { Button } from "@/components/common/Button";
import { TRIANGLES } from "@/components/common/LogoMark";
import { useReducedMotion } from "@/hooks/useAnimation";

export default function NotFound() {
  const reduced = useReducedMotion();
  return (
    <section data-testid="not-found-page" className="min-h-[100svh] bg-white flex items-end relative overflow-hidden grain">
      <SEO title="Page Not Found" description="The page you were looking for went off the map." path="/404" noindex />
      <svg viewBox="-20 -20 140 140" className="absolute right-[-10%] top-[10%] w-[70vw] max-w-[700px] opacity-20" aria-hidden="true">
        {TRIANGLES.map((p, i) => (
          <motion.polygon key={i} points={p} fill="#ff3131" animate={reduced ? {} : { x: [0, (i % 2 ? 1 : -1) * 18, 0], y: [0, (i < 2 ? -1 : 1) * 18, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }} />
        ))}
      </svg>
      <div className="container-x pb-20 pt-40 relative">
        <p className="eyebrow">404</p>
        <h1 className="display-xl mt-6">Looks like this page<br />went <span className="text-[#ff3131]">off the map.</span></h1>
        <p className="mt-8 text-neutral-600 max-w-md text-lg">The address may have changed or never existed. Everything that does exist is one click away.</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button to="/" data-testid="not-found-home">Back home</Button>
          <Button to="/services" variant="outline" data-testid="not-found-services">View services</Button>
        </div>
        <p className="mt-10 font-mono text-xs text-neutral-500">Or <Link to="/contact" className="link-underline text-white">talk to us</Link> directly.</p>
      </div>
    </section>
  );
}
