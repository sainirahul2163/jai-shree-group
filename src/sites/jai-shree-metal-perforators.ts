import type { SiteConfig } from "@/sites/types";

/**
 * Jai Shree Metal Perforators — Talawade, Pune (site 2, docs/03-sites.md).
 * Job work: fiber laser cutting and CNC turret punching first; also
 * perforated sheets, leveling and custom parts. No expanded metal (Shree
 * Perforators and Jai Shree Industries make it). Facts:
 * docs/02-business-facts.md; copy: src/sites/content/jai-shree-metal-perforators.ts.
 */
export const jaiShreeMetalPerforators: SiteConfig = {
  key: "jai-shree-metal-perforators",
  origin: "https://www.metalperforatedsheets.com",
  name: "Jai Shree Metal Perforators",
  unitSlug: "jai-shree-metal-perforators",
  endorsed: true,
  logo: {
    kind: "flame-and-name",
    label: "Jai Shree Metal Perforators",
    homeLabel: "Jai Shree Metal Perforators home",
  },
  footer: {
    description:
      "Laser cutting and CNC punching job work to your drawing, with perforation, leveling and custom parts, at Gat No. 93, Talawade, Pune.",
    quickLinks: [
      { label: "Upload a Drawing", href: "/drawing-quote" },
      { label: "About", href: "/about" },
      { label: "Industries", href: "/industries" },
      { label: "Gallery", href: "/gallery" },
      { label: "Export", href: "/export" },
      { label: "Contact", href: "/contact" },
    ],
    headings: { products: "Job Work", company: "Company", contact: "Gat No. 93, Talawade" },
    buttons: { brochure: "", whatsapp: "WhatsApp Us" },
    copyright: "© 2026 Jai Shree Metal Perforators. All rights reserved.",
    certification: "Talawade, Pune, Maharashtra, India",
  },
  contact: {
    phone: "+91 93733 24492",
    whatsapp: "919373324492",
    email: "jsmppune@gmail.com",
    address:
      "Gat No. 93, Near Sonawane Wasti, Jyotibanagar, Talawade, Pune 411062",
    weeklyHoliday: "Thursday",
  },
  jurisdiction: "Pune",
  leadEmail: "jsmppune@gmail.com",
  products: [
    "laser-cutting",
    "turret-punching",
    "perforated-sheets",
    "precision-sheet-leveling",
    "custom-components",
  ],
  industries: [
    "automobile",
    "construction",
    "food-beverage",
    "pharmaceutical",
    "petrochemical",
    "architecture-interior",
  ],
  theme: {
    mode: "dark",
    background: "#0A0A0A",
    surface: "#121212",
    surface2: "#1B1B1B",
    border: "#2C2C2C",
    foreground: "#FFFFFF",
    textSecondary: "#A3A3A3",
    textMuted: "#8A8A8A",
    brand: "#FFC400",
    brandHover: "#FFD54D",
    brandForeground: "#0A0A0A",
    brandText: "#FFC400",
    // Yellow is much brighter than the group's orange: a softer mesh keeps the hero text readable.
    hexStrength: 0.45,
    fontHeading: "barlow-condensed",
    fontBody: "geist",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Job Work", href: "/products" },
    { label: "Upload Drawing", href: "/drawing-quote" },
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
    "/drawing-quote",
    "/industries",
    "/gallery",
    "/export",
    "/contact",
    "/get-quote",
    "/privacy",
    "/terms",
  ],
  tool: "drawing-upload",
  seo: {
    defaultTitle: "Laser Cutting and CNC Punching Job Work in Pune | Jai Shree Metal Perforators",
    titleTemplate: "%s | Jai Shree Metal Perforators",
    description:
      "Fiber laser cutting up to 14 mm and CNC turret punching to your drawing at Talawade, Pune. Upload a DXF, DWG or PDF and get a quotation for your job work.",
    keywords: [
      "laser cutting services Pune",
      "CNC turret punching job work Pune",
      "fiber laser cutting Pune",
      "sheet metal job work Talawade",
      "laser cutting to drawing",
      "Jai Shree Metal Perforators",
    ],
    ogImage: "/products/laser-cutting.webp",
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
      catalogName: "Laser cutting and punching job work",
    },
  },
};
