import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FlappyBirdGame } from "./FlappyBirdGame";
import { LogoAssemblyScene } from "./LogoAssemblyScene";

export const UnderConstructionOverlay = () => {
  const viewportRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [gameOpen, setGameOpen] = useState(false);

  return (
    <div
      ref={viewportRef}
      className="fixed inset-0 z-[9999] flex min-h-screen w-full flex-col overflow-x-hidden bg-[#08080a] px-5 font-sans text-white antialiased selection:bg-[#ff3131] selection:text-white sm:px-8"
      role="main"
      aria-label="Adelfos Under Construction"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]"
        aria-hidden="true"
      />

      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center py-4 text-center sm:py-6">
        <div className={`flex w-full flex-col items-center ${gameOpen ? "invisible pointer-events-none" : ""}`} aria-hidden={gameOpen}>
          <LogoAssemblyScene boundsRef={viewportRef} onGameTrigger={() => setGameOpen(true)} />

          <motion.div
            className="mx-auto mt-2 max-w-2xl space-y-3"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              We’re building something <span className="text-[#ff3131]">worth the wait.</span>
            </h1>

            <p className="mx-auto max-w-xl text-sm leading-relaxed text-[#a1a1aa] sm:text-base">
              Our new digital experience is under construction.
            </p>

            <div className="flex items-center justify-center gap-3 pt-1">
              <a
                href="mailto:adelfosmarketing@gmail.com"
                aria-label="Email Adelfos"
                title="Email Adelfos"
                className="inline-flex h-11 items-center justify-center rounded-full border border-[#ff3131] bg-[#ff3131] px-4 text-sm font-medium text-white transition hover:bg-[#ff1f1f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Email
              </a>
              <a
                href="https://wa.me/13062506732"
                target="_blank"
                rel="noreferrer"
                aria-label="Message Adelfos on WhatsApp"
                title="WhatsApp"
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/20 bg-white/5 px-4 text-sm font-medium text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>

        <AnimatePresence initial={false}>
          {gameOpen && (
            <motion.div
              key="flappy-game"
              className="absolute inset-0 z-20 flex items-center justify-center bg-[#08080a] px-2"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -8 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.38, ease: [0.2, 0.9, 0.2, 1] }}
            >
              <FlappyBirdGame onExit={() => setGameOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-center py-3 text-[10px] font-mono text-[#71717a]">
        © {new Date().getFullYear()} Adelfos Marketing
      </footer>
    </div>
  );
};
