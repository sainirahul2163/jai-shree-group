export type BlogPostSeed = {
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
  meta_title: string;
  meta_description: string;
  content: string;
};

export const BLOG_POSTS: BlogPostSeed[] = [
  {
    title: "How to Calculate Open Area of Perforated Sheet",
    slug: "how-to-calculate-open-area-perforated-sheet",
    date: "2024-01-15",
    category: "Technical Guide",
    excerpt:
      "Learn the standard formulas for calculating open area percentage in perforated sheets — with worked examples and a reference table for common hole sizes.",
    meta_title:
      "How to Calculate Open Area of Perforated Sheet | Jai Shree Group",
    meta_description:
      "Calculate perforated sheet open area % with formulas for round and square holes. Worked examples, pitch/diameter table, and free calculator from Jai Shree Group Pune.",
    content: `Open area percentage is one of the most important specifications when ordering perforated sheets. Whether you are designing a filtration screen, an architectural facade, or a ventilation panel, the open area directly affects airflow, liquid flow, acoustic performance, and the structural strength of the sheet. At Jai Shree Group — operating as Shree Perforators and Jai Shree Metal Perforators across our Pune and Mumbai facilities — we help buyers specify the right hole pattern every day.

## What Is Open Area Percentage?

Open area percentage (also called porosity or free area) is the ratio of the total hole area to the total sheet area, expressed as a percentage. A sheet with 40% open area means 40% of the surface is holes and 60% is solid metal. Higher open area allows greater flow-through but reduces material strength and rigidity.

The open area depends on three variables: hole shape, hole size, and pitch (centre-to-centre distance between adjacent holes). Different pitch arrangements — triangular (60° staggered), rectangular, and staggered — produce different open areas even with the same hole diameter.

## Formula for Round Holes — Triangular Pitch

The most common perforated sheet pattern uses round holes on a triangular (60° staggered) pitch. The standard formula is:

Open Area (%) = (0.9069 × d²) / p² × 100

Where d = hole diameter (mm) and p = pitch — centre-to-centre distance between holes (mm). The constant 0.9069 accounts for the hexagonal packing efficiency of staggered round holes.

For example, a sheet with 5 mm diameter holes at 8 mm pitch gives: (0.9069 × 25) / 64 × 100 = 35.5% open area.

## Formula for Square Holes — Rectangular Pitch

Square-hole perforated sheets use a rectangular pitch grid. The formula is:

Open Area (%) = (C² × 100) / (U1 × U2)

Where C = side length of the square hole (mm), and U1 × U2 = pitch dimensions in mm (centre-to-centre distance along each axis). When pitch is equal in both directions (U1 = U2 = p), this simplifies to Open Area (%) = (C² / p²) × 100.

## Worked Example: Round Holes at 6 mm Diameter, 10 mm Pitch

Suppose you need a stainless steel perforated sheet for a vibrating screen application. Your specification calls for 6 mm round holes on a 10 mm triangular pitch.

Step 1: Identify variables — d = 6 mm, p = 10 mm.
Step 2: Apply the formula — Open Area = (0.9069 × 36) / 100 × 100 = 32.6%.
Step 3: Interpret — roughly one-third of the sheet surface is open, suitable for medium-flow screening applications.

If your process engineer requires 40% open area instead, you would either increase hole diameter or reduce pitch. Our team at Shree Perforators can recommend the optimal combination for your application.

## Common Pitch and Diameter Combinations

The table below lists frequently specified round-hole combinations on triangular pitch, calculated using the standard formula:

| Hole Diameter (mm) | Pitch (mm) | Open Area (%) |
| --- | --- | --- |
| 2 | 3.5 | 29.6 |
| 3 | 5 | 32.6 |
| 4 | 6 | 40.3 |
| 5 | 8 | 35.5 |
| 6 | 10 | 32.6 |
| 8 | 12 | 40.3 |
| 10 | 15 | 40.3 |
| 12 | 18 | 40.3 |
| 15 | 20 | 51.0 |
| 20 | 25 | 58.0 |

These values are approximate. Actual open area may vary slightly depending on manufacturing tolerance and edge margins on the sheet.

## Use Our Free Online Calculator

Rather than calculating manually, you can use the [Perforated Sheet Open Area Calculator](/calculator) on our website. It supports round, square, rectangular, and capsule hole shapes across all six standard pitch configurations — the same formulas our production team uses in Pune.

## Need Perforated Sheets Manufactured to Spec?

Jai Shree Group manufactures perforated sheets up to 12 mm thickness and 2200 × 4000 mm sheet size using CNC turret punching. ISO 9001:2015 certified. Whether you need a specific open area for filtration, screening, or architectural cladding, we can produce to your exact hole pattern.

Browse our full [perforated sheet manufacturing capabilities](/products/perforated-sheets) or contact Shree Perforators in Pune for a quote.`,
  },
  {
    title: "Expanded Metal vs Perforated Sheet: Which to Choose?",
    slug: "expanded-metal-vs-perforated-sheet",
    date: "2024-01-22",
    category: "Product Guide",
    excerpt:
      "Compare expanded metal and perforated sheets across strength, weight, cost, flow, and aesthetics — and learn which material suits your application.",
    meta_title:
      "Expanded Metal vs Perforated Sheet | Comparison Guide | Jai Shree",
    meta_description:
      "Expanded metal vs perforated sheet — strength, cost, weight, and use cases compared. ISO-certified manufacturers in Pune & Mumbai. Choose the right product.",
    content: `Choosing between expanded metal and perforated sheet is one of the most common questions we receive at Jai Shree Group. Both products create metal sheets with openings, but they are made by entirely different processes and behave differently in application. This guide compares the two across the factors that matter most to industrial buyers.

## What Is Perforated Sheet?

Perforated sheet is made by punching or drilling holes into a flat metal sheet. At Jai Shree Group, we use CNC turret punching to create round, square, rectangular, slotted, and custom hole patterns in stainless steel, mild steel, GI, aluminium, brass, and copper. Hole size, pitch, and pattern are fully customisable — you specify exactly what you need.

Because material is removed during punching, perforated sheets generate metal scrap (typically 20–50% depending on open area). However, this process offers unmatched precision and design flexibility.

## What Is Expanded Metal?

Expanded metal is made by slitting a flat sheet and stretching it to form a diamond-shaped mesh pattern. No material is removed — the sheet is simply cut and expanded. This means zero waste, lighter weight per unit area, and inherent structural rigidity from the raised strands.

Expanded metal is available in standard, flattened, and heavy-duty variants. It is commonly used for walkways, security screens, filtration support, and architectural cladding where a textured, three-dimensional surface is desired.

## Side-by-Side Comparison

| Factor | Perforated Sheet | Expanded Metal |
| --- | --- | --- |
| Manufacturing process | Holes punched/drilled from solid sheet | Sheet slit and stretched — no material removed |
| Material waste | 20–50% scrap depending on open area | Near zero waste |
| Strength & rigidity | Depends on open area; higher open area = lower strength | Inherently strong due to 3D strand geometry |
| Weight | Heavier at equivalent open area | Lighter — material is stretched, not removed |
| Cost | Higher per kg due to material loss and tooling | Lower per unit area for standard patterns |
| Flow / open area control | Precise — any hole size and pitch | Limited to standard diamond patterns |
| Aesthetics | Clean, flat, uniform appearance | Textured, industrial diamond pattern |
| Customisation | Fully custom hole shapes and patterns | Standard strand widths and patterns |
| Max thickness | Up to 12 mm (our capability) | Typically up to 6 mm for most applications |

## When to Choose Perforated Sheet

Perforated sheet is the right choice when you need precise control over open area, hole shape, or hole pattern. Common applications include:

- Filtration and screening where exact open area % is critical
- Speaker grills and automotive components requiring specific hole geometry
- Architectural facades with decorative custom patterns
- Vibrating screens in sugar, mining, and food processing
- Acoustic panels with specific perforation patterns for sound absorption

If your engineering drawing specifies hole diameter, pitch, and open area percentage, perforated sheet is almost always the answer. See our [perforated sheet manufacturing page](/products/perforated-sheets) for specifications.

## When to Choose Expanded Metal

Expanded metal excels where strength, light weight, and cost efficiency matter more than precise open area. Ideal applications include:

- Walkways, stair treads, and platform grating (anti-skid)
- Security fencing and window guards
- Machine guards and safety barriers
- Filtration support grids and backing mesh
- Architectural screens where texture adds visual interest
- Cable trays and cable management

Because expanded metal uses no raw material beyond the original sheet, it is often 30–40% more economical than perforated sheet for equivalent coverage area.

## Can You Use Both Together?

Yes — many industrial applications combine both products. For example, a vibrating screen may use a perforated sheet as the primary screening surface with expanded metal as a structural support frame. In architectural projects, perforated panels may be backed with expanded metal for rigidity.

## Our Manufacturing Capability

Jai Shree Group manufactures both products at ISO 9001:2015 certified facilities in Pune and Mumbai. We produce perforated sheets up to 12 mm thick and 2200 × 4000 mm, and expanded metal in stainless steel, MS, GI, and aluminium.

Not sure which product suits your application? Share your drawing or requirement with our team — we will recommend the most cost-effective solution. Explore [expanded metal manufacturing](/products/expanded-metal) and [perforated sheets](/products/perforated-sheets), or request a quote from our Pune office.`,
  },
  {
    title: "Laser Cutting vs Turret Punching: Cost Comparison",
    slug: "laser-cutting-vs-turret-punching",
    date: "2024-02-10",
    category: "Cost Guide",
    excerpt:
      "When to use laser cutting vs turret punching? A detailed cost and capability comparison for industrial buyers in Pune and Mumbai.",
    meta_title:
      "Laser Cutting vs Turret Punching Cost Comparison | Jai Shree Group",
    meta_description:
      "Laser cutting vs CNC turret punching — cost factors, thickness limits, and volume guidelines. Both processes available at Jai Shree Group Pune & Mumbai.",
    content: `For metal fabricators and industrial buyers, choosing between laser cutting and turret punching can significantly affect project cost, lead time, and part quality. At Jai Shree Group, we operate both fibre laser cutting and CNC turret punching at our Pune and Mumbai facilities — so we recommend the process that genuinely suits your job, not the one we prefer to sell.

## How Each Process Works

### Fibre Laser Cutting

A high-powered fibre laser beam melts and vaporises metal along a programmed path. The laser head moves over a flat sheet following a CAD drawing, cutting any shape — curves, intricate contours, tight radii, and internal cutouts — without physical contact. Our fibre laser handles stainless steel, MS, GI, and aluminium up to 14 mm thickness.

### CNC Turret Punching

A turret press holds multiple punch tools that strike the sheet in rapid succession, creating holes, slots, and shapes. For perforated patterns, turret punching is extremely fast because the same tool repeats across the sheet grid. Turret punching handles materials up to 12 mm and excels at high-volume repetitive patterns.

## Key Cost Factors

Several variables determine which process is more economical for your job:

**Setup cost:** Laser cutting has lower setup cost for one-off or low-volume jobs — simply load the CAD file and cut. Turret punching requires tool selection and sometimes custom tooling for non-standard hole shapes, adding upfront cost.

**Material thickness:** Laser cutting becomes relatively more expensive at thicker gauges due to slower cutting speeds and higher energy consumption. Turret punching is more cost-effective for thin-to-medium gauge (0.5–6 mm) high-volume work.

**Part complexity:** Complex shapes with curves, tight internal corners, or irregular outlines favour laser cutting. Simple hole patterns, slots, and standard shapes favour turret punching.

**Volume:** Turret punching amortises setup cost over large production runs. A 500-sheet perforated order is typically 40–60% cheaper on turret than laser. For prototypes or batches under 10 pieces, laser is usually faster and cheaper overall.

**Material utilisation:** Both processes generate scrap, but turret punching for perforated sheets removes only the hole area while laser cutting removes the entire part profile plus internal features.

## Thickness and Volume Guidelines

| Scenario | Recommended Process | Why |
| --- | --- | --- |
| Prototype / 1–10 pieces | Laser cutting | No tooling, fast setup |
| Perforated sheet — high volume | Turret punching | Fastest cycle time per hole |
| Complex contour parts | Laser cutting | Any shape from CAD |
| 0.5–3 mm, repetitive holes | Turret punching | Lowest per-hole cost |
| 6–14 mm thick plate | Laser cutting | Turret limited above 12 mm |
| Mixed hole sizes on one sheet | Laser cutting | No multiple tool changes |
| Standard round holes, 100+ sheets | Turret punching | Maximum throughput |

## When Laser Cutting Wins

Choose fibre laser cutting when:

- Your part has complex geometry, curves, or tight internal cutouts
- You need a prototype or small batch (under 20 pieces) quickly
- Material thickness exceeds 6 mm and part shape is non-repetitive
- You require burr-free edges on stainless steel or aluminium
- The design changes frequently between orders (no tooling lock-in)

Our laser cutting service handles sheet sizes up to 2200 × 4000 mm. See full specifications on our [laser cutting services page](/products/laser-cutting).

## When Turret Punching Wins

Choose CNC turret punching when:

- You need perforated sheets with standard or semi-standard hole patterns
- Order volume exceeds 50 sheets of the same pattern
- Material is 0.5–6 mm thick — the sweet spot for punching speed
- Cost per hole matters more than cost per cut (filtration, screening, architectural panels)
- You need combination work — punching plus forming, countersinking, or embossing in one pass

We punch round, square, rectangular, oblong, hex, and conical holes in all common metals. Details on our [CNC turret punching page](/products/turret-punching).

## Jai Shree Group: Both Under One Roof

Having both technologies at our Pune Talawade facility means we can offer hybrid solutions — laser-cut profiles with turret-punched perforations, or advise on the most economical process before you commit to a tooling investment.

ISO 9001:2015 certified. 50+ years of metal manufacturing experience. Three production shifts for fast turnaround on large orders.

Send us your drawing or pattern specification for a process recommendation and quote. We serve clients across India from our Pune and Mumbai manufacturing units.`,
  },
  {
    title: "Perforated Sheet Specification Guide",
    slug: "wire-mesh-specification-guide",
    date: "2024-02-01",
    category: "Technical Guide",
    excerpt:
      "Complete guide to perforated sheet specifications — hole shapes, pitch types, materials, thickness, finishes, and standard sizes from Jai Shree Group.",
    meta_title:
      "Perforated Sheet Specification Guide | Jai Shree Group Pune",
    meta_description:
      "Perforated sheet specs explained — hole shapes, pitch, materials, thickness up to 12 mm, finishes, and standard sizes. ISO 9001 manufacturers Pune & Mumbai.",
    content: `Specifying perforated sheet correctly ensures you receive the right product on the first order — saving time, cost, and production delays. This guide covers every parameter you need to include in your purchase specification when ordering from Jai Shree Group (Shree Perforators) in Pune or Mumbai.

## Hole Shapes

Perforated sheets are available in a wide range of hole shapes. The shape affects open area, flow characteristics, and tooling cost.

**Round holes** — the most common shape, available in any diameter from 0.5 mm upwards. Used in filtration, screening, speaker grills, and architectural panels.

**Square holes** — provide higher open area than round holes at equivalent pitch. Common in quarry screens, grain processing, and decorative applications.

**Rectangular and slotted holes** — elongated openings suited to directional flow applications, sugar industry herringbone screens, and architectural louvres.

**Custom shapes** — hexagonal, oblong, conical, and ornamental patterns available via custom tooling. Our in-house R&D team at Jai Shree Metal Perforators develops special dies for unique requirements.

## Pitch Types

Pitch is the centre-to-centre distance between adjacent holes. The pitch arrangement affects open area and sheet strength.

**Triangular pitch (60° staggered)** — the standard arrangement for round holes. Provides the highest open area for a given hole size and is the most economical to manufacture.

**Rectangular pitch** — holes aligned in straight rows and columns. Used for square and rectangular holes, and where directional alignment matters.

**Staggered pitch** — offset row arrangement, commonly used for slot patterns and architectural designs.

Specify both pitch dimensions (e.g., 10 mm × 10 mm) and arrangement type on your order. Use our [open area calculator](/calculator) to verify the resulting open area percentage before ordering.

## Material Grades

We perforate all commonly specified metals:

- **Stainless Steel** — SS 304, SS 316, SS 202 (corrosion-resistant, food-grade, pharmaceutical)
- **Mild Steel (MS)** — HR and CR grades for general industrial applications
- **Galvanised Iron (GI)** — corrosion protection for outdoor and construction use
- **Aluminium** — lightweight, non-sparking, architectural and aerospace
- **Brass and Copper** — decorative, electrical, and acoustic applications

Material grade affects tooling wear, edge quality, and post-processing requirements. Specify the grade on your enquiry for accurate quoting.

## Thickness Range

Jai Shree Group perforates sheet metal from 0.5 mm to 12 mm thickness using CNC turret punching. Thicker materials may require multiple punch passes. For laser-cut profiles (non-perforated), our fibre laser handles up to 14 mm.

Standard thickness tolerances follow IS/ASTM norms. Specify whether you require mill tolerance or a tighter flatness tolerance — we offer precision sheet leveling as a secondary operation.

## Surface Finishes

Perforated sheets can be supplied in several finish conditions:

- **Mill finish / as-punched** — standard supply condition, light oil coating
- **Deburring** — edges smoothed on both faces, required for handling and food contact
- **Pickled and passivated** — SS sheets cleaned of oxide and contamination
- **Powder coating / PVDF coating** — colour finishes for architectural applications
- **Hot-dip galvanising** — for MS sheets requiring corrosion protection

State your finish requirement on the purchase order. Deburring is recommended for all SS food-grade and pharmaceutical applications.

## Standard Sheet Sizes

Our maximum perforated sheet size is 2200 mm × 4000 mm. Common standard sizes include:

| Size (mm) | Notes |
| --- | --- |
| 1000 × 2000 | Standard stock size |
| 1250 × 2500 | Common architectural size |
| 1500 × 3000 | Large panel applications |
| 2200 × 4000 | Maximum our equipment handles |

Custom sizes, cut-to-size panels, and blank margins (unperforated edges) are available on request. Minimum order quantities vary by hole pattern and material — contact us for current lead times.

## How to Write a Complete Specification

Include these eight parameters on every perforated sheet enquiry:

1. Material grade (e.g., SS 304)
2. Sheet thickness (mm)
3. Hole shape and size (mm)
4. Pitch type and dimensions (mm)
5. Sheet size (mm)
6. Required open area % (if critical)
7. Finish / deburring requirement
8. Quantity and delivery location

Browse our full [perforated sheet product page](/products/perforated-sheets) or use the [open area calculator](/calculator) to validate your specification before sending an enquiry to Shree Perforators, Pune.`,
  },
];

export function getBlogPostBySlug(slug: string): BlogPostSeed | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
