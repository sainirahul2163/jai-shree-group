import type { Metadata } from "next";

import { GalleryPage } from "@/components/gallery/GalleryPage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { getPublishedGalleryItems } from "@/lib/supabase/queries";
import { siteFromParams, type SiteParams } from "@/sites/params";

/** Gallery items are managed in Supabase — refresh the static page hourly so
 *  newly published items appear without a redeploy. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Product Gallery | Perforated Sheets & Laser Cutting | Jai Shree Group",
  description:
    "Browse Jai Shree Group product gallery — perforated sheets, laser cutting, expanded metal and custom component samples. Contact us for product samples.",
  alternates: {
    canonical: "/gallery",
  },
};

export default async function Gallery({ params }: SiteParams) {
  const site = await siteFromParams(params);
  const items = await getPublishedGalleryItems();

  return (
    <>
      <BreadcrumbSchema
        site={site}
        items={[
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ]}
      />
      <GalleryPage items={items} />
    </>
  );
}
