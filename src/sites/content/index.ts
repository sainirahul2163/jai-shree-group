import { groupContent } from "@/sites/content/group";
import type { SiteContent } from "@/sites/content/types";
import type { SiteKey } from "@/sites/types";

const CONTENT: Partial<Record<SiteKey, SiteContent>> = {
  group: groupContent,
};

/** Long-form copy for a configured site. Every site in `ALL_SITES` needs a module. */
export function getContent(key: SiteKey): SiteContent {
  const content = CONTENT[key];
  if (!content) {
    throw new Error(`No content module for site "${key}" (src/sites/content/)`);
  }
  return content;
}
