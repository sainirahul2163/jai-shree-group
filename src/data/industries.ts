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
      "Jai Shree Group supplies perforated sheets, wire mesh, and expanded metal to leading automobile manufacturers across India.",
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
      "wire-mesh",
      "expanded-metal",
      "laser-cutting",
    ],
    clients:
      "Tata Motors, Bajaj Auto, and Tier-1 automotive suppliers in Pune PCMC",
    metaTitle:
      "Perforated Sheets for Automobile Industry | Automotive Mesh Pune | Jai Shree Group",
    metaDescription:
      "Perforated sheets, wire mesh and expanded metal for automobile industry. Filters, grills, guards. Serving Tata, Bajaj and Tier-1 suppliers from Pune. Get quote.",
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
      "aluminum-grill-profile",
      "welded-mesh",
    ],
    metaTitle:
      "Perforated Sheets for Construction | Architectural Metal Panels Pune | Jai Shree Group",
    metaDescription:
      "Perforated sheets and expanded metal for construction and architecture. Facades, panels, safety guards, cable trays. Pune & Mumbai manufacturers. Get quote.",
  },
  "food-beverage": {
    name: "Food & Beverage",
    slug: "food-beverage",
    headline: "Food-Grade Wire Mesh and Screens for Processing Industry",
    description:
      "SS wire mesh, perforated screens, and conveyor systems for food and beverage processing — meeting hygiene and safety standards.",
    applications: [
      "Conveyor Belt Screens",
      "Food Processing Sieves",
      "Vibrating Screens for Grain Processing",
      "Washing and Cleaning Screens",
      "Drying and Cooling Meshes",
      "Sugar Industry Screens (Huller, Herringbone)",
    ],
    products: ["wire-mesh", "perforated-sheets", "welded-mesh"],
    metaTitle:
      "Wire Mesh for Food Processing Industry | SS Screens India | Jai Shree Group",
    metaDescription:
      "SS wire mesh and perforated screens for food and beverage processing. Conveyor screens, vibrating screens, food-grade sieves. ISO certified. Pune manufacturers.",
  },
  pharmaceutical: {
    name: "Pharmaceutical",
    slug: "pharmaceutical",
    headline: "Precision Screens and Mesh for Pharmaceutical Equipment",
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
    products: ["perforated-sheets", "wire-mesh", "demister-pad"],
    metaTitle:
      "Perforated Sheets for Pharmaceutical Industry | SS Mesh India | Jai Shree Group",
    metaDescription:
      "Perforated sheets and SS wire mesh for pharmaceutical industry. Clean room panels, equipment screens, tablet coating drums. ISO certified manufacturers Pune.",
  },
  petrochemical: {
    name: "Petrochemical",
    slug: "petrochemical",
    headline: "Demister Pads and Industrial Mesh for Petrochemical Plants",
    description:
      "Demister pads, mist eliminators, and industrial wire mesh for refineries and petrochemical processing plants.",
    applications: [
      "Demister Pads / Mist Eliminators",
      "Gas-Liquid Separation",
      "Column Packing Support",
      "Process Vessel Internals",
      "Filtration Systems",
    ],
    products: ["demister-pad", "wire-mesh", "perforated-sheets"],
    metaTitle:
      "Demister Pads for Petrochemical Industry | Mist Eliminator India | Jai Shree Group",
    metaDescription:
      "Demister pads and mist eliminators for petrochemical and refinery applications. Knitted wire mesh, SS construction. Custom sizes. ISO certified. Get quote.",
  },
  "architecture-interior": {
    name: "Architecture & Interior",
    slug: "architecture-interior",
    headline: "Decorative Metal Mesh for Modern Architecture and Interiors",
    description:
      "Architectural perforated panels, aluminum grills, and decorative expanded metal for interior and exterior design applications.",
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
      "aluminum-grill-profile",
      "expanded-metal",
    ],
    metaTitle:
      "Architectural Perforated Panels | Decorative Metal Mesh India | Jai Shree Group",
    metaDescription:
      "Decorative perforated panels, aluminum grills and expanded metal for architecture and interiors. Facade cladding, ceiling panels, room dividers. Pune manufacturers.",
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
    products: ["perforated-sheets", "wire-mesh"],
    metaTitle:
      "Sugar Industry Screens Manufacturers India | Huller Screens | Jai Shree Group",
    metaDescription:
      "Huller screens, herringbone screens and vibrating screens for sugar industry. Custom perforation, all hole shapes. ISO certified manufacturers Pune. Get quote.",
  },
  "mining-quarrying": {
    name: "Mining & Quarrying",
    slug: "mining-quarrying",
    headline: "Heavy Duty Screens and Mesh for Mining Operations",
    description:
      "Heavy duty vibrating screens, crimped mesh, and welded mesh for mining, quarrying, and aggregate processing.",
    applications: [
      "Vibrating Screen Panels",
      "Crusher Screen Decks",
      "Aggregate Sizing Screens",
      "Coal Screening Mesh",
      "Mineral Separation Screens",
      "Heavy Duty Welded Mesh",
    ],
    products: ["wire-mesh", "welded-mesh", "perforated-sheets"],
    metaTitle:
      "Mining Screens Manufacturers India | Vibrating Screen Mesh | Jai Shree Group",
    metaDescription:
      "Heavy duty vibrating screens and mesh for mining and quarrying. Crimped mesh, welded mesh, perforated screens. ISO certified manufacturers Pune. Get quote.",
  },
};

export const INDUSTRY_SLUGS = Object.keys(INDUSTRY_DETAILS);

export function getIndustryDetail(slug: string): IndustryDetail | undefined {
  return INDUSTRY_DETAILS[slug];
}
