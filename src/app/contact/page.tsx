import type { Metadata } from "next";

import { ContactPage } from "@/components/contact/ContactPage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Contact Jai Shree Group | Perforated Sheet Manufacturers Pune",
  description:
    "Contact Jai Shree Group for perforated sheets, wire mesh, laser cutting and expanded metal. Pune & Mumbai. Get free quote within 24 hours.",
  alternates: {
    canonical: "https://jaishreegroup.in/contact",
  },
};

export default function Contact() {
  return (
    <>
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
