import type { Metadata } from "next";

import { GroupPage } from "@/components/group/GroupPage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { contentMetadata } from "@/lib/seo";
import { getContent } from "@/sites/content";
import { siteForPage, type SiteParams } from "@/sites/params";

export async function generateMetadata({ params }: SiteParams): Promise<Metadata> {
  const site = await siteForPage(params, "/group");
  return contentMetadata(getContent(site.key).meta.group!, "/group");
}

export default async function Group({ params }: SiteParams) {
  const site = await siteForPage(params, "/group");

  return (
    <>
      <BreadcrumbSchema
        site={site}
        items={[
          { name: "Home", path: "/" },
          { name: "Our Group", path: "/group" },
        ]}
      />
      <GroupPage />
    </>
  );
}
