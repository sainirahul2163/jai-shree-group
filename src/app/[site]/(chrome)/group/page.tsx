import type { Metadata } from "next";

import { GroupPage } from "@/components/group/GroupPage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { siteFromParams, type SiteParams } from "@/sites/params";

export const metadata: Metadata = {
  title:
    "Our Group | 6 Manufacturing Units Pune & Mumbai | Jai Shree Group",
  description:
    "Jai Shree Group operates 6 manufacturing units across Pune (Talawade) and Mumbai (Bhayander, Masjid Bunder, Palghar). Contact your nearest unit.",
  alternates: {
    canonical: "/group",
  },
};

export default async function Group({ params }: SiteParams) {
  const site = await siteFromParams(params);

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
