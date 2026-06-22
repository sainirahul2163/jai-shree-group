export const COMPANY = {
  name: "Jai Shree Group",
  tagline: "Accept Challenges. Develop. Achieve.",
  founded: "1970",
  founder: "Mr. Tejaram Jangid",
  foundedIn: "Delhi",
  experience: "50+",
  iso: "ISO 9001:2015",
  email: "shreeperforator@gmail.com",
  phone: "+91 9370606017",
  whatsapp:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919370606017",
  address:
    "Gat No. 94, Near Sonawane Wasti, Jyotibanagar, Talawade, Pune - 411062",
  website: "https://jaishreegroup.in",
  locations: ["Pune (Talawade)", "Mumbai (Bhayander, Palghar)"],
  manufacturingUnits: 8,
} as const;

export const BROCHURE_URL = "/brochure/jai-shree-brochure.pdf";

export const BRANCHES = [
  {
    name: "Jai Shree Metal Perforators",
    slug: "jai-shree-metal-perforators",
    area: "Talawade",
    city: "Pune",
    address:
      "Gat no. 93, Near Sonawane Wasti, Jyotibanagar, Talawade, Pune- 411062",
    phone: "+91 9320204156",
    email: "jsmppune@gmail.com",
    website: "www.metalperforatedsheets.com",
  },
  {
    name: "Shree Perforators",
    slug: "shree-perforators",
    area: "Talawade",
    city: "Pune",
    address:
      "Gat no. 94, Near Sonawane Wasti, Jyotibanagar, Talawade, Pune- 411062",
    phone: "+91 9370606017",
    email: "shreeperforator@gmail.com",
    website: "www.shreeperforators.com",
  },
  {
    name: "Shree Weld Mesh",
    slug: "shree-weld-mesh",
    area: "Talawade",
    city: "Pune",
    address:
      "Gat no. 93, Near Sonawane Wasti, Jyotibanagar, Talawade, Pune- 411062",
    phone: "+91 9049456019",
    email: "balajiwelded@gmail.com",
    website: "www.shreeperforators.com",
  },
  {
    name: "Dev Shree Metal Perforators",
    slug: "dev-shree-metal-perforators",
    area: "Talawade",
    city: "Pune",
    address:
      "Gat no. 258, Opp. National Weigh Bridge, Jyotibanagar, Talawade, Pune- 411062",
    phone: "+91 9890797298",
    email: "devshreemetalperforators@gmail.com",
    website: "www.shreeperforators.com",
  },
  {
    name: "Chandan Metal Perforators",
    slug: "chandan-metal-perforators",
    area: "Pisoli",
    city: "Pune",
    address:
      "S.No.33, Kondhwa Pisoli Road, Opp. Pune Weigh Bridge, Pisoli, Tal. Haveli, Pune",
    phone: "+91 9822216242",
    email: "chandanmetalperforators@gmail.com",
    website: "www.shreeperforators.com",
  },
  {
    name: "Jai Shree Filtration",
    slug: "jai-shree-filtration",
    area: "Masjid Bunder",
    city: "Mumbai",
    address:
      "Shop No. 80-B, Gr. Floor, Keshavji Jadhavji Bldg., 24/26, Khadak Street, Nr. Satkar Hotel, Masjid Bunder Road, Mumbai-400009",
    phone: "+91 9320204151",
    email: "inderjangid@gmail.com",
    website: "www.jaishreefiltration.com",
  },
  {
    name: "Jai Shree Industries",
    slug: "jai-shree-industries",
    area: "Bhayander",
    city: "Mumbai",
    address:
      "L-9, Swastik Industrial Estate, Behind Gaurav Dharam Kanta, Bhayander East, Mumbai- 401105",
    phone: "+91 8181815592",
    email: "inderjangid@gmail.com",
    website: "www.jaishreefiltration.com",
  },
  {
    name: "Jai Shree Perforator",
    slug: "jai-shree-perforator",
    area: "Palghar",
    city: "Maharashtra",
    address:
      "2, Marudhar Estate, Vill. Aliyali, Next to Tembhode Village, New Satpati Road, Palghar West- Maharashtra",
    phone: "+91 9320204151",
    email: "inderjangid@gmail.com",
    website: "www.jaishreefiltration.com",
  },
] as const;

