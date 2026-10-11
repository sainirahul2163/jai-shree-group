import { INDUSTRY_DETAILS, type IndustryDetail } from "@/data/industries";
import {
  PRODUCT_DETAILS,
  productCard,
  type ProductCard,
  type ProductDetail,
} from "@/data/products";
import { INDUSTRIES } from "@/lib/constants";
import { getContent } from "@/sites/content";
import type { ProductSlug, SiteConfig } from "@/sites/types";

/**
 * A site's products and industries: shared facts from `src/data/` with the
 * site's copy overrides (`content.products` / `content.industries`) applied.
 * Only what the site lists (`site.products`, `site.industries`) exists for it.
 */

/** A product the site offers, or undefined (the page should 404). */
export function siteProductDetail(
  site: SiteConfig,
  slug: string
): ProductDetail | undefined {
  if (!(site.products as string[]).includes(slug)) return undefined;
  const base = PRODUCT_DETAILS[slug];
  if (!base) return undefined;

  const copy = getContent(site.key).products?.[slug as ProductSlug];
  if (!copy) return base;
  const { card, ...rest } = copy;
  return { ...base, ...rest, card: { ...base.card, ...card } };
}

/** The site's products with detail pages, in `site.products` order. */
export function siteProductDetails(site: SiteConfig): ProductDetail[] {
  return site.products.flatMap((slug) => siteProductDetail(site, slug) ?? []);
}

/** Cards for menus, lists and pickers, in `site.products` order. */
export function siteProductCards(site: SiteConfig): ProductCard[] {
  return siteProductDetails(site).map(productCard);
}

/** The first `count` other products the site offers. */
export function siteRelatedProducts(
  site: SiteConfig,
  slug: string,
  count = 3
): ProductDetail[] {
  return siteProductDetails(site)
    .filter((product) => product.slug !== slug)
    .slice(0, count);
}

/** An industry page the site has, or undefined (the page should 404). */
export function siteIndustryDetail(
  site: SiteConfig,
  slug: string
): IndustryDetail | undefined {
  if (!site.industries.includes(slug)) return undefined;
  const base = INDUSTRY_DETAILS[slug];
  if (!base) return undefined;

  const copy = getContent(site.key).industries?.[slug];
  if (!copy) return base;
  // `summary` is for the home cards only.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { summary, ...rest } = copy;
  return { ...base, ...rest };
}

export type IndustryCard = {
  name: string;
  slug: string;
  icon: string;
  /** Short line for the home cards. */
  summary: string;
  /** Longer line for the industries index. */
  description: string;
};

/** Industries with a page, in `site.industries` order. */
export function siteIndustryCards(site: SiteConfig): IndustryCard[] {
  const overrides = getContent(site.key).industries ?? {};
  return site.industries.flatMap((slug) => {
    const detail = siteIndustryDetail(site, slug);
    const base = INDUSTRIES.find((industry) => industry.slug === slug);
    if (!detail || !base) return [];
    return [
      {
        name: base.name,
        slug,
        icon: base.icon,
        summary: overrides[slug]?.summary ?? base.description,
        description: detail.description,
      },
    ];
  });
}

/** Products an industry page links to: the industry's list, limited to the site's. */
export function siteIndustryProducts(
  site: SiteConfig,
  industry: IndustryDetail,
  count = 3
): ProductDetail[] {
  return industry.products
    .flatMap((slug) => siteProductDetail(site, slug) ?? [])
    .slice(0, count);
}
