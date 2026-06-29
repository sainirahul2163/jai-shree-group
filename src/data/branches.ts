import type { BRANCHES } from "@/lib/constants";

type BranchSlug = (typeof BRANCHES)[number]["slug"];

/** Products available at each branch */
export const BRANCH_PRODUCTS: Record<BranchSlug, string[]> = {
  "jai-shree-metal-perforators": [
    "Perforated Sheets",
    "Turret Punching",
    "Laser Cutting",
    "Shearing & Bending",
  ],
  "shree-perforators": [
    "Perforated Sheets",
    "CNC Perforation",
    "Custom Hole Patterns",
  ],
  "shree-weld-mesh": [
    "Welded Mesh",
    "Wire Mesh Panels",
    "Custom Welded Grids",
  ],
  "jai-shree-filtration": [
    "Demister Pads",
    "Wire Mesh",
    "Filtration Screens",
    "Perforated Sheets",
  ],
  "jai-shree-industries": [
    "Perforated Sheets",
    "Wire Mesh",
    "Expanded Metal",
    "Welded Mesh",
  ],
  "jai-shree-perforator": [
    "Perforated Sheets",
    "Laser Cutting",
    "Expanded Metal",
  ],
};

export function getGoogleMapsUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
