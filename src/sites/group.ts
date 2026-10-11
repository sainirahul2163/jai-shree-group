import type { SiteConfig } from "@/sites/types";

/**
 * Canonical production origin. Override per-environment with NEXT_PUBLIC_SITE_URL
 * (no trailing slash). Defaults to www because the apex 308-redirects there.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ??
  "https://www.jaishreegroup.com";

export const COMPANY = {
  name: "Jai Shree Group",
  tagline: "Accept Challenges – Develop – Achieve",
  founded: "1970",
  founder: "Mr. Tejaram Jangid",
  foundedIn: "Delhi",
  experience: "50+",
  iso: "ISO 9001:2015",
  email: "shreeperforator@gmail.com",
  phone: "+91 9370606017",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919370606017",
  address:
    "Gat No. 94, Near Sonawane Wasti, Jyotibanagar, Talawade, Pune - 411062",
  website: SITE_URL,
  locations: ["Pune (Talawade)", "Mumbai (Bhayander, Palghar)"],
  manufacturingUnits: 6,
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Industries", href: "/industries" },
  { label: "Our Group", href: "/group" },
  { label: "Calculator", href: "/calculator" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER = {
  description:
    "ISO 9001:2015 certified manufacturer of perforated sheets, laser cutting & expanded metal. Serving India since 1970.",
  copyright: "© 2026 Jai Shree Group. All rights reserved.",
  certification: "ISO 9001:2015 Certified | Pune & Mumbai, India",
  social: [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/jai-shree-group/",
      icon: "Linkedin",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/jaishreegroup/",
      icon: "Facebook",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/jaishreegroup/",
      icon: "Instagram",
    },
  ],
  quickLinks: [
    { label: "About", href: "/about" },
    { label: "Our Group", href: "/group" },
    { label: "Industries", href: "/industries" },
    { label: "Calculator", href: "/calculator" },
    { label: "Gallery", href: "/gallery" },
    { label: "Certifications", href: "/certifications" },
    { label: "Contact", href: "/contact" },
    { label: "Get Quote", href: "/get-quote" },
  ],
  headings: {
    products: "Products",
    company: "Company",
    contact: "Contact Us",
  },
  buttons: {
    brochure: "Download Catalogue",
    whatsapp: "WhatsApp Us",
  },
} as const;

export const SEO = {
  primaryKeywords: [
    "Perforated Sheet Manufacturer",
    "Expanded Mesh Manufacturers",
    "CNC Turret Perforated Sheet Manufacturing",
    "perforated sheet manufacturers Pune",
    "perforated sheet manufacturers India export",
    "expanded metal suppliers India",
    "metal fabrication India",
    "perforated metal sheets India supplier",
  ],
  schemaTypes: ["LocalBusiness", "Product", "FAQPage", "BreadcrumbList"] as const,
} as const;

/** Keywords on the root layout `<meta name="keywords">` today. */
const LAYOUT_KEYWORDS = [
  "Perforated Sheet Manufacturer",
  "Expanded Mesh Manufacturers",
  "CNC Turret Perforated Sheet Manufacturing",
  "perforated sheet manufacturers India export",
  "expanded metal suppliers India",
  "metal fabrication India",
  "perforated metal sheets India supplier",
  "perforated sheets",
  "expanded metal",
  "laser cutting",
  "Pune",
  "Mumbai",
  "ISO 9001",
  "Jai Shree Group",
  "metal manufacturing",
];

export const BROCHURE_URL = "/brochure/jai-shree-brochure.pdf";

