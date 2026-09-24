import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { articles } from "@/data/blog";
import { ScrollReveal } from "@/components/common/Motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/common/Button";

const fmt = (d) => new Date(d).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" });

export const ArticleCard = ({ a, index = 0, featured = false }) => (
  <ScrollReveal delay={index * 0.08}>
    <Link to={`/insights/${a.slug}`} data-cursor="read" data-testid={`article-card-${a.slug}`} className={`group block h-full border-t border-[#e5e5e5] pt-6 ${featured ? "lg:grid lg:grid-cols-2 lg:gap-10" : ""}`}>
      <div className="aspect-[16/10] overflow-hidden bg-[#f3f3f3]">
        <img src={a.heroImage} alt={a.title} loading="lazy" className="w-full h-full object-cover img-editorial group-hover:scale-[1.05]" />
      </div>
      <div className={featured ? "mt-6 lg:mt-0 flex flex-col justify-between" : "mt-6"}>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500 flex gap-4"><span className="text-[#ff3131]">{a.category}</span><time dateTime={a.date}>{fmt(a.date)}</time><span>{a.readTime}</span></p>
        <h3 className={`font-display font-bold tracking-tight mt-4 group-hover:text-[#ff3131] transition-colors ${featured ? "text-2xl sm:text-3xl lg:text-4xl" : "text-xl sm:text-2xl"}`}>{a.title}</h3>
        <p className="mt-3 text-neutral-600 text-sm leading-relaxed">{a.excerpt}</p>
        <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em]">Read article <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></span>
      </div>
    </Link>
  </ScrollReveal>
);

export const InsightsPreview = () => (
  <section data-testid="insights-section" className="bg-white border-t border-[#e5e5e5]">
    <div className="container-x section-pad">
      <SectionHeader eyebrow="Insights" title={["Thinking, published"]} body="Practical perspectives on how Calgary businesses get found, get remembered and convert more of the attention they earn." />
      <div className="grid md:grid-cols-3 gap-8 mt-14">{articles.slice(0, 3).map((a, i) => <ArticleCard key={a.slug} a={a} index={i} />)}</div>
      <div className="mt-14 flex justify-center"><Button to="/insights" variant="outline" data-testid="insights-all">All insights</Button></div>
    </div>
  </section>
);
