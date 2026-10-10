// Every site key. No imports, so src/proxy.ts can load it without the configs.
import type { SiteKey } from "@/sites/types";

export const SITE_KEYS: readonly SiteKey[] = [
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
