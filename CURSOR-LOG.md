# Cursor Log

Cursor's own work diary for the Jai Shree Group multi-site build. **Cursor writes here at the end of every task**, so anyone (Rahul, or Claude when asked "what is done and what is left") can read exactly what happened without opening the code.

## Rules for Cursor

1. **Add an entry at the end of every task or chat that changed anything** — code, docs, files, config, database. Newest entry at the top, under "Entries".
2. Use the template below exactly. Be specific: name the files, say what changed and why.
3. Be honest about checks. If lint or build failed, or you skipped them, say so. If something is half done, mark it 🔄 and say what is missing.
4. Order: make the change → run the checks → write this entry, tick the build plan, add the PROJECT-LOG row → **then commit everything in one commit** (code + logs together). After writing the entry here, also:
   - tick the task's box in `docs/05-build-plan.md` (only if its acceptance check passed),
   - add a one-line row to the Change log in `PROJECT-LOG.md` and update its requirement status.
5. Never delete or rewrite old entries. If an earlier entry was wrong, add a new entry that corrects it.
6. If you were unsure about something or made an assumption, write it under "Questions / assumptions" so it gets reviewed.

## Template

```markdown
### YYYY-MM-DD — <build-plan task number and name, e.g. "0.4 Theme tokens: components/home">

- **Status:** ✅ done | 🔄 partly done | ⛔ blocked
- **What I did:**
  - …
- **Files changed:** `path/one.tsx`, `path/two.ts`
- **Checks:** lint ✅/❌ · build ✅/❌ · screenshots match baseline ✅/❌/n.a. · other: …
- **Commit:** "<message>" (this entry is part of that commit — no hash needed)
- **Left to do in this task:** … (or "nothing")
- **Next task:** <number and name>
- **Questions / assumptions:** … (or "none")
```

---

## Entries

### 2026-10-11 — 0.6 Per-site SEO

