# 03 — The seven sites

One main site and six unit sites. Each unit site carries its **unit's name** and goes deep on **what that unit actually does**, as approved by the client on 2026-10-07 (`client/answers-2026-10-07.md`). Site keys are the unit slugs already used in `BRANCHES` (`src/lib/constants.ts`).

## Overview

| Key | Brand and descriptor | Unit | Focus | Domain | Theme |
| --- | --- | --- | --- | --- | --- |
| `group` | Jai Shree Group | All | All products, the group story, links to all units | jaishreegroup.com | Current dark + orange `#E8521A` (unchanged) |
| `shree-perforators` | Shree Perforators | Talawade, Pune | CNC perforated sheets and hole patterns, plus expanded metal | shreeperforators.com (live, old vendor) | Graphite + electric blue |
| `jai-shree-metal-perforators` | Jai Shree Metal Perforators | Talawade, Pune | Laser cutting and CNC punching job work | metalperforatedsheets.com (live, old vendor) | Black + safety yellow |
| `jai-shree-industries` | Jai Shree Industries | Bhayander, Mumbai | Expanded metal, plus CNC and mechanical punching | New domain (agency) | Steel grey + signal red |
| `jai-shree-perforator` | Jai Shree Perforator | Palghar | Mechanical-punched perforated sheets | metalperforation.co.in (agency to re-activate) | Off-white + bronze |
| `jai-shree-filtration` | Jai Shree Filtration — Perforated sheets available in minutes | Masjid Bunder, Mumbai (godown) | Ready-stock perforated sheets | jaishreefiltration.com (agency to re-activate) | Sand + deep green |
| `shree-weld-mesh` | Shree Weld Mesh — Manufacturing in welded mesh | Talawade, Pune | Welded mesh | weldedmeshindia.com (agency to re-activate) | Navy + silver |

Descriptor lines for Shree Weld Mesh and Jai Shree Filtration are the client's own wording.

**Retired domain:** wiremeshindia.net only (wire mesh is discontinued). If the agency controls it, 301 it to the group site.

## Products each site offers (from the client's ticks)

| Site | Perforated | Laser | Expanded | Turret / CNC punching | Leveling | Custom parts and screens | Other |
| --- | --- | --- | --- | --- | --- | --- | --- |
| shree-perforators | ✓ focus | – | ✓ | ✓ | ✓ | ✓ | |
| jai-shree-metal-perforators | ✓ | ✓ focus | – | ✓ focus | ✓ | ✓ | |
| jai-shree-industries | ✓ | – | ✓ focus | ✓ focus | ✓ | – | Mechanical punching |
| jai-shree-perforator | ✓ focus | – | – | – | – | – | Mechanical punching only |
| jai-shree-filtration | ✓ focus (ready stock) | – | – | – | – | – | Godown, no manufacturing |
| shree-weld-mesh | – | – | – | – | – | – | Welded mesh only |

A site never offers a product its unit did not tick. For anything else it links to the sister unit that makes it ("Need laser cutting? Jai Shree Metal Perforators, Talawade").

## Four sites sell perforated sheets — keep them apart

Shree Perforators, Jai Shree Industries, Jai Shree Perforator and Jai Shree Filtration all sell perforated sheets. Each takes a different angle, and no copy is shared (`07-seo-rules.md`):

| Site | Angle | Buyer's question it answers |
| --- | --- | --- |
| Shree Perforators | Precision CNC perforation, any hole pattern, custom work | "Can you make this exact pattern?" |
| Jai Shree Industries | Mumbai manufacturer of expanded metal; perforation by CNC and mechanical punching | "Who makes expanded metal and punched sheets near Mumbai?" |
| Jai Shree Perforator | Mechanical punching: economical for standard patterns in volume | "What is the cheapest way to get standard perforated sheets in bulk?" |
| Jai Shree Filtration | Ready stock from the Masjid Bunder godown, pick up or dispatch fast | "Who has perforated sheets in stock today?" |

## Pages every unit site has

Home · Products (only the unit's ticked products) · signature tool · Industries (relevant subset) · Gallery · About (the unit, then "Part of Jai Shree Group") · Contact (with the unit's weekly holiday) · Get quote · Privacy · Terms. Export page only for manufacturing units (not Jai Shree Filtration). Blog later, per site.

Every unit site shows "A Jai Shree Group company" and links once to jaishreegroup.com. The main site's Our Group page links to all six.

## Site specs

### 1. Shree Perforators — `shree-perforators`

