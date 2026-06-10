import type { Metadata } from "next";

import { ProductsIndexPage } from "@/components/products/ProductsIndexPage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Our Products | Perforated Sheets, Wire Mesh & More | Jai Shree Group",
  description:
    "Explore all 9 metal manufacturing products from Jai Shree Group — perforated sheets, laser cutting, expanded metal, wire mesh, welded mesh and more. ISO 9001:2015 certified.",
  alternates: {
    canonical: "https://jaishreegroup.in/products",
  },
  openGraph: {
    title: "Our Products | Jai Shree Group",
    description:
      "Nine specialized metal fabrication capabilities from ISO 9001:2015 certified manufacturers in Pune & Mumbai.",
    url: "https://jaishreegroup.in/products",
  },
};

export default function ProductsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ]}
      />
      <ProductsIndexPage />
    </>
  );
}
