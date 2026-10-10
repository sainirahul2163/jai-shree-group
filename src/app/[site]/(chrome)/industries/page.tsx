import type { Metadata } from "next";

import { IndustriesIndexPage } from "@/components/industries/IndustriesIndexPage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { contentMetadata } from "@/lib/seo";
import { siteIndustryCards } from "@/sites/catalog";
import { getContent } from "@/sites/content";
import { siteFromParams, type SiteParams } from "@/sites/params";

export async function generateMetadata({ params }: SiteParams): Promise<Metadata> {
  const site = await siteFromParams(params);
  return contentMetadata(getContent(site.key).meta.industries, "/industries");
}

export default async function IndustriesPage({ params }: SiteParams) {
  const site = await siteFromParams(params);

  return (
    <>
      <BreadcrumbSchema
        site={site}
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ]}
      />
      <IndustriesIndexPage
        hero={getContent(site.key).industriesIndex.hero}
        industries={siteIndustryCards(site)}
      />
    </>
  );
}
