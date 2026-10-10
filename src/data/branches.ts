import type { BRANCHES } from "@/lib/constants";

type BranchSlug = (typeof BRANCHES)[number]["slug"];

/** Products available at each branch, as confirmed by the client on 2026-10-07 */
export const BRANCH_PRODUCTS: Record<BranchSlug, string[]> = {
  "jai-shree-metal-perforators": [
    "Laser Cutting",
    "Turret Punching",
    "Perforated Sheets",
    "Sheet Leveling",
    "Custom Parts & Screens",
  ],
  "shree-perforators": [
    "Perforated Sheets",
    "Custom Hole Patterns",
    "Expanded Metal",
    "Turret Punching",
    "Sheet Leveling",
    "Custom Parts & Screens",
  ],
  "shree-weld-mesh": ["Welded Mesh"],
  "jai-shree-filtration": ["Perforated Sheets (Ready Stock)"],
  "jai-shree-industries": [
    "Expanded Metal",
    "CNC Punching",
    "Mechanical Punching",
    "Perforated Sheets",
    "Sheet Leveling",
  ],
  "jai-shree-perforator": ["Perforated Sheets", "Mechanical Punching"],
};

export function getGoogleMapsUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
