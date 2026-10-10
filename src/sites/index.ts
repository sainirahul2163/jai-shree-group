import { domains } from "@/sites/domains";
import { group } from "@/sites/group";
import { isSiteKey } from "@/sites/keys";
import type { SiteConfig, SiteKey } from "@/sites/types";

// Fail the build if a hostname in domains.ts is not a SiteKey.
void (domains satisfies Record<string, SiteKey>);

const CONFIGURED: Partial<Record<SiteKey, SiteConfig>> = {
  group,
};

export { isSiteKey };

export function getSite(key: SiteKey): SiteConfig {
  const site = CONFIGURED[key];
  if (!site) {
    throw new Error(`No site config for "${key}" yet`);
  }
  return site;
}

/** The config for a key, or undefined when the key is unknown or not built yet. */
export function findSite(key: string): SiteConfig | undefined {
  return isSiteKey(key) ? CONFIGURED[key] : undefined;
}

/** Configs that exist today. The six unit sites are not created yet. */
export const ALL_SITES: readonly SiteConfig[] = [group];
