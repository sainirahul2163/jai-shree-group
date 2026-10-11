import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { PageHero } from "@/components/shared/PageHero";
import { DrawingQuoteForm } from "@/components/tools/DrawingQuoteForm";
import { contentMetadata } from "@/lib/seo";
import { siteProductDetails } from "@/sites/catalog";
import { getContent } from "@/sites/content";
import { siteForPage, type SiteParams } from "@/sites/params";

export async function generateMetadata({ params }: SiteParams): Promise<Metadata> {
  const site = await siteForPage(params, "/drawing-quote");
  const meta = getContent(site.key).meta.drawingQuote;
  return meta ? contentMetadata(meta, "/drawing-quote") : {};
}

export default async function DrawingQuotePage({ params }: SiteParams) {
  const site = await siteForPage(params, "/drawing-quote");
  const content = getContent(site.key).drawingQuote;
  if (!content) notFound();
  // Metals the site's own products are made in (its content overrides).
  const materials = [
    ...new Set(
      siteProductDetails(site)
        .flatMap((product) => product.materials)
        .filter((material) => material !== "All Metals")
    ),
  ];

  return (
    <>
      <BreadcrumbSchema
        site={site}
        items={[
          { name: "Home", path: "/" },
          { name: content.hero.title, path: "/drawing-quote" },
        ]}
      />
      <PageHero
        label={content.hero.label}
        title={content.hero.title}
        subtitle={content.hero.subtitle}
      />
      <section className="section-padding" style={{ backgroundColor: "var(--surface)" }}>
        <div className="mx-auto max-w-3xl">
          <DrawingQuoteForm content={content} materials={materials} />
        </div>
      </section>
    </>
  );
}
