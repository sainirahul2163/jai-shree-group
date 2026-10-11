import type { Metadata } from "next";

import { CertificationsPage } from "@/components/certifications/CertificationsPage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { contentMetadata } from "@/lib/seo";
import { getContent } from "@/sites/content";
import { siteForPage, type SiteParams } from "@/sites/params";

export async function generateMetadata({ params }: SiteParams): Promise<Metadata> {
  const site = await siteForPage(params, "/certifications");
  return contentMetadata(getContent(site.key).meta.certifications!, "/certifications");
}

export default async function Certifications({ params }: SiteParams) {
  const site = await siteForPage(params, "/certifications");

  return (
    <>
      <BreadcrumbSchema
        site={site}
        items={[
          { name: "Home", path: "/" },
          { name: "Certifications", path: "/certifications" },
        ]}
      />
      <CertificationsPage />
    </>
  );
}
