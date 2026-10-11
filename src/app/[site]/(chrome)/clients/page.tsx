import type { Metadata } from "next";

import { ClientsPage } from "@/components/clients/ClientsPage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { getPublishedTestimonials } from "@/lib/supabase/queries";
import { contentMetadata } from "@/lib/seo";
import { getContent } from "@/sites/content";
import { siteForPage, type SiteParams } from "@/sites/params";

/** Testimonials are managed in Supabase — refresh the static page hourly so
 *  newly published entries appear without a redeploy. */
export const revalidate = 3600;

export async function generateMetadata({ params }: SiteParams): Promise<Metadata> {
  const site = await siteForPage(params, "/clients");
  return contentMetadata(getContent(site.key).meta.clients!, "/clients");
}

export default async function Clients({ params }: SiteParams) {
  const site = await siteForPage(params, "/clients");
  const testimonials = await getPublishedTestimonials(site.key);

  return (
    <>
      <BreadcrumbSchema
        site={site}
        items={[
          { name: "Home", path: "/" },
          { name: "Clients", path: "/clients" },
        ]}
      />
      <ClientsPage testimonials={testimonials} />
    </>
  );
}