- **Focus:** CNC perforated sheets and custom hole patterns; also expanded metal, turret punching, sheet leveling, custom parts and screens. No laser cutting (link to Jai Shree Metal Perforators).
- **Buyers:** OEMs, fabricators, filter and equipment makers.
- **Signature tool: pattern library.** Choose hole shape, size, pitch and layout; see open area % (reuse the 10 formulas in `OpenAreaCalculator`), a live 2D pattern (`PerforationPatterns`) and a 3D preview (`ProductViewer3D`). "Request this pattern" pre-fills the quote form.
- **Search targets to start with:** perforated sheet manufacturers Pune, perforated sheet hole patterns, SS perforated sheet supplier.
- **Contact:** +91 93706 06017 · shreeperforator@gmail.com · weekly holiday Thursday.
- **Theme (dark):** background `#0B0F14`, surface `#121821`, surface-2 `#1A2230`, border `#263142`, text `#F5F7FA`, secondary `#9AA6B8`, muted `#7E8A9D` (5.5:1 on background, 4.6:1 on surface-2; added 2026-10-11), brand `#1F6FEB`, brand-hover `#3B82F6`, brand-foreground `#FFFFFF`, brand-text `#5A96FF`. Font: Geist.
- **Built (task 1.2, 2026-10-11):** `src/sites/shree-perforators.ts` + `src/sites/content/shree-perforators.ts`. Preview locally at `http://shree-perforators.localhost:3000`.
- **Legacy:** live old site. Map every old URL before switching DNS.

### 2. Jai Shree Metal Perforators — `jai-shree-metal-perforators`

- **Focus:** job work: fiber laser cutting (up to 14 mm) and CNC turret punching; also perforated sheets, sheet leveling, custom parts and screens. No expanded metal (link to Shree Perforators or Jai Shree Industries).
- **Buyers:** engineering firms, automotive Tier-1 and Tier-2 suppliers, fabricators.
- **Signature tool: drawing upload quote.** Upload DXF, DWG or PDF to a private Supabase bucket, choose material, thickness and quantity. Machine list page only when the client sends machine data. Until then, show capabilities from known specs (laser up to 14 mm, perforation up to 12 mm).
- **Search targets:** laser cutting services Pune, CNC turret punching job work Pune.
- **Contact:** +91 93733 24492 · jsmppune@gmail.com · weekly holiday Thursday.
- **Theme (dark):** background `#0A0A0A`, surface `#121212`, surface-2 `#1B1B1B`, border `#2C2C2C`, text `#FFFFFF`, secondary `#A3A3A3`, brand `#FFC400`, brand-hover `#FFD54D`, brand-foreground `#0A0A0A`, brand-text `#FFC400`. Fonts: Barlow Condensed (headings), Geist (body).
- **Legacy:** live old site with its own open-area calculator page. Map every old URL.

### 3. Jai Shree Industries — `jai-shree-industries`

- **Focus:** expanded metal (diamond, square, hex; up to 6 mm; widths 900 / 1250 / 1500 mm), and perforated sheets by CNC and mechanical punching; sheet leveling. No laser, no custom parts.
- **Buyers:** plant builders, walkway and guard fabricators, OEMs and contractors in the Mumbai region.
- **Signature tool: expanded metal selector.** Pattern, strand width and thickness, opening size (short and long way) and material give open area % and approximate weight per m². The formulas are industry-standard and must be labelled "approximate, confirm with us" (the client has not supplied its own).
- **Search targets:** expanded metal manufacturers Mumbai, expanded metal supplier Bhayander, CNC punching Mumbai.
- **Contact:** +91 89089 21111 · inderjangid@gmail.com · weekly holiday Sunday.
- **Theme (light):** background `#F3F4F6`, surface `#FFFFFF`, surface-2 `#E5E7EB`, border `#D1D5DB`, text `#111827`, secondary `#4B5563`, brand `#D7263D`, brand-hover `#B81E32`, brand-foreground `#FFFFFF`, brand-text `#C21F35`. Font: Geist.

### 4. Jai Shree Perforator — `jai-shree-perforator`

- **Focus:** perforated sheets made by mechanical punching only. Standard round, square and slot patterns in volume; cost-effective for repeat and bulk orders.
- **Buyers:** fabricators, traders and OEMs ordering standard patterns in quantity; industries around Palghar, Boisar and Tarapur.
- **Signature tool: bulk order estimator.** Choose a standard pattern, material, thickness and number of sheets; see open area % (reuse the calculator formulas) and approximate weight, then send a bulk quote request. Include a short, factual guide: when mechanical punching suits better than CNC, and when it does not.
- **Search targets:** perforated sheet manufacturers Palghar, mechanical punching perforated sheets, perforated sheets Boisar Tarapur.
- **Contact:** +91 89089 21111 · inderjangid@gmail.com · weekly holiday Sunday.
- **Theme (light, industrial):** background `#F6F3EE`, surface `#FFFFFF`, surface-2 `#ECE6DC`, border `#D9D0C2`, text `#1C1A17`, secondary `#5E574D`, brand `#8A5A2E`, brand-hover `#704823`, brand-foreground `#FFFFFF`, brand-text `#8A5A2E`. Font: Geist.

