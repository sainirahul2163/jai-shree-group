# Project Log — Jai Shree Group Multi-Site

The one file to check first. It holds **the goal, what is required, where we are, and every change made**. Detail lives in `docs/`; this file points to it.

> **Two logs:** this file is the overview. `CURSOR-LOG.md` is Cursor's detailed diary — Cursor adds an entry there after every task, plus a one-line row here.
>
> **Rule:** every change (code, docs, files, decisions, client input) gets a row in the Change log below, on the same day, newest first. If a requirement's status changes, update its row too. No change is "done" until it is logged here.

---

## 1. Goal

Build **seven websites from one Next.js app**: the main Jai Shree Group site (jaishreegroup.com) plus one specialist site for each of the group's six manufacturing units. Each unit site shows only what that unit does, sends enquiries straight to that unit, and helps it get found on Google. Everything is managed from one admin panel. The live main site must keep working, unchanged, throughout.

No fixed dates. We work as fast as possible, **phase by phase, task by task**: a task starts only when the one before it passes its checks (user, 2026-10-11).

## 2. The seven sites (approved by the client, 2026-10-07)

| # | Site | Unit location | What it shows | Domain |
| --- | --- | --- | --- | --- |
| 2026-10-11 | **Phase 0 + 1.1 live on jaishreegroup.com** (Claude). Preview of `eafe6d0` checked in Chrome against the migrated live DB (gallery 69 photos, 4 blog posts, testimonials, sitemap 39 URLs at the production origin, preview robots disallow + noindex). Merged `multi-site` into `main` (`751cd5c`, author = GitHub no-reply), local build against live DB passed, pushed; Vercel production deploy succeeded. Live checks: `/`, `/contact`, a product page, `/gallery` (69 photos), `/blog`, `/group` (map 18/18 tiles, 2 markers), `/privacy`, `/terms`, `/admin/login`, `/api/health` 200; `/does-not-exist` and `/group/about` 404; `/products/wire-mesh` 308; robots identical to before; sitemap = before + `/privacy`, `/terms`; canonical `https://www.jaishreegroup.com`, `index, follow`; contact shows all current unit phones and Thursday/Sunday holidays; new page views saved with `site='group'`. `main` merged back into `multi-site` (fast-forward) | `main`, `multi-site` | Phase 0 go-live |
| 2026-10-11 | **Multi-site migration applied to the LIVE project** (Claude; same file as on jai-shree-dev, `2026-10-11-multi-site.sql`): `site` column (not null, default `'group'`, check on the 7 keys) on leads, blog_posts, gallery_items, testimonials, page_views; `(site, created_at)` indexes; blog slugs unique per site. Row counts unchanged (leads 2, blog 4, gallery 70, testimonials 3, page views 971); every existing row has `site='group'`; no rows changed. The current live code keeps working (new rows default to `'group'`) | live Supabase | Phase 0 go-live |
| 2026-10-11 | 1.1 screenshot compare finished (Claude): 80 shots vs `after-phase-0`, no height changes, all ≤ 0.10% (landing animation, hero, 3D/map areas). Group site visually unchanged; 1.1 ticked (unit-site render test moves to 1.2) | `docs/research/after-1.1/` (git-ignored), `docs/05-build-plan.md` | Close 1.1 |
| 2026-10-11 | 1.1 Site-aware components: Cursor started it and stopped at its Opus usage limit; Claude finished the code. Build, lint, group SEO tags and JSON-LD unchanged. **Full screenshot compare not finished** (Claude's usage limit) — re-run before ticking 1.1 | `src/sites/`, `src/components/`, `src/app/[site]/`, `src/lib/`, `docs/06-codebase-map.md` | Phase 1 task 1.1 |
| 2026-10-11 | **Phase 0 acceptance (Claude):** full 80-screenshot compare (`docs/research/after-phase-0` vs `baseline`, production build of `82f5a06`). Differences are all intended or data: the 0.8 footer "Privacy · Terms" links (+25 px on phones, every page) and the form privacy note (contact, get-quote, product and city pages: +34 px desktop, +76 px phone); `/clients`, `/blog`, `/gallery` show dev-database content (baseline was taken with live data); animated areas (hero, landing, 3D). SEO tags of all 40 pages identical; robots identical; sitemap +2 (`/privacy`, `/terms`). Lint unchanged (18 problems). Branch `phase-0` marks this commit for the merge to `main`, which waits on the Vercel build failure | `docs/research/after-phase-0/` (git-ignored), branch `phase-0` | Phase 0 acceptance |
| 2026-10-11 | Vercel preview builds fail from 0.6 on; could not reproduce locally (plain build, preview env without `.env.local`, live public Supabase keys, `vercel build` all pass; import-path casing checked). Recorded as a blocker for the Phase 0 merge; Phase 1 work continues on `multi-site` | — | Need Vercel's build log |
| 2026-10-11 | Reviewed Cursor's 0.8 (Claude): one commit `40a83ab`; build ✅, lint unchanged, 40 pages' SEO tags unchanged; `/privacy`, `/terms` 200 with chrome, own titles and canonicals, in the sitemap; `/group/privacy` 404; text checked against what the code really does (forms, Supabase, Resend, page views, cookies). Wording is an agency template awaiting legal review | — | Verify before the Phase 0 acceptance |
| 2026-10-11 | Reviewed Cursor's 0.7 (Claude): one commit `7b8d518`; build ✅, lint unchanged, 40 pages' SEO tags unchanged; test lead from localhost saved with `site='group'` and `reference` returned (deleted after); unknown-site API calls → 400. Fixed the admin actions' `revalidatePath` calls Cursor flagged: since 0.5 they named visible URLs (`/gallery`, `/blog`, `/clients`) and no longer refreshed the rewritten pages; now they revalidate `/[site]/(chrome)/…` route patterns for every site. Not tested: admin panel logged in (filter, badges, site pickers) — no admin password available to Claude | `src/lib/supabase/actions.ts`, `docs/06-codebase-map.md` | Verify before 0.8 |
| 2026-10-11 | Live `admin_users` now has 2 rows: the second admin email was inserted by another Claude session (user's request); verified by Claude (2 rows, both admin emails present, still 1 auth user). User confirmed both emails are in Vercel `ADMIN_EMAILS` (production) and redeployed. The second account's Supabase login does not exist yet; the user will create it | live Supabase `admin_users`, Vercel env | Second admin for the agency |
| 2026-10-11 | Phase 1 planned as tasks 1.0–1.4 in the build plan (1.0 legacy crawl done: 22 pages + 57 images on shreeperforators.com, 16 pages on metalperforatedsheets.com, no city pages; draft 301 maps in `docs/research/legacy-sites.md`) | `docs/05-build-plan.md`, `docs/research/legacy-sites.md` | Prepare the pilot |
| 2026-10-11 | 0.7 Data and leads (Cursor). APIs take the site only from the proxy's `x-site` header (unknown/unconfigured → 400; body `site` ignored) and save it on every lead and page view. Lead email goes to `LEAD_EMAIL_OVERRIDE` → (group) `CONTACT_EMAIL` → `RESEND_TO` → `config.leadEmail`, with the site name, site key, page and escaped values. A customer auto-reply carries the reference (first 8 characters of the lead id); it is shown on the contact and quote success screens. Request bodies are no longer logged. Public gallery, blog, clients queries filter by site; seed posts are group-only. Admin has a `?site=` filter, site badges and site pickers. `schema.sql` matches the migration. Checked: build, tsc, lint unchanged (18), spoof and unit-host tests, read-back on jai-shree-dev, test rows deleted, quick visual check. Not checked: admin while logged in, real email delivery | `src/lib/{leads,site-from-request,email}.ts`, `src/app/api/`, `src/lib/supabase/`, `src/types/database.ts`, `src/sites/names.ts`, `src/components/admin/`, `src/app/admin/(panel)/`, `src/app/[site]/`, contact and quote components, `.env.example`, `docs/06-codebase-map.md`, `docs/05-build-plan.md` | Phase 0 task 0.7 |
| 2026-10-11 | **Live database security fix** (user approved): applied the 2026-08-02 admin-access hardening to the live project. Seeded `admin_users` with the only live auth user (the admin account); added `is_admin()`; the six "Admin full access" policies (leads, follow_ups, blog_posts, gallery_items, testimonials, page_views) now require `is_admin()` instead of any logged-in user. Public policies unchanged; no rows changed (leads 2, blog 4, gallery 70, testimonials 3, page views 969 before and after). Checked with the public key: 69 published gallery items, 4 posts, 3 testimonials readable; leads and `admin_users` not readable. Live `/`, `/gallery`, `/contact`, `/blog` 200. Production `ADMIN_EMAILS` still to be confirmed by the user | live Supabase (policies, `admin_users`, `is_admin()`) | Any Supabase account could read and change all leads |
| 2026-10-11 | Multi-site migration written (Claude) and applied to `jai-shree-dev`: `site` column (default `'group'`, check on the 7 keys) on leads, blog_posts, gallery_items, testimonials, page_views; `(site, created_at)` indexes on leads and page_views; blog slugs unique per site. Re-ran it: idempotent. Not yet on the live project | `src/lib/supabase/migrations/2026-10-11-multi-site.sql`, jai-shree-dev | Task 0.7 needs the column; live goes with the Phase 0 merge |
| 2026-10-11 | Reviewed Cursor's 0.6 (Claude): one commit `20040fe` with code and logs; build ✅; lint unchanged (18 problems); 40 pages' title/meta/canonical/hreflang identical to the baseline; Cursor's before/after snapshots identical incl. JSON-LD (sitemap differs only in `lastmod`); robots identical; `/group/sitemap.xml` 404; admin pages noindex. Architecture doc updated: the sitemap is a route handler (Next's `sitemap.ts` cannot see `[site]`) | `docs/04-architecture.md`, `docs/decisions.md` | Verify before 0.7 |
| 0 | Jai Shree Group (main) | All | Group story, six main products, links to all units | jaishreegroup.com (live) |
| 1 | Shree Perforators | Talawade, Pune | CNC perforated sheets and hole patterns, plus expanded metal | shreeperforators.com |
| 2 | Jai Shree Metal Perforators | Talawade, Pune | Laser cutting and CNC punching job work | metalperforatedsheets.com |
| 3 | Jai Shree Industries | Bhayander, Mumbai | Expanded metal, plus CNC and mechanical punching | New domain |
| 4 | Jai Shree Perforator | Palghar | Mechanical-punched perforated sheets, in bulk | metalperforation.co.in |
| 5 | Jai Shree Filtration — "Perforated sheets available in minutes" | Masjid Bunder, Mumbai | Ready-stock perforated sheets from the godown | jaishreefiltration.com |
| 6 | Shree Weld Mesh — "Manufacturing in welded mesh" | Talawade, Pune | Welded mesh | weldedmeshindia.com |

Full specs: `docs/03-sites.md`. Client's answers: `docs/client/answers-2026-10-07.md`.

## 3. Requirements

Status: ✅ done · 🔄 in progress · ⏳ not started · ⛔ blocked

### Planning and inputs

| Requirement | Status | Where |
| --- | --- | --- |
| Research the codebase, live site and the group's old unit sites | ✅ | `docs/06-codebase-map.md`, `docs/research/legacy-sites.md` |
| Plan approved by the client: unit → site, products per unit, names, contacts, holidays | ✅ | `docs/client/answers-2026-10-07.md` |
| Separate working folder and branch so the live site stays safe | ✅ | this folder, branch `multi-site` |
| Aligned docs for Cursor and Claude (brief, facts, sites, architecture, build plan, SEO, content) | ✅ | `AGENTS.md`, `docs/`, `.cursor/rules/` |
| `public/` holds only files the code uses | ✅ | see Change log 2026-10-10 |
| Docs and cleanup committed on `multi-site` | ✅ | first commit on `multi-site`, 2026-10-10 (`git log`) |

### Step 0 — Live-site fixes (on `main`, deploys to production)

| Requirement | Status |
| --- | --- |
| Correct the cleanup branch `claude/pensive-feynman-t9pehu` (unit products, welded mesh at Shree Weld Mesh) and merge | ✅ live 2026-10-11 |
| New phones on the live site: Jai Shree Metal Perforators +91 93733 24492; Jai Shree Industries and Jai Shree Perforator +91 89089 21111 | ✅ live 2026-10-11 |
| Weekly holidays on the contact page (Thursday Pune, Sunday Mumbai) | ✅ live 2026-10-11 |
| Hide website links to units without a working site (4 units pointed at a dead or wrong domain) | ✅ live 2026-10-11 |
| Fix the location map (CARTO tiles needed an API key) | ✅ live 2026-10-11 |
| Get Vercel deploying again from GitHub | ✅ reconnected by the user 2026-10-11; pushes to `main` deploy automatically (Vercel team `jai-shree-s-projects`) |
| Merge `main` into `multi-site` | ✅ `d65a458`, build passes |

### Phase 0 — Platform (weeks 1–2)

| Requirement | Status |
| --- | --- |
| Baseline screenshots of every main-site page | ✅ 80 screenshots + heads + SEO files; guide `docs/research/baseline.md` |
| `middleware.ts` → `proxy.ts` | ✅ |
| Site config per site (`src/sites/`) | ✅ group only; six unit configs not created yet |
| Colour tokens replace ~1,400 hard-coded colours | ✅ |
| Pages move under `src/app/[site]/`; domain-based routing | ✅ |
| Per-site SEO: metadata, sitemap, robots, structured data | ✅ |
| `site` column on leads/blog/gallery/testimonials/page views; leads emailed to each unit; admin site filter | 🔄 column, saving and lead email done (dev database); admin filter built but not yet checked logged in |
| Customer auto-reply with reference number | ✅ reference on screen; email checked with a stubbed send (no Resend key locally) |
| Privacy and terms pages; Google Analytics 4 | ✅ privacy and terms pages (agency wording, legal review still to do); GA4 skipped (user, 2026-10-11) |
| Main site looks identical to baseline; merge to `main` | ✅ live 2026-10-11 (`751cd5c`) |

### Phases 1–4 — Sites and launch

| Requirement | Status |
| --- | --- |
| Site 1 Shree Perforators: pattern library, old-URL redirects (week 3) | ⏳ |
| Site 2 Jai Shree Metal Perforators: drawing upload quote, old-URL redirects (week 4) | ⏳ |
| Site 3 Jai Shree Industries: expanded metal selector (weeks 5–8) | ⏳ |
| Site 4 Jai Shree Perforator: bulk order estimator | ⏳ |
| Site 5 Jai Shree Filtration: stock check + admin stock board | ⏳ |
| Site 6 Shree Weld Mesh: welded mesh weight calculator | ⏳ |
| Domains pointed to Vercel (agency) | ⏳ |
| Search Console, Google Business Profiles, Our Group links, monthly reports (weeks 9–10) | ⏳ |

Step-by-step tasks and acceptance checks: `docs/05-build-plan.md`.

### Content we do not have (launch with fallbacks, never invent)

Unit logos, working hours, contact names, unit photos, client names, case studies, machine list, stock list, welded mesh range, expanded metal sizes and formulas, standard mechanical-punching patterns, export details. Fallback for each: `docs/08-content-checklist.md`.

## 4. Current status

**Where we are (2026-10-11):** **Phase 0 and task 1.1 are live** on jaishreegroup.com (merge `751cd5c`). The live database has the multi-site migration and the admin-access hardening. Next: Phase 1 task 1.2 (Shree Perforators site).

**Authorised by the user (2026-10-11):** run Phase 0 → Phases 1–3 (all six unit sites) as far as possible; SQL on jai-shree-dev freely; tested additive migrations on the live project when going live; merge to `main` when a phase passes its checks; Google Analytics skipped for now; admin-access hardening on the live project (applied).

**Next:**
1. 1.2 Shree Perforators site (Cursor `claude-sonnet-5-thinking-high`), then 1.3 pattern library, 1.4 legacy redirects + launch checklist; merge Phase 1 to `main` when it passes.
2. Phases 2 and 3 (the other unit sites).

**Waiting on the user (not blocking):**
- Log in to the admin panel and check the 0.7 site filter, badges and site pickers (now live); Claude and Cursor have no admin password.
- Create the Supabase login for the second admin email.
- Optional: turn on "Leaked password protection" in the live Supabase Auth settings.

**Loop notes:** Cursor's Opus quota is used up until 2026-11-04; use `claude-sonnet-5-thinking-high` (hard) and `composer-2.5` (simple). Vercel previews build again since `db93fbc` (route folders must not be named after metadata files). Previews use the live database.

**Open points:**
- Welded mesh: the agency said on 2026-10-02 it was discontinued; the client's approved answers say Shree Weld Mesh makes it. We follow the client.
- `next.config.ts` redirects (`/products/welded-mesh` → `/products` and others) apply on every host; add a host condition before the Shree Weld Mesh site goes live.
- Group products index says "8 facilities" (live copy; client rule says 6 units) — fix as a small intentional change.
- Shared product/industry data names clients and extra materials (titanium, PVC); unit sites must override them (1.2).

---

## 5. Change log

Newest first. One row per change. "Files" lists what changed (folder-relative).

| Date | Change | Files | Why |
| --- | --- | --- | --- |
| 2026-10-11 | Vercel preview for `db93fbc` built successfully (first success since 0.5); preview home page checked in Chrome and matches the live site. Added the Vercel lesson (cause, fix, how to read Vercel logs) and the Cursor model switch (Opus quota until 2026-11-04) to `docs/prompts/coordinator.md` | `docs/prompts/coordinator.md`, `PROJECT-LOG.md` | So the next session knows |
| 2026-10-11 | **Fixed the Vercel preview build failure** (Claude, original session). Read the failed build log via Chrome: the fatal error was `Invariant: failed to find source route /[site]/sitemap.xml for prerender` from Next's Vercel build adapter (only runs on Vercel, so local builds passed). Renamed `src/app/[site]/sitemap.xml/` → `site-sitemap/` and `robots.txt/` → `site-robots/`; proxy now rewrites `/sitemap.xml` and `/robots.txt` there. Checked locally: build/tsc pass, lint unchanged (12 old errors), group `/sitemap.xml` and `/robots.txt` byte-identical to before, new internal paths 404 when requested directly, key pages/admin/API/redirect unchanged. Also seen in the log (not fatal): `column blog_posts.site does not exist` — Vercel previews use the LIVE database, which doesn't have the multi-site migration yet, so previews show empty blog/gallery/testimonials until that migration is applied to live | `src/app/[site]/site-sitemap/route.ts`, `src/app/[site]/site-robots/route.ts`, `src/proxy.ts`, `docs/04`, `docs/06`, `docs/decisions.md` | Unblocks the Phase 0 merge |
| 2026-10-11 | 0.8 Privacy and terms (Cursor). `/privacy` (DPDP Act 2023) and `/terms`, one template each in `src/components/legal/`, filled from the site config (name + "a Jai Shree Group company" when endorsed, address, email, phone, origin; new optional `jurisdiction`, group = Pune). The privacy text describes only what the code does: forms → Supabase + Resend, anonymous page views (no IP), WhatsApp links, map providers, preview-only site cookie, staff-only admin cookies, no analytics or advertising. Wording is an agency template awaiting legal review. Both in `group.pages` and the sitemap (0.3, yearly). Footer bottom bar: Privacy and Terms links; contact, quote wizard and product-page forms: "By sending this form you agree to our Privacy Policy". GA4 skipped (user). Checked: build, lint unchanged (18), routes, titles, canonicals, sitemap (only the 2 new URLs differ from the baseline), footer links, form notes, 3-page pixel check | `src/components/legal/`, `src/app/[site]/(chrome)/{privacy,terms}/`, `src/components/shared/FormPrivacyNote.tsx`, `src/components/layout/Footer.tsx`, contact, quote and product-quote forms, `src/app/[site]/sitemap.xml/route.ts`, `src/lib/seo.ts`, `src/sites/{types,group}.ts`, `docs/06-codebase-map.md`, `docs/05-build-plan.md` | Phase 0 task 0.8 |
| 2026-10-11 | 0.6 Per-site SEO (Cursor). Site-wide metadata moved from the root layout into `generateMetadata` in `[site]/layout.tsx`, built from the site config (new optional `seo` fields for OG, Twitter, hreflang and JSON-LD facts); canonicals, OG urls, breadcrumbs and JSON-LD use the active site's `origin`; `GlobalSchema` moved into `[site]/layout.tsx` with a unit branch (`parentOrganization` = Jai Shree Group); sitemap and robots are per-site route handlers under `[site]/`, mapped by the proxy; `VERCEL_ENV=preview` → noindex and robots disallow all; proxy 404s first path segments not in `config.pages`; admin gets noindex. Checked: build, lint unchanged (18), all 40 routes + robots + sitemap identical to the pre-change capture (sitemap: `lastmod` only), status codes, a temporary unit test config (removed), preview build, 3-page visual check | `src/app/[site]/`, `src/app/layout.tsx`, `src/app/admin/layout.tsx`, `src/components/seo/`, `src/lib/seo.ts`, `src/lib/location-page.tsx`, `src/proxy.ts`, `src/sites/`, `docs/06-codebase-map.md`, `docs/05-build-plan.md` | Phase 0 task 0.6 |
| 2026-10-11 | 0.5 Route move (done by Claude: the Cursor CLI launch was refused by Claude Code's auto-mode permission check; the user has since added a permission rule). Public pages now live under `src/app/[site]/` (chrome in the `(chrome)` route group; landing and brochure without), proxy rewrites host → `/<site>/path`, `?site=` + cookie on non-production hosts, real 404s for unmatched paths, theme variables written from the site config. Checked: build, lint unchanged, 20+ routes and status codes, all 40 pages' SEO tags identical to the baseline, pixel check of 7 pages clean | `src/app/[site]/`, `src/proxy.ts`, `src/sites/`, `src/components/`, `docs/06-codebase-map.md`, `docs/decisions.md`, `.gitignore` | Phase 0 task 0.5 |
| 2026-10-11 | Wrote the coordinator handbook (`docs/prompts/coordinator.md`) and saved the reviewed 0.5 Cursor prompt (`docs/prompts/task-0.5.md`) so a fresh Claude session can run the loop. Recorded the user's new authorisations (Supabase SQL, merging to `main` after checks, GA4 skipped, continue through Phases 1–3). First CLI run of 0.5 was stopped by the user after ~30 s; nothing changed | `docs/prompts/`, `docs/05-build-plan.md`, `docs/README.md`, `PROJECT-LOG.md` | Hand-off to a new context window |
| 2026-10-11 | Dev database: user created Supabase project `jai-shree-dev` (ref `icbamz…`), loaded `schema.sql`, added an admin user, and pointed `jai-shree-multisite/.env.local` at it. Checked: not the live project; tables respond; anon cannot read leads; anon page-view insert works. No Resend key in this folder, so test enquiries send no email. `ADMIN_EMAILS` still empty (admin panel locked until the user adds their email). Live site and `jai-shree-group/.env.local` stay on the live project | `.env.local` (not committed) | Test forms and migrations without touching the client's real data |
| 2026-10-11 | Cursor CLI (`agent`) installed and logged in; Claude now runs the build loop: one fresh Cursor session per task, then Claude verifies | — | User asked Claude to coordinate Cursor directly |
| 2026-10-11 | Reviewed Cursor's 0.4 (Claude): 20 commits (`863004d`…`cb75260`), 70 files; token choices sampled and correct (fills → brand, words/icons → brand-text, white-on-orange → brand-foreground, neutrals → foreground/text-secondary); orange only left in `src/sites/`, brochure, admin; Cursor's helper script not committed; lint unchanged (12 old errors — Cursor had skipped lint). **Follow-up for the first light-theme site:** a few neutral greys are still hard-coded (`ProductShowcase` `#0F0F0F`, `LandingLocations` `#141414`, map popup `#CCCCCC`, `ProductViewer3D` canvas/background shades, `email.ts` colours — the last one belongs to 0.7) | — | Verify before 0.5 |
| 2026-10-11 | 0.4 Theme tokens. Public colours now use CSS variables (`bg-brand`, `text-brand-text`, `var(--brand)`, and the rest of the mapping). Defaults still match today's group colours. Brand hex lives in `src/sites/theme.css` and `src/sites/group.ts`. Brochure, admin, the logo flame (`#E84512`) and WhatsApp green are unchanged. Canvas components read `--brand` at runtime. Quick check of `/`, `/contact` and `/products/perforated-sheets` on a production build looks the same | `src/app/globals.css`, `src/sites/theme.css`, `src/components/` (except brochure and admin), `src/app/` public pages, `src/lib/email.ts`, `src/lib/constants.ts` | Phase 0 task 0.4 |
| 2026-10-11 | Full 80-page screenshot compare now runs only once, at the Phase 0 acceptance before merging to `main`; all tasks before that use the quick 3-page check | `docs/05-build-plan.md` | User: the full compare per task is too slow |
| 2026-10-11 | Reviewed Cursor's 0.3 (Claude): commit `e94663f` holds code and logs together; `src/sites/` matches the architecture doc; screenshot compare clean (47/80 at 0.00%, rest ≤ 0.16% in animated areas, no height changes). Fixed the 8 lint errors from the 0.1 screenshot scripts by ignoring `scripts/baseline/` in ESLint. Build plan: full 80-page screenshot compare only after 0.4, 0.5, 0.6 and before merging; quick 3-page check otherwise | `eslint.config.mjs`, `docs/05-build-plan.md` | Keep checks fast without losing safety |
| 2026-10-11 | 0.3 Group site config: `src/sites/` types, domain map (no imports; unit domains except "New domain"; apex and www), and `group.ts` with today's COMPANY, nav, footer, SEO and globals.css colours. `constants.ts` re-exports those values. No component or page edits. Screenshot compare vs baseline: no height changes; non-zero pages are animation, map tiles or 3D canvas | `src/sites/`, `src/lib/constants.ts`, `docs/06-codebase-map.md`, `.gitignore` | Phase 0 task 0.3 |
| 2026-10-11 | 0.1 Baseline done (Claude): production build of `main` @ `5035e14`, 40 pages × desktop 1440 + phone 390 = 80 full-page screenshots, every page's `<head>`, local and live sitemap/robots — all pages 200/304, no console errors. Saved in `docs/research/baseline/` (git-ignored, 54 MB). Added reusable `scripts/baseline/capture.js` and `compare.js` (pixel diff per page) and the guide. Also: fixed the Cursor log rule so code and log go in one commit (Cursor's 0.2 log was left uncommitted), updated the codebase map for `proxy.ts` | `docs/research/baseline.md`, `scripts/baseline/`, `docs/05-build-plan.md`, `docs/06-codebase-map.md`, `CURSOR-LOG.md`, `.cursor/rules/05-cursor-log.mdc` | Phase 0 acceptance needs a before-picture |
| 2026-10-11 | Renamed `src/middleware.ts` to `src/proxy.ts` and the export to `proxy` (Next.js 16). Admin gate unchanged: logged-out `/admin/dashboard` returns 307 to `/admin/login`. Commit `85f9286`, not pushed | `src/proxy.ts` | Phase 0 task 0.2 |
| 2026-10-11 | Step 0 is live. User reconnected Vercel to GitHub; pushed an empty commit `5035e14` to trigger the deploy; Vercel status success. Checked the live site: new phones, Sunday/Thursday holidays, Welded Mesh and Ready Stock on Our Group, no jaishreefiltration.com links, no old phones, map loads 9/9 OpenStreetMap tiles. The 2026-08-23/24 commits (hex hero background, brochure Industries pages) also went live with it. Only remaining "wire mesh" text is the 1970 history line (allowed) | `jai-shree-group` `main` | User asked to redeploy after reconnecting |
| 2026-10-10 | Merged `main` (with Step 0) into `multi-site` (`d65a458`); build passes. Not pushed | `multi-site` branch | Keep the build branch on the latest live code |
| 2026-10-10 | Committed Step 0 (`2f4daec`, author = GitHub no-reply email), fast-forwarded `main`, build passed, pushed to GitHub. **Not deployed**: no Vercel status on the commit; GitHub's last deployment record is 2026-08-02; live `/brochure/icons` (added 2026-08-24) is 404. Local Vercel CLI is logged in to TrackHive, which has no Jai Shree project | `jai-shree-group` `main` | User approved commit and push live |
| 2026-10-10 | Fixed the location map (home page and Our Group page): CARTO's dark map tiles now require an API key and showed "API KEY REQUIRED". Switched to OpenStreetMap tiles (no key, credit shown) darkened with a CSS filter; Leaflet CSS now bundled instead of loaded from unpkg; "Our Locations" label no longer hidden behind the map; Mumbai pin text no longer says "filtration sectors". Checked in the browser: all tiles load, no console errors. Not committed (on `step-0-live-fixes`) | `jai-shree-group`: `src/components/shared/IndiaMap.tsx` | User reported the map was not working |
| 2026-10-10 | Step 0 changes made in the production folder on branch `step-0-live-fixes` (from the cleanup branch): new phones for 3 units; weekly holiday per unit (`weeklyOff`) and per-region hours on the contact page; unit product lists set to the client's ticks (`BRANCH_PRODUCTS`); Our Group copy now names welded mesh and ready stock instead of "filtration products"; website links hidden for Shree Weld Mesh, Jai Shree Filtration, Jai Shree Industries, Jai Shree Perforator (pointed at a dead or wrong domain). Typecheck and build pass; no new lint issues (12 old lint errors in untouched files). Not committed | `jai-shree-group`: `src/lib/constants.ts`, `src/data/branches.ts`, `src/components/contact/ContactPage.tsx`, `src/components/group/GroupPage.tsx`, `src/components/home/GroupSection.tsx` | Step 0, approved by the user |
| 2026-10-10 | First commit on `multi-site`: all docs, both logs, Cursor rules, `.env.example`, client files, `public/` cleanup. Not pushed | whole folder | User approved the commit |
| 2026-10-10 | Created `CURSOR-LOG.md` (Cursor's task diary with an entry template) and Cursor rule `05-cursor-log.mdc` that makes Cursor fill it in after every task | `CURSOR-LOG.md`, `.cursor/rules/05-cursor-log.mdc`, `AGENTS.md`, `PROJECT-LOG.md` | So "what is done and what is left" can be answered by reading the logs |
| 2026-10-10 | Created this project log; added the "log every change" rule to AGENTS.md and Cursor rules | `PROJECT-LOG.md`, `AGENTS.md`, `.cursor/rules/00-project.mdc`, `docs/README.md` | One place for goal, requirements, status and history |
| 2026-10-10 | Cleaned `public/`: 92 → 38 files, 30 MB → 14 MB. Removed 20 unused logo files (the client's logo is inline in `Logo.tsx`), Next.js starter SVGs, the 2022 brochure PDF, 30 unused brochure photos, 1 unused gallery photo, stale README. Build passes | `public/`, `docs/06-codebase-map.md`, `docs/08-content-checklist.md`, `docs/decisions.md` | Keep only what the site uses; useful photos recoverable from git commit `d379076` |
| 2026-10-10 | Recorded the client's approved questionnaire and updated all docs: new unit focus, products per unit, names, phones, holidays, domain; welded mesh active at Shree Weld Mesh; weldedmeshindia.com and jaishreefiltration.com back in use; stock board for Jai Shree Filtration; content fallbacks; Step 0 live fixes; "How we work" in the build plan | `docs/client/answers-2026-10-07.md` (+ the filled `.docx`), `docs/01`–`08`, `docs/decisions.md`, `AGENTS.md`, `.cursor/rules/` | Client approved; agency decided to build without further questions |
| 2026-10-10 | Updated the client plan doc (Claude doc) to the approved site list | Claude doc "Jai Shree Group — Multi-Site Digital Plan" | Keep the client-facing plan in line |
| 2026-10-10 | Found the cleanup task's branch `claude/pensive-feynman-t9pehu` unmerged and partly wrong after the client's answers | — | Must be corrected before Step 0 merge |
| 2026-10-07 | Client (Kanishq Jangid) filled in and approved the questionnaire | `docs/client/Jai-Shree-Unit-Websites-Answers-2026-10-07.docx` | — |
| 2026-10-05 | Made a 2-page Word questionnaire for the client with answer boxes | `docs/client/Jai-Shree-Unit-Websites-Questions.docx` | Client's chat replies were partial |
| 2026-10-05 | Client chat feedback: Palghar has no laser cutting; add expanded metal to Shree Perforators | `docs/02`, `docs/03`, `docs/decisions.md` | — |
| 2026-10-05 | Made the one-page proposal PDF for client approval | `docs/client/Jai-Shree-Unit-Websites-Proposal.pdf` (+ HTML source) | Client approval before building |
| 2026-10-05 | Created this folder (copy of the repo, branch `multi-site`, dependencies installed, build passes); wrote `AGENTS.md`, `docs/01`–`08`, `decisions.md`, `research/legacy-sites.md`, Cursor rules, `.env.example`, new README; moved old docs to `docs/archive/`; checked theme contrast (fixed two palettes) | whole `docs/`, `AGENTS.md`, `README.md`, `.cursor/rules/`, `.env.example`, `.gitignore` | Aligned context so building in Cursor stays on track |
| 2026-10-05 | Started a background task to remove discontinued-product copy from the live site | branch `claude/pensive-feynman-t9pehu` | Live site still offered discontinued products |
| 2026-10-02 | Wrote the client-facing plan (Claude doc) with benefits, upgrades, architecture and roadmap diagrams | Claude doc | Plan for client review |
| 2026-10-02 | Researched the project and the group's six unit domains; proposed one app serving all domains | — | Starting point |
