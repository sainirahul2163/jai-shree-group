import type { IndustryDetail } from "@/data/industries";
import type { ProductCard, ProductDetail } from "@/data/products";
import type { ProductSlug, SiteLink } from "@/sites/types";

/**
 * Everything a site says in long form. One module per site in
 * `src/sites/content/`; `getContent(key)` returns it. Shared components render
 * this copy; no paragraph is shared between sites (docs/07-seo-rules.md).
 */

/** Title, description and optional Open Graph override for one page. */
export interface PageMeta {
  title: string;
  description: string;
  /** When set, the page emits its own `openGraph` (url = the page path). */
  openGraph?: {
    title: string;
    description: string;
    images?: { url: string; width: number; height: number }[];
  };
}

export interface SectionHeading {
  /** Anchor id of the section. */
  id: string;
  label: string;
  heading: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface HeroContent {
  badge: string;
  /** H1 lines; `accent` lines use the brand text colour. */
  lines: { text: string; accent?: boolean }[];
  intro: string;
  primaryCta: SiteLink;
  secondaryCta: SiteLink;
  stats: Stat[];
}

export type TrustStat =
  | { label: string; count: number; suffix?: string }
  | { label: string; display: string };

export interface TrustContent {
  ariaLabel: string;
  stats: TrustStat[];
}

export interface VideoContent {
  label: string;
  heading: string;
  headingAccent: string;
  subtext: string;
  stats: Stat[];
  /** A YouTube id wins over `localVideo`; with neither, a "coming soon" poster shows. */
  youtubeId?: string;
  localVideo?: string;
  posterTitle: string;
  tags: string[];
  iframeTitle: string;
  comingSoonText: string;
  caption: string;
}

export interface ProductsIntroContent extends SectionHeading {
  subtext: string;
}

export interface AboutSectionContent extends SectionHeading {
  paragraphs: string[];
  highlights: Stat[];
  cta: SiteLink;
  timeline: { year: string; description: string }[];
}

export interface IndustriesIntroContent extends SectionHeading {
  banner: { text: string; cta: SiteLink };
}

export interface ProcessContent extends SectionHeading {
  steps: { step: number; icon: string; title: string; description: string }[];
}

export interface BranchInfo {
  name: string;
  slug: string;
  area: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  weeklyOff: string;
}

/** Group-only: the units by city with a map. */
export interface GroupSectionContent extends SectionHeading {
  subtext: string;
  tabs: { pune: string; mumbai: string };
  pune: BranchInfo[];
  mumbai: BranchInfo[];
}

export interface CtaContent {
  heading: string;
  text: string;
  primaryCta: SiteLink;
  callLabel: string;
  badges: string[];
}

/** Copy for each `HomeSectionKey`; a key listed in `site.home` needs its block. */
export interface HomeContent {
  hero: HeroContent;
  trust: TrustContent;
  video?: VideoContent;
  products: ProductsIntroContent;
  about: AboutSectionContent;
  industries: IndustriesIntroContent;
  process: ProcessContent;
  group?: GroupSectionContent;
  cta: CtaContent;
}

export interface PageHeroContent {
  label?: string;
  title: string;
  subtitle: string;
  badges?: string[];
}

export interface AboutPageContent {
  hero: PageHeroContent;
  story: {
    label: string;
    heading: string;
    paragraphs: string[];
    timeline?: { year: string; title: string; description: string }[];
    leadership?: {
      heading: string;
      people: { name: string; role: string; note: string }[];
    };
  };
  numbers: { label: string; heading: string; stats: Stat[] };
  strengths: {
    label: string;
    heading: string;
    items: { icon: string; title: string; description: string }[];
  };
  /** Certification block; leave out when the site holds no certificate. */
  quality?: {
    /** Lines inside the round badge. */
    badgeLines: string[];
    badgeCaption: string;
    label: string;
    heading: string;
    paragraphs: { text: string; emphasis?: boolean }[];
    cta?: SiteLink;
  };
  /** Unit sites: "Part of Jai Shree Group" block after the story. */
  parent?: {
    label: string;
    heading: string;
    paragraphs: string[];
    link: SiteLink;
  };
  vision?: string;
  mission?: string;
}

/** Pattern library tool (Shree Perforators). */
export interface PatternLibraryContent {
  hero: PageHeroContent;
  intro: string;
  resultLabel: string;
  /** "Approximate" note next to the result. */
  note: string;
  overlapWarning: string;
  emptyText: string;
  drawingCaption: string;
  requestLabel: string;
  previewLabel: string;
}

/** Drawing-upload quote tool (Jai Shree Metal Perforators). */
export interface DrawingQuoteContent {
  hero: PageHeroContent;
  intro: string;
  successText: string;
}

/** Export page (manufacturing units only). */
export interface ExportContent {
  hero: PageHeroContent;
  sections: { heading: string; paragraphs: string[] }[];
}

export interface ContactContent {
  heading: string;
  intro: string;
  /** Line under "Enquiry Sent!" after the form is sent. */
  successText: string;
  /** Rows of the hours card. Without it: the site's hours (or the fallback) and weekly holiday. */
  hours?: { days: string; hours: string; closed: boolean }[];
  /** Group only: every unit's details. A unit site shows only its own. */
  branches?: { heading: string; list: BranchInfo[] };
}

/** The get-quote wizard's own lines. */
export interface QuoteContent {
  heading: string;
  /** Line under "Thank you!" after the request is sent. */
  successText: string;
}

/** Per-site wording for a shared product; facts (specs, patterns, materials) stay in `src/data/`. */
export type ProductCopy = Partial<
  Pick<
    ProductDetail,
    | "name"
    | "tagline"
    | "overview"
    | "strengths"
    | "applications"
    | "faqs"
    | "metaTitle"
    | "metaDescription"
    | "materials"
    | "specifications"
  >
> & { card?: Partial<Pick<ProductCard, "name" | "description">> };

/** Per-site wording for a shared industry page. */
export type IndustryCopy = Partial<
  Pick<
    IndustryDetail,
    | "name"
    | "headline"
    | "description"
    | "applications"
    | "metaTitle"
    | "metaDescription"
    | "clients"
  >
> & {
  /** Short line on the home industry cards. */
  summary?: string;
};

export interface SiteContent {
  meta: {
    home: PageMeta;
    about: PageMeta;
    products: PageMeta;
    industries: PageMeta;
    contact: PageMeta;
    getQuote: PageMeta;
    gallery: PageMeta;
    calculator?: PageMeta;
    group?: PageMeta;
    certifications?: PageMeta;
    clients?: PageMeta;
    blog?: PageMeta;
    export?: PageMeta;
    patternLibrary?: PageMeta;
    drawingQuote?: PageMeta;
  };
  home: HomeContent;
  about: AboutPageContent;
  productsIndex: { hero: PageHeroContent; intro: string };
  industriesIndex: { hero: PageHeroContent };
  contact: ContactContent;
  quote: QuoteContent;
  /** Line under "Get Quote for … Application" on industry pages (sites without a reply promise). */
  industryQuoteText?: string;
  /** Closing banner on the about and industry pages. */
  ctaBanner: { title: string; text: string };
  galleryHero: PageHeroContent;
  /** Only sites with "/export" in `pages`. */
  export?: ExportContent;
  /** Only sites with "/pattern-library" in `pages`. */
  patternLibrary?: PatternLibraryContent;
  /** Only sites with "/drawing-quote" in `pages`. */
  drawingQuote?: DrawingQuoteContent;
  /** Overrides of the shared product copy in `src/data/products.ts`. */
  products?: Partial<Record<ProductSlug, ProductCopy>>;
  /** Overrides of the shared industry copy in `src/data/industries.ts`. */
  industries?: Partial<Record<string, IndustryCopy>>;
}
