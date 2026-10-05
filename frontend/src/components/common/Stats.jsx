import { stats } from "@/data/site";
import { useScrollReveal } from "@/hooks/useAnimation";
import { Eyebrow, DemoBadge, ScrollReveal } from "./Motion";
import { VerticalOdometer } from "./VerticalOdometer";

const Stat = ({ s, start, i }) => {
  return (
    <ScrollReveal delay={i * 0.08} className="min-w-0 border-l-2 border-[#ff3131] pl-4 sm:pl-8 py-3 sm:py-4" data-testid={`stat-${i}`}>
      <p className="relative w-fit max-w-full overflow-hidden font-display font-bold text-4xl sm:text-6xl lg:text-7xl leading-none tabular-nums">
        <VerticalOdometer value={s.value} prefix={s.prefix} suffix={s.suffix} start={start} />
      </p>
      <p className="mt-4 max-w-[12rem] font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-neutral-600">{s.label}</p>
    </ScrollReveal>
  );
};

export const Stats = () => {
  const [ref, inView] = useScrollReveal();
  return (
    <section ref={ref} data-testid="metrics-section" className="bg-white border-t border-[#e5e5e5]">
      <div className="container-x section-pad">
        <div className="flex flex-col items-center text-center gap-4 mb-14">
          <Eyebrow>By the numbers</Eyebrow>
          <h2 className="display-lg text-[#111]">Results you can measure</h2>
          <DemoBadge label="Demo data — real metrics pending" />
          <div className={`metrics-loading-rail ${inView ? "is-active" : ""}`} aria-hidden="true">
            <span />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-8 lg:grid-cols-4 lg:gap-4">
          {stats.map((s, i) => <Stat key={s.label} s={s} start={inView} i={i} />)}
        </div>
      </div>
    </section>
  );
};