- **Status:** ✅ done
- **What I did:**
  - Root `src/app/layout.tsx` now holds only `<html>`, `<body>`, Geist fonts and `globals.css`. No metadata, no `GlobalSchema`.
  - `[site]/layout.tsx`: `generateMetadata` returns `siteMetadata(site)` (`src/lib/seo.ts`). It is built from the config: title (`default` + `titleTemplate`), description, keywords, authors/creator, `metadataBase` = `config.origin`, canonical `/` + hreflang from `seo.languages`, Open Graph (type, locale, url = origin, site name, title, description, image + size), Twitter, robots, and the Google/Bing verification env vars (only when `site.key === "group"`). It also renders `GlobalSchema site={site}` first, so the script is still the first thing in `<body>` as before.
  - `SiteConfig["seo"]` (`src/sites/types.ts`) gained optional `ogImageSize`, `ogTitle`, `ogDescription`, `twitterTitle`, `twitterDescription`, `locale`, `languages` and `schema` (`SchemaFacts`: type, foundingDate, keywords, areaServed, address parts, geo, sameAs, certification, catalogName, priceRange). `group.ts` fills them with today's values. `group.pages` is reordered to today's sitemap order (nothing else reads the order; the type comment now says order = sitemap order).
  - `src/sites/params.ts`: `siteFromParams(params)` (`findSite` + `notFound()`) and the `SiteParams` type. Every page that built an absolute URL or renders a schema now reads the site from the `site` param: about, group, calculator, clients, certifications, gallery, get-quote, industries, blog, products, contact, `products/[slug]`, `industries/[slug]`, `blog/[slug]`, landing (static `metadata` → `generateMetadata`), and the six city pages through `src/lib/location-page.tsx` (`locationMetadata` and `renderLocationPage` take `params`; the pages now export `generateMetadata`). `siteUrl(site, path)` builds `origin + path` ("/" → bare origin, as before). The product page's inline breadcrumb JSON became `BreadcrumbSchema` (same JSON), and its OG `siteName` and Product `brand`/`manufacturer` use `site.name`. Page copy is unchanged.
  - JSON-LD: `GlobalSchema`, `BreadcrumbSchema`, `ContactPageSchema`, `BlogPostingSchema` take a `site` prop. Name, url, phone, email, address, products (`config.products` → `PRODUCTS`) and schema facts come from the config; shared parts are in `components/seo/schema-parts.ts`. `GlobalSchema` has two branches. The group branch is the same shape as before. The unit branch runs when `config.unitSlug` is set: the unit's own `LocalBusiness` (or `seo.schema.type`) with name, description, url, phone, email, address, geo, products and `parentOrganization` = Jai Shree Group (`group.name`, `group.origin`). `ContactPageSchema` builds opening hours from `contact.weeklyHoliday` and `contact.hours` ("9:00 AM – 6:00 PM" → 09:00–18:00). If the hours are missing or in another form, it emits only the closed-day spec.
  - Sitemap and robots: deleted `src/app/sitemap.ts` and `src/app/robots.ts`. Added route handlers `src/app/[site]/sitemap.xml/route.ts` and `src/app/[site]/robots.txt/route.ts`, prerendered per configured site (`generateStaticParams`, `dynamicParams = false`). Sitemap order: `config.pages` (minus city prefixes `/pune`, `/mumbai` and `/brochure`), then `config.products` with product data, `config.industries` with detail pages, location pages whose city prefix is in `config.pages`, and blog posts if `/blog` is enabled. URLs are at `config.origin` and priorities and change frequencies are the same as before. The XML and robots text use the same format as Next's own serializer. On `VERCEL_ENV=preview`, robots.txt is `User-Agent: * / Disallow: /` and every page gets `robots: noindex, nofollow`.
  - `src/proxy.ts`: `/sitemap.xml` and `/robots.txt` are rewritten to `/<key>/sitemap.xml` and `/<key>/robots.txt`. A first path segment that is not in the site's `config.pages` is rewritten to `/<key>/__no-page/<path>`, which lands on `[site]/[...rest]` (real 404). `/` is always allowed. The proxy imports `findSite` from `@/sites`. Matcher: the file-extension exclusion stays; `/sitemap.xml`, `/robots.txt`, `/:site/sitemap.xml` and `/:site/robots.txt` are added, so `/group/sitemap.xml` 404s instead of serving a site's file under another path.
  - `src/app/admin/layout.tsx` (new): `robots: noindex, nofollow` for every admin page. Admin pages no longer get the group's metadata or `GlobalSchema`.
  - `docs/06-codebase-map.md` updated (route tree, proxy, `src/sites/params.ts`, `src/lib/seo.ts`, `components/seo/`, hotspots).
