export type IndustryDetail = {
  name: string;
  slug: string;
  headline: string;
  description: string;
  applications: string[];
  products: string[];
  clients?: string;
  metaTitle: string;
  metaDescription: string;
};

export const INDUSTRY_DETAILS: Record<string, IndustryDetail> = {
  automobile: {
    name: "Automobile Industry",
    slug: "automobile",
    headline: "Precision Metal Components for Automotive Applications",
    description:
      "Jai Shree Group supplies perforated sheets, laser-cut components, and expanded metal to leading automobile manufacturers across India.",
    applications: [
      "Automobile Filters — perforated sheets for oil, air, fuel filters",
      "Engine Grills and Guards",
      "Speaker Grills (perforated SS/Al)",
      "Exhaust System Components",
      "Radiator Mesh Screens",
      "Seating Mesh Components",
    ],
    products: [
      "perforated-sheets",
      "expanded-metal",
      "laser-cutting",
      "turret-punching",
    ],
    clients:
      "Tata Motors, Bajaj Auto, and Tier-1 automotive suppliers in Pune PCMC",
    metaTitle:
      "Perforated Sheets for Automobile Industry | Automotive Mesh Pune | Jai Shree Group",
    metaDescription:
      "Perforated sheets, expanded metal and laser cutting for automobile industry. Filters, grills, guards. Serving Tata, Bajaj and Tier-1 suppliers from Pune. Get quote.",
  },
  construction: {
    name: "Construction & Architecture",
    slug: "construction",
    headline: "Architectural Metal Solutions for Modern Construction",
    description:
      "From building facades to safety guards, Jai Shree Group provides perforated sheets and expanded metal for construction and architectural applications.",
    applications: [
      "Building Facades and Cladding",
      "Architectural Decorative Panels",
      "Safety Guards and Barriers",
      "Cable Trays and Management",
      "Stair Treads (expanded metal anti-skid)",
      "Ceiling Tiles and Panels",
      "Partition Screens",
    ],
    products: [
      "perforated-sheets",
      "expanded-metal",
      "laser-cutting",
      "turret-punching",
    ],
    metaTitle:
      "Perforated Sheets for Construction | Architectural Metal Panels Pune | Jai Shree Group",
    metaDescription:
      "Perforated sheets and expanded metal for construction and architecture. Facades, panels, safety guards, cable trays. Pune & Mumbai manufacturers. Get quote.",
  },
  "food-beverage": {
    name: "Food & Beverage",
    slug: "food-beverage",
    headline: "Food-Grade Metal Screens for Processing Industry",
    description:
      "SS perforated screens, laser-cut components, and conveyor systems for food and beverage processing — meeting hygiene and safety standards.",
    applications: [
      "Conveyor Belt Screens",
      "Food Processing Sieves",
      "Vibrating Screens for Grain Processing",
      "Washing and Cleaning Screens",
      "Drying and Cooling Meshes",
      "Sugar Industry Screens (Huller, Herringbone)",
    ],
    products: ["perforated-sheets", "laser-cutting", "custom-components"],
    metaTitle:
      "Perforated Sheets for Food Processing Industry | SS Screens India | Jai Shree Group",
    metaDescription:
      "Perforated screens and precision metal components for food and beverage processing. Conveyor screens, vibrating screens, food-grade sieves. ISO certified. Pune manufacturers.",
  },
  pharmaceutical: {
    name: "Pharmaceutical",
    slug: "pharmaceutical",
    headline: "Precision Screens for Pharmaceutical Equipment",
    description:
      "Clean room panels, SS screens, and precision perforated sheets for pharmaceutical machinery and equipment.",
    applications: [
      "Pharmaceutical Equipment Screens",
      "Clean Room Panels",
      "Tablet Coating Drum Perforations",
      "Vibrating Sieve Screens",
      "Filter Housings",
      "Drying Tray Mesh",
    ],
    products: ["perforated-sheets", "laser-cutting", "custom-components"],
    metaTitle:
      "Perforated Sheets for Pharmaceutical Industry | SS Mesh India | Jai Shree Group",
    metaDescription:
      "Perforated sheets and precision metal screens for pharmaceutical industry. Clean room panels, equipment screens, tablet coating drums. ISO certified manufacturers Pune.",
  },
  petrochemical: {
    name: "Petrochemical",
    slug: "petrochemical",
    headline: "Perforated Metal Components for Petrochemical Plants",
    description:
      "Perforated sheets, expanded metal, and corrosion-resistant metal components for refineries and petrochemical processing plants.",
    applications: [
      "Process Vessel Internals",
      "Gas-Liquid Separation",
      "Column Packing Support",
      "Filtration Systems",
      "Ventilation & Safety Screens",
      "Custom Fabricated Components",
    ],
    products: [
      "perforated-sheets",
      "expanded-metal",
      "laser-cutting",
      "custom-components",
    ],
    metaTitle:
      "Perforated Sheets for Petrochemical Industry | Metal Components India | Jai Shree Group",
    metaDescription:
      "Perforated sheets and expanded metal for the petrochemical industry. Corrosion-resistant SS and MS perforated components from Jai Shree Group, Pune.",
  },
  "architecture-interior": {
    name: "Architecture & Interior",
    slug: "architecture-interior",
    headline: "Decorative Metal Mesh for Modern Architecture and Interiors",
    description:
      "Architectural perforated panels and decorative expanded metal for interior and exterior design applications.",
    applications: [
      "Decorative Ceiling Panels",
      "Room Dividers and Screens",
      "Facade Cladding",
      "Furniture Components",
      "Balcony Railings",
      "Ornamental Perforations",
      "Window Grills",
    ],
    products: [
      "perforated-sheets",
      "expanded-metal",
      "custom-components",
    ],
    metaTitle:
      "Architectural Perforated Panels | Decorative Metal Mesh India | Jai Shree Group",
    metaDescription:
      "Decorative perforated panels and expanded metal for architecture and interiors. Facade cladding, ceiling panels, room dividers. Pune manufacturers.",
  },
  "sugar-industry": {
    name: "Sugar Industry",
    slug: "sugar-industry",
    headline: "Specialized Screens for Sugar Processing Plants",
    description:
      "Huller screens, herringbone screens, and vibrating screens for sugar mills and processing plants.",
    applications: [
      "Huller Screens",
      "Herringbone Screens",
      "Vibrating Screens",
      "Pulverizing Screens",
      "Perforated Test Sieves",
      "Conveyor Screens",
    ],
    products: ["perforated-sheets", "custom-components"],
    metaTitle:
      "Sugar Industry Screens Manufacturers India | Huller Screens | Jai Shree Group",
    metaDescription:
      "Huller screens, herringbone screens and vibrating screens for sugar industry. Custom perforation, all hole shapes. ISO certified manufacturers Pune. Get quote.",
  },
  "mining-quarrying": {
    name: "Mining & Quarrying",
    slug: "mining-quarrying",
    headline: "Heavy Duty Screens for Mining Operations",
    description:
      "Heavy duty vibrating screens, perforated sheets, and expanded metal for mining, quarrying, and aggregate processing.",
    applications: [
      "Vibrating Screen Panels",
      "Crusher Screen Decks",
      "Aggregate Sizing Screens",
      "Coal Screening Mesh",
      "Mineral Separation Screens",
      "Heavy Duty Perforated Panels",
    ],
    products: [
      "perforated-sheets",
      "expanded-metal",
      "laser-cutting",
      "custom-components",
    ],
    metaTitle:
      "Mining Screens Manufacturers India | Perforated & Expanded Metal | Jai Shree Group",
    metaDescription:
      "Heavy duty perforated sheets and expanded metal for mining and quarrying. Vibrating screen panels, crusher decks, aggregate sizing. ISO certified manufacturers Pune. Get quote.",
  },
};

export const INDUSTRY_SLUGS = Object.keys(INDUSTRY_DETAILS);

export function getIndustryDetail(slug: string): IndustryDetail | undefined {
  return INDUSTRY_DETAILS[slug];
}
