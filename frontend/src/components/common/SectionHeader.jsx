import { Eyebrow, AnimatedHeading, ScrollReveal } from "./Motion";

export const SectionHeader = ({ eyebrow, title, body, align = "center", as = "h2", light = false }) => {
  const center = align === "center";
  return (
    <div className={`${center ? "text-center mx-auto max-w-3xl flex flex-col items-center" : "max-w-3xl"}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <AnimatedHeading as={as} lines={title} className={`display-lg mt-4 ${light ? "text-white" : "text-[#111]"}`} />
      {body && <ScrollReveal delay={0.15}><p className={`mt-5 text-base sm:text-lg leading-relaxed ${light ? "text-neutral-300" : "text-neutral-600"}`}>{body}</p></ScrollReveal>}
    </div>
  );
};
