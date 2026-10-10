import type { Metadata } from "next";

import { ProductsIndexPage } from "@/components/products/ProductsIndexPage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title:
    "Our Products | Perforated Sheets, Expanded Metal & Custom Components | Jai Shree Group",
  description:
    "Six active metal manufacturing products from Jai Shree Group — perforated sheets, laser cutting, expanded metal, turret punching, sheet leveling and custom components. ISO 9001:2015 certified.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Our Products | Jai Shree Group",
    description:
      "Perforated sheet manufacturer & expanded mesh manufacturers. CNC turret perforated sheet manufacturing from ISO certified Pune & Mumbai facilities.",
    url: "/products",
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
