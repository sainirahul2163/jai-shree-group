# 05 — Build plan

Work top to bottom. Tick boxes as you go and commit after each numbered task, so any step can be rolled back. A phase is done only when its acceptance checks pass.

No fixed dates (user, 2026-10-11): we go as fast as possible, but strictly **phase by phase, task by task, in this file's order**. A task starts only when the previous one has passed its acceptance check and is logged. We do not wait for client content: gaps launch with the fallbacks in `08-content-checklist.md`.

## How we work (Cursor or Claude Code)

- **One numbered task per chat.** Start each chat with: "Read AGENTS.md and docs/05-build-plan.md. Do task <number> only. Check it against its acceptance line, then stop."
- **Small commits.** Commit after each task with a message that names the task ("0.4 Tokenise colours in components/home").
- **Check before ticking.** Run `npm run lint` and `npm run build`. Screenshot check (user, 2026-10-11): the **full** 80-page compare (`docs/research/baseline.md`) runs **once**, at the Phase 0 acceptance before merging to `main`. Every task before that gets the **quick check** only: open `/`, `/contact` and `/products/perforated-sheets` on a production build and confirm they look right.
- **Log it.** After each task, add a row to the Change log in `PROJECT-LOG.md` and update the requirement's status there.
- **Keep docs true.** If a task changes structure, update `06-codebase-map.md`; if it changes a decision, add a row to `decisions.md`.
- **Review gate.** At the end of each phase, run a code review (Claude Code `/code-review`) before merging to `main`.

## Step 0 — Live-site fixes on `main` (day 1, in the production folder)

The live site shows outdated unit phones and products. Fix these on `main` first, so the multi-site branch starts from correct data.

- [ ] Review branch `claude/pensive-feynman-t9pehu` (removes discontinued-product copy). Before merging, correct it to match `client/answers-2026-10-07.md`:
  - `src/data/branches.ts` `BRANCH_PRODUCTS`: set each unit's list from the answers (Shree Weld Mesh = Welded Mesh; Jai Shree Filtration = Perforated Sheets (ready stock); Jai Shree Perforator = Perforated Sheets (mechanical punching); and so on).
  - `GroupPage.tsx` and other group copy may name Shree Weld Mesh's welded mesh; they must not list it as a group product.
- [ ] `src/lib/constants.ts` `BRANCHES`: new phones for Jai Shree Metal Perforators (+91 93733 24492), Jai Shree Industries and Jai Shree Perforator (+91 89089 21111).
- [ ] Contact page shows weekly holidays: Thursday (Pune units), Sunday (Mumbai units).
- [ ] `npm run build`, check the live pages that show units (`/group`, `/contact`, home Group section), merge to `main`.
- [ ] In `/Users/rahul/Documents/jai-shree-multisite`: commit the docs, then merge `main` into `multi-site`. `npm run build` passes.

## Phase 0 — Make the app multi-site (main site must look identical)

0.1 **Baseline**
- [x] Run the current site locally and save full-page screenshots of every public route at 1440 px and 390 px wide into `docs/research/baseline/` (git-ignored if large). Routes: see `06-codebase-map.md` → Routes.
- [x] Save the current `sitemap.xml` and `robots.txt` output and the HTML `<head>` of every page (not just three).
- How to re-capture and compare after a change: `docs/research/baseline.md` (scripts in `scripts/baseline/`).

0.2 **Proxy rename**
- [x] Rename `src/middleware.ts` → `src/proxy.ts`, export `proxy`. Admin gate behaves exactly as before.

0.3 **Site config**
- [x] Create `src/sites/` (`types.ts`, `domains.ts`, `index.ts`, `group.ts`) per `04-architecture.md`.
- [x] `group.ts` holds today's values from `constants.ts` (`COMPANY`, `NAV_LINKS`, `FOOTER`, SEO, theme hex values). `constants.ts` re-exports from it during the transition.
- [x] `group.origin` = `https://www.jaishreegroup.com` (confirmed by the client).

0.4 **Theme tokens**
- [x] Add the CSS variables and `@theme inline` mapping to `globals.css` (`04-architecture.md` → Theming). Default values = today's group colours.
- [x] Replace hard-coded colours with token classes, one folder per commit: `layout/`, `shared/`, `home/`, `products/`, `industries/`, `calculator/`, `quote/`, `contact/`, `gallery/`, `group/`, `about/`, `clients/`, `certifications/`, `blog/`, `location/`, `landing/`, then `src/app/` pages.
- [x] Skip `brochure/` and `admin/` (out of scope).
- [x] Three.js and canvas components read `--brand` at runtime.

0.5 **Route move**
- [x] Move public routes into `src/app/[site]/`. Keep `admin/` and `api/` at the root.
- [x] `[site]/layout.tsx`: theme variables, fonts, Navbar, Footer, WhatsApp button, page tracker (replaces `SiteChrome` logic; keep the `/landing` and `/brochure` no-chrome behaviour).
- [x] Proxy rewrites host → `/${key}${pathname}`; local `*.localhost` and preview `?site=` work.
- [x] Group-only routes (`group`, `calculator`, `brochure`, `landing`, `pune/*`, `mumbai/*`, `blog`, `clients`, `certifications`) are listed only in `group.pages`.

