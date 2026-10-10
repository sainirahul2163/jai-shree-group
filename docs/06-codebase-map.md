# 06 — Codebase map (as of 2026-10-05, commit d379076)

How the app is built **today**, before Phase 0. Update this file when Phase 0 changes the structure. For component props and the full database schema, see `archive/PROJECT_DOCUMENTATION.md` (accurate for most details, but written in June 2026 — check the code before relying on it).

## Stack

Next.js 16.2.7 (App Router) · React 19.2.4 · TypeScript · Tailwind CSS v4 + shadcn/ui (Radix) · framer-motion, GSAP · three.js · react-hook-form + zod · Supabase (database, auth, storage) · Resend (email) · Leaflet (maps) · Vercel (hosting, auto-deploy from `main`).

## Routes

Public (since task 0.5 every public page lives under `src/app/[site]/`; the proxy rewrites `host + /path` to `/<site-key>/path`, so visitors see the same URLs as before):

| Route | Notes |
| --- | --- |
| `/` | Home: Hero, TrustBar, Video, Products, About, Industries, Process, Group, CTA |
| `/about`, `/group`, `/certifications`, `/clients` | Company pages |
| `/products`, `/products/[slug]` | 6 products from `src/data/products.ts`; 3D viewer, quote form |
| `/industries`, `/industries/[slug]` | 8 detail pages from `src/data/industries.ts` |
| `/calculator` | Open-area calculator, 10 formulas |
| `/gallery` | Supabase `gallery_items`, lightbox |
| `/contact`, `/get-quote` | Contact form; 3-step quote wizard with smart product rules |
| `/blog`, `/blog/[slug]` | Seed posts in `src/data/blog-posts.ts` + Supabase `blog_posts` |
| `/pune/*`, `/mumbai/*` | 6 city × product SEO pages from `src/data/locations.ts` |
| `/landing` | Alternative marketing page, noindex, own chrome |
| `/brochure`, `/brochure/icons` | Printable brochure (A4 pages), own chrome; `icons` is a comparison variant |

Admin (protected by `src/proxy.ts` — renamed from `middleware.ts` in task 0.2 — + `ADMIN_EMAILS` allow-list): `/admin/login`, `/admin/dashboard`, `/admin/leads`, `/admin/leads/[id]`, `/admin/blog`, `/admin/blog/new`, `/admin/blog/[id]`, `/admin/gallery`, `/admin/testimonials`, `/admin/settings`.

API: `/api/quote`, `/api/contact` (save lead + Resend email), `/api/track` (page views), `/api/health`.

Route tree (task 0.5):

