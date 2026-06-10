import type { Metadata } from "next";

import { AboutPage } from "@/components/about/AboutPage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title:
    "About Jai Shree Group | 50+ Years Metal Manufacturing | ISO 9001:2015 Pune",
  description:
    "Learn about Jai Shree Group — ISO 9001:2015 certified metal manufacturer since 1970. 9 manufacturing units in Pune & Mumbai. Perforated sheets, wire mesh, laser cutting experts.",
  alternates: {
    canonical: "https://jaishreegroup.in/about",
  },
};

export default function About() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <AboutPage />
    </>
  );
}
