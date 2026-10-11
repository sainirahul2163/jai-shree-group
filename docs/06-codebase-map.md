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
| `/privacy`, `/terms` | Privacy policy (DPDP Act 2023) and terms of use (task 0.8). One template each in `src/components/legal/` filled from the site config (name, "a Jai Shree Group company" when `endorsed`, address, email, phone, origin; courts' city from `config.jurisdiction`, default Pune). Wording is an agency template awaiting legal review. Linked from the footer's bottom bar and from the note under every lead form's submit button (`FormPrivacyNote`). Sitemap priority 0.3, `yearly` |

Admin (protected by `src/proxy.ts` — renamed from `middleware.ts` in task 0.2 — + `ADMIN_EMAILS` allow-list): `/admin/login`, `/admin/dashboard`, `/admin/leads`, `/admin/leads/[id]`, `/admin/blog`, `/admin/blog/new`, `/admin/blog/[id]`, `/admin/gallery`, `/admin/testimonials`, `/admin/settings`.

API: `/api/quote`, `/api/contact` (save lead + Resend email), `/api/track` (page views), `/api/health`. Since task 0.7 the first three take the site from the `x-site` header (`siteFromRequest` in `src/lib/site-from-request.ts`; unknown or unconfigured key → 400; any `site` in the body is ignored) and save `site` on every row. Lead APIs return `reference` (first 8 characters of the lead id, upper case), shown in the success state of the contact form and the quote wizard. They log only lead ids and errors.

Leads and email (task 0.7, `src/lib/leads.ts`): notification to `LEAD_EMAIL_OVERRIDE` if set (every site), else for `group` `CONTACT_EMAIL` → `RESEND_TO` → `config.leadEmail`, else `config.leadEmail`. With `RESEND_API_KEY` set, the customer also gets a confirmation from `RESEND_FROM` (reference, what they asked for, the site's phone, WhatsApp, email and weekly holiday). Email failures are logged and never fail the request; without the key nothing is sent.

Data per site (task 0.7): `leads`, `blog_posts`, `gallery_items`, `testimonials` and `page_views` have `site` (default `'group'`, check on the 7 keys); blog slugs are unique per `(site, slug)`. Migration: `src/lib/supabase/migrations/2026-10-11-multi-site.sql`; fresh installs: `schema.sql`. Public reads in `src/lib/supabase/queries.ts` (gallery, blog list, post by slug, blog slugs, testimonials) take the site key and filter on `site`. The seed posts in `src/data/blog-posts.ts` are group-only (blog list fallback, post fallback, `generateStaticParams`, sitemap).

Admin site filter (task 0.7): leads, blog, gallery and testimonials lists take `?site=<key>` (no value = all sites) via `SiteFilter` (`components/admin/SiteFilter.tsx`, which also exports `SiteSelect` for create forms); rows show a `SiteBadge`. Creating a blog post, gallery photo or testimonial picks the site (default `group`). Dashboard counts are totals across all sites. Readable names for all 7 keys: `src/sites/names.ts`.

Route tree (task 0.5):

| Path | What |
| --- | --- |
| `src/app/layout.tsx` | `<html>`, `<body>`, Geist fonts, CSS. No metadata, no brand values, no chrome |
| `src/app/[site]/layout.tsx` | Checks the site key (`siteFromParams`; unknown or not-yet-built → 404), `generateMetadata` = site-wide metadata from the config (`siteMetadata` in `src/lib/seo.ts`: title, description, keywords, metadataBase = `config.origin`, Open Graph, Twitter, hreflang, robots, group-only verification env vars), `GlobalSchema`, the site's theme variables on `:root` (`src/sites/theme-vars.ts`), `generateStaticParams` = configured sites (task 0.6) |
| `src/app/[site]/(chrome)/` | Route group with `SiteChrome` (Navbar, main, Footer, WhatsApp, tracker): home, about, group, products, industries, calculator, gallery, clients, certifications, contact, get-quote, blog, pune/*, mumbai/*, privacy, terms; plus `error.tsx`, `loading.tsx`, `not-found.tsx` for those pages |
| `src/app/[site]/landing/`, `src/app/[site]/brochure/` | Outside `(chrome)`: no Navbar/Footer, as before |
| `src/app/[site]/[...rest]/page.tsx` + `[site]/not-found.tsx` | Unmatched paths: real 404 status with the chrome (kept outside every `loading.tsx`, which would stream a 200) |
| `src/app/not-found.tsx`, `error.tsx` | Root fallbacks (admin, unknown site); `admin/loading.tsx` keeps the admin loading screen |
| `src/app/admin/layout.tsx` | Admin metadata: `robots: noindex, nofollow` (task 0.6) |
| `src/app/[site]/site-sitemap/route.ts`, `src/app/[site]/site-robots/route.ts` (renamed from `sitemap.xml/`, `robots.txt/` on 2026-10-11 — those names broke Vercel builds) | Per-site sitemap and robots, prerendered per configured site (task 0.6). Sitemap: `config.pages` (in that order; city prefixes and `/brochure` left out), then `config.products` and `config.industries` that have detail pages, location pages for enabled cities, blog posts if `/blog` is enabled; all at `config.origin`. On `VERCEL_ENV=preview` robots disallows everything |
| `src/proxy.ts` | Admin gate (unchanged) on `/admin*`; `x-site` header on `/api*`; host → site rewrite for every other path, including `/sitemap.xml` and `/robots.txt` (→ `/<key>/sitemap.xml`, `/<key>/robots.txt`). Not run for `_next` or any other path ending in a file extension (icons, `public/`) |

Host → site: production hosts from `src/sites/domains.ts`; `<key>.localhost` locally; any other host (plain localhost, Vercel previews) is `group` unless `?site=<key>` chose one (kept in a `site` cookie; ignored on production domains). A first path segment the site does not list in `config.pages`, or a `/products/<slug>` or `/industries/<slug>` the site does not list (task 1.2), is rewritten to `/<key>/__no-page/…`, which lands on `[site]/[...rest]` (real 404). `/` is always allowed. A path that already starts with a site key (`/group/about`, `/group/sitemap.xml`) 404s.

SEO (task 0.6): pages and JSON-LD build absolute URLs from the active site's `origin` (`siteUrl` in `src/lib/seo.ts`; the site comes from the `site` route param via `siteFromParams` in `src/sites/params.ts`). `components/seo/*` take a `site` prop: `GlobalSchema` (group: the group business; unit sites: the unit's own `LocalBusiness` with `parentOrganization` = Jai Shree Group, chosen by `config.unitSlug`), `BreadcrumbSchema`, `ContactPageSchema`, `BlogPostingSchema`. Structured-data facts not held elsewhere (schema type, address parts, geo, sameAs, certification) live in `config.seo.schema`. On `VERCEL_ENV=preview` every page gets `robots: noindex, nofollow`.

## Where things live

| Path | What |
| --- | --- |
| `src/sites/` | Site config (task 0.3): `types.ts`, `domains.ts` (host → key, no imports), `keys.ts` (`SITE_KEYS`, `isSiteKey`; used by the proxy), `group.ts` (group values), `index.ts` (`getSite`, `findSite`, `ALL_SITES`, `isSiteKey`; also loaded by the proxy for `config.pages`), `params.ts` (`siteFromParams`, `SiteParams`), `theme-vars.ts` (theme → `:root` CSS), `names.ts` (`SITE_NAMES` and `SITE_OPTIONS` for all 7 keys, `siteName`, `parseSiteFilter`; used by the admin panel), `SiteProvider.tsx` (task 1.1: client context fed by `[site]/layout.tsx`; `useSite()` = the active `SiteConfig`, `useSiteProducts()` = its product cards; the admin layout provides the group), `catalog.ts` (a site's products and industries: shared facts from `src/data/` + the site's copy overrides, limited to `site.products` / `site.industries`; `siteProductDetail`, `siteProductCards`, `siteRelatedProducts`, `siteIndustryDetail`, `siteIndustryCards`, `siteIndustryProducts`), `content/` (task 1.1: long-form copy per site, `getContent(key)`; `content/types.ts` = `SiteContent`; `content/group.ts` = today's group copy). Unit sites: `shree-perforators.ts` (task 1.2; content in `content/shree-perforators.ts`); the other five are not created yet. `params.ts` also has `siteForPage(params, path)` (404 when the site does not list the page; used by every page) |
| `src/lib/seo.ts` | `siteMetadata` (site-wide metadata), `pageMetadata` (absolute title, description, canonical, Open Graph and Twitter for a page; used by `/privacy` and `/terms`), `siteUrl` (absolute URL on the site's origin), `siteHost`, `isPreview` |
| `src/components/legal/` | `LegalDocument` (hero, last-updated line, `LegalSection`, `BusinessContact`, `businessName`), `PrivacyPolicy`, `TermsOfUse` (task 0.8) |
| `src/components/seo/` | JSON-LD components (all take `site`); `schema-parts.ts` holds the shared address, geo and phone parts |
| `src/lib/constants.ts` | Re-exports `SITE_URL`, `COMPANY`, `NAV_LINKS`, `FOOTER`, `SEO`, `BROCHURE_URL` from `src/sites/group.ts`; `PRODUCTS` is derived from `src/data/products.ts` (`PRODUCT_CARDS`). Still defines `BRANCHES`, `MATERIALS`, `INDUSTRIES`, `HOME_SECTIONS`, `COMPANY_VIDEO`, `DESIGN_TOKENS`, `GALLERY_CATEGORIES`. Since task 1.1 public components read the site instead; only group-only code (Our Group page, home Group section, certifications, clients, city pages, landing, brochure, admin) and `content/group.ts` import the group constants |
| `src/lib/open-area.ts` | The 10 open-area formulas and helpers (`OPEN_AREA_FORMULAS`, `HOLE_SHAPES`, `getAvailableArrangements`, `getCalculatorId`, `getInputWarnings`), moved out of `OpenAreaCalculator` in task 1.1 for the pattern library |
| `src/data/` | `products.ts`, `industries.ts`, `locations.ts`, `blog-posts.ts`, `about.ts`, `landing.ts`, `branches.ts` (products per unit — **out of date**; correct list in `docs/client/answers-2026-10-07.md`), `brochure.ts`, `calculator-faqs.ts` |
| `src/components/<feature>/` | One folder per page area: home (11), landing (14), products (6), admin (11), brochure (7), shared (7), layout (4), seo (4), legal (3), ui (12 shadcn), and one each for about, calculator, quote, contact, gallery, group, industries, location, clients, certifications, blog |
| `src/components/layout/SiteChrome.tsx` | Navbar, main, Footer, WhatsApp button, page tracker (server component; used by `[site]/(chrome)/layout.tsx` and `[site]/not-found.tsx`). Navbar, Footer (client since 1.1), Logo and WhatsApp read `useSite()`: nav order from `site.nav` (the `/products` entry opens the products menu), catalogue buttons only with `site.brochureUrl`, logo `kind` `jai-shree` (group artwork) or `flame-and-name` (unit fallback), footer block from `site.footer`, "A Jai Shree Group company" line when `endorsed` |
| Export page (task 1.2) | `[site]/(chrome)/export/` + `components/export/ExportPage.tsx`, copy from `content.export`; only sites with `/export` in `pages` (manufacturing units) |
| Home and pages (task 1.1) | `[site]/(chrome)/page.tsx` renders `site.home` in order through a section map; each section takes its copy from `getContent(site.key).home`. About, products index, industries index, contact and get-quote pages pass their content block; page metadata comes from `content.meta.*` through `contentMetadata` (`src/lib/seo.ts`). `products/[slug]` and `industries/[slug]` prerender only the site's own slugs |
| `src/components/status/` | 404, error and loading views shared by the root and `[site]` route files |
| `src/lib/supabase/` | Clients (server, browser, anon, route), queries, server actions, `schema.sql`, `migrations/` |
| `src/lib/email.ts` | Resend HTML templates; every template takes the active `SiteConfig` (header colours `theme.brand` / `theme.brandForeground`, name, footer origin, phone, email) and escapes every value. Lead notifications (`buildContactEmailHtml`, `buildQuoteEmailHtml`) show the site key and the page; `buildCustomerReplyEmail` is the customer confirmation. Also `whatsappUrl` (used by client components, so no env reads here) |
| `src/lib/leads.ts` | Server-only lead helpers: `leadEmailRecipient`, `leadReference`, `sendLeadEmails` (notification + auto-reply, never throws), `serviceUnavailableResponse` (503 with the site's WhatsApp and phone) |
| `src/lib/site-from-request.ts` | `siteFromRequest` (the `x-site` header → `SiteConfig`) and `unknownSiteResponse` (400) for API routes |
| `src/lib/admin.ts` | `ADMIN_EMAILS` allow-list check |
| `src/app/globals.css` | Tailwind v4 theme. Token classes point at CSS variables. Group brand defaults are in `src/sites/theme.css` |
| `public/` | Only files the code uses (cleaned 2026-10-10): product images (`products/<slug>.webp`, loaded by slug), 3 gallery photos, `og-image.jpg`, the brochure PDF and its images (`brochure/img/`), brochure fonts (`fonts/canva/`). The logo is **not** a file: it is the client's official artwork drawn inline in `components/layout/Logo.tsx`; browser icons are `src/app/icon.svg`, `icon.png`, `apple-icon.png` |
| `scripts/` | Blog seeding, gallery image restyle pipeline (Python) |

## Hard-coded hotspots (what Phase 0 must change)

- **Colours:** public pages use theme tokens (`bg-brand`, `text-brand-text`, `var(--brand)`, and the rest of the table in `04-architecture.md` → Theming). `#E8521A` and `#FF6B35` remain only in `src/sites/` (the group defaults), `brochure/` and `admin/`. The logo flame in `Logo.tsx` stays `#E84512`. WhatsApp stays `#25D366`.
- **Brand name:** "Jai Shree" appears in 62 files (copy, metadata, schema, emails).
- **Static metadata:** site-wide metadata now comes from the config (task 0.6), but each page still exports the group's titles, descriptions and keywords as page copy (unit copy comes in Phase 1+).
- **Origin:** `group.origin` = `NEXT_PUBLIC_SITE_URL` or `https://www.jaishreegroup.com` (confirmed by the client; older docs saying `.in` are wrong). Pages, sitemap, robots and JSON-LD use the active site's `origin`. Since task 0.7, `src/lib/email.ts` and the lead APIs use the active site's config too.
- **Proxy:** renamed to `src/proxy.ts` (task 0.2, 2026-10-11).
- **3D and canvas:** `ProductViewer3D`, `DimpleSheet3D` and `MagneticHexBackground` read `--brand` at runtime with `getComputedStyle`.

## Known issues carried over

| Issue | Where |
| --- | --- |
| Discontinued products still offered in current copy (gallery, contact, quote meta; "Wire Mesh Plant" badge; landing marquee; a wire-mesh testimonial; `BRANCH_PRODUCTS`) | Being cleaned on `main` (2026-10-05); merge before Phase 0 |
| `paper-industry` and `agriculture` in `INDUSTRIES` with no detail pages | `constants.ts`, `data/industries.ts` |
| `/clients` not in nav or footer | `constants.ts` `NAV_LINKS` |
| Calculator results have no quote link | `components/calculator/` |
| ~~API routes log request bodies~~ — fixed in task 0.7: only lead ids and errors are logged | `app/api/*` |
| ~~Admin actions revalidated `/gallery`, `/blog`, `/clients` (visible URLs) after the 0.5 route move~~ Fixed 2026-10-11: they revalidate the route patterns `/[site]/(chrome)/gallery` etc. with `"page"`, which covers every site | `src/lib/supabase/actions.ts` |
| No privacy policy or terms pages | — |
| No Google Analytics (only the Supabase page-view tracker) | — |
| White-on-orange buttons are 3.7:1 contrast | Group theme (see `03-sites.md`) |
