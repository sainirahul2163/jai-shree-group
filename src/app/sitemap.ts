import type { MetadataRoute } from "next";

import { INDUSTRY_SLUGS } from "@/data/industries";
import { LOCATION_PATHS } from "@/data/locations";
import { PRODUCT_SLUGS } from "@/data/products";
import { COMPANY, SITE_ROUTES, BLOG_POSTS } from "@/lib/constants";

const BASE_URL = COMPANY.website;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = SITE_ROUTES.static.map((path) => ({
    url: `${BASE_URL}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1.0 : 0.7,
  }));

  const productPages: MetadataRoute.Sitemap = PRODUCT_SLUGS.map((slug) => ({
    url: `${BASE_URL}/products/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const industryPages: MetadataRoute.Sitemap = INDUSTRY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/industries/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const locationPages: MetadataRoute.Sitemap = LOCATION_PATHS.map((path) => ({
    url: `${BASE_URL}/${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...productPages,
    ...industryPages,
    ...locationPages,
    ...blogPages,
  ];
}
