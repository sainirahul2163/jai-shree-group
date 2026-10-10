import type { Metadata } from "next";

import { ContactPage } from "@/components/contact/ContactPage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ContactPageSchema } from "@/components/seo/ContactPageSchema";
import { siteFromParams, type SiteParams } from "@/sites/params";

export const metadata: Metadata = {
  title: "Contact Jai Shree Group | Perforated Sheet Manufacturers Pune",
  description:
    "Contact Jai Shree Group for perforated sheets, laser cutting, expanded metal and turret punching. Pune & Mumbai. Get free quote within 24 hours.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Jai Shree Group | Perforated Sheet Manufacturers Pune",
    description:
      "Contact Jai Shree Group for perforated sheets, laser cutting, expanded metal and turret punching. Pune & Mumbai.",
    url: "/contact",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default async function Contact({ params }: SiteParams) {
  const site = await siteFromParams(params);

  return (
    <>
      <ContactPageSchema site={site} />
      <BreadcrumbSchema
        site={site}
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <ContactPage />
    </>
  );
}
