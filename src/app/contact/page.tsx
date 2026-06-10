import type { Metadata } from "next";

import { ContactPage } from "@/components/contact/ContactPage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ContactPageSchema } from "@/components/seo/ContactPageSchema";

export const metadata: Metadata = {
  title: "Contact Jai Shree Group | Perforated Sheet Manufacturers Pune",
  description:
    "Contact Jai Shree Group for perforated sheets, wire mesh, laser cutting and expanded metal. Pune & Mumbai. Get free quote within 24 hours.",
  alternates: {
    canonical: "https://jaishreegroup.in/contact",
  },
  openGraph: {
    title: "Contact Jai Shree Group | Perforated Sheet Manufacturers Pune",
    description:
      "Contact Jai Shree Group for perforated sheets, wire mesh, laser cutting and expanded metal. Pune & Mumbai.",
    url: "https://jaishreegroup.in/contact",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function Contact() {
  return (
    <>
      <ContactPageSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <ContactPage />
    </>
  );
}
