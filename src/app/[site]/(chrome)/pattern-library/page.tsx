import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { PageHero } from "@/components/shared/PageHero";
import { PatternLibrary } from "@/components/tools/PatternLibrary";
import { contentMetadata } from "@/lib/seo";
import { getContent } from "@/sites/content";
import { siteForPage, type SiteParams } from "@/sites/params";

export async function generateMetadata({ params }: SiteParams): Promise<Metadata> {
  const site = await siteForPage(params, "/pattern-library");
  const meta = getContent(site.key).meta.patternLibrary;
  return meta ? contentMetadata(meta, "/pattern-library") : {};
}

export default async function PatternLibraryPage({ params }: SiteParams) {
  const site = await siteForPage(params, "/pattern-library");
  const content = getContent(site.key).patternLibrary;
  if (!content) notFound();

  return (
    <>
      <BreadcrumbSchema
        site={site}
        items={[
          { name: "Home", path: "/" },
          { name: content.hero.title, path: "/pattern-library" },
        ]}
      />
      <PageHero
        label={content.hero.label}
        title={content.hero.title}
        subtitle={content.hero.subtitle}
      />
      <PatternLibrary content={content} />
    </>
  );
}
