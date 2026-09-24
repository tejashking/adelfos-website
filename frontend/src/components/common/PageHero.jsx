import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Eyebrow, AnimatedHeading, ScrollReveal } from "@/components/common/Motion";

export const PageHero = ({ eyebrow, lines, body, crumbs, children, light = false, accentIndex = -1, tag = "h1" }) => (
  <section className={`${light ? "bg-[#f7f7f7] text-black" : "bg-white"} pt-32 sm:pt-40 pb-16 sm:pb-24 relative overflow-hidden grain`}>
    <div className="container-x relative">
      {crumbs && <div className="mb-10"><Breadcrumbs items={crumbs} light={light} /></div>}
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <AnimatedHeading as={tag} lines={lines} className="display-xl mt-8 max-w-6xl" accentIndex={accentIndex} />
      {(body || children) && (
        <div className="grid lg:grid-cols-12 gap-8 mt-12">
          <ScrollReveal className="lg:col-span-6 lg:col-start-7">
            {body && <p className={`text-lg sm:text-xl leading-relaxed ${light ? "text-neutral-600" : "text-neutral-600"}`}>{body}</p>}
            {children}
          </ScrollReveal>
        </div>
      )}
    </div>
  </section>
);
