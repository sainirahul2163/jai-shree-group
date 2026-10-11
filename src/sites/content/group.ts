import {
  ABOUT_STATS,
  ABOUT_STRENGTHS,
  ABOUT_TIMELINE_DETAILED,
  FAMILY_LEADERSHIP,
  VISION_MISSION,
} from "@/data/about";
import {
  ABOUT_TIMELINE,
  BRANCHES,
  COMPANY,
  COMPANY_VIDEO,
  HOME_SECTIONS,
  MUMBAI_BRANCHES,
  PROCESS_STEPS,
  PUNE_BRANCHES,
} from "@/lib/constants";
import type { BranchInfo, SiteContent } from "@/sites/content/types";

const branches = (list: readonly BranchInfo[]): BranchInfo[] =>
  list.map((branch) => ({ ...branch }));

const OG_IMAGE = { url: "/og-image.jpg", width: 1200, height: 630 };

/** Jai Shree Group (main site) copy. Text here is live; change it only on purpose. */
export const groupContent: SiteContent = {
  meta: {
    home: {
      title: "Perforated Sheet Manufacturers Pune & Mumbai | Jai Shree Group",
      description:
        "ISO 9001:2015 certified perforated sheet manufacturers in Pune & Mumbai. 50+ years of precision metalwork — perforated sheets, expanded metal, laser cutting, turret punching. Get free quote.",
    },
    about: {
      title:
        "About Jai Shree Group | 50+ Years Metal Manufacturing | ISO 9001:2015 Pune",
      description:
        "Learn about Jai Shree Group and Shree Perforators — ISO 9001:2015 certified metal manufacturer since 1970. 6 manufacturing units in Pune & Mumbai. Perforated sheets, laser cutting, custom components.",
    },
    products: {
      title:
        "Our Products | Perforated Sheets, Expanded Metal & Custom Components | Jai Shree Group",
      description:
        "Six active metal manufacturing products from Jai Shree Group — perforated sheets, laser cutting, expanded metal, turret punching, sheet leveling and custom components. ISO 9001:2015 certified.",
      openGraph: {
        title: "Our Products | Jai Shree Group",
        description:
          "Perforated sheet manufacturer & expanded mesh manufacturers. CNC turret perforated sheet manufacturing from ISO certified Pune & Mumbai facilities.",
      },
    },
    industries: {
      title: "Industries We Serve | Metal Manufacturing | Jai Shree Group",
      description:
        "Jai Shree Group serves automobile, construction, pharmaceutical, petrochemical, food processing, sugar, mining and architecture industries from Pune & Mumbai.",
      openGraph: {
        title: "Industries We Serve | Jai Shree Group",
        description:
          "Trusted metal manufacturing partner across 8+ industries from Pune & Mumbai.",
      },
    },
    contact: {
      title: "Contact Jai Shree Group | Perforated Sheet Manufacturers Pune",
      description:
        "Contact Jai Shree Group for perforated sheets, laser cutting, expanded metal and turret punching. Pune & Mumbai. Get free quote within 24 hours.",
      openGraph: {
        title: "Contact Jai Shree Group | Perforated Sheet Manufacturers Pune",
        description:
          "Contact Jai Shree Group for perforated sheets, laser cutting, expanded metal and turret punching. Pune & Mumbai.",
        images: [OG_IMAGE],
      },
    },
    getQuote: {
      title:
        "Get Free Quote | Perforated Sheets, Laser Cutting, Expanded Metal | Jai Shree Group",
      description:
        "Request a free quote for perforated sheets, laser cutting, expanded metal, turret punching and more. ISO certified manufacturers in Pune & Mumbai.",
    },
    gallery: {
      title:
        "Product Gallery | Perforated Sheets & Laser Cutting | Jai Shree Group",
      description:
        "Browse Jai Shree Group product gallery — perforated sheets, laser cutting, expanded metal and custom component samples. Contact us for product samples.",
    },
    calculator: {
      title: "Perforated Sheet Open Area Calculator | Jai Shree Group",
      description:
        "Calculate open area percentage for perforated sheets — round, square, hex, and slot patterns. 10 formula calculators for all perforation types.",
    },
    group: {
      title: "Our Group | 6 Manufacturing Units Pune & Mumbai | Jai Shree Group",
      description:
        "Jai Shree Group operates 6 manufacturing units across Pune (Talawade) and Mumbai (Bhayander, Masjid Bunder, Palghar). Contact your nearest unit.",
    },
    certifications: {
      title: "ISO 9001:2015 Certification | Jai Shree Group Quality Standards",
      description:
        "Jai Shree Group is ISO 9001:2015 certified. Learn about our quality management system and what certification means for our customers.",
    },
    clients: {
      title: "Our Clients | Trusted by Leading Manufacturers | Jai Shree Group",
      description:
        "Jai Shree Group serves leading manufacturers in automobile, construction, pharmaceutical, petrochemical and more. ISO 9001:2015 certified since 1970.",
    },
    blog: {
      title: "Metal Manufacturing Insights | Blog | Jai Shree Group",
      description:
        "Technical guides, product tutorials, and industry insights on perforated sheets, laser cutting, expanded metal and turret punching from Jai Shree Group.",
    },
  },

  home: {
    hero: {
      badge: `${COMPANY.iso} Certified • Since ${COMPANY.founded}`,
      // Locked by the client: PERFORATED SHEET / MANUFACTURERS / SINCE 1970.
      lines: [
        { text: "PERFORATED SHEET" },
        { text: "MANUFACTURERS" },
        { text: "SINCE 1970", accent: true },
      ],
      intro: `India's trusted manufacturer of perforated sheets, expanded metal, laser cutting & precision components. ${COMPANY.iso} certified. ${COMPANY.experience} years of experience.`,
      primaryCta: { label: "Get a Free Quote", href: "/get-quote" },
      secondaryCta: { label: "Explore Products", href: "/products" },
      stats: [
        { value: "50+ Years", label: "Experience" },
        { value: "6 Units", label: "Manufacturing" },
        { value: "ISO Certified", label: "Quality" },
      ],
    },
    trust: {
      ariaLabel: "Company credentials",
      stats: [
        { count: 50, suffix: "+", label: "Years of Experience" },
        { count: 6, label: "Manufacturing Units" },
        { display: "ISO 9001:2015", label: "Certified" },
        { display: "Global Delivery", label: "" },
      ],
    },
    video: {
      label: COMPANY_VIDEO.label,
      heading: COMPANY_VIDEO.heading,
      headingAccent: COMPANY_VIDEO.headingOrange,
      subtext: COMPANY_VIDEO.subtext,
      stats: COMPANY_VIDEO.stats.map((stat) => ({ ...stat })),
      youtubeId: COMPANY_VIDEO.youtubeId,
      localVideo: COMPANY_VIDEO.localVideo,
      posterTitle: "Factory Tour",
      tags: ["CNC Machines", "Fiber Laser", "Turret Punching", "Talawade Facility"],
      iframeTitle: "Jai Shree Group factory tour",
      comingSoonText:
        "We're filming a complete walkthrough of our 6 manufacturing units.",
      caption:
        "Jai Shree Group Manufacturing Facility — Talawade, Pune, Maharashtra",
    },
    products: { ...HOME_SECTIONS.products },
    about: {
      id: HOME_SECTIONS.about.id,
      label: HOME_SECTIONS.about.label,
      heading: HOME_SECTIONS.about.heading,
      paragraphs: [
        ...HOME_SECTIONS.about.paragraphs,
        "Operating as Shree Perforators and Jai Shree Metal Perforators across our 6 manufacturing units in Pune and Mumbai, we bring over 50 years of precision to every order.",
      ],
      highlights: HOME_SECTIONS.about.highlights.map((item) => ({ ...item })),
      cta: { ...HOME_SECTIONS.about.cta },
      timeline: ABOUT_TIMELINE.map((item) => ({ ...item })),
    },
    industries: {
      id: HOME_SECTIONS.industries.id,
      label: HOME_SECTIONS.industries.label,
      heading: HOME_SECTIONS.industries.heading,
      banner: {
        text: HOME_SECTIONS.industries.banner.text,
        cta: { ...HOME_SECTIONS.industries.banner.cta },
      },
    },
    process: {
      ...HOME_SECTIONS.process,
      steps: PROCESS_STEPS.map((step) => ({ ...step })),
    },
    group: {
      id: HOME_SECTIONS.group.id,
      label: HOME_SECTIONS.group.label,
      heading: HOME_SECTIONS.group.heading,
      subtext: HOME_SECTIONS.group.subtext,
      tabs: { ...HOME_SECTIONS.group.tabs },
      pune: branches(PUNE_BRANCHES),
      mumbai: branches(MUMBAI_BRANCHES),
    },
    cta: {
      heading: "Ready to Get Started?",
      text: "Tell us your requirement and get a quote within 24 hours. Global delivery from our Pune & Mumbai facilities.",
      primaryCta: { label: "Get a Free Quote", href: "/get-quote" },
      callLabel: "Call Us Now",
      badges: [
        "Response within 24 hours",
        `${COMPANY.iso} Certified`,
        "Global Delivery",
      ],
    },
  },

  about: {
    hero: {
      title: "About Jai Shree Group",
      subtitle: "50+ years of precision metal manufacturing from Pune & Mumbai",
      badges: [COMPANY.iso, `Est. ${COMPANY.founded}`],
    },
    story: {
      label: "OUR STORY",
      heading: "From Delhi to India's Leading Metal Manufacturer",
      paragraphs: [
        `Founded in 1970 by ${COMPANY.founder} in ${COMPANY.foundedIn}, Jai Shree Group began as a wire mesh manufacturer with a commitment to precision and quality. Over five decades, the group has grown into one of India's most trusted metal fabrication companies.`,
        "Today, with 6 manufacturing units across Pune and Mumbai, we serve industries from automobile and construction to pharmaceutical and petrochemical — delivering perforated sheets, laser cutting, expanded metal, turret punching, and more with ISO 9001:2015 certified processes.",
      ],
      timeline: ABOUT_TIMELINE_DETAILED.map((item) => ({ ...item })),
      leadership: {
        heading: "Family Leadership",
        people: FAMILY_LEADERSHIP.map((person) => ({ ...person })),
      },
    },
    numbers: {
      label: "BY THE NUMBERS",
      heading: "Manufacturing at Scale",
      stats: ABOUT_STATS.map((stat) => ({ ...stat })),
    },
    strengths: {
      label: "OUR STRENGTHS",
      heading: "Our Edge on Others",
      items: ABOUT_STRENGTHS.map((item) => ({ ...item })),
    },
    quality: {
      badgeLines: ["ISO", "9001:2015"],
      badgeCaption: "Certified Quality Management System",
      label: "ISO CERTIFICATION",
      heading: "Committed to Total Quality Management",
      paragraphs: [
        {
          text: `Jai Shree Group operates under ${COMPANY.iso} certified quality management systems. Every process — from raw material procurement to final inspection — is controlled under direct supervision of our promoters.`,
        },
        { text: "Our rejection percentage is negligible.", emphasis: true },
        {
          text: "This commitment to quality has earned us long-term partnerships with leading manufacturers across automobile, pharmaceutical, construction, and industrial sectors.",
        },
      ],
      cta: { label: "View Certifications →", href: "/certifications" },
    },
    vision: VISION_MISSION.vision,
    mission: VISION_MISSION.mission,
  },

  productsIndex: {
    hero: {
      label: "PRODUCTS",
      title: "Metal Manufacturing Products — Pune & Mumbai",
      subtitle:
        "Six specialized metal fabrication capabilities — from CNC perforation to fiber laser cutting and custom components, serving industries across India.",
    },
    intro:
      "Jai Shree Group (Shree Perforators) manufactures precision metal products across 8 facilities in Pune and Mumbai. ISO 9001:2015 certified with 50+ years of experience, we supply perforated sheets, expanded metal, laser-cut components, and more across India.",
  },

  industriesIndex: {
    hero: {
      label: "INDUSTRIES",
      title: "Industries We Serve",
      subtitle:
        "Precision metal products for every sector — from automotive filters to petrochemical precision components.",
    },
  },

  contact: {
    heading: "Contact Perforated Sheet Manufacturers — Pune & Mumbai",
    intro: "Have a requirement? Our team responds within 24 hours.",
    successText: "We'll get back to you within 24 hours.",
    hours: [
      { days: "Working hours", hours: "9:00 AM – 6:00 PM", closed: false },
      { days: "Pune units (Talawade)", hours: "Closed Thursday", closed: true },
      {
        days: "Mumbai units (Masjid Bunder, Bhayander, Palghar)",
        hours: "Closed Sunday",
        closed: true,
      },
    ],
    branches: { heading: "Our Branches", list: branches(BRANCHES) },
  },

  quote: {
    heading: "Get a Free Quote",
    successText: "We'll send your quote within 24 hours.",
  },
};