- **Files changed:** `src/app/layout.tsx`, `src/app/[site]/layout.tsx`, `src/app/[site]/sitemap.xml/route.ts` (new), `src/app/[site]/robots.txt/route.ts` (new), `src/app/sitemap.ts` (deleted), `src/app/robots.ts` (deleted), `src/app/admin/layout.tsx` (new), `src/app/[site]/landing/page.tsx`, `src/app/[site]/(chrome)/{about,group,calculator,clients,certifications,gallery,get-quote,industries,blog,products,contact}/page.tsx`, `src/app/[site]/(chrome)/{products,industries,blog}/[slug]/page.tsx`, `src/app/[site]/(chrome)/{pune,mumbai}/*/page.tsx` (6), `src/components/seo/{GlobalSchema,BreadcrumbSchema,ContactPageSchema,BlogPostingSchema}.tsx`, `src/components/seo/schema-parts.ts` (new), `src/lib/seo.ts` (new), `src/lib/location-page.tsx`, `src/proxy.ts`, `src/sites/types.ts`, `src/sites/group.ts`, `src/sites/params.ts` (new), `docs/06-codebase-map.md`, `docs/05-build-plan.md`, `PROJECT-LOG.md`, `CURSOR-LOG.md`
- **Checks:**
  - `npx tsc --noEmit` ✅.
  - lint ✅ unchanged: 18 problems (12 errors, 6 warnings), all in files this task did not touch.
  - build ✅. The route table differs from the pre-change build only in `/robots.txt` and `/sitemap.xml` moving to `● /[site]/robots.txt` and `● /[site]/sitemap.xml` (`/group/…`). Every page keeps its ●/○/ƒ status.
  - SEO diff: before any change, I built the old code, ran it on :3000 and saved each route's server-HTML `<title>`, every `<meta name|property>`, `<link rel=canonical|alternate>` and every JSON-LD script (whole document), plus `/sitemap.xml` and `/robots.txt` (status, content-type, body) into `/tmp/seo-before/`. I repeated the capture on the final normal build into `/tmp/seo-after/`. All 40 routes are **identical** (status code included): `/`, `/landing`, `/about`, `/group`, `/products`, `/calculator`, `/gallery`, `/clients`, `/certifications`, `/contact`, `/get-quote`, `/industries`, `/blog`, the 6 `/products/*`, the 8 `/industries/*`, the 6 `/pune/*` and `/mumbai/*`, the 4 `/blog/*`, `/brochure`, `/brochure/icons`, `/this-page-does-not-exist` (404). robots.txt identical. sitemap.xml: same 37 URLs, order, priorities and change frequencies; only the 37 `lastmod` lines differ (build time). Both captures ran with this folder's `.env.local` (`NEXT_PUBLIC_SITE_URL=http://localhost:3000`), so the origins in both read `http://localhost:3000`.
  - Status codes on the production build: `/`, `/contact`, `/products/perforated-sheets`, `/pune/perforated-sheet-manufacturers`, `/blog/expanded-metal-vs-perforated-sheet`, `/landing`, `/brochure`, `/brochure/icons`, `/industries/automobile` → 200. `/does-not-exist`, `/group/about`, `/shree-perforators`, `/pune`, `/group/sitemap.xml`, `/group/robots.txt` → 404. `/sitemap.xml`, `/robots.txt` → 200. `/api/health` → 200. `/products/wire-mesh` → 308 `/products` (unchanged). Logged-out `/admin/dashboard` → 307 `location: /admin/login`. `/admin/login` has `<meta name="robots" content="noindex, nofollow">`.
  - Unit test, not committed: I added a temporary `src/sites/shree-perforators.ts` (origin `https://www.shreeperforators.com`, `unitSlug` set, pages `/`, `/products`, `/industries`, `/contact`, `/get-quote`, products perforated-sheets + expanded-metal, industries automobile + sugar-industry + agriculture, no hours, address parts only) and registered it in `src/sites/index.ts`. Then I built, started, and requested `http://shree-perforators.localhost:3000`:
    - `/`, `/products`, `/products/perforated-sheets`, `/industries/automobile`, `/contact`, `/get-quote`, `/sitemap.xml`, `/robots.txt` → 200.
    - `/group`, `/calculator`, `/blog`, `/blog/expanded-metal-vs-perforated-sheet`, `/pune/perforated-sheet-manufacturers`, `/landing`, `/brochure`, `/about`, `/group/about`, `/shree-perforators/sitemap.xml` → 404.
    - Sitemap: exactly 9 URLs at `https://www.shreeperforators.com`: the 5 pages, 2 products, automobile and sugar-industry. Agriculture is left out (no detail page). No location or blog URLs.
    - robots: `Sitemap: https://www.shreeperforators.com/sitemap.xml`.
    - `/` JSON-LD: `LocalBusiness` "Shree Perforators" with its address, phone, email, 2-product catalog at its origin, and `parentOrganization` {Organization, "Jai Shree Group", group origin}. Canonical and `og:url` are `https://www.shreeperforators.com`; `og:site_name` and author are "Shree Perforators".
    - `/contact`: canonical, OG url, LocalBusiness and breadcrumbs all at the unit origin, with only the Thursday closed-day hours spec (no hours in the test config).
    - The group site on plain localhost was still fine (sitemap 37 URLs, `/group` 200).
    - Then I deleted the test file and restored `src/sites/index.ts` (git shows no change to it).
  - Preview ✅: `VERCEL_ENV=preview npm run build` and `start`. robots.txt is `User-Agent: *` / `Disallow: /` (no sitemap line). `/`, `/contact`, `/products/perforated-sheets`, `/blog/…`, `/landing` have `noindex, nofollow`. The 404 page also carries Next's own `noindex` tag, which was there before too. Then I rebuilt normally, and the SEO diff above is from that normal build.
  - Quick visual check ✅ at 1440×900 against `docs/research/baseline/desktop-1440`: `/` is the same (locked hero H1, hex grid, orange buttons; only the rotating product card shows a different slide), `/contact` is the same, `/products/perforated-sheets` is the same. No console errors on the product page. I did not run the full 80-page compare (as instructed).
  - Every server I started is stopped; port 3000 is free. Throwaway files are only in `/tmp` (`seo-snapshot.mjs`, `seo-before/`, `seo-after/`, build logs); the Playwright screenshot folder `.playwright-mcp/` was deleted.
