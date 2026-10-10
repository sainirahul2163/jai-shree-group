# 08 — Content checklist

Decision 2026-10-10: we build now and do **not** ask the client more questions first. This file says what we have, what is missing, and the fallback we launch with. Gaps can be filled later through the admin panel or a quick update. **Never invent** specs, stock, machines, client names, certifications or numbers to fill a gap.

## What we have

| Item | Source |
| --- | --- |
| Unit focus, products per unit, names, contacts, weekly holidays, main domain | `client/answers-2026-10-07.md` |
| Group history, ISO 9001:2015, differentiators, product specs and materials | `02-business-facts.md`, `src/data/products.ts` |
| Logo (client's official artwork) | Inline SVG in `src/components/layout/Logo.tsx`; icons in `src/app/` |
| Photos removed from `public/` as unused (2026-10-10) but useful later: welded mesh (`welded-1/2/3.jpg`, `welded-machine.jpg`) for Shree Weld Mesh; expanded metal and hex (`expanded-7/10/13/14.jpg`, `em-red-hex.jpg`, `hex-1…10.jpg`) for Jai Shree Industries | Recover from git: `git show d379076:public/brochure/img/<file> > public/<site>/<file>` |
| Product photos (6 products), gallery photos (perforated sheets) | `public/products/`, `public/gallery/`, Supabase `gallery_items` |
| Factory tour video (Talawade) | Supabase storage, `COMPANY_VIDEO` in `constants.ts` |
| Open-area formulas (10), pattern showcase, 3D viewers | `components/calculator/`, `components/products/` |
| Old-site content and applications list | `research/legacy-sites.md` |

## Gaps and fallbacks

| Gap | Affects | Fallback at launch |
| --- | --- | --- |
| Unit logos | All unit sites | Group flame mark + unit name set in the site's heading font + "A Jai Shree Group company" |
| Working hours | All | Show the weekly holiday only; "Call or WhatsApp for timings" |
| Contact person names | All | Unit name only |
| Unit photos (machines, premises) | All | Product and gallery photos of that product only (plus the recoverable photos listed above); no photo of a unit we do not have. Mark slots for replacement in the site config |
| Client names / logos | All | No client strip; use the group's industries list instead |
| Case studies | All | Leave the section out |
| Machine list | Jai Shree Metal Perforators | Capabilities from known specs (laser up to 14 mm, perforation up to 12 mm) |
| Stock list | Jai Shree Filtration | Stock board hidden; "Check stock now" form + WhatsApp |
| Welded mesh range (wire sizes, openings, materials, panels/rolls, coatings) | Shree Weld Mesh | General description; calculator labelled "approximate"; every specific goes to "tell us your requirement" |
| Expanded metal standard sizes and the client's own formulas | Jai Shree Industries | Known specs (diamond/square/hex, up to 6 mm, widths 900/1250/1500 mm); industry-standard formulas labelled "approximate" |
| Standard mechanical-punching patterns | Jai Shree Perforator | Common round, square and slot patterns as examples, labelled "examples — ask for our full pattern list" |
| Export details | Manufacturing units | Short "We deliver globally" section from the group's existing copy; no country list |
| Privacy policy and terms | All | Agency drafts from a standard template for an Indian B2B site (DPDP Act 2023); same structure, each site's own business name and contacts |

## Copy we write ourselves (agency)

For each site: home, products (only the unit's products), signature tool page text, about (unit first, then group), contact, quote page intro, FAQs (4–6, specific to that site's angle), meta titles and descriptions. Follow `07-seo-rules.md`: no paragraph shared between sites.
