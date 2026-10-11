import type { SiteContent } from "@/sites/content/types";

/**
 * Jai Shree Metal Perforators (Gat No. 93, Talawade, Pune) — copy written for
 * this site only (docs/07-seo-rules.md). Facts: docs/02-business-facts.md.
 * No machine list, client names, capacities, reply times or prices: the client
 * has not supplied them (docs/08-content-checklist.md).
 */

const GROUP_URL = "https://www.jaishreegroup.com";
const NO_EXPANDED =
  "Expanded metal is not made here; our sister unit Shree Perforators in Talawade makes it.";

export const jaiShreeMetalPerforatorsContent: SiteContent = {
  meta: {
    home: {
      title: "Laser Cutting and CNC Punching Job Work in Pune",
      description:
        "Send your drawing for fiber laser cutting up to 14 mm or CNC turret punching at Talawade, Pune. SS, MS, aluminium, copper, brass and titanium.",
    },
    about: {
      title: "About Our Laser and Punching Unit, Talawade",
      description:
        "Jai Shree Metal Perforators is the laser cutting and CNC punching job-work unit of Jai Shree Group at Gat No. 93, Talawade, Pune.",
    },
    products: {
      title: "Laser Cutting, Turret Punching and Sheet Job Work",
      description:
        "Job work at our Talawade unit: fiber laser cutting, CNC turret punching, perforated sheets, sheet leveling and parts made to drawing.",
    },
    industries: {
      title: "Industries We Cut and Punch For",
      description:
        "Laser-cut and punched parts for automotive suppliers, construction, food and pharma equipment, process plants and architectural metalwork.",
    },
    contact: {
      title: "Contact Us at Gat No. 93, Talawade, Pune",
      description:
        "Call +91 93733 24492 or email jsmppune@gmail.com. Gat No. 93, Talawade, Pune 411062. Closed on Thursdays.",
    },
    getQuote: {
      title: "Request a Job-Work Quote",
      description:
        "Ask for a quotation for laser cutting, turret punching or perforation: tell us the material, thickness and quantity, or upload your drawing.",
    },
    gallery: {
      title: "Laser-Cut and Punched Work",
      description:
        "Photos of laser-cut parts, punched and perforated sheets and custom work from Jai Shree Metal Perforators, Talawade, Pune.",
    },
    export: {
      title: "Laser Cutting Job Work for Overseas Buyers",
      description:
        "Jai Shree Metal Perforators takes laser cutting and punching orders from outside India. Send your drawing and destination for a quotation.",
    },
    drawingQuote: {
      title: "Upload Your Drawing for a Quote",
      description:
        "Upload a DXF, DWG or PDF drawing with material, thickness and quantity, and Jai Shree Metal Perforators will quote for laser cutting or punching.",
    },
  },

  home: {
    hero: {
      badge: "Gat No. 93, Talawade, Pune • A Jai Shree Group company",
      lines: [
        { text: "YOUR DRAWING." },
        { text: "LASER CUT" },
        { text: "OR PUNCHED.", accent: true },
      ],
      intro:
        "Job work on fiber laser and CNC turret machines: profiles cut up to 14 mm, holes and cut-outs punched in any shape, in stainless steel, mild steel, aluminium, copper, brass and titanium.",
      primaryCta: { label: "Upload a Drawing", href: "/drawing-quote" },
      secondaryCta: { label: "Our Job Work", href: "/products" },
      stats: [
        { value: "Up to 14 mm", label: "Laser cutting" },
        { value: "Up to 12 mm", label: "Perforation" },
        { value: "DXF · DWG · PDF", label: "Drawings accepted" },
      ],
    },
    trust: {
      ariaLabel: "Jai Shree Metal Perforators at a glance",
      stats: [
        { display: "14 mm", label: "Thickest laser cut" },
        { display: "Fiber laser", label: "Cutting technology" },
        { display: "CNC turret", label: "Punching" },
        { display: "Global", label: "Delivery" },
      ],
    },
    products: {
      id: "products",
      label: "JOB WORK AT GAT NO. 93",
      heading: "Cut, Punch, Perforate, Flatten",
      subtext:
        "Laser cutting and turret punching are the core of this unit. Perforation, leveling and special parts let us finish a job without sending it elsewhere.",
    },
    about: {
      id: "about",
      label: "THE UNIT",
      heading: "A Job Shop Built Around Drawings",
      paragraphs: [
        "Jai Shree Metal Perforators works from Gat No. 93 in Talawade, Pune, beside its sister units. Most orders start as a drawing: a flat pattern, a bracket, a panel with cut-outs or a sheet that needs a field of holes.",
        "Profiles are cut on a fiber laser and repeated holes are punched on a CNC turret. Using both on one part keeps the cost down, because the turret is faster for many identical holes and the laser handles the outline.",
        "The unit belongs to Jai Shree Group, which added fiber laser cutting in 2015.",
      ],
      highlights: [
        { value: "14 mm", label: "Maximum laser cutting thickness" },
        { value: "Any shape", label: "Turret-punched holes" },
        { value: "Laser + turret", label: "Combined on one part" },
        { value: "Global", label: "Delivery from Pune" },
      ],
      cta: { label: "About the Unit", href: "/about" },
      timeline: [
        { year: "1970", description: "Jai Shree Group founded in Delhi" },
        { year: "1997", description: "The group opens its Talawade, Pune plant" },
        { year: "2013", description: "Full CNC upgrade across the group" },
        { year: "2015", description: "Fiber laser cutting added to the group" },
      ],
    },
    industries: {
      id: "industries",
      label: "WHO SENDS US DRAWINGS",
      heading: "Parts for Many Kinds of Buyer",
      banner: {
        text: "Your sector is not listed? If it can be drawn in sheet metal, send it and we will look at it.",
        cta: { label: "Upload a Drawing", href: "/drawing-quote" },
      },
    },
    process: {
      id: "process",
      label: "HOW A JOB RUNS",
      heading: "From File to Finished Parts",
      steps: [
        {
          step: 1,
          icon: "ClipboardList",
          title: "Send the drawing",
          description: "Upload a DXF, DWG or PDF with material, thickness and quantity.",
        },
        {
          step: 2,
          icon: "PenTool",
          title: "Process choice",
          description: "We decide what is cut on the laser and what is punched on the turret.",
        },
        {
          step: 3,
          icon: "Layers",
          title: "Sheet",
          description: "Stainless, mild steel, aluminium, copper, brass or titanium as specified.",
        },
        {
          step: 4,
          icon: "Cog",
          title: "Cutting and punching",
          description: "Parts are cut and punched, then leveled if the job needs flat sheets.",
        },
        {
          step: 5,
          icon: "Truck",
          title: "Check and dispatch",
          description: "Parts are checked against your drawing before they are sent.",
        },
      ],
    },
    cta: {
      heading: "Got a Drawing Ready?",
      text: "Upload it with the material, thickness and quantity, and the Talawade unit will prepare a quotation.",
      primaryCta: { label: "Upload a Drawing", href: "/drawing-quote" },
      callLabel: "Call Gat No. 93",
      badges: ["DXF, DWG, PDF", "Laser up to 14 mm", "Global delivery"],
    },
  },

  about: {
    hero: {
      label: "ABOUT US",
      title: "Jai Shree Metal Perforators",
      subtitle: "Laser cutting and CNC punching job work at Gat No. 93, Talawade, Pune",
      badges: ["Talawade, Pune", "Job work to drawing"],
    },
    story: {
      label: "THE UNIT",
      heading: "Job Work, Not Stock",
      paragraphs: [
        "Jai Shree Metal Perforators does not sell standard products off a shelf. Every order is made to the customer's drawing: laser-cut profiles, punched panels, perforated sheets and special parts.",
        "Fiber laser cutting goes up to 14 mm in stainless steel, mild steel, aluminium, copper, brass and titanium. CNC turret punching handles holes and slots in any shape, and the two are combined when a part needs both a precise outline and many repeated holes.",
        "Buyers are engineering firms, automotive Tier-1 and Tier-2 suppliers and fabricators who need parts made accurately to their files.",
      ],
    },
    numbers: {
      label: "CAPABILITIES",
      heading: "What We Work To",
      stats: [
        { value: "14 mm", label: "Max laser cutting thickness" },
        { value: "12 mm", label: "Max perforation thickness" },
        { value: "6", label: "Metals we laser cut" },
        { value: "3", label: "Drawing formats accepted" },
        { value: "Thursday", label: "Weekly holiday" },
      ],
    },
    strengths: {
      label: "WHY JOB SHOPS AND OEMS USE US",
      heading: "What the Unit Does Well",
      items: [
        {
          icon: "Settings",
          title: "Laser and turret together",
          description: "Outlines on the laser, repeated holes on the turret, to keep the part price down.",
        },
        {
          icon: "Shield",
          title: "Flat parts",
          description: "Punched and cut sheets can be leveled to take out bow and warpage.",
        },
        {
          icon: "Package",
          title: "Special tooling",
          description: "Dies for unusual hole shapes are developed for the job.",
        },
        {
          icon: "Truck",
          title: "Ships anywhere",
          description: "Parts are dispatched within India and overseas.",
        },
      ],
    },
    parent: {
      label: "PART OF JAI SHREE GROUP",
      heading: "One of Six Units Since 1970",
      paragraphs: [
        "Jai Shree Group began in Delhi in 1970 under Mr. Tejaram Jangid, opened its Talawade, Pune plant in 1997, completed a full CNC upgrade in 2013 and added fiber laser cutting in 2015.",
        "The group is ISO 9001:2015 certified by Bureau Veritas and runs six units in Pune and the Mumbai region. Jai Shree Metal Perforators is its laser cutting and punching job-work unit.",
        NO_EXPANDED,
      ],
      link: { label: "Visit Jai Shree Group", href: GROUP_URL },
    },
  },

  productsIndex: {
    hero: {
      label: "JOB WORK",
      title: "Laser Cutting and Punching to Your Drawing",
      subtitle:
        "Five services, all run from your files at our Talawade unit.",
    },
    intro: `Choose a service below or upload your drawing and we will suggest the process. ${NO_EXPANDED}`,
  },

  industriesIndex: {
    hero: {
      label: "INDUSTRIES",
      title: "Who We Make Parts For",
      subtitle: "Laser-cut and punched work for six groups of buyers.",
    },
  },

  contact: {
    heading: "Contact Jai Shree Metal Perforators",
    intro: "Call, WhatsApp or email the Gat No. 93 unit. We are closed on Thursdays.",
    successText: "Thank you. We will get back to you shortly.",
  },

  quote: {
    heading: "Request a Job-Work Quote",
    successText: "Thank you. We will study your requirement and send a quotation.",
  },

  industryQuoteText: "Send the drawing for your part and we will quote for cutting, punching or both.",

  ctaBanner: {
    title: "Have a part to make?",
    text: "Upload the drawing with material, thickness and quantity, and we will quote.",
  },

  galleryHero: {
    label: "GALLERY",
    title: "Work from Gat No. 93",
    subtitle: "Laser-cut, punched and perforated work of the kind made at Jai Shree Metal Perforators.",
  },

  export: {
    hero: {
      label: "EXPORT",
      title: "We Deliver Globally",
      subtitle: "Laser cutting and punching job work from Talawade, Pune, for buyers outside India.",
    },
    sections: [
      {
        heading: "What we can take on",
        paragraphs: [
          "Laser-cut and punched parts, perforated sheets and special screens made to your drawing in stainless steel, mild steel, aluminium, copper, brass or titanium.",
        ],
      },
      {
        heading: "Sending an export enquiry",
        paragraphs: [
          "Upload the drawing on our drawing page and mention the destination country, or email it to jsmppune@gmail.com.",
          "For a quick question, WhatsApp +91 93733 24492.",
        ],
      },
    ],
  },

  drawingQuote: {
    hero: {
      label: "UPLOAD A DRAWING",
      title: "Get a Quote from Your Drawing",
      subtitle:
        "Attach your DXF, DWG or PDF, tell us the material, thickness and quantity, and we will quote for laser cutting or punching.",
    },
    intro:
      "Files go to a private store that only our team can open. You can attach up to 5 files of up to 20 MB each.",
    successText: "Thank you. Your drawing has reached us and we will reply with a quotation.",
  },

  products: {
    "laser-cutting": {
      name: "Fiber Laser Cutting",
      tagline: "Profiles cut from your file, up to 14 mm",
      card: {
        description: "Profiles cut on a fiber laser from your DXF or DWG, up to 14 mm thick.",
      },
      overview: [
        "Fiber laser cutting is the main service of Jai Shree Metal Perforators. We cut flat profiles straight from your drawing file, so outlines, slots and internal cut-outs come out as drawn.",
        "Thickness goes up to 14 mm in stainless steel, mild steel, aluminium, copper, brass and titanium.",
        "Where a part also needs many identical holes, we punch those on the CNC turret and cut the outline on the laser, which usually costs less than lasering everything.",
      ],
      specifications: [
        { label: "Process", value: "Fiber laser cutting" },
        { label: "Thickness", value: "Up to 14 mm" },
        { label: "Drawings", value: "DXF, DWG or PDF" },
        { label: "Combined with", value: "CNC turret punching" },
      ],
      strengths: [
        "Cut directly from your file",
        "Up to 14 mm thick",
        "Six metals including titanium",
        "Combined with punching to save cost",
      ],
      applications: [
        "Brackets and mounting plates",
        "Machine and enclosure panels",
        "Flanges and gaskets",
        "Architectural screens",
        "Signage and letters",
        "Prototype parts",
      ],
      faqs: [
        {
          q: "What file should I send for laser cutting?",
          a: "A DXF or DWG is best. A dimensioned PDF also works; we will confirm the geometry with you.",
        },
        {
          q: "How thick can you laser cut?",
          a: "Up to 14 mm, depending on the metal.",
        },
        {
          q: "Which metals can you cut?",
          a: "Stainless steel, mild steel, aluminium, copper, brass and titanium.",
        },
        {
          q: "Can laser cutting and punching be combined?",
          a: "Yes. Outlines go on the laser and repeated holes on the CNC turret, which often lowers the cost of the part.",
        },
      ],
      metaTitle: "Fiber Laser Cutting Job Work up to 14 mm, Pune",
      metaDescription:
        "Fiber laser cutting from your DXF, DWG or PDF at Talawade, Pune: SS, MS, aluminium, copper, brass and titanium up to 14 mm. Upload a drawing for a quote.",
      materials: [
        "Stainless Steel",
        "MS (Mild Steel)",
        "Aluminum",
        "Copper",
        "Brass",
        "Titanium",
      ],
    },
    "turret-punching": {
      name: "CNC Turret Punching",
      tagline: "Holes, slots and cut-outs of any shape, punched to drawing",
      card: {
        description: "Any hole shape punched on CNC turrets, alone or with laser cutting.",
      },
      overview: [
        "CNC turret punching suits parts with many holes or slots. The turret works through the drawing hit by hit and repeats it exactly across a batch.",
        "Round, square, rectangular, oblong and hexagonal holes are punched with standard tools; for other shapes we develop a special die.",
        "Combined with the fiber laser, the turret takes the repeated features while the laser cuts the outline.",
      ],
      specifications: [
        { label: "Process", value: "CNC turret punching" },
        { label: "Hole shapes", value: "Round, square, rectangular, oblong, hexagonal, custom" },
        { label: "Tooling", value: "Special dies when needed" },
        { label: "Combined with", value: "Fiber laser cutting" },
      ],
      strengths: [
        "Fast on many identical holes",
        "Any hole shape with special dies",
        "Repeatable across batches",
      ],
      applications: [
        "Electrical panels",
        "Ventilation panels",
        "Equipment covers",
        "Chassis and frames",
      ],
      faqs: [
        {
          q: "When is punching better than laser cutting?",
          a: "When a part has many identical holes. The turret punches them quickly; the laser is better for outlines and one-off shapes.",
        },
        {
          q: "Can you punch a hole shape you do not have a tool for?",
          a: "Yes. A special die can be developed for the job.",
        },
        {
          q: "Which metals do you punch?",
          a: "Stainless steel, mild steel, GI, aluminium, copper and brass.",
        },
      ],
      metaTitle: "CNC Turret Punching Job Work, Talawade, Pune",
      metaDescription:
        "CNC turret punching job work at Jai Shree Metal Perforators, Pune: holes and slots of any shape, combined with laser cutting when it saves cost.",
      materials: [
        "Stainless Steel",
        "MS (Mild Steel)",
        "GI (Galvanized Iron)",
        "Aluminum",
        "Copper",
        "Brass",
      ],
    },
    "perforated-sheets": {
      name: "Perforated Sheets to Drawing",
      tagline: "Hole fields punched into sheet as part of your job",
      card: {
        description: "Perforated panels and sheets punched to your layout, up to 12 mm.",
      },
      overview: [
        "Many jobs need a perforated area inside a larger part: a vented panel, a guard or a screen with a solid border. We punch the hole field and cut the rest of the part in one job.",
        "Perforation goes up to 12 mm thick in stainless steel, mild steel, GI, aluminium, copper and brass.",
      ],
      specifications: [
        { label: "Thickness", value: "Up to 12 mm" },
        { label: "Process", value: "CNC turret perforation" },
        { label: "Layouts", value: "Full sheet or areas inside a part" },
      ],
      strengths: [
        "Perforated areas inside cut parts",
        "Solid borders and blank zones as drawn",
        "Leveled after punching",
      ],
      applications: [
        "Vented panels",
        "Machine guards",
        "Speaker and fan grilles",
      ],
      faqs: [
        {
          q: "Can you perforate only part of a sheet?",
          a: "Yes. Send a drawing showing the perforated area and the solid borders.",
        },
        {
          q: "How thick a sheet can you perforate?",
          a: "Up to 12 mm.",
        },
      ],
      metaTitle: "Perforated Panels Punched to Drawing, Pune",
      metaDescription:
        "Perforated panels and sheets punched to your drawing at Talawade, Pune: hole fields with solid borders, up to 12 mm thick, leveled after punching.",
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
      name: "Sheet Leveling",
      tagline: "Flattening laser-cut and punched sheets",
      card: {
        description: "Bow and warpage taken out of laser-cut and punched sheets.",
      },
      overview: [
        "Cutting and punching can leave a sheet bowed. We level laser-cut and punched sheets so parts sit flat in assembly and bend cleanly.",
      ],
      specifications: [
        { label: "Purpose", value: "Bow and warpage control" },
        { label: "Used on", value: "Laser-cut and punched sheets" },
      ],
      strengths: [
        "Flat parts for assembly",
        "Part of our own job work",
      ],
      applications: [
        "Panels that must sit flush",
        "Sheets going for bending",
      ],
      faqs: [
        {
          q: "Do laser-cut sheets need leveling?",
          a: "Sometimes. Heavily punched or cut sheets can bow; leveling flattens them before bending or assembly.",
        },
      ],
      metaTitle: "Leveling for Laser-Cut and Punched Sheets, Pune",
      metaDescription:
        "Leveling of laser-cut and punched sheets to remove bow and warpage, at Jai Shree Metal Perforators, Talawade, Pune.",
      materials: ["All Metals"],
    },
    "custom-components": {
      name: "Special Parts and Screens",
      tagline: "Embossed plates, screens and parts made from a drawing or sample",
      card: {
        description: "Embossed plates, dimple de-stoners and screens made to drawing or sample.",
      },
      overview: [
        "Besides cutting and punching, the unit makes special items: embossed plates, dimple de-stoners, huller screens and herringbone screens, along with parts copied from a sample.",
        "Send a DXF or DWG, a PDF or the sample itself and we will advise how it can be made.",
      ],
      specifications: [
        { label: "Special jobs", value: "Embossed plates, dimple de-stoners, huller and herringbone screens" },
        { label: "Drawings", value: "DXF, DWG, PDF or a sample" },
        { label: "Processes", value: "Laser cutting, turret punching, special dies" },
      ],
      strengths: [
        "Parts copied from samples",
        "Embossing and dimpling",
        "Screens for processing machinery",
      ],
      applications: [
        "Grain and seed processing screens",
        "Anti-slip plates",
        "Replacement machine parts",
      ],
      faqs: [
        {
          q: "Can you make a part from a sample?",
          a: "Yes. We measure the sample and confirm the dimensions with you before making it.",
        },
        {
          q: "Do you make embossed plates?",
          a: "Yes, along with dimple de-stoners, huller screens and herringbone screens.",
        },
      ],
      metaTitle: "Special Screens and Embossed Parts to Drawing, Pune",
      metaDescription:
        "Embossed plates, dimple de-stoners, huller and herringbone screens and parts copied from samples, at Jai Shree Metal Perforators, Pune.",
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
      name: "Automotive Suppliers",
      headline: "Cut and punched parts for Tier-1 and Tier-2 suppliers",
      description:
        "Automotive suppliers send us drawings for brackets, plates, guards and perforated filter parts that must match the file from the first piece to the last.",
      summary: "Brackets, guards and filter parts",
      applications: ["Brackets and plates", "Guards", "Perforated filter parts", "Speaker grilles"],
      clients: "",
      metaTitle: "Laser-Cut Parts for Automotive Suppliers",
      metaDescription:
        "Laser-cut and punched brackets, guards and filter parts for automotive suppliers, made to drawing at Jai Shree Metal Perforators, Pune.",
    },
    construction: {
      name: "Construction",
      headline: "Sheet parts for buildings and site work",
      description:
        "Fabricators on construction projects use our laser-cut and punched sheet for safety guards, ventilation panels and fixing plates.",
      summary: "Guards, vents and fixing plates",
      applications: ["Safety guards", "Ventilation panels", "Fixing plates", "Cladding parts"],
      clients: "",
      metaTitle: "Laser Cutting for Construction Fabricators",
      metaDescription:
        "Laser-cut and punched guards, ventilation panels and fixing plates for construction fabricators, from Jai Shree Metal Perforators, Pune.",
    },
    "food-beverage": {
      name: "Food Processing",
      headline: "Stainless parts for food machinery builders",
      description:
        "Machinery builders order stainless laser-cut panels and perforated trays and screens for food processing lines.",
      summary: "Stainless panels, trays and screens",
      applications: ["Machine panels", "Perforated trays", "Sieve plates", "Guards"],
      clients: "",
      metaTitle: "Stainless Laser-Cut Parts for Food Machinery",
      metaDescription:
        "Stainless steel laser-cut panels, perforated trays and sieve plates for food machinery builders, made to drawing in Pune.",
    },
    pharmaceutical: {
      name: "Pharma Equipment",
      headline: "Accurate stainless parts for pharma machines",
      description:
        "Pharma equipment makers use our laser cutting and fine perforation for machine panels, screens and trays in stainless steel.",
      summary: "Machine panels and screens",
      applications: ["Machine panels", "Perforated screens", "Trays", "Covers"],
      clients: "",
      metaTitle: "Laser Cutting for Pharma Equipment Makers",
      metaDescription:
        "Stainless laser-cut panels, perforated screens and trays for pharmaceutical equipment makers, from Jai Shree Metal Perforators, Pune.",
    },
    petrochemical: {
      name: "Process Plants",
      headline: "Plates and screens for process equipment",
      description:
        "Process plant fabricators send us drawings for laser-cut plates, baffles and perforated screens in stainless and mild steel.",
      summary: "Plates, baffles and screens",
      applications: ["Baffle plates", "Perforated screens", "Flanges", "Support plates"],
      clients: "",
      metaTitle: "Laser-Cut Plates and Screens for Process Plants",
      metaDescription:
        "Laser-cut baffle plates, flanges and perforated screens for process plant fabricators, made to drawing at Talawade, Pune.",
    },
    "architecture-interior": {
      name: "Architectural Metalwork",
      headline: "Cut and perforated panels for design projects",
      description:
        "Architects and interior fabricators use our laser cutting for decorative screens, jaali panels and signage cut from their artwork.",
      summary: "Decorative screens and signage",
      applications: ["Decorative screens", "Jaali panels", "Signage", "Ceiling panels"],
      clients: "",
      metaTitle: "Laser-Cut Decorative Screens and Panels, Pune",
      metaDescription:
        "Laser-cut decorative screens, jaali panels and signage from your artwork, by Jai Shree Metal Perforators, Talawade, Pune.",
    },
  },
};
