import type { Metadata } from "next";

import { CertificationsPage } from "@/components/certifications/CertificationsPage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { siteFromParams, type SiteParams } from "@/sites/params";

export const metadata: Metadata = {
  title: "ISO 9001:2015 Certification | Jai Shree Group Quality Standards",
  description:
    "Jai Shree Group is ISO 9001:2015 certified. Learn about our quality management system and what certification means for our customers.",
  alternates: {
    canonical: "/certifications",
  },
};

export default async function Certifications({ params }: SiteParams) {
  const site = await siteFromParams(params);

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