### 5. Jai Shree Filtration — `jai-shree-filtration`

- **Tagline (client's):** "Perforated sheets available in minutes".
- **Focus:** ready-stock perforated sheets from the Masjid Bunder godown. Pick up or quick dispatch in Mumbai. No manufacturing on site; custom sizes and patterns are routed to the manufacturing units.
- **Buyers:** fabricators, contractors and traders in Mumbai who need sheets today.
- **Signature tool: stock check.** A "Check stock now" form and WhatsApp button (material, thickness, hole size, quantity) that goes straight to the unit. Behind it, an **admin-editable stock board** (new Supabase table `stock_items`, managed in `/admin`). The board stays hidden until the client adds items, so the site launches without a stock list.
- **Search targets:** perforated sheets ready stock Mumbai, perforated sheet dealer Masjid Bunder, perforated sheets in stock.
- **Contact:** +91 93202 04151 · inderjangid@gmail.com · weekly holiday Sunday. Address: Masjid Bunder godown (Khadak Street).
- **Theme (light):** background `#F4EFE4`, surface `#FFFDF8`, surface-2 `#E9E1D0`, border `#D8CDB6`, text `#1E2A24`, secondary `#55625A`, brand `#1F5D45`, brand-hover `#174A37`, brand-foreground `#FFFFFF`, brand-text `#1F5D45`. Font: Geist.

### 6. Shree Weld Mesh — `shree-weld-mesh`

- **Tagline (client's):** "Manufacturing in welded mesh".
- **Focus:** welded mesh only. The range (wire sizes, openings, materials, panels or rolls, coatings) was not given by the client: describe welded mesh in general terms and send every specific to "tell us your requirement".
- **Buyers:** construction, fencing, industrial guarding, poultry and agriculture, fabricators.
- **Signature tool: welded mesh weight calculator.** Inputs: wire diameter d (mm), opening or pitch p (mm) in each direction, material. For steel: wire mass per metre = 0.00617 × d² kg/m; weight per m² ≈ (1000 / p₁ + 1000 / p₂) × 0.00617 × d² kg. Label the result "approximate".
- **Search targets:** welded mesh manufacturers Pune, welded wire mesh Talawade, GI welded mesh supplier Pune (only claim GI or SS if the client confirms it).
- **Contact:** +91 90494 56019 · balajiwelded@gmail.com · weekly holiday Thursday.
- **Theme (dark):** background `#0E1A2B`, surface `#14243A`, surface-2 `#1B2E48`, border `#2A3F5C`, text `#F2F5F9`, secondary `#A9B6C8`, brand `#C9D3E0`, brand-hover `#E2E8F0`, brand-foreground `#0E1A2B`, brand-text `#C9D3E0`. Font: Geist.

### Main site — `group`

Unchanged in Phase 0 apart from the refactor. Later, the Our Group page lists all six units with their focus (including Shree Weld Mesh's welded mesh) and links to their sites. It also gets privacy, terms, analytics and auto-reply like the unit sites.

## Contrast check

Every theme must pass WCAG AA: 4.5:1 for body text, 3:1 for large text and UI. Four pairs are checked per theme: text on background, secondary text on background, brand-foreground on brand (buttons), and brand-text on background.

`brand` is the fill colour for buttons and badges; `brand-text` is for brand-coloured words on the page background.

Checked 2026-10-05:

| Site | Text | Secondary | Button | Brand text |
| --- | --- | --- | --- | --- |
| shree-perforators | 17.9 | 7.8 | 4.6 | 6.6 |
| jai-shree-metal-perforators | 19.8 | 7.9 | 12.4 | 12.4 |
| jai-shree-industries | 16.1 | 6.9 | 5.0 | 5.4 |
| jai-shree-perforator | 15.7 | 6.4 | 5.9 | 5.3 |
| jai-shree-filtration | 13.0 | 5.6 | 7.8 | 6.8 |
| shree-weld-mesh | 16.0 | 8.5 | 11.6 | 11.6 |
| group (existing) | 19.8 | 7.6 | **3.7** | 5.3 |

The main site's white-on-orange buttons are 3.7:1, which is fine for large bold text but below AA for small text. They stay unchanged in Phase 0; raise it later. Re-check any palette you change.
