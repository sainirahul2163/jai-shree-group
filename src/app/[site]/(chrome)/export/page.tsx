import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ExportPage } from "@/components/export/ExportPage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { contentMetadata } from "@/lib/seo";
import { getContent } from "@/sites/content";
import { siteForPage, type SiteParams } from "@/sites/params";

// Reached only on sites with "/export" in `config.pages` (the proxy 404s the rest).
export async function generateMetadata({ params }: SiteParams): Promise<Metadata> {
  const site = await siteForPage(params, "/export");
  const meta = getContent(site.key).meta.export;
  return meta ? contentMetadata(meta, "/export") : {};
}

export default async function Export({ params }: SiteParams) {
  const site = await siteForPage(params, "/export");
  const content = getContent(site.key);
  if (!content.export) notFound();

  return (
    <>
      <BreadcrumbSchema
        site={site}
        items={[
          { name: "Home", path: "/" },
          { name: "Export", path: "/export" },
        ]}
      />
      <ExportPage content={content.export} banner={content.ctaBanner} />
    </>
  );
}
