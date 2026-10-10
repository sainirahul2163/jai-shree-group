import type { Metadata } from "next";

import { ClientsPage } from "@/components/clients/ClientsPage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { getPublishedTestimonials } from "@/lib/supabase/queries";

/** Testimonials are managed in Supabase — refresh the static page hourly so
 *  newly published entries appear without a redeploy. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Our Clients | Trusted by Leading Manufacturers | Jai Shree Group",
  description:
    "Jai Shree Group serves leading manufacturers in automobile, construction, pharmaceutical, petrochemical and more. ISO 9001:2015 certified since 1970.",
  alternates: {
    canonical: "/clients",
  },
};

export default async function Clients() {
  const testimonials = await getPublishedTestimonials();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Clients", path: "/clients" },
        ]}
      />
      <ClientsPage testimonials={testimonials} />
    </>
  );
}