export const group: SiteConfig = {
  key: "group",
  origin: SITE_URL,
  name: COMPANY.name,
  unitSlug: null,
  endorsed: false,
  logo: { kind: "jai-shree", label: "Jai Shree", homeLabel: "Jai Shree Home" },
  iso: COMPANY.iso,
  brochureUrl: BROCHURE_URL,
  footer: {
    alsoKnownAs: "Also known as Shree Perforators | Jai Shree Metal Perforators",
    description: FOOTER.description,
    quickLinks: FOOTER.quickLinks.map((item) => ({ ...item })),
    headings: { ...FOOTER.headings },
    buttons: { ...FOOTER.buttons },
    copyright: FOOTER.copyright,
    certification: FOOTER.certification,
  },
  contact: {
    phone: COMPANY.phone,
    whatsapp: COMPANY.whatsapp,
    email: COMPANY.email,
    address: COMPANY.address,
    // Company address on the site is the Talawade, Pune plant.
    weeklyHoliday: "Thursday",
    hours: "9:00 AM – 6:00 PM",
  },
  tagline: COMPANY.tagline,
  replyPromise: "within 24 hours",
  jurisdiction: "Pune",
  leadEmail: COMPANY.email,
  products: [
    "perforated-sheets",
    "laser-cutting",
    "expanded-metal",
    "turret-punching",
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
    "sugar-industry",
    "mining-quarrying",
    "paper-industry",
    "agriculture",
  ],
  theme: {
    mode: "dark",
    background: "#0a0a0a",
    surface: "#111111",
    surface2: "#1a1a1a",
    border: "#2a2a2a",
    foreground: "#ffffff",
    textSecondary: "#a0a0a0",
    textMuted: "#666666",
    brand: "#e8521a",
    brandHover: "#ff6b35",
    brandForeground: "#ffffff",
    brandText: "#e8521a",
    // The group's section labels have always used Tailwind's orange-500.
    labelAccent: "var(--color-orange-500)",
    // Unchanged on the live site (white on WhatsApp green is 1.8:1; see PROJECT-LOG).
    whatsappText: "#ffffff",
    fontHeading: "geist",
    fontBody: "geist",
  },
  nav: [
    ...NAV_LINKS.slice(0, 2),
    { label: "Products", href: "/products" },
    ...NAV_LINKS.slice(2),
  ].map((item) => ({ label: item.label, href: item.href })),
  home: [
    "hero",
    "trust",
    "video",
    "products",
    "about",
    "industries",
    "process",
    "group",
    "cta",
  ],
  pages: [
    "/",
    "/landing",
    "/about",
    "/group",
    "/products",
    "/calculator",
    "/gallery",
    "/clients",
    "/certifications",
    "/contact",
    "/get-quote",
    "/industries",
    "/blog",
    "/brochure",
    "/pune",
    "/mumbai",
    "/privacy",
    "/terms",
  ],
  tool: "open-area-calculator",
  seo: {
    defaultTitle: "Perforated Sheet Manufacturers Pune Mumbai | Jai Shree Group",
    // The root layout sets a full title string; it does not use a template.
    titleTemplate: "%s",
    description:
      "Perforated sheet manufacturers in Pune & Mumbai. ISO 9001:2015 certified, 50+ years. CNC turret perforation & laser cutting. Get a free quote today.",
    keywords: LAYOUT_KEYWORDS,
    ogImage: "/og-image.jpg",
    ogImageSize: { width: 1200, height: 630 },
    ogTitle:
      "Perforated Sheet Manufacturer | Expanded Mesh Manufacturers | Jai Shree Group",
    ogDescription:
      "Perforated sheet manufacturer in Pune & Mumbai. CNC turret perforated sheet manufacturing. Export & global delivery. ISO 9001:2015 certified.",
    twitterTitle:
      "Perforated Sheet Manufacturer | Expanded Mesh | Jai Shree Group",
    twitterDescription:
      "Perforated sheet manufacturer & expanded mesh manufacturers. CNC turret perforated sheet manufacturing. Export & global delivery.",
    locale: "en_IN",
    languages: ["en", "en-IN", "en-US", "en-GB", "en-AU"],
    schema: {
      type: "ManufacturingBusiness",
      foundingDate: COMPANY.founded,
      keywords: [...SEO.primaryKeywords],
      areaServed: [
        { type: "City", name: "Pune" },
        { type: "City", name: "Mumbai" },
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
      sameAs: [
        "https://www.google.com/maps/place/Jai+Shree+Group",
        "https://www.indiamart.com/shree-perforators/",
        "https://www.linkedin.com/company/jai-shree-group/",
      ],
      certification: { name: "ISO 9001:2015", issuedBy: "Bureau Veritas" },
      catalogName: "Metal Manufacturing Products",
      priceRange: "$$",
    },
  },
  social: FOOTER.social.map((item) => ({
    name: item.name,
    href: item.href,
    icon: item.icon,
  })),
};
