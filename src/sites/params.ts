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
