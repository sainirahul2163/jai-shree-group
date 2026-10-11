import type { MetadataRoute } from "next";

import { INDUSTRY_SLUGS } from "@/data/industries";
import { LOCATION_PATHS } from "@/data/locations";
import { PRODUCT_SLUGS } from "@/data/products";
import { BLOG_POSTS } from "@/lib/constants";
import { siteUrl } from "@/lib/seo";
import { ALL_SITES, findSite } from "@/sites";
import type { SiteConfig } from "@/sites/types";

// Served as /sitemap.xml on each site's domain (the proxy rewrites it here).

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_SITES.map((site) => ({ site: site.key }));
}

const HIGH_PRIORITY_PATHS = new Set([
  "/",
  "/products",
  "/contact",
  "/get-quote",
  "/about",
  "/group",
]);

const LEGAL_PATHS = new Set(["/privacy", "/terms"]);

/** City prefixes ("/pune"): enabled in config.pages, but only their sub-pages exist. */
const LOCATION_CITIES = new Set(LOCATION_PATHS.map((path) => `/${path.split("/")[0]}`));

/** Enabled pages left out of the sitemap: the brochure is a print document. */
const NOT_LISTED = new Set(["/brochure"]);

function staticPriority(path: string): number {
  if (path === "/") return 1.0;
  if (HIGH_PRIORITY_PATHS.has(path)) return 0.95;
  if (LEGAL_PATHS.has(path)) return 0.3;
  return 0.7;
}

function staticChangeFrequency(
  path: string
): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (path === "/") return "weekly";
  if (LEGAL_PATHS.has(path)) return "yearly";
  return "monthly";
}

function sitemapEntries(site: SiteConfig, now: Date): MetadataRoute.Sitemap {
  const pages = new Set(site.pages);

  const staticPages: MetadataRoute.Sitemap = site.pages
    .filter((path) => !LOCATION_CITIES.has(path) && !NOT_LISTED.has(path))
    .map((path) => ({
      url: siteUrl(site, path),
      lastModified: now,
      changeFrequency: staticChangeFrequency(path),
      priority: staticPriority(path),
    }));

  const productPages: MetadataRoute.Sitemap = pages.has("/products")
    ? site.products
        .filter((slug) => PRODUCT_SLUGS.includes(slug))
        .map((slug) => ({
          url: siteUrl(site, `/products/${slug}`),
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.9,
        }))
    : [];

  const industryPages: MetadataRoute.Sitemap = pages.has("/industries")
    ? site.industries
        .filter((slug) => INDUSTRY_SLUGS.includes(slug))
        .map((slug) => ({
          url: siteUrl(site, `/industries/${slug}`),
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.8,
        }))
    : [];

  const locationPages: MetadataRoute.Sitemap = LOCATION_PATHS.filter((path) =>
    pages.has(`/${path.split("/")[0]}`)
  ).map((path) => ({
    url: siteUrl(site, `/${path}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // The seed posts (BLOG_POSTS) belong to the group site only.
  const blogPages: MetadataRoute.Sitemap =
    pages.has("/blog") && site.key === "group"
      ? BLOG_POSTS.map((post) => ({
          url: siteUrl(site, `/blog/${post.slug}`),
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.6,
        }))
      : [];

  return [
    ...staticPages,
    ...productPages,
    ...industryPages,
    ...locationPages,
    ...blogPages,
  ];
}

/** Same XML as Next's sitemap.ts convention (urlset, loc, lastmod, changefreq, priority). */
function toXml(entries: MetadataRoute.Sitemap): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const entry of entries) {
    xml += "<url>\n";
    xml += `<loc>${entry.url}</loc>\n`;
    if (entry.lastModified) {
      const lastmod =
        entry.lastModified instanceof Date
          ? entry.lastModified.toISOString()
          : entry.lastModified;
      xml += `<lastmod>${lastmod}</lastmod>\n`;
    }
    if (entry.changeFrequency) {
      xml += `<changefreq>${entry.changeFrequency}</changefreq>\n`;
    }
    if (typeof entry.priority === "number") {
      xml += `<priority>${entry.priority}</priority>\n`;
    }
    xml += "</url>\n";
  }
  xml += "</urlset>\n";
  return xml;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ site: string }> }
) {
  const site = findSite((await params).site);
  if (!site) return new Response("Not Found", { status: 404 });

  return new Response(toXml(sitemapEntries(site, new Date())), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
