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
  /** Hero hex mesh: colour near the cursor (default brandHover) and overall strength (default 1). */
  hexGlow?: string;
  hexStrength?: number;
  /** Text on WhatsApp-green buttons. Default: near-black (passes contrast). */
  whatsappText?: string;
  /** Small section labels ("3D INTERACTIVE PREVIEW"). Default: brandText. */
  labelAccent?: string;
  fontHeading: FontKey;
  fontBody: FontKey;
}

export interface SiteLink {
  label: string;
  href: string;
}

/** Header and footer mark. */
export interface SiteLogo {
  /**
   * "jai-shree" = the client's official JAI SHREE artwork (group).
   * "flame-and-name" = the group flame next to `SiteConfig.name` (unit
   * fallback until unit logos arrive, docs/08-content-checklist.md).
   */
  kind: "jai-shree" | "flame-and-name";
  /** Accessible name of the mark itself. */
  label: string;
  /** Accessible name of the home link around it. */
  homeLabel: string;
}

/** Footer block: copy and links the footer shows next to `contact`. */
export interface SiteFooter {
  /** Small line under the tagline, e.g. other names the business trades as. */
  alsoKnownAs?: string;
  description: string;
  quickLinks: SiteLink[];
  headings: { products: string; company: string; contact: string };
  buttons: { brochure: string; whatsapp: string };
  copyright: string;
  /** Right side of the bottom bar. */
  certification: string;
}

export interface SiteConfig {
  key: SiteKey;
  origin: string;
  name: string;
  descriptor?: string;
  unitSlug: string | null;
  endorsed: boolean;
  logo: SiteLogo;
  /** Certification held, e.g. "ISO 9001:2015"; leave out when not confirmed. */
  iso?: string;
  /** Catalogue PDF; the catalogue buttons are hidden without it. */
  brochureUrl?: string;
  footer: SiteFooter;
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    weeklyHoliday: "Thursday" | "Sunday";
    hours?: string;
  };
  tagline?: string;
  /** Reply time the business has promised, e.g. "within 24 hours"; leave out when not stated. */
  replyPromise?: string;
  /**
   * City whose courts hear disputes under the site's terms of use. Default
   * "Pune"; Mumbai-region units set "Mumbai".
   */
  jurisdiction?: string;
  leadEmail: string;
  products: ProductSlug[];
  industries: string[];
  theme: ThemeTokens;
  /** Header links in order; the "/products" entry opens the products menu. */
  nav: SiteLink[];
  /** Home sections in render order (`[site]/(chrome)/page.tsx`). */
  home: HomeSectionKey[];
  /**
   * Enabled top-level routes ("/products" enables /products/*); the proxy
   * 404s any other first segment. Order = order of the static pages in the
   * sitemap.
   */
  pages: string[];
  tool: ToolKey | null;
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    description: string;
    keywords: string[];
    ogImage: string;
    /** Emitted as og:image:width / og:image:height. */
    ogImageSize?: { width: number; height: number };
    /** Open Graph title and description; default to defaultTitle and description. */
    ogTitle?: string;
    ogDescription?: string;
    /** Twitter card title and description; default to the Open Graph ones. */
    twitterTitle?: string;
    twitterDescription?: string;
    /** Open Graph locale. Default "en_IN". */
    locale?: string;
    /** hreflang codes, all pointing at the same URL (the sites are English only). */
    languages?: string[];
    schema?: SchemaFacts;
  };
  social?: {
    name: string;
    href: string;
    icon?: "Linkedin" | "Facebook" | "Instagram";
  }[];
}

/**
 * Facts for the site's JSON-LD that the rest of the config does not hold.
 * Leave out anything the client has not confirmed (docs/08-content-checklist.md).
 */
export interface SchemaFacts {
  /** schema.org type of the site's business. Default "LocalBusiness". */
  type?: string;
  foundingDate?: string;
  keywords?: string[];
  areaServed?: { type: "City" | "State" | "Country"; name: string }[];
  /** Parts of contact.address for PostalAddress. */
  address?: {
    locality: string;
    region: string;
    postalCode?: string;
    country: string;
  };
  geo?: { latitude: number; longitude: number };
  sameAs?: string[];
  certification?: { name: string; issuedBy: string };
  /** Name of the product OfferCatalog. */
  catalogName?: string;
  priceRange?: string;
}
