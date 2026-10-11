import type { Metadata } from "next";

import { PrivacyPolicy } from "@/components/legal/PrivacyPolicy";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { pageMetadata, siteHost } from "@/lib/seo";
import { siteFromParams, type SiteParams } from "@/sites/params";

export async function generateMetadata({
  params,
}: SiteParams): Promise<Metadata> {
  const site = await siteFromParams(params);
  return pageMetadata(site, {
    path: "/privacy",
    title: `Privacy Policy | ${site.name}`,
    description: `How ${site.name} collects, uses and protects the personal data you share through ${siteHost(site)}, and your rights under India's Digital Personal Data Protection Act 2023.`,
  });
}

export default async function Privacy({ params }: SiteParams) {
  const site = await siteFromParams(params);

  return (
    <>
      <BreadcrumbSchema
        site={site}
        items={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ]}
      />
      <PrivacyPolicy site={site} />
    </>
  );
}
