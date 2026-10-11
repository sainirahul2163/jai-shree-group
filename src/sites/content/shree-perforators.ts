import type { SiteContent } from "@/sites/content/types";

/**
 * Shree Perforators (Talawade, Pune) — copy written for this site only
 * (docs/07-seo-rules.md: no paragraph shared with another site).
 * Facts come from docs/02-business-facts.md; nothing here may be invented:
 * no client names, machine counts, capacities, years for this unit or reply
 * times. Gaps use docs/08-content-checklist.md.
 */

const GROUP_URL = "https://www.jaishreegroup.com";
const SISTER_LASER =
  "Laser cutting is not done at this unit. Jai Shree Metal Perforators, our sister unit in Talawade, handles it.";

export const shreePerforatorsContent: SiteContent = {
  meta: {
    home: {
      title: "Perforated Sheet Manufacturers in Pune",
      description:
        "CNC perforated sheets made to your hole pattern in Talawade, Pune. SS, MS, GI, aluminium, copper and brass up to 12 mm thick. Expanded metal and turret punching too.",
    },
    about: {
      title: "About Shree Perforators, Talawade",
      description:
        "Shree Perforators is the perforation unit of Jai Shree Group in Talawade, Pune: CNC perforated sheets, custom hole patterns, expanded metal and sheet leveling.",
    },
    products: {
      title: "Perforated Sheets, Expanded Metal & Punching",
      description:
        "What the Talawade unit makes: CNC perforated sheets, expanded metal, turret punching, precision sheet leveling and parts or screens made to drawing.",
    },
    industries: {
      title: "Industries Using Our Perforated Sheets",
      description:
        "Perforated and expanded metal from Shree Perforators goes into automotive parts, food and pharma equipment, sugar mills, buildings and interiors.",
    },
    contact: {
      title: "Contact Shree Perforators, Talawade, Pune",
      description:
        "Call +91 93706 06017 or email shreeperforator@gmail.com. Gat No. 94, Talawade, Pune 411062. Closed on Thursdays.",
    },
    getQuote: {
      title: "Request a Perforated Sheet Quote",
      description:
        "Send your hole pattern, material, thickness and quantity to Shree Perforators in Talawade, Pune and get a quotation for perforated or punched sheets.",
    },
    gallery: {
      title: "Perforated Sheet Photos",
      description:
        "Photos of perforated sheets, expanded metal, punched and leveled sheets and custom screens from Shree Perforators, Talawade, Pune.",
    },
    export: {
      title: "Perforated Sheets for Export",
      description:
        "Shree Perforators supplies perforated sheets and expanded metal to buyers outside India from its Talawade, Pune unit. Send your enquiry with destination.",
    },
  },

  home: {
    hero: {
      badge: "Talawade, Pune • A Jai Shree Group company",
      lines: [
        { text: "PERFORATED SHEETS" },
        { text: "IN ANY" },
        { text: "HOLE PATTERN", accent: true },
      ],
      intro:
        "Round, square, hexagonal or slotted holes, punched by CNC and turret machines in stainless steel, mild steel, GI, aluminium, copper and brass up to 12 mm thick.",
      primaryCta: { label: "Send Your Pattern", href: "/get-quote" },
      secondaryCta: { label: "See What We Make", href: "/products" },
      stats: [
        { value: "Up to 12 mm", label: "Perforation thickness" },
        { value: "To drawing", label: "DXF, DWG or sample" },
        { value: "Thursday", label: "Weekly holiday" },
      ],
    },
    trust: {
      ariaLabel: "Shree Perforators at a glance",
      stats: [
        { display: "12 mm", label: "Thickest sheet we perforate" },
        { display: "CNC + Turret", label: "Perforation methods" },
        { display: "6 metals", label: "SS, MS, GI, Al, Cu, Brass" },
        { display: "Global", label: "Delivery" },
      ],
    },
    products: {
      id: "products",
      label: "AT OUR TALAWADE UNIT",
      heading: "Perforation First, and the Work Around It",
      subtext:
        "Perforated sheets are our main line. We also expand, punch, level and make parts to drawing, so a sheet can leave the shop ready to fit.",
    },
    about: {
      id: "about",
      label: "WHO WE ARE",
      heading: "A Perforation Unit Built Around Patterns",
      paragraphs: [
        "Shree Perforators works from Gat No. 94 in Talawade, Pune. The unit takes a buyer's hole layout, whether a standard staggered round hole or a pattern drawn for one product, and punches it into sheet with CNC and turret machines.",
        "Sheets are sheared, bent and leveled in-house, and we watch bow and warpage closely because a perforated sheet that does not lie flat causes trouble at assembly.",
        "We are one of six units of Jai Shree Group, which has worked in perforated sheets and expanded metal since 1980.",
      ],
      highlights: [
        { value: "12 mm", label: "Maximum perforation thickness" },
        { value: "In-house", label: "Shearing, bending and leveling" },
        { value: "Special dies", label: "Developed for custom holes" },
        { value: "Global", label: "Delivery from Pune" },
      ],
      cta: { label: "About the Unit", href: "/about" },
      timeline: [
        { year: "1970", description: "Jai Shree Group founded in Delhi" },
        { year: "1980", description: "The group starts perforated sheets and expanded metal" },
        { year: "1997", description: "The group opens its Talawade, Pune plant" },
        { year: "2013", description: "Full CNC upgrade across the group" },
      ],
    },
    industries: {
      id: "industries",
      label: "WHERE OUR SHEETS GO",
      heading: "Buyers We Make Patterns For",
      banner: {
        text: "Making a filter, guard, screen or panel we have not listed? Send the drawing and we will tell you what is possible.",
        cta: { label: "Send a Drawing", href: "/get-quote" },
      },
    },
    process: {
      id: "process",
      label: "FROM DRAWING TO DISPATCH",
      heading: "How an Order Moves Through the Unit",
      steps: [
        {
          step: 1,
          icon: "ClipboardList",
          title: "Your requirement",
          description: "Hole shape, size, pitch, material and thickness, or simply your drawing or a sample.",
        },
        {
          step: 2,
          icon: "PenTool",
          title: "Pattern check",
          description: "We check the layout against the sheet thickness and confirm the tooling it needs.",
        },
        {
          step: 3,
          icon: "Layers",
          title: "Material",
          description: "The grade you specify: stainless, mild steel, GI, aluminium, copper or brass.",
        },
        {
          step: 4,
          icon: "Cog",
          title: "Perforation",
          description: "CNC or turret punching, then shearing, bending and leveling as the job needs.",
        },
        {
          step: 5,
          icon: "Truck",
          title: "Inspection and dispatch",
          description: "Flatness and pattern are checked before the sheets are packed and sent.",
        },
      ],
    },
    cta: {
      heading: "Have a Hole Pattern in Mind?",
      text: "Send us the pattern, metal, thickness and quantity. We will come back with a quotation from our Talawade unit.",
      primaryCta: { label: "Request a Quote", href: "/get-quote" },
      callLabel: "Call the Unit",
      badges: ["Made to drawing", "Leveled flat", "Global delivery"],
    },
  },

  about: {
    hero: {
      label: "ABOUT US",
      title: "Shree Perforators",
      subtitle: "The perforation unit of Jai Shree Group in Talawade, Pune",
      badges: ["Talawade, Pune", "CNC perforation"],
    },
    story: {
      label: "THE UNIT",
      heading: "Precise Holes, Flat Sheets",
      paragraphs: [
        "Shree Perforators makes perforated sheets to order. Buyers come to us with a hole shape, a pitch and an open area they need, or with a finished drawing, and we turn it into sheet using CNC and turret punching in stainless steel, mild steel, galvanised iron, aluminium, copper and brass.",
        "Alongside perforation the unit produces expanded metal in diamond, square and hexagonal patterns, punches individual parts and screens to drawing, and levels sheets so they stay flat after punching.",
        "Our buyers are equipment makers, fabricators and companies that build filters and process machinery.",
      ],
    },
    numbers: {
      label: "IN NUMBERS",
      heading: "What the Unit Works To",
      stats: [
        { value: "12 mm", label: "Max perforation thickness" },
        { value: "6 mm", label: "Max expanded metal thickness" },
        { value: "6", label: "Metals we perforate" },
        { value: "3", label: "Expanded metal patterns" },
        { value: "Thursday", label: "Weekly holiday" },
      ],
    },
    strengths: {
      label: "WHY BUYERS ORDER FROM US",
      heading: "Strengths of the Talawade Unit",
      items: [
        {
          icon: "Settings",
          title: "Special dies",
          description: "Tools for unusual hole shapes are developed for the job instead of forcing a standard die.",
        },
        {
          icon: "Shield",
          title: "Flatness control",
          description: "Bow and warpage are corrected on our leveler before sheets are dispatched.",
        },
        {
          icon: "Package",
          title: "Finishing in-house",
          description: "Shearing and bending happen in the same unit, so sheets arrive cut and formed.",
        },
        {
          icon: "Truck",
          title: "Delivered anywhere",
          description: "We deliver across India and to buyers abroad.",
        },
      ],
    },
    parent: {
      label: "PART OF JAI SHREE GROUP",
      heading: "Backed by a Family Business Since 1970",
      paragraphs: [
        "Jai Shree Group was started in Delhi in 1970 by Mr. Tejaram Jangid and moved into perforated sheets and expanded metal in 1980. Its Talawade, Pune plant opened in 1997.",
        "Today the group runs six units across Pune and the Mumbai region and holds ISO 9001:2015 certification from Bureau Veritas. Shree Perforators is the group's Talawade unit for perforation and patterns.",
        SISTER_LASER,
      ],
      link: { label: "Visit Jai Shree Group", href: GROUP_URL },
    },
  },

  productsIndex: {
    hero: {
      label: "WHAT WE MAKE",
      title: "Perforation and Sheet Work in Talawade",
      subtitle:
        "Five lines of work, all built around getting the right holes into the right sheet.",
    },
    intro: `Each product below is made at our unit in Talawade, Pune. ${SISTER_LASER}`,
  },

  industriesIndex: {
    hero: {
      label: "INDUSTRIES",
      title: "Where Our Perforated Sheets Are Used",
      subtitle:
        "Six sectors that order patterns, screens and expanded metal from the Talawade unit.",
    },
  },

  contact: {
    heading: "Contact Shree Perforators",
    intro: "Call, WhatsApp or write to the Talawade unit. We are closed on Thursdays.",
    successText: "Thank you. Our team will get back to you shortly.",
  },

  quote: {
    heading: "Request a Quote from Shree Perforators",
    successText: "Thank you. We will review your requirement and reply with a quotation.",
  },

  ctaBanner: {
    title: "Need a pattern punched?",
    text: "Tell us the hole size, pitch, metal and thickness, and the Talawade unit will quote.",
  },

  galleryHero: {
    label: "GALLERY",
    title: "Sheets from the Talawade Unit",
    subtitle:
      "Perforated sheets, expanded metal and punched work of the kind made at Shree Perforators.",
  },

  export: {
    hero: {
      label: "EXPORT",
      title: "We Deliver Globally",
      subtitle: "Perforated sheets and expanded metal from Talawade, Pune, for buyers outside India.",
    },
    sections: [
      {
        heading: "What we ship",
        paragraphs: [
          "Perforated sheets in custom hole patterns, expanded metal, punched parts and screens made to drawing, in stainless steel, mild steel, GI, aluminium, copper or brass.",
        ],
      },
      {
        heading: "How to enquire",
        paragraphs: [
          "Send your drawing or specification, the quantity and the destination country. We will confirm what we can make and share a quotation.",
          "Email shreeperforator@gmail.com or WhatsApp +91 93706 06017.",
        ],
      },
    ],
  },

  products: {
    "perforated-sheets": {
      name: "Perforated Sheets",
      tagline: "Your hole pattern, punched by CNC and turret machines",
      card: {
        description: "Any hole layout in sheet up to 12 mm, punched on CNC and turret machines.",
      },
      overview: [
        "Perforated sheets are the main work of Shree Perforators. We punch round, square, hexagonal and slotted holes, in straight or staggered rows, as well as ornamental patterns drawn by the customer.",
        "Sheet thickness goes up to 12 mm, and the hole can be as small as the thickness of the metal allows. For a hole shape we have no tool for, special dies are developed for the job.",
        "After punching, sheets can be sheared to size, bent and leveled at the same unit, so they reach you flat and ready to fit.",
      ],
      specifications: [
        { label: "Thickness", value: "Up to 12 mm" },
        { label: "Smallest hole", value: "About the thickness of the sheet" },
        { label: "Process", value: "CNC and turret perforation" },
        { label: "Hole shapes", value: "Round, square, hexagonal, slotted, ornamental" },
        { label: "Drawings", value: "DXF, DWG or a sample" },
      ],
      strengths: [
        "Standard and custom hole layouts",
        "Dies developed for unusual shapes",
        "Shearing, bending and leveling on site",
        "Close watch on bow and warpage",
      ],
      applications: [
        "Filters and strainers",
        "Machine guards",
        "Process screens",
        "Ventilation panels",
        "Facade and interior panels",
        "Equipment covers",
      ],
      faqs: [
        {
          q: "Can you copy a hole pattern from a sample sheet?",
          a: "Yes. Send the sample or clear photos with measurements, and we will work out the hole size, pitch and layout before quoting.",
        },
        {
          q: "How thick a sheet can you perforate?",
          a: "Up to 12 mm. The smallest hole we can punch depends on the thickness, roughly equal to it.",
        },
        {
          q: "Which metals do you perforate?",
          a: "Stainless steel, mild steel, galvanised iron, aluminium, copper and brass.",
        },
        {
          q: "Do you also cut and bend the sheets?",
          a: "Yes. Shearing, bending and leveling are done at our Talawade unit after perforation.",
        },
        {
          q: "Do you laser cut?",
          a: "Not at this unit. Our sister unit Jai Shree Metal Perforators in Talawade does laser cutting.",
        },
      ],
      metaTitle: "CNC Perforated Sheets in Custom Hole Patterns, Pune",
      metaDescription:
        "Perforated sheets punched to your pattern in Talawade, Pune: round, square, hex and slotted holes, SS to brass, up to 12 mm thick, sheared and leveled on site.",
      materials: [
        "Stainless Steel",
        "MS (Mild Steel)",
        "GI (Galvanized Iron)",
        "Aluminum",
        "Copper",
        "Brass",
      ],
    },
    "expanded-metal": {
      name: "Expanded Metal",
      tagline: "Slit and stretched sheet in diamond, square or hex openings",
      card: {
        description: "Diamond, square and hexagonal openings in sheet up to 6 mm thick.",
      },
      overview: [
        "Expanded metal is made by slitting a sheet and stretching it, so the openings form without removing any metal. It stays in one piece and carries load well for its weight.",
        "We produce it in diamond, square and hexagonal patterns in thicknesses up to 6 mm, and it can be leveled after expansion when a flat panel is needed.",
      ],
      specifications: [
        { label: "Thickness", value: "Up to 6 mm" },
        { label: "Patterns", value: "Diamond, square, hexagonal" },
        { label: "After expansion", value: "Leveling on request" },
      ],
      strengths: [
        "One-piece mesh with no welds",
        "Three opening patterns",
        "Leveled panels when required",
      ],
      applications: [
        "Walkways and platforms",
        "Guards and fencing panels",
        "Filter supports",
        "Facade cladding",
      ],
      faqs: [
        {
          q: "What patterns of expanded metal do you make?",
          a: "Diamond, square and hexagonal openings.",
        },
        {
          q: "What is the maximum thickness?",
          a: "Up to 6 mm.",
        },
        {
          q: "Can expanded metal be supplied flat?",
          a: "Yes. Raised expanded metal can be leveled into a flat panel after expansion.",
        },
        {
          q: "Which metals can be expanded?",
          a: "Stainless steel, mild steel, GI, aluminium, copper, brass and titanium.",
        },
      ],
      metaTitle: "Expanded Metal Sheets, Diamond, Square & Hex, Pune",
      metaDescription:
        "Expanded metal from Shree Perforators, Talawade, Pune: diamond, square and hexagonal openings up to 6 mm thick, raised or leveled flat.",
      materials: [
        "Stainless Steel",
        "MS (Mild Steel)",
        "GI (Galvanized Iron)",
        "Aluminum",
        "Copper",
        "Brass",
        "Titanium",
      ],
    },
    "turret-punching": {
      name: "CNC Turret Punching",
      tagline: "Parts and blanks punched to drawing on CNC turrets",
      card: {
        description: "Holes and cut-outs of any shape punched to drawing on CNC turret machines.",
      },
      overview: [
        "Turret punching is used when a part needs a mix of holes, slots and cut-outs rather than a repeating pattern. The CNC turret works through the drawing hole by hole.",
        "We punch round, square, rectangular, oblong and hexagonal holes, and develop special dies when a drawing calls for a shape outside the standard set.",
      ],
      specifications: [
        { label: "Process", value: "CNC turret punching" },
        { label: "Hole shapes", value: "Round, square, rectangular, oblong, hexagonal, custom" },
        { label: "Tooling", value: "Special dies for non-standard shapes" },
        { label: "Drawings", value: "DXF, DWG or a sample" },
      ],
      strengths: [
        "Mixed hole layouts in one part",
        "Repeatable from batch to batch",
        "Special tooling when needed",
      ],
      applications: [
        "Electrical panels and enclosures",
        "Machine parts",
        "Brackets and mounting plates",
        "Cabinet panels",
      ],
      faqs: [
        {
          q: "What is the difference between perforation and turret punching?",
          a: "Perforation repeats one hole across a sheet. Turret punching follows a drawing with different holes and cut-outs in each part.",
        },
        {
          q: "What drawing formats can you work from?",
          a: "DXF or DWG files, or a physical sample we can measure.",
        },
        {
          q: "Can you punch a shape you do not have a tool for?",
          a: "Yes. A special die can be developed for the job.",
        },
      ],
      metaTitle: "CNC Turret Punching to Drawing, Talawade, Pune",
      metaDescription:
        "CNC turret punching at Shree Perforators, Pune: round, square, oblong and hex holes and custom cut-outs to your DXF or DWG drawing.",
      materials: [
        "Stainless Steel",
        "MS (Mild Steel)",
        "GI (Galvanized Iron)",
        "Aluminum",
        "Copper",
        "Brass",
      ],
    },
    "precision-sheet-leveling": {
      name: "Precision Sheet Leveling",
      tagline: "Taking the bow out of punched sheet",
      card: {
        description: "Bow and warpage removed from perforated and punched sheets.",
      },
      overview: [
        "Punching many holes into a sheet stretches it unevenly, and the sheet can bow or twist. Leveling works the sheet back to flat.",
        "We level our own perforated and punched sheets as part of the order, and can level sheets you bring to us.",
      ],
      specifications: [
        { label: "Purpose", value: "Bow and warpage correction" },
        { label: "Used on", value: "Perforated and punched sheets" },
        { label: "Metals", value: "All metals we work" },
      ],
      strengths: [
        "Flatter sheets at assembly",
        "Part of our own perforation orders",
        "Available as a separate service",
      ],
      applications: [
        "Panels that must sit flush",
        "Sheets going on to bending",
        "Screens fitted in frames",
      ],
      faqs: [
        {
          q: "Why do perforated sheets need leveling?",
          a: "Punching stretches the metal around each hole, which makes the sheet bow. Leveling brings it back to flat.",
        },
        {
          q: "Can you level sheets punched elsewhere?",
          a: "Yes. Tell us the size, thickness and metal of the sheets and we will confirm.",
        },
      ],
      metaTitle: "Sheet Leveling for Perforated Sheets, Pune",
      metaDescription:
        "Leveling to remove bow and warpage from perforated and punched sheets at Shree Perforators, Talawade, Pune. Also offered as a separate job.",
      materials: ["All Metals"],
    },
    "custom-components": {
      name: "Custom Parts and Screens",
      tagline: "Special screens and parts made from your drawing",
      card: {
        description: "Huller and herringbone screens, embossed plates and parts made to drawing.",
      },
      overview: [
        "Some jobs need more than a punched sheet. We make special dies, embossed plates, dimple de-stoners, huller screens and herringbone screens, and take on other parts made to a customer's drawing.",
        "Send a DXF or DWG file or a sample, and we will tell you how it can be made and quote for it.",
      ],
      specifications: [
        { label: "Special jobs", value: "Embossed plates, dimple de-stoners, huller and herringbone screens" },
        { label: "Tooling", value: "Special dies developed in-house" },
        { label: "Drawings", value: "DXF, DWG or a sample" },
      ],
      strengths: [
        "Screens for grain and seed processing",
        "Embossed and dimpled plates",
        "Parts copied from samples",
      ],
      applications: [
        "Rice and grain processing",
        "Seed cleaning",
        "Anti-slip plates",
        "Replacement parts",
      ],
      faqs: [
        {
          q: "Do you make huller and herringbone screens?",
          a: "Yes, along with dimple de-stoners and embossed plates.",
        },
        {
          q: "Can you make a part from a worn sample?",
          a: "Yes. We measure the sample and confirm the dimensions with you before making it.",
        },
      ],
      metaTitle: "Custom Screens and Parts to Drawing, Pune",
      metaDescription:
        "Huller and herringbone screens, dimple de-stoners, embossed plates and parts to drawing from Shree Perforators, Talawade, Pune.",
      materials: [
        "Stainless Steel",
        "MS (Mild Steel)",
        "GI (Galvanized Iron)",
        "Aluminum",
        "Copper",
        "Brass",
      ],
    },
  },

  industries: {
    automobile: {
      name: "Automotive",
      headline: "Perforated sheet for vehicle and component makers",
      description:
        "Automotive buyers use our perforated sheets for filter elements, speaker grilles and guards, where hole size and flatness must stay the same from batch to batch.",
      summary: "Filter elements, grilles and guards",
      applications: [
        "Filter elements",
        "Speaker grilles",
        "Engine grilles and guards",
        "Covers"
      ],
      clients: "",
      metaTitle: "Perforated Sheets for Automotive Parts",
      metaDescription:
        "Perforated sheets for automotive filter elements, speaker grilles and guards, punched to a repeatable pattern at Shree Perforators, Pune.",
    },
    "food-beverage": {
      name: "Food and Beverage",
      headline: "Stainless perforated sheet for food machinery",
      description:
        "Food equipment makers order stainless perforated sheets for sieves, drying trays and conveyor screens that need to be cleaned often.",
      summary: "Sieves, trays and conveyor screens",
      applications: [
        "Sieves and sifters",
        "Drying trays",
        "Conveyor screens",
        "Washing drums",
      ],
      clients: "",
      metaTitle: "Perforated Sheets for Food Machinery",
      metaDescription:
        "Stainless steel perforated sheets for food machinery: sieves, drying trays and conveyor screens, from Shree Perforators, Pune.",
    },
    pharmaceutical: {
      name: "Pharmaceutical",
      headline: "Precise screens for pharma equipment",
      description:
        "Pharma machinery builders use fine, even perforation in stainless steel for granulator screens, sifters and coating pans.",
      summary: "Granulator screens and sifters",
      applications: [
        "Granulator screens",
        "Sifter screens",
        "Coating pan perforation",
        "Dryer trays",
      ],
      clients: "",
      metaTitle: "Perforated Screens for Pharma Equipment",
      metaDescription:
        "Stainless perforated screens for granulators, sifters and coating pans, punched to fine even patterns at Shree Perforators, Pune.",
    },
    "sugar-industry": {
      name: "Sugar Mills",
      headline: "Screens that stand up to sugar processing",
      description:
        "Sugar mills order perforated and slotted screens for juice straining and centrifugal work, along with replacement screens made from samples.",
      summary: "Juice and centrifugal screens",
      applications: [
        "Juice strainers",
        "Centrifugal screens",
        "Slotted screens",
        "Replacement screens",
      ],
      clients: "",
      metaTitle: "Perforated Screens for Sugar Mills",
      metaDescription:
        "Perforated and slotted screens for sugar mills, including replacements made from samples, from Shree Perforators, Talawade, Pune.",
    },
    "architecture-interior": {
      name: "Architecture and Interiors",
      headline: "Patterned sheet for facades and interiors",
      description:
        "Architects and fabricators use our decorative and ornamental hole patterns for facades, ceilings, partitions and screens.",
      summary: "Facades, ceilings and partitions",
      applications: [
        "Facade panels",
        "Ceiling panels",
        "Partitions and screens",
        "Railing infill",
      ],
      clients: "",
      metaTitle: "Decorative Perforated Panels for Buildings",
      metaDescription:
        "Decorative and ornamental perforated panels for facades, ceilings and partitions, punched to your pattern at Shree Perforators, Pune.",
    },
    construction: {
      name: "Construction",
      headline: "Perforated and expanded metal on site",
      description:
        "Contractors use our expanded metal and perforated sheet for walkways, safety guards and ventilation panels on industrial buildings.",
      summary: "Walkways, guards and vents",
      applications: [
        "Walkways and stair treads",
        "Safety guards",
        "Ventilation panels",
        "Cladding",
      ],
      clients: "",
      metaTitle: "Perforated and Expanded Metal for Construction",
      metaDescription:
        "Expanded metal walkways, guards and perforated ventilation panels for construction projects, from Shree Perforators, Talawade, Pune.",
    },
  },
};