export const PRODUCTS = [
  {
    name: "Perforated Sheets",
    slug: "perforated-sheets",
    description:
      "CNC & Turret perforation in all metals. Up to 12mm thickness, 2200×4000mm max size.",
    icon: "Grid3X3",
    specs: {
      maxThickness: "12mm",
      maxSize: "2200×4000mm",
      process: "CNC / Turret",
    },
    materials: [
      "Stainless Steel",
      "MS (Mild Steel)",
      "GI (Galvanized Iron)",
      "Aluminum",
      "Copper",
      "Brass",
    ],
  },
  {
    name: "Laser Cutting",
    slug: "laser-cutting",
    description:
      "Fiber laser cutting for any custom drawing. Up to 14mm thickness.",
    icon: "Zap",
    specs: {
      maxThickness: "14mm",
      process: "Fiber Laser",
    },
    materials: [
      "Stainless Steel",
      "MS (Mild Steel)",
      "Aluminum",
      "Copper",
      "Brass",
      "Titanium",
    ],
  },
  {
    name: "Expanded Metal",
    slug: "expanded-metal",
    description:
      "Diamond, square & hexagonal patterns. Up to 6mm thick. Widths 900/1250/1500mm.",
    icon: "Diamond",
    specs: {
      maxThickness: "6mm",
      widths: "900 / 1250 / 1500mm",
      patterns: "Diamond / Square / Hex",
    },
    materials: [
      "Stainless Steel",
      "MS (Mild Steel)",
      "GI (Galvanized Iron)",
      "Brass",
      "Copper",
      "Aluminum",
      "Titanium",
    ],
  },
  {
    name: "Turret Punching",
    slug: "turret-punching",
    description:
      "CNC turret punching. Any hole shape. Combined with laser for cost saving.",
    icon: "Circle",
    specs: {
      process: "CNC Turret",
      shapes: "Any hole shape",
    },
    materials: [
      "Stainless Steel",
      "MS (Mild Steel)",
      "GI (Galvanized Iron)",
      "Aluminum",
      "Copper",
      "Brass",
    ],
  },
  {
    name: "Precision Sheet Leveling",
    slug: "precision-sheet-leveling",
    description:
      "Specialized bow/warpage control for perforated and laser cut sheets.",
    icon: "Ruler",
    specs: {
      specialization: "Bow / Warpage Control",
    },
    materials: ["All Metals"],
  },
  {
    name: "Custom Components",
    slug: "custom-components",
    description:
      "Custom-engineered metal components, special dies, embossed plates, dimple de-stoners, huller screens, herringbone screens and any special job as per drawing.",
    icon: "Settings2",
    specs: {
      process: "Custom Fabrication",
      drawings: "DXF / DWG / Sample",
    },
    materials: [
      "Stainless Steel",
      "MS (Mild Steel)",
      "GI (Galvanized Iron)",
      "Aluminum",
      "Brass",
      "Copper",
    ],
  },
] as const;

export const MATERIALS = [
  "Stainless Steel",
  "MS (Mild Steel)",
  "GI (Galvanized Iron)",
  "Aluminum",
  "Copper",
  "Brass",
  "Titanium",
  "PVC",
  "Nickel",
] as const;

export const STATS = [
  { value: "50+", label: "Years of Experience" },
  { value: "8", label: "Manufacturing Units" },
  { value: "ISO", label: "9001:2015 Certified" },
  { value: "PAN", label: "India Delivery" },
] as const;

export const INDUSTRIES = [
  {
    name: "Automobile",
    slug: "automobile",
    icon: "Car",
    description: "Filters, grills, guards for Tata, Bajaj, and more",
  },
  {
    name: "Construction",
    slug: "construction",
    icon: "Building2",
    description: "Facades, partitions, safety guards",
  },
  {
    name: "Food & Beverage",
    slug: "food-beverage",
    icon: "UtensilsCrossed",
    description: "Conveyor screens, processing equipment",
  },
  {
    name: "Pharmaceutical",
    slug: "pharmaceutical",
    icon: "FlaskConical",
    description: "Equipment screens, clean room panels",
  },
  {
    name: "Petrochemical",
    slug: "petrochemical",
    icon: "Flame",
    description: "Demister pads, mist eliminators",
  },
  {
    name: "Architecture & Interior",
    slug: "architecture-interior",
    icon: "Landmark",
    description: "Decorative panels, ceiling, facades",
  },
  {
    name: "Sugar Industry",
    slug: "sugar-industry",
    icon: "Factory",
    description: "Huller screens, vibrating screens",
  },
  {
    name: "Mining & Quarrying",
    slug: "mining-quarrying",
    icon: "Pickaxe",
    description: "Vibrating screens, heavy mesh",
  },
  {
    name: "Paper Industry",
    slug: "paper-industry",
    icon: "Newspaper",
    description: "Pulp screens, dewatering mesh, filtration",
  },
  {
    name: "Agriculture",
    slug: "agriculture",
    icon: "Wheat",
    description: "Grain screens, drying trays, filtration mesh",
  },
] as const;

