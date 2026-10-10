import type { Metadata } from "next";

import { AboutPage } from "@/components/about/AboutPage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { siteFromParams, type SiteParams } from "@/sites/params";

export const metadata: Metadata = {
  title:
    "About Jai Shree Group | 50+ Years Metal Manufacturing | ISO 9001:2015 Pune",
  description:
    "Learn about Jai Shree Group and Shree Perforators — ISO 9001:2015 certified metal manufacturer since 1970. 6 manufacturing units in Pune & Mumbai. Perforated sheets, laser cutting, custom components.",
  alternates: {
    canonical: "/about",
  },
};

export default async function About({ params }: SiteParams) {
  const site = await siteFromParams(params);

  return (
    <>
      <BreadcrumbSchema
        site={site}
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <AboutPage />
    </>
  );
}
