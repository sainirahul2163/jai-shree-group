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
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.5!2d73.78!3d18.62!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDM3JzEyLjAiTiA3M8KwNDYnNDguMCJF!5e0!3m2!1sen!2sin!4v1";
const MUMBAI_MAP =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.5!2d72.85!3d19.30!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDE4JzAwLjAiTiA3MsKwNTEnMDAuMCJF!5e0!3m2!1sen!2sin!4v1";

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
      "Leading perforated sheet manufacturers in Pune. CNC & turret punching up to 12mm, 2200×4000mm max size. ISO 9001:2015. Talawade, Bhosari, Pisoli units. Get quote.",
    intro: [
      "Pune is India's automobile manufacturing hub — home to Tata Motors, Bajaj Auto, and hundreds of Tier-1 suppliers in PCMC. Jai Shree Group has served this ecosystem since 1997 from our Talawade facility.",
      "With 6 manufacturing units across Talawade, Bhosari, and Pisoli, we are among the largest perforated sheet manufacturers in Pune — delivering filters, grills, screens, and custom panels to automotive, pharmaceutical, and construction industries.",
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
      { label: "Max Size", value: "2200 × 4000mm" },
      { label: "Process", value: "CNC / Turret Punching" },
      { label: "Materials", value: "SS, MS, GI, Al, Cu, Brass" },
      { label: "Certification", value: "ISO 9001:2015" },
    ],
    faqs: [
      {
        q: "Where are your perforated sheet manufacturing units in Pune?",
        a: "We operate 6 units in Pune at Talawade (4 units), Bhosari, and Pisoli — all within PCMC industrial areas for easy access.",
      },
      {
        q: "What is the minimum order quantity for perforated sheets in Pune?",
        a: "We accept orders from single sheets to bulk production runs. Contact us with your specifications for a quote.",
      },
      {
        q: "Do you deliver perforated sheets from Pune to other cities?",
        a: "Yes, we offer Pan India delivery from our Pune facilities to Mumbai, Nashik, Bangalore, Chennai, Delhi, and all major industrial cities.",
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
      "Expanded metal manufacturers in Pune. Diamond, square & hexagonal patterns. Up to 6mm thick, widths 900/1250/1500mm. ISO certified. Talawade facility. Get quote.",
    intro: [
      "Expanded metal is essential for walkways, facades, filters, and security applications across Pune's construction and industrial sectors. Jai Shree Group manufactures expanded metal at our Dev Shree and main Talawade units.",
      "Located in Pune's auto and engineering hub, we supply anti-skid stair treads, facade cladding, machine guards, and filtration media to builders, architects, and OEMs throughout western India.",
    ],
    facilityName: "Dev Shree Metal Perforators — Talawade",
    facilityAddress:
      "Gat No. 258, Opp. National Weigh Bridge, Jyotibanagar, Talawade, Pune - 411062",
    mapEmbedUrl: PUNE_MAP,
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Dev Shree Metal Perforators Talawade Pune")}`,
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
        q: "Can expanded metal be supplied in custom sheet sizes from Pune?",
        a: "Yes, we cut to custom dimensions. Standard widths are 900mm, 1250mm, and 1500mm with lengths as per requirement.",
      },
    ],
  },
  "pune/wire-mesh-manufacturers": {
    slug: "wire-mesh-manufacturers",
    city: "pune",
    cityName: "Pune",
    productName: "Wire Mesh",
    productSlug: "wire-mesh",
    h1: "Wire Mesh Manufacturers in Pune",
    metaTitle:
      "Wire Mesh Manufacturers Pune | SS Mesh 2-400 Mesh | Jai Shree Group",
    metaDescription:
      "Wire mesh manufacturers in Pune. Plain, twill & crimped weaves. 2 to 400 mesh. SS, MS, brass, copper. Bhosari & Talawade units. ISO certified. Get quote.",
    intro: [
      "Pune's food processing, pharmaceutical, and sugar industries rely on precision wire mesh for sieving, filtration, and conveyor applications. Jai Shree Group manufactures wire mesh from our Bhosari and Talawade units.",
      "From fine 400 mesh SS screens for pharmaceutical equipment to heavy crimped mesh for vibrating screens, our Pune facilities cover the full specification range with ISO 9001:2015 quality control.",
    ],
    facilityName: "Jai Shree Jaliwala — Bhosari",
    facilityAddress:
      "Dolhphin Square, Shop No. 8, Plot No. W68, S Block, MIDC, Bhosari, Pune 411026",
    mapEmbedUrl: PUNE_MAP,
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Jai Shree Jaliwala Bhosari Pune")}`,
    products: [
      "Plain & Twill Wire Mesh",
      "Crimped Mesh",
      "Vibrating Screen Mesh",
      "SS Filter Screens",
    ],
    industries: [
      "Pharmaceutical",
      "Food & Beverage",
      "Sugar Industry",
      "Mining",
    ],
    specs: [
      { label: "Mesh Range", value: "2 to 400 mesh" },
      { label: "Weaves", value: "Plain / Twill / Crimped" },
      { label: "Materials", value: "SS, MS, Brass, Cu, Al, GI" },
      { label: "Wire Diameter", value: "0.025mm to 6mm" },
      { label: "Certification", value: "ISO 9001:2015" },
    ],
    faqs: [
      {
        q: "What mesh sizes can you manufacture in Pune?",
        a: "We manufacture wire mesh from 2 mesh to 400 mesh in plain, twill, and crimped weaves.",
      },
      {
        q: "Do you supply SS wire mesh for food processing in Pune?",
        a: "Yes — food-grade SS wire mesh for conveyor screens, sieves, and processing equipment is a core product from our Pune units.",
      },
      {
        q: "Which Pune unit handles wire mesh manufacturing?",
        a: "Jai Shree Jaliwala at Bhosari MIDC and our Talawade units handle wire mesh and crimped mesh production.",
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
      { label: "Max Size", value: "2200 × 4000mm" },
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
        a: "Yes, we offer Pan India delivery from both our Mumbai and Pune manufacturing networks.",
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
  "mumbai/wire-mesh-manufacturers": {
    slug: "wire-mesh-manufacturers",
    city: "mumbai",
    cityName: "Mumbai",
    productName: "Wire Mesh",
    productSlug: "wire-mesh",
    h1: "Wire Mesh Manufacturers in Mumbai",
    metaTitle:
      "Wire Mesh Manufacturers Mumbai | SS Mesh & Demister Pads | Jai Shree Group",
    metaDescription:
      "Wire mesh manufacturers in Mumbai. SS mesh, demister pads, filtration screens. Masjid Bunder & Bhayander units. Serving petrochemical & pharma. ISO certified. Get quote.",
    intro: [
      "Mumbai's petrochemical refineries, pharmaceutical plants, and port-related industries depend on high-quality wire mesh and demister pads. Jai Shree Filtration at Masjid Bunder has been a trusted supplier since the 1990s.",
      "Our Mumbai wire mesh capabilities include knitted wire mesh for demister pads, SS filter screens, and industrial mesh for gas-liquid separation — serving refineries, chemical plants, and process equipment manufacturers across western India.",
    ],
    facilityName: "Jai Shree Filtration — Masjid Bunder",
    facilityAddress:
      "Shop No. 80-B, Gr. Floor, Keshavji Jadhavji Bldg., 24/26, Khadak Street, Nr. Satkar Hotel, Masjid Bunder Road, Mumbai - 400009",
    mapEmbedUrl: MUMBAI_MAP,
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Jai Shree Filtration Masjid Bunder Mumbai")}`,
    products: [
      "Knitted Wire Mesh",
      "Demister Pads",
      "SS Filter Screens",
      "Mist Eliminators",
    ],
    industries: ["Petrochemical", "Pharmaceutical", "Chemical", "Filtration"],
    specs: [
      { label: "Mesh Range", value: "2 to 400 mesh" },
      { label: "Specialty", value: "Demister Pads / Mist Eliminators" },
      { label: "Materials", value: "SS 304/316, MS, Monel, Inconel" },
      { label: "Construction", value: "Knitted / Woven / Welded" },
      { label: "Certification", value: "ISO 9001:2015" },
    ],
    faqs: [
      {
        q: "Do you manufacture demister pads in Mumbai?",
        a: "Yes — Jai Shree Filtration at Masjid Bunder specializes in demister pads and knitted wire mesh for petrochemical and refinery applications.",
      },
      {
        q: "What wire mesh materials are available from your Mumbai units?",
        a: "We supply SS 304/316, MS, Monel, Inconel, and other alloys for industrial filtration and separation applications.",
      },
      {
        q: "Can you supply custom demister pad sizes for Mumbai refineries?",
        a: "Yes — we manufacture demister pads to custom vessel dimensions with SS construction and grid support as required.",
      },
    ],
  },
};

export const LOCATION_PATHS = Object.keys(LOCATION_PAGES);

export function getLocationPage(path: string): LocationPageData | undefined {
  return LOCATION_PAGES[path];
}
