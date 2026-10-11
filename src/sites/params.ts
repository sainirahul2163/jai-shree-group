import { notFound } from "next/navigation";

import { findSite } from "@/sites";
import type { SiteConfig } from "@/sites/types";

/** Props of a page or layout under `[site]` that only needs the site. */
export type SiteParams = { params: Promise<{ site: string }> };

/** The active site from the `[site]` route param; unknown or not-yet-built keys 404. */
export async function siteFromParams(
  params: Promise<{ site: string }>
): Promise<SiteConfig> {
  const { site: key } = await params;
  const site = findSite(key);
  if (!site) notFound();
  return site;
}

/**
 * The active site, for a page under a top-level path ("/blog", "/calculator").
 * Every configured site is prerendered for every page, so a page the site does
 * not list in `config.pages` must 404 here too (the proxy already 404s it at
 * request time).
 */
export async function siteForPage(
  params: Promise<{ site: string }>,
  path: string
): Promise<SiteConfig> {
  const site = await siteFromParams(params);
  if (!site.pages.includes(path)) notFound();
  return site;
}
