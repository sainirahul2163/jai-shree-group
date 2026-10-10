// Readable name for every site key, including sites whose config does not
// exist yet. The admin panel lists all seven; public pages use config.name.
import { SITE_KEYS, isSiteKey } from "@/sites/keys";
import type { SiteKey } from "@/sites/types";

export const SITE_NAMES: Record<SiteKey, string> = {
  group: "Jai Shree Group",
  "shree-perforators": "Shree Perforators",
  "jai-shree-metal-perforators": "Jai Shree Metal Perforators",
  "jai-shree-industries": "Jai Shree Industries",
  "jai-shree-perforator": "Jai Shree Perforator",
  "jai-shree-filtration": "Jai Shree Filtration",
  "shree-weld-mesh": "Shree Weld Mesh",
};

/** Every site key with its name, in SITE_KEYS order. */
export const SITE_OPTIONS: readonly { key: SiteKey; name: string }[] =
  SITE_KEYS.map((key) => ({ key, name: SITE_NAMES[key] }));

export function siteName(key: string): string {
  return isSiteKey(key) ? SITE_NAMES[key] : key;
}

/** `?site=` admin filter value → a site key, or null for "All sites". */
export function parseSiteFilter(value: string | undefined): SiteKey | null {
  return value && isSiteKey(value) ? value : null;
}