0.6 **Per-site SEO**
- [x] `generateMetadata` in `[site]/layout.tsx` and pages read `config.seo` and `config.origin` (canonical, Open Graph, alternates).
- [x] `[site]/sitemap.ts` and `[site]/robots.txt/route.ts`; proxy maps `/sitemap.xml` and `/robots.txt`. (Built as `[site]/sitemap.xml/route.ts`: the `sitemap.ts` convention gets no route params.)
- [x] JSON-LD (`components/seo/*`) reads the site config.

0.7 **Data and leads**
- [ ] Supabase migration: `site` column and per-site blog slug index (`04-architecture.md` → Data).
- [ ] APIs save `site` and email `config.leadEmail`; `LEAD_EMAIL_OVERRIDE` works.
- [ ] Customer auto-reply with reference number.
- [ ] Admin site filter on leads, blog, gallery, testimonials.

0.8 **Shared upgrades**
- [ ] Privacy policy and terms page templates (content per site from config; follow India's Digital Personal Data Protection Act 2023 — get the wording reviewed).
- [ ] ~~Google Analytics 4 per site~~ — **skipped for now** (user, 2026-10-11). Leave analytics out or behind an empty env var, off by default.

**Phase 0 acceptance**
- [ ] Every main-site route matches its baseline screenshot (no visible difference at 1440 px and 390 px) — run `scripts/baseline/compare.js` as in `docs/research/baseline.md`.
- [ ] `sitemap.xml`, `robots.txt` and the saved `<head>` tags are unchanged for the group site.
- [ ] `grep -rniE "#e8521a|#ff6b35" src` finds matches only in `src/sites/`, `brochure/` and `admin/`.
- [ ] A test lead from the group site lands in Supabase with `site = 'group'` and emails the override inbox.
- [ ] `npm run lint` and `npm run build` pass. Merge `multi-site` → `main`.

## Phase 1 — Pilot: Shree Perforators

- [ ] Crawl the live shreeperforators.com and list every URL (`research/legacy-sites.md`).
- [ ] `src/sites/shree-perforators.ts` + `content/shree-perforators/` with unique copy (`07-seo-rules.md`).
- [ ] Pattern library tool (`03-sites.md` → site 1).
- [ ] Home, Products, Industries, Gallery, About, Export, Contact, Get quote, Privacy, Terms.
- [ ] Legacy redirect map (old URL → new URL, 301) in `next.config.ts` with a `host` condition.
- [ ] Launch checklist (below), then point DNS to Vercel.

## Phase 2 — Jai Shree Metal Perforators

- [ ] Same steps as Phase 1 for metalperforatedsheets.com.
- [ ] Drawing upload: private `drawings` bucket, file type and size limits (DXF, DWG, PDF; 20 MB), signed URLs in admin.
- [ ] Machine list page (data from the client).

## Phase 3 — Sites 3 to 6 (about one a week each)

For each: domain pointed to Vercel (agency), `src/sites/<key>.ts`, content in `content/<key>/`, signature tool, pages, launch checklist. Specs: `03-sites.md`.

- [ ] **Jai Shree Industries** (new domain): expanded metal selector; products limited to expanded metal, CNC and mechanical punching, perforated sheets, leveling.
- [ ] **Jai Shree Perforator** (metalperforation.co.in): bulk order estimator; mechanical-punched perforated sheets only.
- [ ] **Jai Shree Filtration** (jaishreefiltration.com): stock check form + WhatsApp; `stock_items` table, admin page to edit it, public stock board hidden while empty. No export page.
- [ ] **Shree Weld Mesh** (weldedmeshindia.com): welded mesh weight calculator; welded mesh only.
- [ ] Side-by-side copy check of the four perforated-sheet sites (`07-seo-rules.md`).

## Phase 4 — Go live and reporting

- [ ] Search Console and Bing Webmaster per domain (DNS verification); submit sitemaps.
- [ ] Google Business Profile per unit, linked to its site.
- [ ] Main site's Our Group page links to all six sites.
- [ ] wiremeshindia.net (retired) 301 to jaishreegroup.com if the agency controls it.
- [ ] Monthly report per site: enquiries, enquiries won, time to first reply, search clicks, target-search positions, tool use.

## Launch checklist (every unit site)

- [ ] All copy unique to this site; only the unit's own products offered; no discontinued products.
- [ ] Contact page shows the unit's phone, email and weekly holiday from `02-business-facts.md`.
- [ ] Every gap uses its fallback from `08-content-checklist.md`; nothing invented.
- [ ] Contrast passes (`03-sites.md` → Contrast check).
- [ ] Lighthouse mobile: performance ≥ 90, accessibility ≥ 95, SEO 100 on home, products and contact.
- [ ] Canonicals, sitemap and robots point at this site's own domain.
- [ ] Test lead arrives with the right `site` and goes to the right unit email (override off on production).
- [ ] WhatsApp and call buttons use the unit's number.
- [ ] Legacy redirects tested (sites 1 and 2).
- [ ] Analytics events firing.
