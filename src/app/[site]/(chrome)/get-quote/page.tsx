import type { Metadata } from "next";

import { GetQuotePage } from "@/components/quote/GetQuotePage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { contentMetadata } from "@/lib/seo";
import { getContent } from "@/sites/content";
import { siteForPage, type SiteParams } from "@/sites/params";

export async function generateMetadata({ params }: SiteParams): Promise<Metadata> {
  const site = await siteForPage(params, "/get-quote");
  return contentMetadata(getContent(site.key).meta.getQuote, "/get-quote");
}

export default async function GetQuote({ params }: SiteParams) {
  const site = await siteForPage(params, "/get-quote");

  return (
    <>
      <BreadcrumbSchema
        site={site}
        items={[
          { name: "Home", path: "/" },
          { name: "Get Quote", path: "/get-quote" },
        ]}
      />
      <GetQuotePage content={getContent(site.key).quote} />
    </>
  );
}
