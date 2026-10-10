// Shape from docs/04-architecture.md. Names stay as specified there.

export type SiteKey =
  | "group"
  | "shree-perforators"
  | "jai-shree-metal-perforators"
  | "jai-shree-industries"
  | "jai-shree-perforator"
  | "jai-shree-filtration"
  | "shree-weld-mesh";

export type ProductSlug =
  | "perforated-sheets"
  | "laser-cutting"
  | "expanded-metal"
  | "turret-punching"
  | "precision-sheet-leveling"
  | "custom-components"
  | "mechanical-punching" // Jai Shree Industries, Jai Shree Perforator
  | "welded-mesh"; // Shree Weld Mesh only

/** Keys into fonts loaded in [site]/layout.tsx. Group uses Geist today. */
export type FontKey = "geist" | "geist-mono" | "barlow-condensed" | "fraunces";

/** Home sections in the order the group home page renders them. */
export type HomeSectionKey =
  | "hero"
  | "trust"
  | "video"
  | "products"
  | "about"
  | "industries"
  | "process"
  | "group"
  | "cta";

/** Signature tool for a site. The group site's tool is the open-area calculator. */
export type ToolKey =
  | "open-area-calculator"
  | "pattern-library"
  | "drawing-upload"
  | "expanded-metal-selector"
  | "bulk-order-estimator"
  | "stock-check"
  | "welded-mesh-calculator";

export interface ThemeTokens {
  mode: "dark" | "light";
  background: string;
  surface: string;
  surface2: string;
  border: string;
  foreground: string;
  textSecondary: string;
  textMuted: string;
  brand: string;
  brandHover: string;
  brandForeground: string;
  brandText: string;
  fontHeading: FontKey;
  fontBody: FontKey;
}

export interface SiteConfig {
  key: SiteKey;
  origin: string;
  name: string;
  descriptor?: string;
  unitSlug: string | null;
  endorsed: boolean;
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    weeklyHoliday: "Thursday" | "Sunday";
    hours?: string;
  };
  tagline?: string;
  leadEmail: string;
  products: ProductSlug[];
  industries: string[];
  theme: ThemeTokens;
  nav: { label: string; href: string }[];
  home: HomeSectionKey[];
  pages: string[];
  tool: ToolKey | null;
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    description: string;
    keywords: string[];
    ogImage: string;
  };
  social?: { name: string; href: string }[];
}
