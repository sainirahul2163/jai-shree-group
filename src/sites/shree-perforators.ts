import type { SiteConfig } from "@/sites/types";

/**
 * Shree Perforators — Talawade, Pune (site 1, docs/03-sites.md).
 * CNC perforated sheets and hole patterns, plus expanded metal, turret
 * punching, leveling and custom parts. No laser cutting (Jai Shree Metal
 * Perforators does it). Facts: docs/02-business-facts.md; copy:
 * src/sites/content/shree-perforators.ts.
 */
export const shreePerforators: SiteConfig = {
  key: "shree-perforators",
  origin: "https://www.shreeperforators.com",
  name: "Shree Perforators",
  unitSlug: "shree-perforators",
  endorsed: true,
  // No unit logo yet: group flame + name (docs/08-content-checklist.md).
  logo: {
    kind: "flame-and-name",
    label: "Shree Perforators",
    homeLabel: "Shree Perforators home",
  },
  footer: {
    description:
      "CNC perforated sheets in custom hole patterns, with expanded metal, turret punching and leveling, from our unit in Talawade, Pune.",
    quickLinks: [
      { label: "Pattern Library", href: "/pattern-library" },
      { label: "About", href: "/about" },
      { label: "Industries", href: "/industries" },
      { label: "Gallery", href: "/gallery" },
      { label: "Export", href: "/export" },
      { label: "Contact", href: "/contact" },
      { label: "Get Quote", href: "/get-quote" },
    ],
    headings: { products: "What We Make", company: "Company", contact: "Talawade Unit" },
    buttons: { brochure: "", whatsapp: "WhatsApp Us" },
    copyright: "© 2026 Shree Perforators. All rights reserved.",
    certification: "Talawade, Pune, Maharashtra, India",
  },
  contact: {
    phone: "+91 93706 06017",
    whatsapp: "919370606017",
    email: "shreeperforator@gmail.com",
    address:
      "Gat No. 94, Near Sonawane Wasti, Jyotibanagar, Talawade, Pune 411062",
    weeklyHoliday: "Thursday",
  },
  jurisdiction: "Pune",
  leadEmail: "shreeperforator@gmail.com",
  products: [
    "perforated-sheets",
    "expanded-metal",
    "turret-punching",
    "precision-sheet-leveling",
    "custom-components",
  ],
  industries: [
    "automobile",
    "food-beverage",
    "pharmaceutical",
    "sugar-industry",
    "architecture-interior",
    "construction",
  ],
  theme: {
    mode: "dark",
    background: "#0B0F14",
    surface: "#121821",
    surface2: "#1A2230",
    border: "#263142",
    foreground: "#F5F7FA",
    textSecondary: "#9AA6B8",
    textMuted: "#7E8A9D",
    brand: "#1F6FEB",
    brandHover: "#3B82F6",
    brandForeground: "#FFFFFF",
    brandText: "#5A96FF",
    fontHeading: "geist",
    fontBody: "geist",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Pattern Library", href: "/pattern-library" },
    { label: "Industries", href: "/industries" },
    { label: "Gallery", href: "/gallery" },
    { label: "Export", href: "/export" },
    { label: "Contact", href: "/contact" },
  ],
  home: ["hero", "trust", "products", "about", "industries", "process", "cta"],
  pages: [
    "/",
    "/about",
    "/products",
    "/pattern-library",
    "/industries",
    "/gallery",
    "/export",
    "/contact",
    "/get-quote",
    "/privacy",
    "/terms",
  ],
  tool: "pattern-library",
  seo: {
    defaultTitle: "Perforated Sheet Manufacturers in Pune | Shree Perforators",
    titleTemplate: "%s | Shree Perforators",
    description:
      "Shree Perforators, Talawade, Pune: CNC perforated sheets in any hole pattern up to 12 mm thick, plus expanded metal, turret punching and sheet leveling. Ask for a quote.",
    keywords: [
      "perforated sheet manufacturers Pune",
      "perforated sheet hole patterns",
      "SS perforated sheet supplier",
      "CNC perforated sheets",
      "custom perforation Pune",
      "expanded metal Pune",
      "Shree Perforators",
      "Talawade",
    ],
    ogImage: "/products/perforated-sheets.webp",
    locale: "en_IN",
    schema: {
      type: "ManufacturingBusiness",
      areaServed: [
        { type: "City", name: "Pune" },
        { type: "State", name: "Maharashtra" },
        { type: "Country", name: "India" },
      ],
      address: {
        locality: "Pune",
        region: "Maharashtra",
        postalCode: "411062",
        country: "IN",
      },
      geo: { latitude: 18.6234, longitude: 73.7545 },
      sameAs: ["https://www.indiamart.com/shree-perforators/"],
      catalogName: "Perforation and sheet metal work",
    },
  },
};
