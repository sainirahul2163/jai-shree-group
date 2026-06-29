import {
  ABOUT_TIMELINE,
  COMPANY,
  HOME_INDUSTRIES,
  KEY_DIFFERENTIATORS,
  PRODUCTS,
} from "@/lib/constants";

export type BentoSize = "large" | "medium" | "small";

export type LandingBentoItem = {
  slug: (typeof PRODUCTS)[number]["slug"];
  size: BentoSize;
  gridClass: string;
};

export const LANDING_STATS = [
  { value: 50, suffix: "+", label: "Years of Experience", animate: true },
  { value: 6, suffix: "", label: "Manufacturing Units", animate: true },
  { value: null, display: "12mm", label: "Max Perforation Thickness", animate: false },
  { value: null, display: "14mm", label: "Max Laser Thickness", animate: false },
  { value: null, display: "2-400", label: "Wire Mesh Range", animate: false },
] as const;

export const LANDING_MILESTONES = ABOUT_TIMELINE.filter((item) =>
  ["1970", "1980", "1997", "2013", "2015"].includes(item.year)
);

export const LANDING_PROCESS_STEPS = [
  {
    step: 1,
    icon: "ClipboardList",
    title: "Submit Enquiry",
    description: "Share your requirements",
  },
  {
    step: 2,
    icon: "PenTool",
    title: "Review & Drawing",
    description: "We review specs and drawings",
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
    title: "CNC Manufacturing",
    description: "Precision CNC production",
  },
  {
    step: 5,
    icon: "Truck",
    title: "QC & Delivery",
    description: "Inspection + global delivery",
  },
] as const;

export const LANDING_TESTIMONIALS = [
  {
    quote:
      "Excellent quality perforated sheets delivered on time. The bow control is perfect — zero rejections in our assembly line.",
    author: "Rajesh Sharma",
    company: "Tata AutoComp",
    rating: 5,
  },
  {
    quote:
      "We have been sourcing SS wire mesh from Jai Shree for 8 years. Consistent quality and responsive team.",
    author: "Priya Mehta",
    company: "Piramal Pharma",
    rating: 5,
  },
  {
    quote:
      "Best expanded metal supplier in Pune. Custom sizes, quick turnaround, and competitive pricing.",
    author: "Amit Kulkarni",
    company: "L&T Construction",
    rating: 5,
  },
] as const;

export const LANDING_MARQUEE_ITEMS = [
  ...PRODUCTS.map((p) => p.name),
  COMPANY.iso,
  "Global Delivery",
  "CNC Perforation",
  "Fiber Laser Cutting",
  "Bow Control Specialists",
] as const;

export const LANDING_BENTO: LandingBentoItem[] = [
  {
    slug: "perforated-sheets",
    size: "large",
    gridClass: "md:col-span-2 md:row-span-2",
  },
  { slug: "laser-cutting", size: "medium", gridClass: "md:col-span-2" },
  { slug: "expanded-metal", size: "medium", gridClass: "md:col-span-2" },
  { slug: "turret-punching", size: "small", gridClass: "md:col-span-1" },
  {
    slug: "precision-sheet-leveling",
    size: "small",
    gridClass: "md:col-span-1",
  },
  {
    slug: "custom-components",
    size: "medium",
    gridClass: "md:col-span-2",
  },
];

export const LANDING_STORY_STRENGTHS = [
  KEY_DIFFERENTIATORS[0],
  KEY_DIFFERENTIATORS[6],
  KEY_DIFFERENTIATORS[3],
] as const;

export const LANDING_INDUSTRIES = HOME_INDUSTRIES;

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductKeySpec(
  product: (typeof PRODUCTS)[number]
): string {
  const specs = product.specs;
  const firstKey = Object.keys(specs)[0] as keyof typeof specs;
  const value = specs[firstKey];
  if (typeof value === "string") return value;
  return product.description.split(".")[0] ?? product.name;
}
