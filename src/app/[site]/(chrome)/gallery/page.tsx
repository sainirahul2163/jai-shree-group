import type { Metadata } from "next";

import { GalleryPage } from "@/components/gallery/GalleryPage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { getPublishedGalleryItems } from "@/lib/supabase/queries";
import { GALLERY_CATEGORIES } from "@/lib/constants";
import { contentMetadata } from "@/lib/seo";
import { siteProductCards } from "@/sites/catalog";
import { getContent } from "@/sites/content";
import { siteForPage, type SiteParams } from "@/sites/params";

/** Gallery items are managed in Supabase — refresh the static page hourly so
 *  newly published items appear without a redeploy. */
export const revalidate = 3600;

export async function generateMetadata({ params }: SiteParams): Promise<Metadata> {
  const site = await siteForPage(params, "/gallery");
  return contentMetadata(getContent(site.key).meta.gallery, "/gallery");
}

export default async function Gallery({ params }: SiteParams) {
  const site = await siteForPage(params, "/gallery");
  const content = getContent(site.key);
  const dbItems = await getPublishedGalleryItems(site.key);
  const isGroup = site.key === "group";
  // A unit site without its own gallery photos yet shows its product photos
  // (docs/08-content-checklist.md: only photos of its own products).
  const items =
    dbItems.length > 0 || isGroup
      ? dbItems
      : siteProductCards(site).map((product, index) => ({
          id: `product-${product.slug}`,
          site: site.key,
          image_url: `/products/${product.slug}.webp`,
          title: product.name,
          description: null,
          product_category: product.slug,
          is_published: true,
          sort_order: index,
          created_at: "",
        }));

  return (
    <>
      <BreadcrumbSchema
        site={site}
        items={[
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ]}
      />
      <GalleryPage
        items={items}
        hero={content.galleryHero}
        showDimplePreview={isGroup}
        categories={
          isGroup
            ? GALLERY_CATEGORIES.map((category) => category.slug)
            : [...site.products]
        }
      />
    </>
  );
}
