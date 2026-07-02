export type LocationPageData = {
  slug: string;
  city: "pune" | "mumbai";
  cityName: string;
  productName: string;
  productSlug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  facilityName: string;
  facilityAddress: string;
  mapEmbedUrl: string;
  googleMapsUrl: string;
  products: string[];
  industries: string[];
  specs: { label: string; value: string }[];
  faqs: { q: string; a: string }[];
};

const PUNE_ADDRESS =
  "Gat No. 93, Near Sonawane Wasti, Jyotibanagar, Talawade, Pune - 411062";
const MUMBAI_ADDRESS =
  "L-9, Swastik Industrial Estate, Behind Gaurav Dharam Kanta, Bhayander East, Mumbai - 401105";

const PUNE_MAP =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.52!2d73.78999!3d18.68313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b79effffffff%3A0x1f3e66f3499a09a2!2sJaishree%20Metal%20Perforators!5e0!3m2!1sen!2sin!4v1700000000001!5m2!1sen!2sin";
const MUMBAI_MAP =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.92!2d72.85452!3d19.34521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s!2zMTnCsDIwJzQyLjgiTiA3MsKwNTEnMjIuMiJF!5e0!3m2!1sen!2sin!4v1700000000002!5m2!1sen!2sin";

export const LOCATION_PAGES: Record<string, LocationPageData> = {
  "pune/perforated-sheet-manufacturers": {
    slug: "perforated-sheet-manufacturers",
    city: "pune",
    cityName: "Pune",
    productName: "Perforated Sheets",
    productSlug: "perforated-sheets",
    h1: "Perforated Sheet Manufacturers in Pune",
    metaTitle:
      "Perforated Sheet Manufacturers Pune | CNC Perforation Talawade | Jai Shree Group",
    metaDescription:
      "Leading perforated sheet manufacturers in Pune. CNC & turret punching up to 12mm. ISO 9001:2015. Talawade units. Get quote.",
    intro: [
      "Pune is India's automobile manufacturing hub — home to Tata Motors, Bajaj Auto, and hundreds of Tier-1 suppliers in PCMC. Jai Shree Group has served this ecosystem since 1997 from our Talawade facility.",
      "With 3 manufacturing units in Talawade, we are among the leading perforated sheet manufacturers in Pune — delivering filters, grills, screens, and custom panels to automotive, pharmaceutical, and construction industries.",
    ],
    facilityName: "Jai Shree Metal Perforators — Talawade",
    facilityAddress: PUNE_ADDRESS,
    mapEmbedUrl: PUNE_MAP,
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(PUNE_ADDRESS)}`,
    products: [
      "Perforated Sheets (CNC & Turret)",
      "Custom Hole Patterns",
      "Speaker Grills & Filters",
      "Architectural Panels",
    ],
    industries: [
      "Automobile",
      "Pharmaceutical",
      "Construction",
      "Food Processing",
    ],
    specs: [
      { label: "Max Thickness", value: "12mm" },
      { label: "Process", value: "CNC / Turret Punching" },
      { label: "Materials", value: "SS, MS, GI, Al, Cu, Brass" },
      { label: "Certification", value: "ISO 9001:2015" },
    ],
    faqs: [
      {
        q: "Where are your perforated sheet manufacturing units in Pune?",
        a: "We operate 3 units in Pune at Talawade — all within PCMC industrial areas for easy access.",
      },
      {
        q: "What is the minimum order quantity for perforated sheets in Pune?",
        a: "We accept orders from single sheets to bulk production runs. Contact us with your specifications for a quote.",
      },
      {
        q: "Do you deliver perforated sheets from Pune to other cities?",
        a: "Yes, we offer global delivery from our Pune facilities to Mumbai, Nashik, Bangalore, Chennai, Delhi, and all major industrial cities worldwide.",
      },
    ],
  },
  "pune/laser-cutting-services": {
    slug: "laser-cutting-services",
    city: "pune",
    cityName: "Pune",
    productName: "Laser Cutting",
    productSlug: "laser-cutting",
    h1: "Laser Cutting Services in Pune",
    metaTitle:
      "Laser Cutting Services Pune | Fiber Laser 14mm | Jai Shree Group Talawade",
    metaDescription:
      "Fiber laser cutting services in Pune. Up to 14mm thickness, any custom drawing. SS, MS, Aluminum, Copper. ISO certified Talawade facility. Get quote today.",
    intro: [
      "Pune's engineering and automobile sectors demand precision laser-cut components — from chassis brackets to custom enclosures. Jai Shree Group introduced fiber laser technology in 2015 at our Talawade plant.",
      "Our Pune laser cutting services handle sheets up to 14mm thickness with tight tolerances, supporting automotive OEMs, machine builders, and fabrication shops across Maharashtra's industrial corridor.",
    ],
    facilityName: "Jai Shree Metal Perforators — Talawade",
    facilityAddress: PUNE_ADDRESS,
    mapEmbedUrl: PUNE_MAP,
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(PUNE_ADDRESS)}`,
    products: [
      "Fiber Laser Cutting",
      "Custom Metal Parts",
      "Prototyping & Production",
      "Perforated + Laser Combo",
    ],
    industries: ["Automobile", "Engineering", "Architecture", "Electronics"],
    specs: [
      { label: "Max Thickness", value: "14mm" },
      { label: "Technology", value: "Fiber Laser" },
      { label: "Materials", value: "SS, MS, Al, Cu, Brass, Ti" },
      { label: "Input Format", value: "DXF / DWG / PDF drawings" },
      { label: "Certification", value: "ISO 9001:2015" },
    ],
    faqs: [
      {
        q: "What file formats do you accept for laser cutting in Pune?",
        a: "We accept DXF, DWG, and PDF drawings. Our team can also work from hand sketches for simpler parts.",
      },
      {
        q: "What is the turnaround time for laser cutting orders in Pune?",
        a: "Standard orders are typically completed within 3–5 working days depending on complexity and quantity.",
      },
      {
        q: "Can you combine laser cutting with perforation in Pune?",
        a: "Yes — our Talawade facility offers both fiber laser cutting and CNC perforation under one roof.",
      },
    ],
  },
  "pune/expanded-metal-manufacturers": {
    slug: "expanded-metal-manufacturers",
    city: "pune",
    cityName: "Pune",
    productName: "Expanded Metal",
    productSlug: "expanded-metal",
    h1: "Expanded Metal Manufacturers in Pune",
    metaTitle:
      "Expanded Metal Manufacturers Pune | Diamond & Hex Patterns | Jai Shree Group",
    metaDescription:
      "Expanded metal manufacturers in Pune. Diamond, square & hexagonal patterns. Up to 6mm thick. ISO certified. Talawade facility. Get quote.",
    intro: [
      "Expanded metal is essential for walkways, facades, filters, and security applications across Pune's construction and industrial sectors. Jai Shree Group manufactures expanded metal at our Talawade units.",
      "Located in Pune's auto and engineering hub, we supply anti-skid stair treads, facade cladding, machine guards, and filtration media to builders, architects, and OEMs throughout western India.",
    ],
    facilityName: "Jai Shree Metal Perforators — Talawade",
    facilityAddress: PUNE_ADDRESS,
    mapEmbedUrl: PUNE_MAP,
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(PUNE_ADDRESS)}`,
    products: [
      "Diamond Pattern Expanded Metal",
      "Square & Hexagonal Patterns",
      "Anti-Skid Stair Treads",
      "Facade & Cladding Panels",
    ],
    industries: ["Construction", "Architecture", "Automobile", "Mining"],
    specs: [
      { label: "Max Thickness", value: "6mm" },
      { label: "Widths", value: "900 / 1250 / 1500mm" },
      { label: "Patterns", value: "Diamond / Square / Hex" },
      { label: "Materials", value: "SS, MS, Al, Cu, Brass, GI, Ti" },
      { label: "Certification", value: "ISO 9001:2015" },
    ],
    faqs: [
      {
        q: "What expanded metal patterns are available from your Pune plant?",
        a: "We manufacture diamond, square, and hexagonal expanded metal patterns in various strand widths and open areas.",
      },
      {
        q: "Do you supply expanded metal for building facades in Pune?",
        a: "Yes — architectural expanded metal for facades, ceilings, and decorative panels is a major application we serve across Pune and Maharashtra.",
      },
      {
        q: "What thickness options are available for expanded metal from Pune?",
        a: "We manufacture expanded metal up to 6mm thickness. Sheets can also be supplied in coil form with custom lengths available on request.",
      },
    ],
  },
  "mumbai/perforated-sheet-manufacturers": {
    slug: "perforated-sheet-manufacturers",
    city: "mumbai",
    cityName: "Mumbai",
    productName: "Perforated Sheets",
    productSlug: "perforated-sheets",
    h1: "Perforated Sheet Manufacturers in Mumbai",
    metaTitle:
      "Perforated Sheet Manufacturers Mumbai | Bhayander & Masjid Bunder | Jai Shree Group",
    metaDescription:
      "Perforated sheet manufacturers in Mumbai. Serving port, chemical & industrial sectors from Bhayander, Masjid Bunder & Palghar units. ISO 9001:2015. Get quote.",
    intro: [
      "Mumbai — India's financial capital and largest port — drives demand for perforated sheets in filtration, chemical processing, architecture, and industrial applications. Jai Shree Group has served Mumbai since the 1990s.",
      "Our Mumbai units at Bhayander, Masjid Bunder, and Palghar provide perforated sheets, filtration screens, and custom metal fabrication to refineries, chemical plants, builders, and export-oriented industries across the Mumbai Metropolitan Region.",
    ],
    facilityName: "Jai Shree Industries — Bhayander",
    facilityAddress: MUMBAI_ADDRESS,
    mapEmbedUrl: MUMBAI_MAP,
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MUMBAI_ADDRESS)}`,
    products: [
      "Perforated Sheets",
      "Filtration Screens",
      "Demister Pad Components",
      "Architectural Panels",
    ],
    industries: ["Petrochemical", "Construction", "Pharmaceutical", "Export"],
    specs: [
      { label: "Max Thickness", value: "12mm" },
      { label: "Process", value: "CNC / Turret Punching" },
      { label: "Materials", value: "SS, MS, GI, Al, Cu, Brass" },
      { label: "Certification", value: "ISO 9001:2015" },
    ],
    faqs: [
      {
        q: "Where are your Mumbai perforated sheet manufacturing units?",
        a: "We operate 3 units in the Mumbai region — Bhayander East, Masjid Bunder, and Palghar West.",
      },
      {
        q: "Do you supply perforated sheets for petrochemical plants in Mumbai?",
        a: "Yes — our Jai Shree Filtration unit at Masjid Bunder specializes in filtration and perforated products for refineries and chemical plants.",
      },
      {
        q: "Can you deliver perforated sheets from Mumbai to Pune and other cities?",
        a: "Yes, we offer global delivery from both our Mumbai and Pune manufacturing networks.",
      },
    ],
  },
  "mumbai/laser-cutting-services": {
    slug: "laser-cutting-services",
    city: "mumbai",
    cityName: "Mumbai",
    productName: "Laser Cutting",
    productSlug: "laser-cutting",
    h1: "Laser Cutting Services in Mumbai",
    metaTitle:
      "Laser Cutting Services Mumbai | Fiber Laser Metal Cutting | Jai Shree Group",
    metaDescription:
      "Fiber laser cutting services in Mumbai. Up to 14mm thickness, custom drawings. SS, MS, Aluminum. Bhayander & Palghar units. ISO certified. Get quote today.",
    intro: [
      "Mumbai's fabrication, marine, and export industries require precision laser-cut metal components with fast turnaround. Jai Shree Group provides fiber laser cutting through our Mumbai and Palghar units.",
      "Serving the Mumbai Metropolitan Region's chemical, engineering, and architectural sectors, we cut complex profiles from customer drawings — supporting both prototype development and production runs.",
    ],
    facilityName: "Jai Shree Perforator — Palghar",
    facilityAddress:
      "2, Marudhar Estate, Vill. Aliyali, Next to Tembhode Village, New Satpati Road, Palghar West, Maharashtra",
    mapEmbedUrl: MUMBAI_MAP,
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Jai Shree Perforator Palghar")}`,
    products: [
      "Fiber Laser Cutting",
      "Custom Metal Fabrication",
      "Perforated + Laser Combo",
      "Export-Quality Finishing",
    ],
    industries: ["Engineering", "Architecture", "Petrochemical", "Marine"],
    specs: [
      { label: "Max Thickness", value: "14mm" },
      { label: "Technology", value: "Fiber Laser" },
      { label: "Materials", value: "SS, MS, Al, Cu, Brass, Ti" },
      { label: "Input Format", value: "DXF / DWG / PDF drawings" },
      { label: "Certification", value: "ISO 9001:2015" },
    ],
    faqs: [
      {
        q: "Which Mumbai unit handles laser cutting?",
        a: "Laser cutting is handled at our Palghar and Bhayander units, with support from our Pune Talawade facility for large production runs.",
      },
      {
        q: "Do you offer laser cutting for export orders from Mumbai?",
        a: "Yes — our Palghar unit supports export-oriented production with precision laser cutting and quality documentation.",
      },
      {
        q: "What is the lead time for laser cutting in Mumbai?",
        a: "Standard orders are completed within 3–7 working days depending on complexity. Rush orders can be accommodated on request.",
      },
    ],
  },
  "mumbai/expanded-metal-manufacturers": {
    slug: "expanded-metal-manufacturers",
    city: "mumbai",
    cityName: "Mumbai",
    productName: "Expanded Metal",
    productSlug: "expanded-metal",
    h1: "Expanded Metal Manufacturers in Mumbai",
    metaTitle: "Expanded Metal Manufacturers in Mumbai | Jai Shree Group",
    metaDescription:
      "ISO 9001:2015 certified expanded metal manufacturers in Mumbai. Diamond & hexagonal patterns in SS, MS, GI & AL. Jai Shree Group — 50+ years of precision metalwork. Get free quote.",
    intro: [
      "Mumbai's construction, marine, and industrial sectors rely on expanded metal for walkways, facades, security screens, and filtration support. Jai Shree Group manufactures expanded metal from our Bhayander, Masjid Bunder, and Palghar units.",
      "Serving the Mumbai Metropolitan Region and export markets, we supply diamond, square, and hexagonal expanded metal in stainless steel, MS, GI, and aluminium — with ISO 9001:2015 certified quality and global delivery.",
    ],
    facilityName: "Jai Shree Industries — Bhayander",
    facilityAddress: MUMBAI_ADDRESS,
    mapEmbedUrl: MUMBAI_MAP,
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MUMBAI_ADDRESS)}`,
    products: [
      "Diamond Pattern Expanded Metal",
      "Square & Hexagonal Patterns",
      "Anti-Skid Stair Treads",
      "Facade & Security Panels",
    ],
    industries: ["Construction", "Petrochemical", "Architecture", "Marine"],
    specs: [
      { label: "Max Thickness", value: "6mm" },
      { label: "Widths", value: "900 / 1250 / 1500mm" },
      { label: "Patterns", value: "Diamond / Square / Hex" },
      { label: "Materials", value: "SS, MS, GI, Al, Cu, Brass" },
      { label: "Certification", value: "ISO 9001:2015" },
    ],
    faqs: [
      {
        q: "Where are your Mumbai expanded metal manufacturing units?",
        a: "We operate units at Bhayander East, Masjid Bunder, and Palghar West — serving Mumbai and the wider Maharashtra industrial belt.",
      },
      {
        q: "Do you supply expanded metal for building facades in Mumbai?",
        a: "Yes — architectural expanded metal for facades, ceilings, and decorative panels is a major application we serve across Mumbai.",
      },
      {
        q: "Can you deliver expanded metal from Mumbai to Pune and other cities?",
        a: "Yes, we offer global delivery from our Mumbai and Pune manufacturing networks.",
      },
    ],
  },
};

export const LOCATION_PATHS = Object.keys(LOCATION_PAGES);

export function getLocationPage(path: string): LocationPageData | undefined {
  return LOCATION_PAGES[path];
}
