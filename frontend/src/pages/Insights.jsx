import { SEO, breadcrumbLd } from "@/components/layout/SEO";
import { PageHero } from "@/components/common/PageHero";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { CTASection } from "@/components/common/CTASection";
import { articles } from "@/data/blog";

const crumbs = [{ label: "Home", to: "/" }, { label: "Insights", to: "/insights" }];

export default function Insights() {
  const [first, ...rest] = articles;
  return (
    <>
      <SEO title="Insights | Digital Marketing Thinking for Calgary Businesses" description="Articles from Adelfos Marketing on digital advertising, local SEO, web conversion and real estate marketing for Calgary and Alberta businesses." path="/insights" jsonLd={[breadcrumbLd(crumbs)]} />
      <PageHero crumbs={crumbs} eyebrow="Insights" lines={["Thinking,", "published."]} body="Practical perspectives on how local businesses in Calgary can get found, be remembered and convert more of the attention they earn." />
      <section className="bg-white border-t border-[#e5e5e5]">
        <div className="container-x py-20 lg:py-28">
          <ArticleCard a={first} featured />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">{rest.map((a, i) => <ArticleCard key={a.slug} a={a} index={i} />)}</div>
        </div>
      </section>
      <CTASection lines={["Want this thinking", "applied to your business?"]} />
    </>
  );
}