export const KEY_DIFFERENTIATORS = [
  "100% privately owned, zero debt company",
  "CNC + Fiber Laser technology",
  "Custom solutions as per drawing/specs",
  "Pan India delivery",
  "Bow/warpage control specialization",
  "In-house Shearing, Bending, Leveling",
  "R&D team for special dies, tools, machinery",
] as const;

export const DELIVERY_CITIES = [
  { name: "Mumbai", slug: "mumbai" },
  { name: "Pune", slug: "pune" },
  { name: "Nashik", slug: "nashik" },
  { name: "Nagpur", slug: "nagpur" },
  { name: "Indore", slug: "indore" },
  { name: "Bangalore", slug: "bangalore" },
  { name: "Chennai", slug: "chennai" },
  { name: "Delhi", slug: "delhi" },
] as const;

export const WEBSITE_GOALS = [
  "Lead generation — quote enquiries via form + WhatsApp",
  "SEO dominance — rank for all product × location keyword combinations",
  "Brand authority — position as India's most trusted metal manufacturer",
  "Technical resource — open area calculator, spec sheets, guides",
] as const;

/** Planned routes for sitemap, nav, and SEO page generation */
export const SITE_ROUTES = {
  static: [
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
  ],
  dynamic: {
    products: "/products/[slug]",
    industries: "/industries/[slug]",
    blog: "/blog/[slug]",
    locationProduct: "/[city]/[product-slug]",
  },
  seoCities: DELIVERY_CITIES.map((c) => `/${c.slug}/`),
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

export const BLOG_POSTS = [
  {
    title: "How to Calculate Open Area of Perforated Sheet",
    slug: "how-to-calculate-open-area-perforated-sheet",
    date: "2024-01-15",
    category: "Technical Guide",
    excerpt:
      "Learn the 6 standard formulas for calculating open area percentage in perforated sheets — from round holes to capsule shapes.",
  },
  {
    title: "Expanded Metal vs Perforated Sheet: Which to Choose?",
    slug: "expanded-metal-vs-perforated-sheet",
    date: "2024-01-22",
    category: "Product Guide",
    excerpt:
      "Compare expanded metal and perforated sheets across cost, strength, waste, and applications to choose the right material.",
  },
  {
    title: "Complete Wire Mesh Specification Guide",
    slug: "wire-mesh-specification-guide",
    date: "2024-02-01",
    category: "Technical Guide",
    excerpt:
      "Everything you need to know about wire mesh specifications — mesh number, wire diameter, opening size, and open area.",
  },
  {
    title: "Laser Cutting vs Turret Punching: Cost Comparison",
    slug: "laser-cutting-vs-turret-punching",
    date: "2024-02-10",
    category: "Cost Guide",
    excerpt:
      "When to use laser cutting vs turret punching? A detailed cost and capability comparison for industrial buyers.",
  },
] as const;

export const DESIGN_TOKENS = {
  background: "#0A0A0A",
  surface: "#111111",
  surface2: "#1A1A1A",
  border: "#2A2A2A",
  primary: "#E8521A",
  primaryHover: "#FF6B35",
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0A0",
  textMuted: "#666666",
} as const;

export const SEO = {
  primaryKeywords: [
    "Perforated Sheet Manufacturer",
    "Expanded Mesh Manufacturers",
    "CNC Turret Perforated Sheet Manufacturing",
    "perforated sheet manufacturers Pune",
    "perforated sheet manufacturers India export",
    "wire mesh exporters India",
    "expanded metal suppliers India",
    "metal fabrication India",
    "perforated metal sheets India supplier",
  ],
  schemaTypes: [
    "LocalBusiness",
    "Product",
    "FAQPage",
    "BreadcrumbList",
  ] as const,
} as const;

export const HOME_SECTIONS = {
  products: {
    id: "products",
    label: "WHAT WE MANUFACTURE",
    heading: "Our Product Range",
    subtext:
      "Six specialized metal fabrication capabilities — from CNC perforation to fiber laser cutting, serving industries across India and export markets.",
  },
  about: {
    id: "about",
    label: "OUR STORY",
    heading: "50+ Years of Metal Engineering Excellence",
    paragraphs: [
      "Founded in 1970 by Mr. Tejaram Jangid in Delhi. Expanded to Perforated Sheets and Expanded Metal in 1980.",
      "Mumbai plant set up by Mr. Inder Jangid & Mr. Shyam Jangid. Pune extension at Talawade in 1997 by Mr. Raichand Jangid.",
      "2006 — bigger high-tech plant. 2009 — Crimped Mesh & Vibrating Screen plant. 2013 — full CNC upgrade. 2015 — Welded Mesh + Fiber Laser technology.",
    ],
    highlights: [
      { value: "12mm", label: "Max Perforation Thickness" },
      { value: "14mm", label: "Max Laser Cutting Thickness" },
      { value: "2200×4000mm", label: "Max Sheet Size" },
      { value: "2–400 Mesh", label: "Wire Mesh Range" },
    ],
    cta: { label: "Read Full Story", href: "/about" },
  },
  industries: {
    id: "industries",
    label: "INDUSTRIES WE SERVE",
    heading: "Trusted Across Every Sector",
    banner: {
      text: "Can't find your industry? We manufacture custom solutions for any application.",
      cta: { label: "Talk to Our Experts", href: "/contact" },
    },
  },
  group: {
    id: "group",
    label: "OUR GROUP",
    heading: "8 Manufacturing Units",
    subtext:
      "Strategically located across Pune and Mumbai for faster delivery across India",
    mapCaption:
      "Serving clients across India from our Pune & Mumbai facilities",
    tabs: {
      pune: "Pune Units",
      mumbai: "Mumbai Units",
    },
  },
  process: {
    id: "process",
    label: "HOW IT WORKS",
    heading: "From Enquiry to Delivery",
  },
} as const;

export const ABOUT_TIMELINE = [
  { year: "1970", description: "Founded in Delhi (Wire Mesh)" },
  { year: "1980", description: "Expanded to Perforated Sheets" },
  { year: "1997", description: "Talawade Pune Plant" },
  { year: "2006", description: "High-Tech CNC Plant" },
  { year: "2009", description: "Crimped Mesh Plant" },
  { year: "2013", description: "Full CNC Upgrade" },
  { year: "2015", description: "Fiber Laser Technology" },
] as const;

export const PROCESS_STEPS = [
  {
    step: 1,
    icon: "ClipboardList",
    title: "Submit Enquiry",
    description: "Share your requirements",
  },
  {
    step: 2,
    icon: "PenTool",
    title: "Design & Drawing",
    description: "We review specs",
  },
  {
    step: 3,
    icon: "Layers",
    title: "Material Selection",
    description: "Best metal for your use",
  },
  {
    step: 4,
    icon: "Cog",
    title: "Manufacturing",
    description: "CNC precision production",
  },
  {
    step: 5,
    icon: "Truck",
    title: "QC & Delivery",
    description: "Inspection + Pan India delivery",
  },
] as const;

/** First 8 industries shown on the home page grid */
export const HOME_INDUSTRIES = INDUSTRIES.slice(0, 8);

export const PUNE_BRANCHES = BRANCHES.filter((b) => b.city === "Pune");
export const MUMBAI_BRANCHES = BRANCHES.filter(
  (b) => b.city === "Mumbai" || b.city === "Maharashtra"
);

export const FOOTER = {
  description:
    "ISO 9001:2015 certified manufacturer of perforated sheets, wire mesh & expanded metal. Serving India since 1970.",
  copyright: "© 2026 Jai Shree Group. All rights reserved.",
  certification: "ISO 9001:2015 Certified | Pune & Mumbai, India",
  social: [
    { name: "LinkedIn", href: "#", icon: "Linkedin" },
    { name: "Facebook", href: "#", icon: "Facebook" },
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
