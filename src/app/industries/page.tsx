import type { Metadata } from "next";

import { IndustriesIndexPage } from "@/components/industries/IndustriesIndexPage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Industries We Serve | Metal Manufacturing | Jai Shree Group",
  description:
    "Jai Shree Group serves automobile, construction, pharmaceutical, petrochemical, food processing, sugar, mining and architecture industries from Pune & Mumbai.",
  alternates: {
    canonical: "https://jaishreegroup.in/industries",
  },
  openGraph: {
    title: "Industries We Serve | Jai Shree Group",
    description:
      "Trusted metal manufacturing partner across 8+ industries from Pune & Mumbai.",
    url: "https://jaishreegroup.in/industries",
  },
};

export default function IndustriesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ]}
      />
      <IndustriesIndexPage />
    </>
  );
}
