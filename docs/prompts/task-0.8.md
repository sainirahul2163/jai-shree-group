You are building the Jai Shree Group multi-site platform on branch `multi-site` in this folder. Claude (another AI) is coordinating you and will verify your work afterwards, so be precise and honest.

FIRST read: PROJECT-LOG.md, AGENTS.md, CURSOR-LOG.md (0.5–0.7 entries), docs/05-build-plan.md (task 0.8), docs/02-business-facts.md, docs/08-content-checklist.md ("Privacy policy and terms" fallback), docs/07-seo-rules.md, and how pages, `config.pages`, the sitemap and the footer work today (`src/app/[site]/`, `src/sites/`, `src/components/layout/Footer.tsx`).

Do Phase 0 task 0.8 ONLY: privacy policy and terms pages. **Google Analytics is skipped** (user, 2026-10-11): add no analytics code.

## Requirements

1. Pages `/privacy` and `/terms` under `src/app/[site]/(chrome)/`, one shared template each, filled from the active site's config: business name (`config.name`, plus "a Jai Shree Group company" when `endorsed`), postal address, email, phone, site origin. Add `/privacy` and `/terms` to `group.pages` (and therefore to the group sitemap with low priority, e.g. 0.3, `yearly`). Metadata via the site's SEO setup (title "Privacy Policy | <name>", own description, canonical at the site origin).
2. **Privacy policy** for an Indian B2B manufacturer's website under the Digital Personal Data Protection Act 2023, describing only what the site really does (check the code): enquiry and quote forms (name, phone, email, company, city, product details, optional file uploads later only if the site has them — not today), stored in Supabase; emails sent through Resend; WhatsApp links open WhatsApp; anonymous page-view counts (path, referrer — check `/api/track`); a site-choice cookie only on preview hosts; admin login cookies for staff only; no advertising, no analytics, no selling of data. Purpose, legal basis (consent given by submitting the form), retention (say leads are kept as long as needed to answer and follow up the enquiry and for business records, without inventing a number of years), the user's rights under the DPDP Act (access, correction, erasure, grievance redressal, nominate), how to contact the business (the site's email and address) as the grievance contact, children (site is for businesses), changes to the policy, and a "Last updated" date (today). Plain English, short sections, headings.
3. **Terms of use**: use of the website, information on the site is general (specs, open-area results and calculators are approximate; quotes and orders are confirmed in writing), intellectual property, links to other sites, limitation of liability in plain terms, governing law India with courts at the city of the site's unit (Pune for Talawade units and the group, Mumbai for Mumbai-region units — derive from config, e.g. a new optional `jurisdiction` field defaulting to Pune for group), contact, "Last updated".
4. No "draft" note on the pages. Put a code comment at the top of each template saying the wording is an agency template awaiting legal review, and say the same in your CURSOR-LOG entry.
5. Footer: add "Privacy" and "Terms" links in the footer's bottom bar (next to the copyright), styled like the existing footer links with tokens. This is the only intended visual change to existing pages; keep it small.
6. Contact and quote forms: add one line under the submit button, "By sending this form you agree to our Privacy Policy" with a link, styled with existing muted text tokens.
7. Text is unique per site only through the config values for now (the unit sites get their own config later); write the template so that it reads correctly for a unit site too (e.g. "Shree Weld Mesh ('we') …").
8. Update `docs/06-codebase-map.md` (routes). Do not edit other docs except the logs below.

## Checks (all required, report each result honestly)

- `npm run build` passes; `npm run lint` shows no new problems (18 problems: 12 old errors, 6 warnings).
- Production build on port 3000: `/privacy`, `/terms` 200 with chrome, correct title and canonical; both appear in `/sitemap.xml`; footer links work on `/` and `/contact`; the form note shows on `/contact` and `/get-quote` (all steps' submit area).
- Quick visual check of `/`, `/contact`, `/products/perforated-sheets`: nothing changed except the footer links and form note. Do NOT run the full screenshot compare. Stop every server you started.

Then: write your entry at the top of CURSOR-LOG.md, tick 0.8 in docs/05-build-plan.md, add one row to the Change log in PROJECT-LOG.md (newest first) and update the "Privacy and terms pages; Google Analytics 4" requirement (privacy/terms ✅, GA4 skipped), and commit code + logs together in ONE commit whose message starts with "0.8". Do not push.
