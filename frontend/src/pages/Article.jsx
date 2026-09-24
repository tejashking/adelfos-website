import { Link, useParams, Navigate } from "react-router-dom";
import { SEO, breadcrumbLd } from "@/components/layout/SEO";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ScrollReveal, Eyebrow, AnimatedHeading } from "@/components/common/Motion";
import { CTASection } from "@/components/common/CTASection";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { CaseStudyCard } from "@/components/work/CaseStudyCard";
import { getArticle, articles } from "@/data/blog";
import { getServices } from "@/data/services";
import { getCaseStudies } from "@/data/caseStudies";
import { site } from "@/data/site";

export default function Article() {
  const { slug } = useParams();
  const a = getArticle(slug);
  if (!a) return <Navigate to="/404" replace />;
  const crumbs = [{ label: "Home", to: "/" }, { label: "Insights", to: "/insights" }, { label: a.title, to: `/insights/${a.slug}` }];
  const ld = { "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.excerpt, image: a.heroImage, datePublished: a.date, author: { "@type": "Organization", name: a.author }, publisher: { "@id": `${site.url}/#organization` }, mainEntityOfPage: `${site.url}/insights/${a.slug}` };
  const related = getServices(a.relatedServices);
  const cases = getCaseStudies(a.relatedCaseStudies);
  const more = articles.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <article>
      <SEO title={a.title} description={a.excerpt} path={`/insights/${a.slug}`} image={a.heroImage} type="article" jsonLd={[ld, breadcrumbLd(crumbs)]} />
      <header className="bg-white pt-32 sm:pt-40 pb-16">
        <div className="container-x">
          <Breadcrumbs items={crumbs.slice(0, 2)} />
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500 flex gap-4"><span className="text-[#ff3131]">{a.category}</span><time dateTime={a.date}>{new Date(a.date).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}</time><span>{a.readTime}</span></p>
          <AnimatedHeading as="h1" lines={[a.title]} className="font-display font-extrabold tracking-tight leading-[0.95] text-3xl sm:text-5xl lg:text-6xl mt-6 max-w-5xl" data-testid="article-title" />
          <p className="mt-8 text-lg sm:text-xl text-neutral-600 max-w-2xl leading-relaxed">{a.excerpt}</p>
        </div>
      </header>
      <ScrollReveal className="container-x"><div className="aspect-[21/9] overflow-hidden"><img src={a.heroImage} alt={a.title} className="w-full h-full object-cover" /></div></ScrollReveal>
      <div className="container-x grid lg:grid-cols-12 gap-12 py-20 lg:py-28">
        <aside className="lg:col-span-3 lg:sticky lg:top-32 self-start space-y-8">
          <div><p className="eyebrow mb-3">Written by</p><p className="text-sm">{a.author}</p></div>
          <div><p className="eyebrow mb-3">Related services</p><ul className="space-y-2">{related.map((s) => <li key={s.slug}><Link to={`/services/${s.slug}`} className="link-underline text-sm text-neutral-700 hover:text-black">{s.title}</Link></li>)}</ul></div>
        </aside>
        <div className="lg:col-span-7 lg:col-start-5 space-y-12">
          {a.content.map((blk, i) => (
            <ScrollReveal key={i} as="section">
              <h2 className="font-display font-bold tracking-tight text-2xl sm:text-3xl">{blk.h2}</h2>
              {blk.p.map((p, k) => <p key={k} className="mt-5 text-neutral-700 text-base sm:text-lg leading-relaxed">{p}</p>)}
            </ScrollReveal>
          ))}
          <div className="border-t border-[#e5e5e5] pt-8 flex flex-wrap gap-3">
            {related.map((s) => <Link key={s.slug} to={`/services/${s.slug}`} className="font-mono text-[11px] uppercase tracking-[0.2em] border border-[#d9d9d9] px-3 py-2 hover:border-[#ff3131] hover:text-[#ff3131] transition-colors">{s.title}</Link>)}
          </div>
        </div>
      </div>
      {cases.length > 0 && (
        <section className="bg-white border-t border-[#e5e5e5]"><div className="container-x py-20"><Eyebrow>Related work</Eyebrow><div className="grid md:grid-cols-2 gap-10 mt-10">{cases.map((c, i) => <CaseStudyCard key={c.slug} c={c} index={i} />)}</div></div></section>
      )}
      <section className="bg-white border-t border-[#e5e5e5]"><div className="container-x py-20"><Eyebrow>Keep reading</Eyebrow><div className="grid md:grid-cols-3 gap-8 mt-10">{more.map((x, i) => <ArticleCard key={x.slug} a={x} index={i} />)}</div></div></section>
      <CTASection />
    </article>
  );
}
