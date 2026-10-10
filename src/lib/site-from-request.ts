import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { findSite } from "@/sites";
import type { SiteConfig } from "@/sites/types";

/**
 * The site an API request belongs to, from the `x-site` header that
 * src/proxy.ts sets on every /api request (it overwrites any value the client
 * sent). Undefined when the key is unknown or its config does not exist yet.
 * Never read the site from the request body.
 */
export async function siteFromRequest(): Promise<SiteConfig | undefined> {
  const key = (await headers()).get("x-site") ?? "";
  return findSite(key);
}

export function unknownSiteResponse() {
  return NextResponse.json(
    { success: false, error: "Unknown site" },
    { status: 400 }
  );
}
