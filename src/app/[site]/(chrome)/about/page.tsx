import type { Metadata } from "next";

import { AboutPage } from "@/components/about/AboutPage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { contentMetadata } from "@/lib/seo";
import { getContent } from "@/sites/content";
import { siteForPage, type SiteParams } from "@/sites/params";

export async function generateMetadata({ params }: SiteParams): Promise<Metadata> {
  const site = await siteForPage(params, "/about");
  return contentMetadata(getContent(site.key).meta.about, "/about");
}

export default async function About({ params }: SiteParams) {
  const site = await siteForPage(params, "/about");

  return (
    <>
      <BreadcrumbSchema
        site={site}
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <AboutPage
        content={getContent(site.key).about}
        banner={getContent(site.key).ctaBanner}
      />
    </>
  );
}
