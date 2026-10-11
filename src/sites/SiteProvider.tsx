"use client";

import { createContext, useContext } from "react";

import type { ProductCard } from "@/data/products";
import type { SiteConfig } from "@/sites/types";

type SiteContextValue = {
  site: SiteConfig;
  /** The site's product cards, in `site.products` order. */
  products: ProductCard[];
};

const SiteContext = createContext<SiteContextValue | null>(null);

/** Rendered by `[site]/layout.tsx`; client components read it with `useSite()`. */
export function SiteProvider({
  site,
  products,
  children,
}: SiteContextValue & { children: React.ReactNode }) {
  return (
    <SiteContext.Provider value={{ site, products }}>
      {children}
    </SiteContext.Provider>
  );
}

function useSiteContext(): SiteContextValue {
  const value = useContext(SiteContext);
  if (!value) {
    throw new Error("useSite() must be used inside <SiteProvider>");
  }
  return value;
}

/** The active site's config (client components). Server code uses `siteFromParams`. */
export function useSite(): SiteConfig {
  return useSiteContext().site;
}

/** The active site's product cards, in `site.products` order. */
export function useSiteProducts(): ProductCard[] {
  return useSiteContext().products;
}
