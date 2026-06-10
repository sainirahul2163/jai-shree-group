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
    name: "Perforated Sheets",
    tagline: "Precision perforated to your exact specifications",
    overview: [
      "Jai Shree Group manufactures perforated sheets using advanced CNC and Turret Punching technology. With over 50 years of experience, we deliver precision-perforated sheets in any metal, any hole pattern, and any size.",
      "Our maximum width handling capacity is 2200mm × 4000mm, with punching capability up to 12mm thickness. We specialize in bow and warpage control — ensuring perfectly flat sheets every time.",
      "From standard round holes to complex custom patterns, our R&D team develops special dies and tools for any customer specification.",
    ],
    specifications: [
      { label: "Max Thickness", value: "Up to 12mm" },
      { label: "Max Sheet Size", value: "2200mm × 4000mm" },
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
      "Max width handling: 2200mm × 4000mm",
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
        a: "We can perforate up to 12mm thickness plates in any metal including Stainless Steel, Carbon Steel, Aluminum, GI, Copper, and Brass.",
      },
      {
        q: "What materials are available for perforated sheets?",
        a: "We work with Carbon Steel, Stainless Steel, Aluminum, Galvanized Steel, Copper, Brass, Titanium, PVC, and PP Sheet.",
      },
      {
        q: "Can you make custom hole patterns?",
        a: "Yes, our R&D team develops special dies and tools for any custom hole pattern, shape, or configuration as per your drawing.",
      },
      {
        q: "What is the maximum sheet size available?",
        a: "Our maximum width handling capacity is 2200mm (W) × 4000mm (L). Custom sizes can be arranged.",
      },
      {
        q: "Do you supply perforated sheets in Pune and Mumbai?",
        a: "Yes, we have 6 manufacturing units in Pune (Talawade, Bhosari, Pisoli) and 3 units in Mumbai (Masjid Bunder, Bhayander, Palghar).",
      },
    ],
    metaTitle:
      "Perforated Sheet Manufacturers in Pune & Mumbai | Jai Shree Group",
    metaDescription:
      "ISO 9001:2015 certified perforated sheet manufacturers. CNC & Turret perforation up to 12mm, size 2200×4000mm. All metals. Custom patterns. Pune & Mumbai. Get quote.",
    materials: [
      "Carbon Steel",
      "Stainless Steel",
      "Aluminum",
      "Galvanized Steel",
      "Copper",
      "Brass",
      "Titanium",
      "PVC",
    ],
  },
  "laser-cutting": {
    slug: "laser-cutting",
    name: "Laser Cutting",
    tagline: "Fiber laser precision for any metal, any drawing",
    overview: [
      "Jai Shree Group offers state-of-the-art fiber laser cutting services in Pune and Mumbai. Our latest fiber laser technology can cut virtually any metal with exceptional precision and clean edges.",
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
        a: "We accept up to 14mm thickness plates for laser cutting in Carbon Steel, Stainless Steel, Aluminum, Copper, Brass, and Titanium.",
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
        a: "Yes, our laser cutting facility is located at Talawade, Pune with the latest fiber laser technology. We also serve Mumbai, Nashik, and pan India.",
      },
      {
        q: "How long does a laser cutting job take?",
        a: "Standard jobs are completed within 2-5 working days depending on complexity and quantity. Urgent jobs can be accommodated — contact us for timeline.",
      },
    ],
    metaTitle:
      "Laser Cutting Services in Pune & Mumbai | CNC Fiber Laser | Jai Shree Group",
    metaDescription:
      "Professional fiber laser cutting services in Pune & Mumbai. Up to 14mm thickness, any metal, any drawing. ISO certified. CNC precision. Get free quote today.",
    materials: [
      "Carbon Steel",
      "Stainless Steel",
      "Aluminum",
      "Galvanized Steel",
      "Copper",
      "Brass",
      "Titanium",
    ],
  },
  "expanded-metal": {
    slug: "expanded-metal",
    name: "Expanded Metal",
    tagline: "Versatile expanded metal sheets for every application",
    overview: [
      "Jai Shree Group manufactures expanded metal sheets using the slitting-and-stretching process — creating holes from a single sheet of metal with minimum waste and maximum strength.",
      "Available in Diamond, Square, Hexagonal, Grating, and Half Round patterns in standard widths of 900mm, 1250mm, and 1500mm up to 6mm maximum thickness.",
      "Expanded metal offers excellent strength-to-weight ratio, anti-skid properties, and can be further beautified with powder coating, anodizing, or hot dip coating.",
    ],
    specifications: [
      { label: "Standard Widths", value: "900mm, 1250mm, 1500mm" },
      { label: "Max Thickness", value: "Up to 6mm" },
      {
        label: "Patterns",
        value: "Diamond, Square, Hexagonal, Grating, Half Round",
      },
      { label: "Custom Lengths", value: "Available in coil form or cut lengths" },
      { label: "Finishing", value: "Powder coating, anodizing, hot dip coating" },
    ],
    strengths: [
      "Minimum waste — no material punched out",
      "Cost saving compared to perforated sheets",
      "Manufactured from single piece of metal",
      "Can be welded, deep drawn, and folded",
      "Anti-skid knuckle surface for safety applications",
      "Special designs and sizes at customer request",
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
        q: "What are the standard sizes for expanded metal sheets?",
        a: "Standard widths are 900mm, 1250mm, and 1500mm. Custom lengths are available, and sheets can also be supplied in coil form. Maximum thickness is 6mm.",
      },
      {
        q: "What is the difference between expanded metal and perforated sheet?",
        a: "Expanded metal is made by slitting and stretching (no waste), while perforated sheets are made by punching holes (material removed). Expanded metal is generally more cost-effective and has better strength-to-weight ratio.",
      },
      {
        q: "Can expanded metal be powder coated?",
        a: "Yes, expanded metal can be powder coated, anodized, or hot dip coated for enhanced aesthetics and corrosion resistance.",
      },
    ],
    metaTitle:
      "Expanded Metal Sheet Manufacturers in Pune & Mumbai | Jai Shree Group",
    metaDescription:
      "Expanded metal sheet manufacturers in Pune & Mumbai. Diamond, square, hexagonal patterns. Up to 6mm thick. ISO certified. Minimum waste, cost saving. Get quote.",
    materials: [
      "Stainless Steel",
      "Low Carbon Steel",
      "Brass",
      "Copper",
      "Aluminum",
      "Galvanized Steel",
      "Titanium",
      "Nickel",
    ],
  },
  "wire-mesh": {
    slug: "wire-mesh",
    name: "Wire Mesh",
    tagline: "Plain, Twill & Crimped weaves from 2 to 400 mesh",
    overview: [
      "Jai Shree Group manufactures industrial wire mesh in Plain Weave, Twill Weave, and Crimped Weave patterns across the full specification range from 2 mesh to 400 mesh.",
      "Our wire mesh is used across filtration, food processing, pharmaceutical, petrochemical, and automobile industries. We stock a comprehensive range and also manufacture to custom specifications.",
      "Available in Stainless Steel, Carbon Steel, Brass, Copper, Aluminum, GI, Titanium, and Nickel — with full specification charts for wire diameter, opening size, and open area percentage.",
    ],
    specifications: [
      { label: "Mesh Range", value: "2 mesh to 400 mesh" },
      { label: "Weave Types", value: "Plain Weave, Twill Weave, Crimped Weave" },
      { label: "Wire Diameter", value: "0.04mm to 2.6mm (varies by mesh)" },
      { label: "Opening Size", value: "0.04mm to 10.36mm" },
      { label: "Standard Widths", value: "As per specification" },
    ],
    strengths: [
      "Full range from 2 to 400 mesh available",
      "Plain, Twill and Crimped weave options",
      "All metals — SS, MS, Brass, Copper, Aluminum, GI, Nickel",
      "Custom widths and lengths available",
      "Detailed specification chart for all mesh sizes",
    ],
    applications: [
      "Filtration & Separation",
      "Refinery Oil Fields",
      "Petrochemical Industries",
      "Food Industry",
      "Heat Treating",
      "Automobile Industries",
      "Paper Industries",
      "Sugar Industries",
      "Building & Construction",
      "Window & Safety Guard",
    ],
    faqs: [
      {
        q: "What mesh sizes are available?",
        a: "We manufacture wire mesh from 2 mesh to 400 mesh, covering the full range of industrial filtration and separation requirements.",
      },
      {
        q: "What is the difference between plain weave and twill weave?",
        a: "Plain weave has each wire crossing over and under alternating wires — simpler and more rigid. Twill weave crosses over two and under two — allowing finer mesh with heavier wire, giving better strength and flow.",
      },
      {
        q: "What materials are available for wire mesh?",
        a: "We stock Stainless Steel, Carbon Steel, Low Carbon Steel, Brass, Copper, Aluminum, Galvanized Steel, Titanium, and Nickel wire mesh.",
      },
      {
        q: "Can I get wire mesh cut to size?",
        a: "Yes, we supply wire mesh in custom widths and lengths as per your requirement. Standard rolls and sheets are also available.",
      },
      {
        q: "Do you supply SS wire mesh in Pune?",
        a: "Yes, Stainless Steel wire mesh is available from our Talawade, Pune facility. We supply across Maharashtra and pan India.",
      },
    ],
    metaTitle:
      "Wire Mesh Manufacturers in Pune & Mumbai | SS Wire Mesh Suppliers | Jai Shree Group",
    metaDescription:
      "Wire mesh manufacturers in Pune & Mumbai. Plain, Twill, Crimped weaves. 2 to 400 mesh. SS, MS, Brass, Copper. ISO certified. Custom sizes. Get quote today.",
    materials: [
      "Stainless Steel",
      "Carbon Steel",
      "Brass",
      "Copper",
      "Aluminum",
      "Galvanized Steel",
      "Titanium",
      "Nickel",
    ],
  },
  "welded-mesh": {
    slug: "welded-mesh",
    name: "Welded Mesh",
    tagline: "Heavy duty welded wire mesh for fencing & construction",
    overview: [
      "Jai Shree Group manufactures welded wire mesh with openings from ½\" × ½\" to 4\" × 4\", available in Stainless Steel, Low Carbon Steel, Hot Dip Galvanized Wire, and Electro Galvanized Wire.",
      "Standard roll length is 50 feet in widths of 2, 3, 4, and 5 feet. Custom sizes are available on request.",
      "Welded mesh is widely used in construction, fencing, caging, enclosures, agriculture, and decorative applications.",
    ],
    specifications: [
      { label: "Opening Range", value: '½" × ½" to 4" × 4"' },
      { label: "Standard Roll Length", value: "50 Feet" },
      { label: "Standard Widths", value: "2ft, 3ft, 4ft, 5ft" },
      { label: "Wire Gauge", value: "SWG 6 to SWG 19 (varies by opening)" },
      { label: "Custom Sizes", value: "Available on request" },
    ],
    strengths: [
      'Wide range of openings from ½" to 4"',
      "Multiple wire gauge options per opening size",
      "Custom sizes available on request",
      "Hot dip galvanized for outdoor/corrosion resistance",
      "Standard 50ft rolls for easy installation",
    ],
    applications: [
      "Fencing & Enclosures",
      "Building & Construction",
      "Window & Safety Guard",
      "Farm & Garden",
      "Agricultural Use",
      "Decorative Applications",
      "Exhibitions",
      "Caging",
    ],
    faqs: [
      {
        q: "What opening sizes are available in welded mesh?",
        a: 'We manufacture welded mesh from ½" × ½" (12.7mm × 12.7mm) to 4" × 4" (101mm × 101mm) in standard specifications.',
      },
      {
        q: "What is the standard roll length?",
        a: "Standard roll length is 50 feet. Widths available are 2 feet, 3 feet, 4 feet, and 5 feet. Custom sizes can be made on request.",
      },
      {
        q: "What materials are available?",
        a: "Welded mesh is available in Stainless Steel, Low Carbon Steel, Hot Dip Galvanized Wire, and Electro Galvanized Wire.",
      },
      {
        q: "What wire gauge is used?",
        a: "Wire gauge ranges from SWG 6 (thickest) to SWG 19 (finest) depending on the opening size. Heavier gauges are used for larger openings.",
      },
      {
        q: "Can you supply welded mesh for fencing in Pune?",
        a: "Yes, we supply welded mesh for fencing applications from our Talawade, Pune facility. We deliver across Maharashtra and pan India.",
      },
    ],
    metaTitle:
      "Welded Mesh Manufacturers in Pune & Mumbai | GI Welded Wire Mesh | Jai Shree Group",
    metaDescription:
      'Welded wire mesh manufacturers in Pune & Mumbai. ½" to 4" openings. SS, GI, Low Carbon Steel. Custom sizes. ISO certified. Fencing, construction, agriculture.',
    materials: [
      "Stainless Steel",
      "Low Carbon Steel",
      "Hot Dip Galvanized",
      "Electro Galvanized",
    ],
  },
  "turret-punching": {
    slug: "turret-punching",
    name: "Turret Punching",
    tagline: "CNC turret punching for any hole shape in any metal",
    overview: [
      "Jai Shree Group offers CNC Turret Punching services for any hole shape and pattern. Our turret punching machines can create round, square, rectangular, oblong, hex, and conical holes in Stainless Steel, Carbon Steel, MS/GI, Aluminum, Brass, and Copper.",
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
        a: "We punch Stainless Steel, Carbon Steel, MS/GI, Aluminum, Brass, and Copper in various thicknesses.",
      },
      {
        q: "Do you offer turret punching job work in Pune?",
        a: "Yes, we offer CNC turret punching job work from our Talawade, Pune facility. We serve clients across Pune, Mumbai, and pan India.",
      },
    ],
    metaTitle:
      "Turret Punching Services in Pune | CNC Turret Punching Job Work | Jai Shree Group",
    metaDescription:
      "CNC turret punching services in Pune & Mumbai. Any hole shape in SS, MS, Aluminum, GI. Combined with laser for cost saving. ISO certified. Get free quote.",
    materials: ["Stainless Steel", "MS", "GI", "Aluminum", "Brass", "Copper"],
  },
  "demister-pad": {
    slug: "demister-pad",
    name: "Demister Pad",
    tagline: "Knitted wire mesh demister pads for industrial filtration",
    overview: [
      "Jai Shree Group manufactures Knitted Wire Mesh Demister Pads (also known as Mist Eliminators) for industrial filtration and gas-liquid separation applications.",
      "Available in Plain Weave and Corrugated Weave patterns in widths from 25mm to 600mm. Custom sizes are available on request.",
      "Used extensively in Refinery Oil Fields, Petrochemical Industries, Pharmaceutical Industries, and Automobile Industries for effective mist elimination and liquid droplet separation.",
    ],
    specifications: [
      { label: "Standard Width", value: "25mm to 600mm" },
      { label: "Weave Types", value: "Plain Weave, Corrugated Weave" },
      { label: "Custom Sizes", value: "Available on request" },
      { label: "Application", value: "Mist elimination, gas-liquid separation" },
    ],
    strengths: [
      "Width range 25mm to 600mm",
      "Plain and Corrugated weave options",
      "Custom sizes available for any vessel dimension",
      "Suitable for corrosive environments (SS available)",
      "High efficiency droplet separation",
    ],
    applications: [
      "Refinery Oil Fields",
      "Petrochemical Industries",
      "Pharmaceutical Industries",
      "Automobile Industries",
      "Gas Processing",
      "Chemical Plants",
      "Filtration Systems",
    ],
    faqs: [
      {
        q: "What is a demister pad?",
        a: "A demister pad (also called mist eliminator or knitted wire mesh pad) is used in industrial vessels to separate liquid droplets from gas streams. It works by coalescing fine mist droplets into larger drops that fall back by gravity.",
      },
      {
        q: "What widths are available for demister pads?",
        a: "Standard width range is 25mm to 600mm. Custom sizes can be manufactured to fit any vessel diameter or specification.",
      },
      {
        q: "What materials are used for demister pads?",
        a: "We manufacture demister pads in Stainless Steel, Copper, Aluminum, and Galvanized Steel — with Stainless Steel being most common for corrosive applications.",
      },
      {
        q: "What industries use demister pads?",
        a: "Demister pads are widely used in Refinery Oil Fields, Petrochemical Industries, Pharmaceutical Industries, Automobile Industries, and any process plant requiring gas-liquid separation.",
      },
      {
        q: "Can you supply custom-size demister pads?",
        a: "Yes, we manufacture demister pads to custom dimensions as per your vessel specification. Contact us with your requirements for a quote.",
      },
    ],
    metaTitle:
      "Demister Pad Manufacturers in India | Knitted Wire Mesh Mist Eliminator | Jai Shree Group",
    metaDescription:
      "Demister pad manufacturers in Pune. Knitted wire mesh mist eliminators for refinery, petrochemical, pharma industries. SS, Copper, Aluminum. Custom sizes. Get quote.",
    materials: ["Stainless Steel", "Copper", "Aluminum", "Galvanized Steel"],
  },
  "aluminum-grill-profile": {
    slug: "aluminum-grill-profile",
    name: "Aluminum Grill & Profile",
    tagline: "Architectural aluminum grills and profiles for modern spaces",
    overview: [
      "Jai Shree Group supplies Aluminum Grills and Profiles for architectural interior and exterior applications. Our aluminum products are used in building facades, window grills, decorative panels, and structural profiles.",
      "Aluminum grills offer excellent corrosion resistance, lightweight properties, and can be anodized or powder coated in any color for aesthetic appeal.",
      "Custom profiles and grill patterns are available as per architectural drawings and specifications.",
    ],
    specifications: [
      { label: "Material", value: "Aluminum (various alloys)" },
      { label: "Finishing", value: "Anodized, Powder Coated, Mill Finish" },
      { label: "Application", value: "Interior & Exterior Architectural" },
      { label: "Custom", value: "Any pattern/profile as per drawing" },
    ],
    strengths: [
      "Lightweight yet strong aluminum construction",
      "Excellent corrosion resistance",
      "Anodized and powder coated finishes available",
      "Custom patterns and profiles per drawing",
      "Suitable for interior and exterior use",
    ],
    applications: [
      "Building Facades",
      "Window Grills",
      "Decorative Ceiling Panels",
      "Partition Screens",
      "Structural Profiles",
      "Balcony Railings",
      "Ventilation Grills",
    ],
    faqs: [
      {
        q: "What finishing options are available for aluminum grills?",
        a: "Aluminum grills can be supplied in Mill Finish, Anodized (silver, bronze, black), or Powder Coated in any RAL color.",
      },
      {
        q: "Can you make custom grill patterns?",
        a: "Yes, we manufacture custom aluminum grill patterns as per your architectural drawings. Contact us with your design requirements.",
      },
      {
        q: "What are the advantages of aluminum over steel for grills?",
        a: "Aluminum is lightweight (1/3 the weight of steel), naturally corrosion resistant, and can be anodized for long-lasting color. Ideal for architectural and coastal applications.",
      },
      {
        q: "Do you supply aluminum profiles for construction?",
        a: "Yes, we supply standard and custom aluminum profiles for construction and architectural applications from our Pune facility.",
      },
    ],
    metaTitle:
      "Aluminum Grill & Profile Manufacturers in Pune | Architectural Aluminum | Jai Shree Group",
    metaDescription:
      "Aluminum grill and profile manufacturers in Pune. Architectural grills, decorative panels, window grills. Anodized, powder coated finishes. Custom designs. Get quote.",
    materials: ["Aluminum"],
  },
  "precision-sheet-leveling": {
    slug: "precision-sheet-leveling",
    name: "Precision Sheet Leveling",
    tagline: "Bow and warpage control for perfectly flat sheets",
    overview: [
      "Jai Shree Group specializes in Precision Sheet Leveling — the process of correcting bow, warpage, and camber in perforated sheets, laser cut parts, and expanded metal to achieve perfectly flat finished products.",
      "Sheet leveling is critical after perforation or laser cutting, as these processes can induce internal stresses causing the sheet to bow or warp. Our specialized leveling equipment restores flatness to the tightest tolerances.",
      "This service is available for all metals and is particularly valuable for applications requiring precise fit, such as automotive components, architectural panels, and precision engineering parts.",
    ],
    specifications: [
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
        a: "We offer precision leveling for all metals including Stainless Steel, Carbon Steel, Aluminum, GI, Copper, and Brass sheets.",
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
    metaTitle:
      "Precision Sheet Leveling Services in Pune | Sheet Flattening Job Work | Jai Shree Group",
    metaDescription:
      "Precision sheet leveling and flattening services in Pune. Bow and warpage correction for perforated sheets and laser cut parts. All metals. ISO certified. Get quote.",
    materials: ["All Metals"],
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