- **Commit:** "0.6 Per-site SEO: metadata, sitemap, robots and JSON-LD from the site config" (this entry is part of that commit)
- **Left to do in this task:** nothing
- **Next task:** 0.7 Data and leads
- **Questions / assumptions:**
  - The sitemap is a route handler (`[site]/sitemap.xml/route.ts`), not the `sitemap.ts` convention. Next's loader calls a single `sitemap()` with no arguments (`next/dist/build/webpack/loaders/next-metadata-route-loader.js`), so it cannot know the `[site]` param. `docs/04-architecture.md` still shows `[site]/sitemap.ts`, and I was told not to edit other docs. Claude may want to update it and add a `docs/decisions.md` row.
  - The sitemap leaves out `/brochure` (print document) and the city prefixes (`/pune`, `/mumbai` have no index page) with constants in the route file. `/landing` stays in the group sitemap even though the page is `noindex`; that was already true before, and I kept it so the output is identical.
  - The proxy 404s only on the first path segment. A unit site with `/products` enabled still serves `/products/<slug>` for products it does not offer, and pages not in `config.pages` are still prerendered for every configured site (they just cannot be reached). Both are for Phase 1.
  - The group JSON-LD has no `subOrganization` list of the six units (`docs/07-seo-rules.md`), because group output had to stay byte-identical. Add it when unit sites go live.
  - The unit branch of `GlobalSchema` is chosen by `config.unitSlug` (not `endorsed`), and it always sets `parentOrganization`.
  - Unit sites will show the group's page titles with their own `titleTemplate` (for example "… | Jai Shree Group | Shree Perforators") until Phase 1 copy replaces the page metadata.
  - `src/lib/email.ts` and `/api/contact`, `/api/quote` still use `COMPANY` (website, email, WhatsApp). That is lead and email work for 0.7.
  - The sitemap and robots handlers send `Content-Type` and `Cache-Control` copied from Next's metadata route. I compared content-type and body, not the full response headers.

### 2026-10-11 — 0.5 Route move (done by Claude, not Cursor)

