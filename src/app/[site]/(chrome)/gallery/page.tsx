import type { Metadata } from "next";

import { GalleryPage } from "@/components/gallery/GalleryPage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { getPublishedGalleryItems } from "@/lib/supabase/queries";
import { contentMetadata } from "@/lib/seo";
import { getContent } from "@/sites/content";
import { siteFromParams, type SiteParams } from "@/sites/params";

/** Gallery items are managed in Supabase — refresh the static page hourly so
 *  newly published items appear without a redeploy. */
export const revalidate = 3600;

export async function generateMetadata({ params }: SiteParams): Promise<Metadata> {
  const site = await siteFromParams(params);
  return contentMetadata(getContent(site.key).meta.gallery, "/gallery");
}

export default async function Gallery({ params }: SiteParams) {
  const site = await siteFromParams(params);
  const items = await getPublishedGalleryItems(site.key);

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
