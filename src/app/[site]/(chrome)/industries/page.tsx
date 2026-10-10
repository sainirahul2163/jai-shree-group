import type { Metadata } from "next";

import { IndustriesIndexPage } from "@/components/industries/IndustriesIndexPage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { siteFromParams, type SiteParams } from "@/sites/params";

export const metadata: Metadata = {
  title: "Industries We Serve | Metal Manufacturing | Jai Shree Group",
  description:
    "Jai Shree Group serves automobile, construction, pharmaceutical, petrochemical, food processing, sugar, mining and architecture industries from Pune & Mumbai.",
  alternates: {
    canonical: "/industries",
  },
  openGraph: {
    title: "Industries We Serve | Jai Shree Group",
    description:
      "Trusted metal manufacturing partner across 8+ industries from Pune & Mumbai.",
    url: "/industries",
  },
};

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
      <IndustriesIndexPage />
    </>
  );
}