- **Status:** ✅ done
- **What I did:** (Claude Code. The Cursor CLI run was refused by Claude Code's auto-mode permission check, so Claude did this task directly.)
  - Moved every public page into `src/app/[site]/`. Pages with the site chrome sit in the route group `[site]/(chrome)/`; `landing/` and `brochure/` sit beside it and keep drawing their own chrome. Fixed the brochure font paths (one folder deeper).
  - `[site]/layout.tsx`: validates the key with `findSite` (unknown or not-yet-built site → 404), writes the theme variables on `:root` from `config.theme` (`src/sites/theme-vars.ts`, including the shadcn aliases), `generateStaticParams` = configured sites (group only), so pages stay static. ISR settings unchanged.
  - `SiteChrome` is now a server component used by `(chrome)/layout.tsx` and `[site]/not-found.tsx`. 404/error/loading views moved to `src/components/status/` and are used by both the root and `[site]` route files.
  - Unmatched paths go to `[site]/[...rest]` (calls `notFound()`), outside every `loading.tsx`, so they keep a real 404 status with the chrome. Root `loading.tsx` removed (it streamed a 200 for every 404); loading screens kept in `(chrome)`, `landing`, `brochure` and `admin`.
  - `src/proxy.ts`: admin gate unchanged (now runs for `/admin` and `/admin/*`); `/api/*` gets an `x-site` request header; every other path is rewritten to `/<key><path>`. Host → key from `domains.ts`; `<key>.localhost` locally; other hosts → `group` unless `?site=<key>` (cookie `site`; never on production domains). Matcher skips `_next`, `sitemap.xml`, `robots.txt` and any path ending in a file extension. New `src/sites/keys.ts` (no config imports) for the proxy; `findSite` in `src/sites/index.ts`.
  - `PageViewTracker` reads `window.location.pathname`, so page views store the visible URL, not `/group/...`.
  - Root layout: `<html>`, `<body>`, fonts, metadata and `GlobalSchema` unchanged; only the chrome left it.
- **Files changed:** `src/app/[site]/**` (moved pages + new layouts, not-found, catch-all, loading/error files), `src/app/layout.tsx`, `src/app/not-found.tsx`, `src/app/error.tsx`, `src/app/admin/loading.tsx`, `src/proxy.ts`, `src/sites/index.ts`, `src/sites/keys.ts`, `src/sites/theme-vars.ts`, `src/components/layout/SiteChrome.tsx`, `src/components/status/*`, `src/components/shared/PageViewTracker.tsx`, `docs/06-codebase-map.md`, `docs/decisions.md`, `docs/05-build-plan.md`, `PROJECT-LOG.md`, `CURSOR-LOG.md`, `.gitignore` (user's line for `.claude/settings.local.json`)
- **Checks:** lint ✅ unchanged (18 problems: 12 old errors, 6 warnings) · build ✅ · production server on 3100: `/`, `/contact`, `/products/perforated-sheets`, `/industries/automobile`, `/pune/perforated-sheet-manufacturers`, `/blog/expanded-metal-vs-perforated-sheet`, `/brochure`, `/brochure/icons`, `/landing`, `/group` → 200; `/does-not-exist`, `/this-page-does-not-exist`, `/group/about`, `/shree-perforators`, `/pune` → 404 with chrome; `/products/nope` → 200 soft 404 (same as live today); `/products/wire-mesh` → 308 `/products`; logged-out `/admin/dashboard` → 307 `/admin/login`; `/api/health` 200; `shree-perforators.localhost` → 404; `?site=` cookie works on localhost and is ignored on `www.jaishreegroup.com`. Sitemap identical except build-time `lastmod`; robots identical. Title/meta/canonical/hreflang tags of all 40 baseline pages identical. Pixel check of 7 pages × 2 widths: 0.00–0.14% (animated hero, landing, brochure flame) and 0.52% on mobile `/products/perforated-sheets` (rotating 3D sheet only); no height changes. Browser: client navigation home → contact works, no console errors, page views stored as `/` and `/contact` in jai-shree-dev.
- **Commit:** "0.5 Move public pages under [site] and route by host" (this entry is part of that commit)
- **Left to do in this task:** nothing
- **Next task:** 0.6 Per-site SEO
- **Questions / assumptions:** `next.config.ts` redirects (`/products/welded-mesh` → `/products` and the others) apply on every host; Shree Weld Mesh will need a host condition on them before its site goes live (Phase 3). `color-scheme` is not set per theme yet (would change form-control rendering on the group site); add it for the light sites.

### 2026-10-11 — 0.4 Theme tokens

- **Status:** ✅ done
- **What I did:**
  - Added the theme CSS variables and `@theme inline` mapping. Defaults are today's group colours.
  - Replaced hard-coded colours with tokens, one folder per commit. Orange fills use `brand`, orange words and icons use `brand-text`, white text on an orange fill uses `brand-foreground`. `rgba(232,82,26,x)` became `color-mix` or a Tailwind opacity modifier.
  - `ProductViewer3D`, `DimpleSheet3D` and `MagneticHexBackground` read `--brand` at runtime.
  - Left brochure, admin, WhatsApp green (`#25D366`) and the logo flame (`#E84512`) alone.
  - Moved the brand hex defaults into `src/sites/theme.css` so the acceptance grep stays clean. Email and `DESIGN_TOKENS` take the colour from `group.theme`.
- **Files changed:** `src/app/globals.css`, `src/sites/theme.css`, public component folders, public `src/app` pages, `src/lib/email.ts`, `src/lib/constants.ts`, `docs/05-build-plan.md`, `docs/06-codebase-map.md`, `docs/decisions.md`, `PROJECT-LOG.md`, `CURSOR-LOG.md`
- **Checks:** lint not run (this task asked for build, not lint) · build ✅ after every folder · screenshots: quick check only, no full compare. Production build on port 3000. `/` still shows the locked hero (white PERFORATED SHEET / MANUFACTURERS, orange SINCE 1970, orange hex grid, orange quote buttons with white text). `/contact` still shows orange phone and mail icons, the white WhatsApp line, and an orange Send Enquiry button. `/products/perforated-sheets` still shows the orange breadcrumb and orange quote button; the 3D canvas is present (850×440) and the FAQ opens. Computed `--brand` is `#e8521a`, quote and submit buttons are `rgb(232, 82, 26)` with white text, WhatsApp buttons are `rgb(37, 211, 102)`. Grep `#e8521a|#ff6b35` matches only `src/sites/`, brochure and admin.
- **Commit:** folder commits, then this log commit. "0.4 Theme tokens: globals.css"; "0.4 Theme tokens: components/layout"; "0.4 Theme tokens: components/shared"; "0.4 Theme tokens: components/home"; "0.4 Theme tokens: components/products"; "0.4 Theme tokens: components/industries"; "0.4 Theme tokens: components/calculator"; "0.4 Theme tokens: components/quote"; "0.4 Theme tokens: components/contact"; "0.4 Theme tokens: components/gallery"; "0.4 Theme tokens: components/group"; "0.4 Theme tokens: components/about"; "0.4 Theme tokens: components/clients"; "0.4 Theme tokens: components/certifications"; "0.4 Theme tokens: components/blog"; "0.4 Theme tokens: components/location"; "0.4 Theme tokens: components/landing"; "0.4 Theme tokens: src/app"; "0.4 Theme tokens: src/lib". The landing commit was made after `src/lib` (it had been left uncommitted); the list above is the folder order. This entry is part of the final "0.4" log commit — no hash needed.
- **Left to do in this task:** nothing
- **Next task:** 0.5 Route move
- **Questions / assumptions:** The logo flame stays `#E84512` so the client's artwork does not shift to `#FF6B35`. The hex-grid background image still has the orange baked into the SVG data URI (`%23E8521A`); CSS variables do not apply inside that image, and the grep does not match the encoded form. A one-off colour script was used and not committed.

### 2026-10-11 — 0.3 Site config

- **Status:** ✅ done
- **What I did:**
  - Added `src/sites/types.ts` (`SiteKey`, `ProductSlug`, `ThemeTokens`, `SiteConfig`, plus `FontKey`, `HomeSectionKey`, `ToolKey`).
  - Added `src/sites/domains.ts`, a plain object with no imports: `jaishreegroup.com` and `www.jaishreegroup.com` → `group`, and apex plus `www` for shreeperforators.com, metalperforatedsheets.com, metalperforation.co.in, jaishreefiltration.com, weldedmeshindia.com. Skipped Jai Shree Industries ("New domain").
  - Added `src/sites/group.ts` with today's `COMPANY`, `NAV_LINKS`, `FOOTER` and `SEO`, theme hex from `globals.css`, and `origin` = `NEXT_PUBLIC_SITE_URL` if set, otherwise `https://www.jaishreegroup.com`.
  - Added `src/sites/index.ts`: `getSite`, `ALL_SITES` (group only), `isSiteKey`.
  - `src/lib/constants.ts` re-exports those values. No component or page edits. No unit-site config files.
- **Files changed:** `src/sites/types.ts`, `src/sites/domains.ts`, `src/sites/group.ts`, `src/sites/index.ts`, `src/lib/constants.ts`, `docs/06-codebase-map.md`, `.gitignore`, `docs/05-build-plan.md`, `PROJECT-LOG.md`, `CURSOR-LOG.md`
- **Checks:** lint ❌ exit 1 — no problems in the files above. 12 existing errors in untouched components, plus 8 `no-require-imports` errors in `scripts/baseline/*.js` from task 0.1 · build ✅ · screenshots: production capture on port 3000 into `docs/research/after-0.3` (git-ignored), compared with `scripts/baseline/compare.js`. 80 shots, no height changes. 47/80 are 0.00%. The rest are 0.01–0.16% and the diff images show only the areas the guide calls out (home hero carousel, landing motion, map tiles) plus 3D/canvas viewers (product pages, gallery dimple sheet), the brochure flame, and a few single-pixel specks. Largest: desktop `pune/expanded-metal-manufacturers` 0.16% (map). Capture statuses 200/304, deliberate 404 on the missing page. Brochure pages also logged a resource 404; the brochure diff is the flame only, so the missing asset was already missing in the baseline picture.
- **Commit:** "0.3 Add the group site config and re-export it from constants" (this entry is part of that commit — no hash needed)
- **Left to do in this task:** nothing
- **Next task:** 0.4 Theme tokens
- **Questions / assumptions:** Group `weeklyHoliday` is Thursday because the company address is the Talawade plant (the contact page lists both Thursday and Sunday). `hours` is the contact page line "9:00 AM – 6:00 PM". `titleTemplate` is `"%s"` because the root layout has no title template. `tool` is `open-area-calculator`. `leadEmail` is `shreeperforator@gmail.com` (the API's fallback today). `brandText` is the same hex as `brand`. Domain map includes `www` as well as apex, per the routing section. `getSite` throws for the six unit keys until those configs exist.

### 2026-10-11 — 0.2 Proxy rename

- **Status:** ✅ done
- **What I did:**
  - Renamed `src/middleware.ts` to `src/proxy.ts` and the exported function from `middleware` to `proxy`, following the Next.js 16 proxy file convention. The admin gate logic and the `/admin/:path*` matcher are unchanged.
- **Files changed:** `src/proxy.ts` (renamed from `src/middleware.ts`)
- **Checks:** lint ❌ exit 1, but only the 12 existing errors (plus 6 warnings) in untouched files; nothing in `src/proxy.ts` · build ✅ · screenshots match baseline n.a. · other: logged out, `HEAD http://127.0.0.1:3000/admin/dashboard` returned 307 `location: /admin/login`; `/admin/login` returned 200. The dev log for the login request shows `proxy.ts` running.
- **Commit:** `85f9286` "0.2 Rename middleware.ts to proxy.ts for Next.js 16"
- **Left to do in this task:** nothing
- **Next task:** 0.1 Baseline screenshots are still open (another session). After that, 0.3 Site config.
- **Questions / assumptions:** `docs/06-codebase-map.md` still says the admin gate lives in `src/middleware.ts`. Left it, because this task said to change nothing else. `PROJECT-LOG.md` and `docs/05-build-plan.md` already had uncommitted "no fixed dates" edits; those are not in `85f9286`.