| Path | What |
| --- | --- |
| `src/app/layout.tsx` | `<html>`, `<body>`, Geist fonts, CSS. No metadata, no brand values, no chrome |
| `src/app/[site]/layout.tsx` | Checks the site key (`siteFromParams`; unknown or not-yet-built → 404), `generateMetadata` = site-wide metadata from the config (`siteMetadata` in `src/lib/seo.ts`: title, description, keywords, metadataBase = `config.origin`, Open Graph, Twitter, hreflang, robots, group-only verification env vars), `GlobalSchema`, the site's theme variables on `:root` (`src/sites/theme-vars.ts`), `generateStaticParams` = configured sites (task 0.6) |
| `src/app/[site]/(chrome)/` | Route group with `SiteChrome` (Navbar, main, Footer, WhatsApp, tracker): home, about, group, products, industries, calculator, gallery, clients, certifications, contact, get-quote, blog, pune/*, mumbai/*; plus `error.tsx`, `loading.tsx`, `not-found.tsx` for those pages |
| `src/app/[site]/landing/`, `src/app/[site]/brochure/` | Outside `(chrome)`: no Navbar/Footer, as before |
| `src/app/[site]/[...rest]/page.tsx` + `[site]/not-found.tsx` | Unmatched paths: real 404 status with the chrome (kept outside every `loading.tsx`, which would stream a 200) |
| `src/app/not-found.tsx`, `error.tsx` | Root fallbacks (admin, unknown site); `admin/loading.tsx` keeps the admin loading screen |
| `src/app/admin/layout.tsx` | Admin metadata: `robots: noindex, nofollow` (task 0.6) |
| `src/app/[site]/sitemap.xml/route.ts`, `src/app/[site]/robots.txt/route.ts` | Per-site sitemap and robots, prerendered per configured site (task 0.6). Sitemap: `config.pages` (in that order; city prefixes and `/brochure` left out), then `config.products` and `config.industries` that have detail pages, location pages for enabled cities, blog posts if `/blog` is enabled; all at `config.origin`. On `VERCEL_ENV=preview` robots disallows everything |
| `src/proxy.ts` | Admin gate (unchanged) on `/admin*`; `x-site` header on `/api*`; host → site rewrite for every other path, including `/sitemap.xml` and `/robots.txt` (→ `/<key>/sitemap.xml`, `/<key>/robots.txt`). Not run for `_next` or any other path ending in a file extension (icons, `public/`) |

Host → site: production hosts from `src/sites/domains.ts`; `<key>.localhost` locally; any other host (plain localhost, Vercel previews) is `group` unless `?site=<key>` chose one (kept in a `site` cookie; ignored on production domains). A first path segment the site does not list in `config.pages` is rewritten to `/<key>/__no-page/…`, which lands on `[site]/[...rest]` (real 404). `/` is always allowed. A path that already starts with a site key (`/group/about`, `/group/sitemap.xml`) 404s.

SEO (task 0.6): pages and JSON-LD build absolute URLs from the active site's `origin` (`siteUrl` in `src/lib/seo.ts`; the site comes from the `site` route param via `siteFromParams` in `src/sites/params.ts`). `components/seo/*` take a `site` prop: `GlobalSchema` (group: the group business; unit sites: the unit's own `LocalBusiness` with `parentOrganization` = Jai Shree Group, chosen by `config.unitSlug`), `BreadcrumbSchema`, `ContactPageSchema`, `BlogPostingSchema`. Structured-data facts not held elsewhere (schema type, address parts, geo, sameAs, certification) live in `config.seo.schema`. On `VERCEL_ENV=preview` every page gets `robots: noindex, nofollow`.

## Where things live

| Path | What |
| --- | --- |
| `src/sites/` | Site config (task 0.3): `types.ts`, `domains.ts` (host → key, no imports), `keys.ts` (`SITE_KEYS`, `isSiteKey`; used by the proxy), `group.ts` (group values), `index.ts` (`getSite`, `findSite`, `ALL_SITES`, `isSiteKey`; also loaded by the proxy for `config.pages`), `params.ts` (`siteFromParams`, `SiteParams`), `theme-vars.ts` (theme → `:root` CSS). Unit site files are not created yet |
| `src/lib/seo.ts` | `siteMetadata` (site-wide metadata), `siteUrl` (absolute URL on the site's origin), `isPreview` |
| `src/components/seo/` | JSON-LD components (all take `site`); `schema-parts.ts` holds the shared address, geo and phone parts |
| `src/lib/constants.ts` | Re-exports `SITE_URL`, `COMPANY`, `NAV_LINKS`, `FOOTER`, `SEO` from `src/sites/group.ts`. Still defines `BRANCHES`, `PRODUCTS`, `MATERIALS`, `INDUSTRIES`, `HOME_SECTIONS`, `DESIGN_TOKENS`, `GALLERY_CATEGORIES` |
| `src/data/` | `products.ts`, `industries.ts`, `locations.ts`, `blog-posts.ts`, `about.ts`, `landing.ts`, `branches.ts` (products per unit — **out of date**; correct list in `docs/client/answers-2026-10-07.md`), `brochure.ts`, `calculator-faqs.ts` |
| `src/components/<feature>/` | One folder per page area: home (11), landing (14), products (6), admin (11), brochure (7), shared (6), layout (4), seo (4), ui (12 shadcn), and one each for about, calculator, quote, contact, gallery, group, industries, location, clients, certifications, blog |
| `src/components/layout/SiteChrome.tsx` | Navbar, main, Footer, WhatsApp button, page tracker (server component; used by `[site]/(chrome)/layout.tsx` and `[site]/not-found.tsx`) |
| `src/components/status/` | 404, error and loading views shared by the root and `[site]` route files |
| `src/lib/supabase/` | Clients (server, browser, anon, route), queries, server actions, `schema.sql`, `migrations/` |
| `src/lib/email.ts` | Resend HTML templates; the orange header uses `group.theme.brand` |
| `src/lib/admin.ts` | `ADMIN_EMAILS` allow-list check |
| `src/app/globals.css` | Tailwind v4 theme. Token classes point at CSS variables. Group brand defaults are in `src/sites/theme.css` |
| `public/` | Only files the code uses (cleaned 2026-10-10): product images (`products/<slug>.webp`, loaded by slug), 3 gallery photos, `og-image.jpg`, the brochure PDF and its images (`brochure/img/`), brochure fonts (`fonts/canva/`). The logo is **not** a file: it is the client's official artwork drawn inline in `components/layout/Logo.tsx`; browser icons are `src/app/icon.svg`, `icon.png`, `apple-icon.png` |
| `scripts/` | Blog seeding, gallery image restyle pipeline (Python) |

## Hard-coded hotspots (what Phase 0 must change)

- **Colours:** public pages use theme tokens (`bg-brand`, `text-brand-text`, `var(--brand)`, and the rest of the table in `04-architecture.md` → Theming). `#E8521A` and `#FF6B35` remain only in `src/sites/` (the group defaults), `brochure/` and `admin/`. The logo flame in `Logo.tsx` stays `#E84512`. WhatsApp stays `#25D366`.
- **Brand name:** "Jai Shree" appears in 62 files (copy, metadata, schema, emails).
- **Static metadata:** site-wide metadata now comes from the config (task 0.6), but each page still exports the group's titles, descriptions and keywords as page copy (unit copy comes in Phase 1+).
- **Origin:** `group.origin` = `NEXT_PUBLIC_SITE_URL` or `https://www.jaishreegroup.com` (confirmed by the client; older docs saying `.in` are wrong). Pages, sitemap, robots and JSON-LD use the active site's `origin`. `src/lib/email.ts` and the lead APIs still use `COMPANY` (task 0.7).
- **Proxy:** renamed to `src/proxy.ts` (task 0.2, 2026-10-11).
- **3D and canvas:** `ProductViewer3D`, `DimpleSheet3D` and `MagneticHexBackground` read `--brand` at runtime with `getComputedStyle`.

## Known issues carried over

| Issue | Where |
| --- | --- |
| Discontinued products still offered in current copy (gallery, contact, quote meta; "Wire Mesh Plant" badge; landing marquee; a wire-mesh testimonial; `BRANCH_PRODUCTS`) | Being cleaned on `main` (2026-10-05); merge before Phase 0 |
| `paper-industry` and `agriculture` in `INDUSTRIES` with no detail pages | `constants.ts`, `data/industries.ts` |
| `/clients` not in nav or footer | `constants.ts` `NAV_LINKS` |
| Calculator results have no quote link | `components/calculator/` |
| API routes log request bodies (possible personal data in Vercel logs) | `app/api/*` |
| No privacy policy or terms pages | — |
| No Google Analytics (only the Supabase page-view tracker) | — |
| White-on-orange buttons are 3.7:1 contrast | Group theme (see `03-sites.md`) |
