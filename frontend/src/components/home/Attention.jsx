import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useAnimation";
import { Eyebrow } from "@/components/common/Motion";

const Word = ({ word, progress, range, red }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [14, 0]);
  return <motion.span style={{ opacity, y }} className={`inline-block mr-[0.25em] ${red ? "text-[#ff3131]" : ""}`}>{word}</motion.span>;
};

export const Attention = () => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.55"] });
  const words = "Your business deserves more than being found.".split(" ");

  return (
    <section ref={ref} data-testid="attention-statement" className="bg-[#f7f7f7] text-[#111]">
      <div className="container-x py-24 lg:py-32 text-center">
        <Eyebrow>Our belief</Eyebrow>
        <p className="display-lg mt-5 max-w-4xl mx-auto" aria-label="Your business deserves more than being found.">
          {words.map((w, i) => {
            const start = (i / words.length) * 0.6;
            return <Word key={i} word={w} progress={scrollYProgress} range={[start, Math.min(1, start + 0.2)]} red={w === "found."} />;
          })}
        </p>
        <motion.p initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-15%" }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="display-md mt-4 text-neutral-500">
          It deserves to be <span className="text-[#111]">remembered.</span>
        </motion.p>
        <motion.p initial={reduced ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-15%" }} transition={{ duration: 1, delay: 0.3 }} className="mt-8 max-w-2xl mx-auto text-neutral-600 text-base sm:text-lg leading-relaxed">
          Visibility gets you into the conversation. A brand people remember and a website that converts is what closes it. We build both, and the campaigns that feed them.
        </motion.p>
      </div>
    </section>
  );
};
