# 02 — Business facts

The facts every site's copy must agree with. Source in code today: `src/lib/constants.ts`, `src/data/branches.ts`, `src/data/products.ts`. When these move into `src/sites/`, keep this file in sync.

## The group

| Field | Value |
| --- | --- |
| Group name | Jai Shree Group |
| Tagline | Accept Challenges – Develop – Achieve |
| Founded | 1970, Delhi, by Mr. Tejaram Jangid (started as a wire mesh business) |
| History | 1980 perforated sheets and expanded metal · Mumbai plant by Mr. Inder Jangid and Mr. Shyam Jangid · 1997 Talawade, Pune by Mr. Raichand Jangid · 2006 high-tech plant · 2013 full CNC upgrade · 2015 fiber laser |
| Certification | ISO 9001:2015 (Bureau Veritas) |
| Units | 6, all active (3 in Talawade, Pune; 3 in the Mumbai region) |
| Group phone / WhatsApp | +91 93706 06017 (`919370606017` for wa.me links) |
| Group email | shreeperforator@gmail.com |
| HQ address | Gat No. 94, Near Sonawane Wasti, Jyotibanagar, Talawade, Pune 411062 |
| Main site | **jaishreegroup.com** (confirmed by the client, 2026-10-07). The code default `https://www.jaishreegroup.com` is right; old docs saying `.in` are wrong. |
| Differentiators | Zero-debt, privately owned · CNC and fiber laser · custom work to drawing · global delivery · bow and warpage control · in-house shearing, bending, leveling · R&D for special dies and tools |

## The six units

All six are active. Contacts and holidays confirmed by the client on 2026-10-07 (`client/answers-2026-10-07.md`).

| Unit | Location | What it does (client) | Phone | Email | Weekly holiday |
| --- | --- | --- | --- | --- | --- |
| Shree Perforators | Talawade, Pune — Gat No. 94, Near Sonawane Wasti, Jyotibanagar, Talawade, Pune 411062 | Perforated sheets, expanded metal, turret punching, leveling, custom parts and screens | +91 93706 06017 | shreeperforator@gmail.com | Thursday |
| Jai Shree Metal Perforators | Talawade, Pune — Gat No. 93, same address | Laser cutting, turret punching, perforated sheets, leveling, custom parts and screens | +91 93733 24492 | jsmppune@gmail.com | Thursday |
| Shree Weld Mesh | Talawade, Pune — Gat No. 93, same address | **Welded mesh only** | +91 90494 56019 | balajiwelded@gmail.com | Thursday |
| Jai Shree Filtration | Masjid Bunder, Mumbai — Shop No. 80-B, Gr. Floor, Keshavji Jadhavji Bldg., 24/26 Khadak Street, Nr. Satkar Hotel, Masjid Bunder Road, Mumbai 400009 | **Godown, ready stock only** — perforated sheets | +91 93202 04151 | inderjangid@gmail.com | Sunday |
| Jai Shree Industries | Bhayander, Mumbai — L-9, Swastik Industrial Estate, Behind Gaurav Dharam Kanta, Bhayander East, Mumbai 401105 | Expanded metal, CNC and mechanical punching, perforated sheets, leveling | +91 89089 21111 | inderjangid@gmail.com | Sunday |
| Jai Shree Perforator | Palghar — 2, Marudhar Estate, Vill. Aliyali, Next to Tembhode Village, New Satpati Road, Palghar West | **Mechanical punching only** — perforated sheets (no laser) | +91 89089 21111 | inderjangid@gmail.com | Sunday |

Working hours were not given. `src/data/branches.ts` (`BRANCH_PRODUCTS`) and the phones in `BRANCHES` are out of date; update them from this table.

## Main products (the group's six)

| Product | Slug | Key specs | Materials |
| --- | --- | --- | --- |
| Perforated sheets | `perforated-sheets` | CNC and turret perforation, up to 12 mm thick | SS, MS, GI, aluminium, copper, brass |
| Laser cutting | `laser-cutting` | Fiber laser, any drawing, up to 14 mm | SS, MS, aluminium, copper, brass, titanium |
| Expanded metal | `expanded-metal` | Diamond, square, hex patterns; up to 6 mm; widths 900 / 1250 / 1500 mm | SS, MS, GI, brass, copper, aluminium, titanium |
| Turret punching | `turret-punching` | CNC turret, any hole shape, combined with laser to save cost | SS, MS, GI, aluminium, copper, brass |
| Precision sheet leveling | `precision-sheet-leveling` | Bow and warpage control for perforated and laser-cut sheets | All metals |
| Custom components | `custom-components` | Special dies, embossed plates, dimple de-stoners, huller screens, herringbone screens, any job to drawing (DXF / DWG / sample) | SS, MS, GI, aluminium, brass, copper |

Full product copy: `src/data/products.ts`.

## Discontinued — never offer these

Wire mesh, crimped mesh and demister pads (and the related knitted mesh, mesh vibrating screens, conveyor belts, cable trays, chain link and HDPE mesh listed on the old unit sites). History mentions are allowed.

**Exception: welded mesh.** The client confirmed on 2026-10-07 that Shree Weld Mesh makes welded mesh. It is offered on the Shree Weld Mesh site and named on the main site's Our Group page. It is not one of the group's six main-site products.

## Industries served

Automobile, construction, food and beverage, pharmaceutical, petrochemical, architecture and interior, sugar, mining and quarrying (all have detail pages). Paper and agriculture are listed in `INDUSTRIES` but have no detail pages yet.

## Client rules (do not revert without client approval)

- Say "Global delivery", never "Pan India" only.
- 6 manufacturing units, not 8 (Dev Shree and Chandan units were removed).
- Carbon Steel is not offered — do not add it to material lists.
- Specs and quote forms use thickness only, no sheet sizes.
- Main-site hero H1 is three lines: PERFORATED SHEET / MANUFACTURERS / SINCE 1970.
- Weekly holiday: Thursday for the Pune units, Sunday for the Mumbai-region units (see table above). Show it on each site's contact page.
