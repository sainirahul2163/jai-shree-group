# 06 — Codebase map (as of 2026-10-05, commit d379076)

How the app is built **today**, before Phase 0. Update this file when Phase 0 changes the structure. For component props and the full database schema, see `archive/PROJECT_DOCUMENTATION.md` (accurate for most details, but written in June 2026 — check the code before relying on it).

## Stack

Next.js 16.2.7 (App Router) · React 19.2.4 · TypeScript · Tailwind CSS v4 + shadcn/ui (Radix) · framer-motion, GSAP · three.js · react-hook-form + zod · Supabase (database, auth, storage) · Resend (email) · Leaflet (maps) · Vercel (hosting, auto-deploy from `main`).

## Routes

Public:

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

Admin (protected by `src/middleware.ts` + `ADMIN_EMAILS` allow-list): `/admin/login`, `/admin/dashboard`, `/admin/leads`, `/admin/leads/[id]`, `/admin/blog`, `/admin/blog/new`, `/admin/blog/[id]`, `/admin/gallery`, `/admin/testimonials`, `/admin/settings`.

API: `/api/quote`, `/api/contact` (save lead + Resend email), `/api/track` (page views), `/api/health`.

Also: `src/app/sitemap.ts`, `src/app/robots.ts`, `layout.tsx` (fonts, static metadata, `GlobalSchema`, `SiteChrome`), `error.tsx`, `loading.tsx`, `not-found.tsx`.

## Where things live

| Path | What |
| --- | --- |
| `src/lib/constants.ts` | `SITE_URL`, `COMPANY`, `BRANCHES` (6 units), `PRODUCTS`, `MATERIALS`, `INDUSTRIES`, `NAV_LINKS`, `FOOTER`, `SEO`, `HOME_SECTIONS`, `DESIGN_TOKENS`, `GALLERY_CATEGORIES` — imported by 44 files |
| `src/data/` | `products.ts`, `industries.ts`, `locations.ts`, `blog-posts.ts`, `about.ts`, `landing.ts`, `branches.ts` (products per unit — **out of date**; correct list in `docs/client/answers-2026-10-07.md`), `brochure.ts`, `calculator-faqs.ts` |
| `src/components/<feature>/` | One folder per page area: home (11), landing (14), products (6), admin (11), brochure (7), shared (6), layout (4), seo (4), ui (12 shadcn), and one each for about, calculator, quote, contact, gallery, group, industries, location, clients, certifications, blog |
| `src/components/layout/SiteChrome.tsx` | Shows Navbar/Footer/WhatsApp/tracker except on `/admin`, `/landing`, `/brochure` |
| `src/lib/supabase/` | Clients (server, browser, anon, route), queries, server actions, `schema.sql`, `migrations/` |
| `src/lib/email.ts` | Resend HTML templates (orange header hard-coded) |
| `src/lib/admin.ts` | `ADMIN_EMAILS` allow-list check |
| `src/app/globals.css` | Tailwind v4 theme — fixed hex values today |
| `public/` | Only files the code uses (cleaned 2026-10-10): product images (`products/<slug>.webp`, loaded by slug), 3 gallery photos, `og-image.jpg`, the brochure PDF and its images (`brochure/img/`), brochure fonts (`fonts/canva/`). The logo is **not** a file: it is the client's official artwork drawn inline in `components/layout/Logo.tsx`; browser icons are `src/app/icon.svg`, `icon.png`, `apple-icon.png` |
| `scripts/` | Blog seeding, gallery image restyle pipeline (Python) |

## Hard-coded hotspots (what Phase 0 must change)

- **Colours:** about 1,400 hex values in `src/`, with `#E8521A` alone appearing 348 times. Brand orange appears in 63 files; most are in `components/landing` (12 files), `components/home` (10), `components/admin` (7) and `components/products` (6). Mapping to tokens: `04-architecture.md` → Theming.
- **Brand name:** "Jai Shree" appears in 62 files (copy, metadata, schema, emails).
- **Static metadata:** `src/app/layout.tsx` and each page export fixed `metadata` objects with the group's titles and keywords.
- **Origin:** `SITE_URL` defaults to `https://www.jaishreegroup.com`, which the client confirmed is correct (older docs saying `.in` are wrong). Move it into the `group` site config.
- **Proxy:** `src/middleware.ts` uses the deprecated name.
- **3D and canvas:** `ProductViewer3D`, `DimpleSheet3D`, `MagneticHexBackground` set colours in JavaScript.

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
