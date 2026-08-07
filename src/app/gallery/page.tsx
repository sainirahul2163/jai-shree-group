import type { Metadata } from "next";

import { GalleryPage } from "@/components/gallery/GalleryPage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { getPublishedGalleryItems } from "@/lib/supabase/queries";

/** Gallery items are managed in Supabase — refresh the static page hourly so
 *  newly published items appear without a redeploy. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Product Gallery | Perforated Sheets & Wire Mesh | Jai Shree Group",
  description:
    "Browse Jai Shree Group product gallery — perforated sheets, laser cutting, expanded metal, wire mesh and welded mesh samples. Contact us for product samples.",
  alternates: {
    canonical: "/gallery",
  },
};

export default async function Gallery() {
  const items = await getPublishedGalleryItems();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ]}
      />
      <GalleryPage items={items} />
    </>
  );
}
