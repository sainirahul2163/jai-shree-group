import type { Metadata } from "next";

import { TermsOfUse } from "@/components/legal/TermsOfUse";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { pageMetadata, siteHost } from "@/lib/seo";
import { siteForPage, type SiteParams } from "@/sites/params";

export async function generateMetadata({
  params,
}: SiteParams): Promise<Metadata> {
  const site = await siteForPage(params, "/terms");
  return pageMetadata(site, {
    path: "/terms",
    title: `Terms of Use | ${site.name}`,
    description: `The terms for using ${siteHost(site)}, the website of ${site.name}: website information, quotations, intellectual property, liability and governing law.`,
  });
}

export default async function Terms({ params }: SiteParams) {
  const site = await siteForPage(params, "/terms");

  return (
    <>
      <BreadcrumbSchema
        site={site}
        items={[
          { name: "Home", path: "/" },
          { name: "Terms of Use", path: "/terms" },
        ]}
      />
      <TermsOfUse site={site} />
    </>
  );
}
