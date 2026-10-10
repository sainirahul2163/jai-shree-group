import { domains } from "@/sites/domains";
import { group } from "@/sites/group";
import type { SiteConfig, SiteKey } from "@/sites/types";

// Fail the build if a hostname in domains.ts is not a SiteKey.
void (domains satisfies Record<string, SiteKey>);

const CONFIGURED: Partial<Record<SiteKey, SiteConfig>> = {
  group,
};

const SITE_KEYS: readonly SiteKey[] = [
  "group",
  "shree-perforators",
  "jai-shree-metal-perforators",
  "jai-shree-industries",
  "jai-shree-perforator",
  "jai-shree-filtration",
  "shree-weld-mesh",
];

export function isSiteKey(value: string): value is SiteKey {
  return (SITE_KEYS as readonly string[]).includes(value);
}

export function getSite(key: SiteKey): SiteConfig {
  const site = CONFIGURED[key];
  if (!site) {
    throw new Error(`No site config for "${key}" yet`);
  }
  return site;
}

/** Configs that exist today. The six unit sites are not created yet. */
export const ALL_SITES: readonly SiteConfig[] = [group];
