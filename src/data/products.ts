export type ProductFaq = { q: string; a: string };
export type ProductSpec = { label: string; value: string };

export type ProductDetail = {
  slug: string;
  name: string;
  tagline: string;
  overview: string[];
  specifications: ProductSpec[];
  strengths: string[];
  applications: string[];
  patterns?: string[];
  faqs: ProductFaq[];
  metaTitle: string;
  metaDescription: string;
  materials: string[];
};

export const PRODUCT_DETAILS: Record<string, ProductDetail> = {
  "perforated-sheets": {
    slug: "perforated-sheets",
    name: "Perforated Sheet Manufacturer — Pune & Mumbai",
    tagline: "Precision perforated to your exact specifications",
    overview: [
      "Manufactured at Shree Perforators and Jai Shree Metal Perforators facilities in Pune and Mumbai, our perforated sheets meet the highest quality standards under ISO 9001:2015. Jai Shree Group manufactures perforated sheets using advanced CNC and Turret Punching technology. With over 50 years of experience, we deliver precision-perforated sheets in any metal, any hole pattern, and any size.",
      "Our punching capability extends up to 12mm thickness. We specialize in bow and warpage control — ensuring perfectly flat sheets every time.",
      "From standard round holes to complex custom patterns, our R&D team develops special dies and tools for any customer specification.",
    ],
    specifications: [
      { label: "Max Thickness", value: "Up to 12mm" },
      { label: "Hole Diameter", value: "Up to thickness of metal" },
      {
        label: "Categories",
        value: "CNC, Turret, Multi, Coil-to-Coil, Coil-to-Pieces, Laser",
      },
      { label: "Finishing", value: "Painted, Polished, Electro Plating available" },
    ],
    strengths: [
      "Punch up to 12mm thickness in any metal",
      "Hole size up to the thickness of material",
      "In-house Shearing, Bending and Leveling",
      "Specialization in bow/warpage control",
      "Prompt development of custom perforation jobs",
    ],
    applications: [
      "Automobile Filters",
      "Architectural Decoration",
      "Speaker Grills",
      "Chemical Machinery",
      "Pharmaceutical Equipment",
      "Food Processing",
      "Sugar Industries",
      "Conveyor Systems",
      "Central Air Conditioning",
      "Paper Making",
    ],
    patterns: [
      "60° Staggered Round",
      "Straight Line Round",
      "45° Staggered Round",
      "Square Staggered",
      "Straight Line Square",
      "Hexagonal Staggered",
      "Ornamental",
      "Side Staggered Slots",
      "Straight Line Slots",
      "End Staggered Slots",
    ],
    faqs: [
      {
        q: "What is the maximum thickness you can perforate?",
        a: "We can perforate up to 12mm thickness plates in any metal including Stainless Steel, MS, GI, Aluminum, Copper, and Brass.",
      },
      {
        q: "What materials are available for perforated sheets?",
        a: "We work with Stainless Steel, MS (Mild Steel), GI (Galvanized Iron), Aluminum, Copper, Brass, Titanium, PVC, and PP Sheet.",
      },
      {
        q: "Can you make custom hole patterns?",
        a: "Yes, our R&D team develops special dies and tools for any custom hole pattern, shape, or configuration as per your drawing.",
      },
      {
        q: "Do you supply perforated sheets in Pune and Mumbai?",
        a: "Yes, we have 3 manufacturing units in Pune (Talawade) and 3 units in Mumbai (Masjid Bunder, Bhayander, Palghar).",
      },
    ],
    metaTitle: "Perforated Sheet Manufacturer Pune Mumbai | Jai Shree",
    metaDescription:
      "Leading perforated sheet manufacturer in Pune & Mumbai. CNC turret perforated sheet manufacturing up to 12mm. Export & global delivery. ISO 9001:2015. Get quote.",
    materials: [
      "Stainless Steel",
      "MS (Mild Steel)",
      "GI (Galvanized Iron)",
      "Aluminum",
      "Copper",
      "Brass",
      "Titanium",
      "PVC",
    ],
  },
  "laser-cutting": {
    slug: "laser-cutting",
    name: "Laser Cutting Services — Pune & Mumbai",
    tagline: "Fiber laser precision for any metal, any drawing",
    overview: [
      "Manufactured at Shree Perforators and Jai Shree Metal Perforators facilities in Pune and Mumbai, our laser cutting services meet the highest quality standards under ISO 9001:2015. Jai Shree Group offers state-of-the-art fiber laser cutting services in Pune and Mumbai. Our latest fiber laser technology can cut virtually any metal with exceptional precision and clean edges.",
      "We accept custom drawings in any format and can process plates up to 14mm thickness. Our combination of Turret Punching with Laser Cutting offers significant cost savings for complex jobs.",
      "Laser cutting is used across aerospace, automotive, electronics, semiconductor, and medical sectors — and we serve all these industries from our Talawade, Pune facility.",
    ],
    specifications: [
      { label: "Max Thickness", value: "Up to 14mm" },
      { label: "Technology", value: "Fiber Laser" },
      { label: "Drawing Formats", value: "Any custom drawing/DXF/DWG" },
      {
        label: "Special Feature",
        value: "Turret + Laser combination for cost saving",
      },
      { label: "Finishing", value: "Bow/warpage control after cutting" },
    ],
    strengths: [
      "Accepts up to 14mm thickness for laser cutting",
      "Process any specific drawing in any metal",
      "Prompt development of customized jobs",
      "Turret Punching + Laser combination for cost saving",
      "Specialization in bow/warpage control after cutting",
    ],
    applications: [
      "Aerospace Components",
      "Automotive Parts",
      "Electronics Enclosures",
      "Medical Equipment",
      "Architectural Panels",
      "Industrial Machinery",
      "Semiconductor Equipment",
    ],
    faqs: [
      {
        q: "What thickness can you laser cut?",
        a: "We accept up to 14mm thickness plates for laser cutting in MS, Stainless Steel, Aluminum, Copper, Brass, and Titanium.",
      },
      {
        q: "Can you cut from my custom drawing?",
        a: "Yes, we can process any specific drawing in any metal. We accept DXF, DWG, and other standard CAD formats.",
      },
      {
        q: "What is the advantage of combining Turret Punching with Laser?",
        a: "The combination allows cost optimization — standard holes are turret punched (faster, cheaper) while complex shapes are laser cut. This significantly reduces per-part cost.",
      },
      {
        q: "Do you offer laser cutting services in Pune?",
        a: "Yes, our laser cutting facility is located at Talawade, Pune with the latest fiber laser technology. We also serve Mumbai, Nashik, and worldwide.",
      },
      {
        q: "How long does a laser cutting job take?",
        a: "Standard jobs are completed within 2-5 working days depending on complexity and quantity. Urgent jobs can be accommodated — contact us for timeline.",
      },
    ],
    metaTitle: "Laser Cutting Services Pune & Mumbai | Jai Shree Group",
    metaDescription:
      "Professional fiber laser cutting services in Pune & Mumbai. Up to 14mm thickness, any metal, any drawing. ISO certified. CNC precision. Get free quote today.",
    materials: [
      "Stainless Steel",
      "MS (Mild Steel)",
      "Aluminum",
      "GI (Galvanized Iron)",
      "Copper",
      "Brass",
      "Titanium",
    ],
  },
  "expanded-metal": {
    slug: "expanded-metal",
    name: "Expanded Metal Manufacturer — Pune & Mumbai",
    tagline: "Versatile expanded metal sheets for every application",
    overview: [
      "Manufactured at Shree Perforators and Jai Shree Metal Perforators facilities in Pune and Mumbai, our expanded metal products meet the highest quality standards under ISO 9001:2015. Jai Shree Group manufactures expanded metal sheets using the slitting-and-stretching process — creating holes from a single sheet of metal with minimum waste and maximum strength.",
      "Available in Diamond, Square, Hexagonal, Grating, and Half Round patterns up to 6mm maximum thickness.",
      "Expanded metal offers excellent strength-to-weight ratio and anti-skid properties for safety and industrial applications.",
    ],
    specifications: [
      { label: "Max Thickness", value: "Up to 6mm" },
      {
        label: "Patterns",
        value: "Diamond, Square, Hexagonal, Grating, Half Round",
      },
    ],
    strengths: [
      "Minimum waste — no material punched out",
      "Cost saving compared to perforated sheets",
      "Manufactured from single piece of metal",
      "Can be welded, deep drawn, and folded",
      "Anti-skid knuckle surface for safety applications",
      "Special designs at customer request",
    ],
    applications: [
      "Architectural Decoration",
      "Highway Fencing",
      "Safety Doors",
      "Machine Guards",
      "Animal Cages",
      "Fan Covers/Guards",
      "Room Dividers",
      "Decorative Ceiling",
      "Building Plaster Trims",
      "Crane Walkways",
    ],
    faqs: [
      {
        q: "What is expanded metal?",
        a: "Expanded metal is made by slitting and stretching a single metal sheet to create diamond or other shaped openings. Unlike perforated sheets, no material is removed — resulting in minimum waste.",
      },
      {
        q: "What patterns are available in expanded metal?",
        a: "We manufacture Diamond, Square, Hexagonal, Grating, and Half Round patterns. Special designs are also available at customer request.",
      },
      {
        q: "What is the maximum thickness for expanded metal sheets?",
        a: "Maximum thickness is 6mm. Sheets can also be supplied in coil form with custom lengths available on request.",
      },
      {
        q: "What is the difference between expanded metal and perforated sheet?",
        a: "Expanded metal is made by slitting and stretching (no waste), while perforated sheets are made by punching holes (material removed). Expanded metal is generally more cost-effective and has better strength-to-weight ratio.",
      },
    ],
    metaTitle: "Expanded Metal Manufacturers Pune Mumbai | Jai Shree",
    metaDescription:
      "Expanded mesh manufacturers in Pune & Mumbai. Diamond, square, hexagonal patterns. Up to 6mm thick. Export & global delivery. ISO certified. Get quote.",
    materials: [
      "Stainless Steel",
      "MS (Mild Steel)",
      "Brass",
      "Copper",
      "Aluminum",
      "GI (Galvanized Iron)",
      "Titanium",
      "Nickel",
    ],
  },
  "turret-punching": {
    slug: "turret-punching",
    name: "CNC Turret Punching — Pune",
    tagline: "CNC turret punching for any hole shape in any metal",
    overview: [
      "Manufactured at Shree Perforators and Jai Shree Metal Perforators facilities in Pune and Mumbai, our turret punching services meet the highest quality standards under ISO 9001:2015. Jai Shree Group offers CNC Turret Punching services for any hole shape and pattern. Our turret punching machines can create round, square, rectangular, oblong, hex, and conical holes in Stainless Steel, MS, GI, Aluminum, Brass, and Copper.",
      "The key advantage of Turret Punching combined with Laser Cutting is significant cost saving on complex parts — standard shapes are punched (fast, economical) while complex cutouts are laser cut.",
      "Our R&D team develops special dies and tools for any non-standard hole shape as per customer specification.",
    ],
    specifications: [
      {
        label: "Hole Shapes",
        value: "Round, Square, Rectangular, Oblong, Hex, Conical, Custom",
      },
      { label: "Process", value: "CNC Turret Punching" },
      {
        label: "Special Feature",
        value: "Combined with Laser for cost saving",
      },
      { label: "Dies & Tools", value: "Special dies developed by in-house R&D" },
      { label: "Materials", value: "SS, MS, GI, Aluminum, Brass, Copper" },
    ],
    strengths: [
      "CNC precision for any hole shape",
      "Combined Turret + Laser for cost optimization",
      "Special dies developed by in-house R&D team",
      "Any hole shape: round, square, hex, conical, custom",
      "Prompt development of custom tooling",
    ],
    applications: [
      "Perforated Screens",
      "Industrial Panels",
      "Architectural Components",
      "Enclosures",
      "Cable Management",
      "Filtration Plates",
    ],
    faqs: [
      {
        q: "What hole shapes can you punch?",
        a: "We can punch Round, Square, Rectangular, Oblong, Hexagonal, and Conical holes. Custom shapes are also possible with special dies developed by our R&D team.",
      },
      {
        q: "What is the advantage of Turret Punching over Laser Cutting?",
        a: "Turret Punching is faster and more economical for standard shapes in high volumes. When combined with Laser Cutting for complex shapes, overall job cost is significantly reduced.",
      },
      {
        q: "Can you make special dies for custom hole shapes?",
        a: "Yes, our R&D team actively develops special dies and tools for any customer specification. Custom tooling can be developed for bulk orders.",
      },
      {
        q: "What materials can be turret punched?",
        a: "We punch Stainless Steel, MS (Mild Steel), GI (Galvanized Iron), Aluminum, Brass, and Copper in various thicknesses.",
      },
      {
        q: "Do you offer turret punching job work in Pune?",
        a: "Yes, we offer CNC turret punching job work from our Talawade, Pune facility. We serve clients across Pune, Mumbai, and worldwide.",
      },
    ],
    metaTitle: "CNC Turret Punching Services Pune | Jai Shree Group",
    metaDescription:
      "CNC turret perforated sheet manufacturing in Pune & Mumbai. Any hole shape in SS, MS, GI, Aluminum. Combined with laser for cost saving. ISO certified. Get free quote.",
    materials: [
      "Stainless Steel",
      "MS (Mild Steel)",
      "GI (Galvanized Iron)",
      "Aluminum",
      "Brass",
      "Copper",
    ],
  },
  "precision-sheet-leveling": {
    slug: "precision-sheet-leveling",
    name: "Precision Sheet Leveling — Pune & Mumbai",
    tagline: "Bow and warpage control for perfectly flat sheets",
    overview: [
      "Manufactured at Shree Perforators and Jai Shree Metal Perforators facilities in Pune and Mumbai, our precision sheet leveling services meet the highest quality standards under ISO 9001:2015. Jai Shree Group specializes in Precision Sheet Leveling — the process of correcting bow, warpage, and camber in perforated sheets, laser cut parts, and expanded metal to achieve perfectly flat finished products.",
      "Sheet leveling is critical after perforation or laser cutting, as these processes can induce internal stresses causing the sheet to bow or warp. Our specialized leveling equipment restores flatness to the tightest tolerances.",
      "This service is available for all metals and is particularly valuable for applications requiring precise fit, such as automotive components, architectural panels, and precision engineering parts.",
    ],
    specifications: [
      { label: "Max Thickness", value: "Up to 5mm" },
      { label: "Process", value: "Roller leveling, tension leveling" },
      { label: "Application", value: "Post-perforation, post-laser cutting" },
      { label: "Materials", value: "All metals" },
      { label: "Tolerance", value: "As per customer requirement" },
    ],
    strengths: [
      "Specialization in bow/warpage control",
      "Post-perforation and post-laser cutting leveling",
      "All metals processed",
      "Tight flatness tolerances achievable",
      "In-house facility — no outsourcing",
    ],
    applications: [
      "Perforated Sheet Flattening",
      "Laser Cut Part Leveling",
      "Expanded Metal Leveling",
      "Automotive Components",
      "Architectural Panels",
      "Precision Engineering Parts",
    ],
    faqs: [
      {
        q: "Why do perforated sheets need leveling?",
        a: "Perforation and laser cutting processes create internal stresses in the metal sheet, which can cause bowing or warping. Precision leveling restores the sheet to flatness, which is essential for proper fit and function.",
      },
      {
        q: "What metals can you level?",
        a: "We offer precision leveling for all metals including Stainless Steel, MS, GI, Aluminum, Copper, and Brass sheets.",
      },
      {
        q: "Is sheet leveling available as a standalone service?",
        a: "Yes, we offer sheet leveling as a standalone job work service. You can send your perforated or cut sheets to our Pune facility for leveling.",
      },
      {
        q: "What flatness tolerance can you achieve?",
        a: "Flatness tolerance depends on the material, thickness, and application. We work to customer-specified tolerances — contact us with your requirements.",
      },
    ],
    metaTitle: "Precision Sheet Leveling Pune & Mumbai | Jai Shree",
    metaDescription:
      "Precision sheet leveling and flattening services in Pune. Bow and warpage correction for perforated sheets and laser cut parts. All metals. ISO certified. Get quote.",
    materials: ["All Metals"],
  },
  "custom-components": {
    slug: "custom-components",
    name: "Custom Metal Components — Pune",
    tagline: "Any shape, any metal, any specification — we engineer it.",
    overview: [
      "Manufactured at Shree Perforators and Jai Shree Metal Perforators facilities in Pune and Mumbai, our custom components meet the highest quality standards under ISO 9001:2015. Jai Shree Group undertakes special custom fabrication jobs that go beyond standard products. Our in-house R&D team develops special dies, tools, and machineries as per specific customer requirements.",
      "From embossed plates and dimple de-stoners to huller screens, herringbone screens, and perforated test sieves — we manufacture any custom component in any metal.",
      "Pulverizing screens in Round, Square, Rectangular, Oblong, Hex & Conical holes and any type of hole by Turret Punching in Stainless Steel, MS, GI, Aluminum, Brass, Copper.",
    ],
    specifications: [
      {
        label: "Hole Types",
        value: "Round, Square, Rectangular, Oblong, Hex, Conical, Custom",
      },
      {
        label: "Materials",
        value: "SS, MS, GI, Aluminum, Brass, Copper",
      },
      {
        label: "Special Jobs",
        value: "Embossed Plates, Huller Screens, Herringbone Screens",
      },
      { label: "Process", value: "CNC Turret Punching, Laser Cutting, Special Dies" },
      { label: "Drawings", value: "DXF, DWG or customer sample accepted" },
    ],
    strengths: [
      "In-house R&D team develops special dies and tools",
      "Any hole shape in any metal",
      "Accept customer drawings or samples",
      "Special machineries developed as per requirement",
      "Embossed plates, trays, dimple de-stoners",
      "Huller screens and herringbone screens",
      "Perforated test sieves in all shapes",
    ],
    applications: [
      "Custom Embossed Plates",
      "Huller Screens",
      "Herringbone Screens",
      "Perforated Test Sieves",
      "Pulverizing Screens",
      "Dimple De-Stoners",
      "Special Industrial Components",
      "OEM Parts",
    ],
    faqs: [
      {
        q: "Can you manufacture from my custom drawing?",
        a: "Yes, we accept DXF, DWG, PDF drawings or physical samples. Our R&D team will develop special dies if required.",
      },
      {
        q: "What is the minimum order quantity for custom components?",
        a: "MOQ depends on complexity of the job. Contact us with your requirement and drawing for a quote.",
      },
      {
        q: "How long does custom component development take?",
        a: "Standard custom jobs: 5-7 working days. Jobs requiring new die development: 10-15 working days. Urgent jobs accommodated.",
      },
      {
        q: "What hole shapes can you make for custom jobs?",
        a: "Round, Square, Rectangular, Oblong, Hexagonal, Conical, and completely custom shapes with special dies developed by our R&D team.",
      },
    ],
    metaTitle: "Custom Metal Components Manufacturer Pune | Jai Shree",
    metaDescription:
      "Custom metal component manufacturers in Pune. Special dies, embossed plates, huller screens, herringbone screens, custom perforation. Any drawing, any metal. ISO certified.",
    materials: [
      "Stainless Steel",
      "MS (Mild Steel)",
      "GI (Galvanized Iron)",
      "Aluminum",
      "Brass",
      "Copper",
    ],
  },
};

export const PRODUCT_SLUGS = Object.keys(PRODUCT_DETAILS);

export function getProductDetail(slug: string): ProductDetail | undefined {
  return PRODUCT_DETAILS[slug];
}

export function getRelatedProducts(
  currentSlug: string,
  count = 3
): ProductDetail[] {
  return PRODUCT_SLUGS.filter((slug) => slug !== currentSlug)
    .slice(0, count)
    .map((slug) => PRODUCT_DETAILS[slug]);
}
