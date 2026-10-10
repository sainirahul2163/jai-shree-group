import type { Metadata } from "next";

import { ProductsIndexPage } from "@/components/products/ProductsIndexPage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { contentMetadata } from "@/lib/seo";
import { getContent } from "@/sites/content";
import { siteFromParams, type SiteParams } from "@/sites/params";

export async function generateMetadata({ params }: SiteParams): Promise<Metadata> {
  const site = await siteFromParams(params);
  return contentMetadata(getContent(site.key).meta.products, "/products");
}

export default async function ProductsPage({ params }: SiteParams) {
  const site = await siteFromParams(params);

  return (
    <>
      <BreadcrumbSchema
        site={site}
        items={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ]}
      />
      <ProductsIndexPage {...getContent(site.key).productsIndex} />
    </>
  );
}
