# Jai Shree Group — SEO Audit Report

**Generated:** June 22, 2026  
**Audit scope:** Full codebase inspection (read-only). Domain `jaishreegroup.in` not yet live — findings based on source code, not live URL testing.  
**Actual stack:** Next.js **16.2.7** App Router (prompt referenced Next.js 14 — codebase is newer).

---

## Executive Summary

- **Google Search Console verification is still a placeholder** (`add-your-verification-code-here` in `src/app/layout.tsx`) — must be fixed before domain launch or all Search Console data will be blocked.
- **Home page H1 does not contain primary commercial keywords** (`PRECISION ENGINEERED IN METAL` instead of perforated sheet / manufacturer / Pune / Mumbai). This is the single highest-impact on-page SEO gap.
- **Brand entity "Shree Perforators" is nearly invisible** in crawlable body text — appears only on branch cards (`GroupSection`, `/group`, landing locations), not in hero, about narrative, or product copy. Client wants dual-brand ranking; current code optimizes "Jai Shree Group" only.
- **Wire-mesh location pages remain live and in sitemap** while the wire-mesh product was removed (308 redirect to `/products`). These pages have broken product CTAs, outdated content referencing Jaliwala Bhosari, and compete for keywords on a discontinued product line.
- **Blog posts render "Coming Soon" thin content** when Supabase `content` is empty — 4 seeded posts match informational/AEO keywords but provide no substantive answers for Google or AI answer engines.

---

## Score Dashboard

| Category | Score | Status |
|----------|-------|--------|
| Meta Tags | 6/10 | 🟡 |
| Schema Markup | 6/10 | 🟡 |
| Content Quality | 6/10 | 🟡 |
| Internal Linking | 5/10 | 🟡 |
| Technical SEO | 6/10 | 🟡 |
| Brand Visibility | 4/10 | 🔴 |
| Location SEO | 7/10 | 🟡 |
| AEO Readiness | 6/10 | 🟡 |

**Overall assessment:** Strong foundation (App Router SSG, per-page metadata, product FAQ schema, 7 location landing pages, open area calculator). Critical gaps in brand SEO, home H1, title length discipline, blog depth, wire-mesh inconsistency, and pre-launch verification.

---

## 1. Root Layout & Global SEO

**File inspected:** `src/app/layout.tsx`, `src/components/seo/GlobalSchema.tsx`

| Check | Status | Finding |
|-------|--------|---------|
| Root `<title>` | 🟡 Partial | `"Perforated Sheet Manufacturer \| Expanded Mesh Manufacturers \| Jai Shree Group \| ISO 9001:2015"` — **93 characters** (target ≤60). Keywords present but will truncate in SERPs. |
| `metaDescription` | 🟡 Partial | **197 characters** (target 140–160). Mentions Pune & Mumbai, CNC turret, quote CTA — good intent, too long. |
| `keywords` meta | ✅ Yes | 16 keywords including Pune, Mumbai, Jai Shree Group, perforated sheets. Note: Google largely ignores this tag; harmless. |
| Canonical | 🟡 Partial | Root sets `alternates.canonical: "/"` only. Child pages set their own via `generateMetadata` or static exports — generally correct. Uses `metadataBase: https://jaishreegroup.in`. |
| Open Graph | ✅ Yes | `og:type`, `og:locale` (`en_IN`), `og:url`, `og:siteName`, `og:title`, `og:description`, `og:image` (`/og-image.jpg` 1200×630). |
| Twitter card | ✅ Yes | `summary_large_image` with title + description. |
| hreflang | 🟡 Partial | `en`, `en-US`, `en-GB`, `en-AU` — all point to same URL. **`en-IN` missing** despite `og:locale: en_IN`. All hreflang URLs hardcoded to `https://jaishreegroup.in` (correct for production). |
| Google verification | 🔴 **CRITICAL** | `verification.google: "add-your-verification-code-here"` — placeholder, not real code. |
| Bing verification | 🔴 Missing | No `verification.other` or Bing meta tag. |
| Robots meta | ✅ Yes | `index: true`, `follow: true`. |
| Viewport meta | ✅ Auto | Next.js 16 injects viewport automatically (not explicit in layout — expected). |
| Charset | ✅ Auto | Next.js default UTF-8. |
| Font preloads | ✅ Yes | `Geist` + `Geist_Mono` via `next/font/google` — automatic preload + subset optimization. |
| GlobalSchema | ✅ Yes | `ManufacturingBusiness` JSON-LD rendered in `<body>` on every page. |

**Issues:**

- [CRITICAL] Replace Google Search Console verification placeholder before domain goes live.
- [HIGH] Shorten root title to ≤60 chars; move ISO/certification to description or on-page content.
- [MEDIUM] Add `en-IN` to hreflang alternates for India targeting consistency.
- [MEDIUM] Add Bing Webmaster Tools verification tag.
- [LOW] `GlobalSchema` uses `iso6523Code` for `"ISO 9001:2015"` — incorrect Schema.org property (iso6523Code is for business identifiers, not quality certs). Use `hasCertification` or on-page text instead.

---

## 2. Home Page

**Files inspected:** `src/app/page.tsx`, `src/components/home/*`, `src/components/layout/SiteChrome.tsx`

| Check | Status | Finding |
|-------|--------|---------|
| Page-specific metadata | 🔴 Missing | `page.tsx` exports no `metadata` — inherits root layout title/description only. No home-specific canonical override (inherits `/`). |
| H1 | 🔴 Fail | `"PRECISION ENGINEERED IN METAL"` — **no primary keyword** (perforated sheet, manufacturer, Pune, Mumbai). |
| H2/H3 hierarchy | ✅ Logical | H1 hero → H2 section headings (Products, About, Industries, Process, Group) → H3 cards/steps. |
| Hero keyword text | 🟡 Partial | Subtext: *"India's trusted manufacturer of perforated sheets, wire mesh & expanded metal"* — good keywords but **wire mesh is discontinued product**; mentions 50+ years, 8 units, Pan India — no Pune/Mumbai in hero. |
| "Shree Perforators" / "Jai Shree" in body | 🔴 Fail | Hero/body never says "Shree Perforators". "Jai Shree" only via `COMPANY` constants indirectly (ISO badge says group name context). About section paragraphs mention founder story but brand is "Jai Shree Group" narrative only. |
| Product names as text | ✅ Yes | All 6 products named in `ProductsSection` H3 + descriptions. |
| Intro paragraph above fold | 🟡 Partial | One paragraph under H1 — keyword-light, brand-light. |
| Image alt tags | 🟡 N/A | Home uses Lucide icons + CSS/SVG animations — **no `<img>` tags** on home sections. `VideoSection` has `alt="Factory tour video thumbnail"` when placeholder shown. |
| Internal links to 6 products | ✅ Yes | `ProductsSection` links all 6 slugs. |
| Internal links to location pages | 🔴 **None** | No links to `/pune/*` or `/mumbai/*` anywhere on home. |
| Links to /contact, /get-quote | ✅ Yes | Hero CTA → `/get-quote`; Industries banner → `/contact`; CtaSection → `/get-quote` + tel link. |
| PageViewTracker | ✅ Yes | Included via `SiteChrome` (excludes `/landing` and `/admin`). |
| Schema | 🟡 Partial | `GlobalSchema` (ManufacturingBusiness) site-wide. **No page-specific LocalBusiness on home.** |
| Thin content sections | 🟡 Yes | `TrustBar` — icon/stats only (4 metrics, ~8 words each). `ProcessSection` — 5 steps with 3–4 word descriptions each. Acceptable as supporting sections, not primary content. |

**Issues:**

- [CRITICAL] Rewrite H1 to include primary keyword, e.g. *"Perforated Sheet Manufacturers in Pune & Mumbai"* while keeping brand styling.
- [HIGH] Add home-specific `metadata` export with optimized title/description and explicit canonical.
- [HIGH] Add visible "Shree Perforators" and subsidiary brand mentions in hero or about snippet.
- [HIGH] Remove "wire mesh" from hero copy or clarify as legacy capability — conflicts with product removal strategy.
- [MEDIUM] Add footer or dedicated "Service Areas" block linking to 7 location SEO pages.
- [MEDIUM] Add `WebPage` or enhanced `LocalBusiness` schema on homepage with `areaServed: Pune, Mumbai`.

---

## 3. Products Index Page

**Files inspected:** `src/app/products/page.tsx`, `src/components/products/ProductsIndexPage.tsx`

| Check | Status | Finding |
|-------|--------|---------|
| Title | 🟡 Partial | `"Our Products \| Perforated Sheets, Expanded Metal & Custom Components \| Jai Shree Group"` — ~82 chars, keyword-rich. |
| metaDescription | ✅ Good | Mentions 6 active products, ISO cert — ~155 chars effective. |
| H1 | 🟡 Weak | `"Our Products"` via `PageHero` — generic, not keyword-targeted. |
| Product cards H2 | ✅ Yes | Each card uses `<h2>{product.name}</h2>`. |
| Visible descriptions | ✅ Yes | Full `product.description` paragraph on each card. |
| Internal links | ✅ Yes | All 6 product slugs linked. |
| BreadcrumbSchema | ✅ Yes | Home → Products. |

**Issues:**

- [MEDIUM] Change H1 to *"Metal Manufacturing Products — Perforated Sheets, Laser Cutting & More"* or similar keyword phrase.
- [LOW] Add introductory SEO paragraph (100–150 words) above product grid mentioning Pune, Mumbai, ISO.

---

## 4. Product Pages (6 pages)

**Files inspected:** `src/app/products/[slug]/page.tsx`, `src/data/products.ts`, `src/components/products/ProductPageClient.tsx`

### Summary Table

| Slug | Title Len | Desc Len | H1 | Pune/Mumbai in body | FAQ count | FAQ schema | Product schema | Est. words | Shree Perforators |
|------|-----------|----------|-----|---------------------|-----------|------------|----------------|------------|-------------------|
| perforated-sheets | 74 | 161 | Product name only | ✅ Overview + FAQ | 5 | ✅ | ✅ | ~650+ | ❌ |
| laser-cutting | 75 | 157 | Product name only | ✅ Overview + FAQ | 5 | ✅ | ✅ | ~600+ | ❌ |
| expanded-metal | 76 | 151 | Product name only | ❌ Overview (group only) | 5 | ✅ | ✅ | ~600+ | ❌ |
| turret-punching | 82 | 167 | Product name only | ✅ FAQ | 5 | ✅ | ✅ | ~550+ | ❌ |
| precision-sheet-leveling | 87 | 165 | Product name only | ✅ Overview + FAQ | 4 | ✅ | ✅ | ~500+ | ❌ |
| custom-components | 82 | 172 | Product name only | ✅ Overview (Pune implied) | 4 | ✅ | ✅ | ~550+ | ❌ |

### Per-Page Checks (all 6)

| Check | Status |
|-------|--------|
| metaTitle ≤60 chars | 🔴 **All exceed 60** (74–87 chars) |
| metaDescription 140–160 | 🟡 Most 151–172 chars |
| H1 = target keyword | 🔴 H1 is short product name only (e.g. "Perforated Sheets"), not "Perforated Sheet Manufacturer Pune" |
| H2 subtopics | ✅ Overview, Materials, Specifications, Strength, Applications, FAQ |
| FAQ section | ✅ All 6 pages — questions match search intent (thickness, materials, Pune/Mumbai, custom patterns) |
| FAQPage JSON-LD | ✅ Server-rendered in `page.tsx` |
| Product JSON-LD | 🟡 Present but minimal — no `image`, `offers`, `sku`, `aggregateRating` |
| BreadcrumbSchema | ✅ JSON-LD + microdata in `ProductPageClient` (duplicate but valid) |
| Related products | ✅ 3 internal links each |
| Quote form CTA | ✅ `ProductQuoteForm` sticky sidebar |
| Product images + alt | 🟡 Icon-only hero (Lucide SVG) — no product photos, no `next/image` |
| Brand "Shree Perforators" | 🔴 Not mentioned in any product copy — only "Jai Shree Group" |
| Word count 600+ | ✅ Substantial via overview + specs + strengths + applications + FAQs |

**Material-specific keyword gaps:**

- [MEDIUM] No dedicated on-page H2 sections for "MS Perforated Sheet", "SS Perforated Sheet", "GI Perforated Sheet", "Aluminum Perforated Sheet" — materials listed as tags only.
- [MEDIUM] Expanded metal overview doesn't mention Pune/Mumbai in first paragraph (unlike perforated sheets and laser cutting).

---

### /products/perforated-sheets

- [HIGH] H1 should include location + intent: *"Perforated Sheet Manufacturer — Pune & Mumbai"*
- [MEDIUM] Title 74 chars — trim to: *"Perforated Sheet Manufacturer Pune & Mumbai | Jai Shree"*
- [LOW] Add `PerforationPatterns` section is strong for engagement — add FAQ schema for pattern-specific questions

### /products/laser-cutting

- [MEDIUM] Strong Pune/Mumbai coverage in overview and FAQ — title/H1 still too generic
- [LOW] Mention fiber laser in H1 for long-tail match

### /products/expanded-metal

- [MEDIUM] Add Pune/Mumbai to overview paragraph (currently group-only geographic reference)
- [MEDIUM] metaTitle says "Expanded Mesh" — good for target keyword variant

### /products/turret-punching

- [MEDIUM] Title 82 chars — primary keyword "CNC Turret Perforated Sheet Manufacturing Pune" is in title but not H1
- [LOW] Strong AEO FAQ on cost comparison with laser — aligns with blog post intent

### /products/precision-sheet-leveling

- [HIGH] Title 87 chars — longest product title; H1 missing "Pune" despite meta targeting Pune
- [MEDIUM] Only 4 FAQs — add "What is sheet leveling?" definitional FAQ for AEO

### /products/custom-components

- [MEDIUM] Title/desc 172 chars — over limit
- [LOW] `DimpleSheet3D` adds engagement but is client-rendered (`ssr: false`) — limited SEO value from 3D widget itself

---

## 5. Industry Pages (8 pages)

**Files inspected:** `src/app/industries/[slug]/page.tsx`, `src/data/industries.ts`, `src/components/industries/IndustryPageClient.tsx`

| Slug | metaTitle Len | H1 (PageHero title) | Pune/Mumbai in content | Schema | Removed product refs |
|------|---------------|---------------------|------------------------|--------|----------------------|
| automobile | 78 | Automobile Industry | ✅ clients "Pune PCMC" | Breadcrumb only | `wire-mesh` in data — filtered from UI |
| construction | 78 | Construction & Architecture | ✅ meta desc | Breadcrumb only | `aluminum-grill-profile`, `welded-mesh` |
| food-beverage | 72 | Food & Beverage | ✅ meta desc Pune | Breadcrumb only | `wire-mesh`, `welded-mesh` |
| pharmaceutical | 76 | Pharmaceutical | ✅ meta desc Pune | Breadcrumb only | `wire-mesh`, `demister-pad` |
| petrochemical | 78 | Petrochemical | ❌ no city in body | Breadcrumb only | `demister-pad`, `wire-mesh` |
| architecture-interior | 78 | Architecture & Interior | ✅ meta desc Pune | Breadcrumb only | `aluminum-grill-profile` |
| sugar-industry | 72 | Sugar Industry | ✅ meta desc Pune | Breadcrumb only | `wire-mesh` |
| mining-quarrying | 72 | Mining & Quarrying | ✅ meta desc Pune | Breadcrumb only | `wire-mesh`, `welded-mesh` |

| Check | Status |
|-------|--------|
| metaTitle/metaDescription | ✅ All present, keyword-targeted |
| H1 industry + product keyword | 🟡 H1 is industry name only; headline in subtitle has more detail |
| Pune/Mumbai in visible content | 🟡 Mostly in meta descriptions, not always in body paragraphs |
| Internal product links | 🟡 Links only active products (`PRODUCT_DETAILS` filter removes dead slugs) |
| Industry-specific schema | 🔴 No `Service` or `FAQPage` schema |
| paper-industry / agriculture broken links | ✅ **No broken links** — these slugs exist in `INDUSTRIES` constant but are excluded from `HOME_INDUSTRIES` (first 8) and have no `INDUSTRY_DETAILS` pages. Not linked from nav or industries index. |

**Issues:**

- [HIGH] Update `industry.products` arrays in `industries.ts` to remove dead slugs (`wire-mesh`, `welded-mesh`, `demister-pad`, `aluminum-grill-profile`) — currently silently filtered but hurts content planning.
- [MEDIUM] Add 1–2 paragraphs per industry page with Pune/Mumbai delivery mention in visible body text.
- [MEDIUM] Create `/industries/paper-industry` and `/industries/agriculture` pages (data exists in constants) — SEO opportunity.
- [LOW] Add FAQ section + FAQPage schema per industry (2–3 questions each).

---

## 6. Location Pages (7 pages)

**Files inspected:** `src/app/pune/*`, `src/app/mumbai/*`, `src/data/locations.ts`, `src/lib/location-page.tsx`, `src/components/location/LocationPageClient.tsx`

| Route | In sitemap | Product active | metaTitle OK | H1 has city | NAP visible | Maps embed | LocalBusiness schema | FAQ UI | FAQ schema |
|-------|------------|----------------|--------------|-------------|-------------|------------|---------------------|--------|------------|
| /pune/perforated-sheet-manufacturers | ✅ | ✅ | ✅ 79 chars | ✅ | ✅ address + facility | ✅ iframe | ❌ | ✅ 3 FAQs | ❌ |
| /pune/laser-cutting-services | ✅ | ✅ | ✅ 75 chars | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| /pune/expanded-metal-manufacturers | ✅ | ✅ | ✅ 76 chars | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| /pune/wire-mesh-manufacturers | ✅ | 🔴 **Removed** | ✅ | ✅ | ✅ (Jaliwala ref) | ✅ | ❌ | ✅ | ❌ |
| /mumbai/perforated-sheet-manufacturers | ✅ | ✅ | ✅ 80 chars | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| /mumbai/laser-cutting-services | ✅ | ✅ | ✅ 72 chars | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| /mumbai/wire-mesh-manufacturers | ✅ | 🔴 **Removed** | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |

**Wire-mesh location page issues:**

- [CRITICAL] Pages live at `/pune/wire-mesh-manufacturers` and `/mumbai/wire-mesh-manufacturers` with **no redirect** — product slug `wire-mesh` removed from catalog.
- [CRITICAL] `productSlug: "wire-mesh"` → `PRODUCT_DETAILS["wire-mesh"]` is `undefined` → **quote form section hidden**, "View Product Details" button hidden — page is lead-gen dead end beyond FAQs.
- [HIGH] Pune wire-mesh page references **"Jai Shree Jaliwala — Bhosari"** — branch removed from group (8 units post-Jaliwala removal).
- [HIGH] Still included in `LOCATION_PATHS` → **sitemap.xml** — sends crawl budget to deprecated URLs.

**Missing location pages (gap analysis):**

| Missing route | Priority |
|---------------|----------|
| /pune/turret-punching-services | HIGH |
| /pune/precision-sheet-leveling-services | HIGH |
| /pune/custom-components-manufacturers | MEDIUM |
| /mumbai/expanded-metal-manufacturers | HIGH |
| /mumbai/turret-punching-services | MEDIUM |
| /mumbai/precision-sheet-leveling-services | MEDIUM |
| /maharashtra/perforated-sheet-manufacturers | MEDIUM (state-level) |
| /talawade/perforated-sheet-manufacturers | MEDIUM (micro-local) |
| /bhayander/perforated-sheet-manufacturers | MEDIUM |

**Other location issues:**

- [HIGH] Add `LocalBusiness` JSON-LD per location page with facility-specific NAP, `geo`, `telephone`.
- [MEDIUM] Add FAQPage JSON-LD on location pages (FAQs exist in UI but no schema).
- [MEDIUM] No phone number as visible text on location pages — only address + maps link.
- [LOW] Google Maps embed URLs use placeholder coordinates (`0x0`) — may show imprecise map pin.

---

## 7. Blog Pages

**Files inspected:** `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`

| Check | Status | Finding |
|-------|--------|---------|
| Blog index metaTitle | ✅ | `"Metal Manufacturing Insights \| Blog \| Jai Shree Group"` |
| Blog index metaDescription | ✅ | Technical guides, wire mesh mention (legacy keyword) |
| Per-post meta | 🟡 | Uses Supabase `meta_title`/`meta_description` if set; fallback `{title} \| Jai Shree Group Blog` + excerpt |
| ArticleSchema / BlogPosting | 🔴 **Missing** | No JSON-LD on individual posts |
| Content vs placeholder | 🔴 **Thin** | When `dbPost.content` empty → shows excerpt + **"Coming Soon"** block |
| author / datePublished | 🟡 Partial | `<time dateTime>` visible; no schema |
| Informational keyword match | ✅ | 4 seed titles align with AEO targets |
| Internal links to products | 🟡 Partial | "Coming Soon" state links to `/products` and `/calculator` only — no inline product links in article body |

**Seed posts:**

| Slug | Target intent | Content status |
|------|---------------|----------------|
| how-to-calculate-open-area-perforated-sheet | Open area calculation | Coming Soon (unless DB content added) |
| expanded-metal-vs-perforated-sheet | Comparison query | Coming Soon |
| wire-mesh-specification-guide | Wire mesh specs | Coming Soon — **product removed** |
| laser-cutting-vs-turret-punching | Cost comparison | Coming Soon |

**Issues:**

- [CRITICAL] Publish full article bodies before launch — thin "Coming Soon" pages hurt crawl quality and AEO.
- [HIGH] Add `BlogPosting` JSON-LD with `author`, `datePublished`, `dateModified`, `publisher`.
- [MEDIUM] Redirect or rewrite wire-mesh blog post to active product context.
- [MEDIUM] Sitemap uses static `BLOG_POSTS` only — **does not dynamically fetch** new Supabase posts.

---

## 8. About Page

**File inspected:** `src/app/about/page.tsx`, `src/components/about/AboutPage.tsx`

| Check | Status |
|-------|--------|
| metaTitle mentions brands | 🟡 "About Jai Shree Group" — **no "Shree Perforators"** |
| metaDescription | ✅ 50+ years, 8 units, Pune & Mumbai, ISO |
| H1 | ✅ "About Jai Shree Group" via PageHero |
| Founder Mr. Tejaram Jangid | ✅ Visible in story paragraph |
| Founded 1970 | ✅ Multiple mentions |
| ISO certification | ✅ Dedicated section + badge |
| Internal links | 🟡 CTA to `/certifications`; CtaBanner at bottom |

**Issues:**

- [HIGH] Add "Shree Perforators" as alternate brand name in first paragraph (same business group).
- [MEDIUM] Add internal links to `/products`, `/group`, top location pages.

---

## 9. Contact Page

**File inspected:** `src/app/contact/page.tsx`, `src/components/contact/ContactPage.tsx`, `ContactPageSchema.tsx`

| Check | Status |
|-------|--------|
| LocalBusiness schema | ✅ `ContactPageSchema` with NAP, geo, hours |
| All 8 branch addresses | 🔴 **Partial** — lists branch **names + area only**, not full addresses/phones |
| H1 | 🟡 "Get In Touch" — generic, not keyword-rich |
| tel: links | ✅ `COMPANY.phone` |
| mailto: links | ✅ `COMPANY.email` |
| Google Maps | 🟡 Link to maps for main address only — no embed |
| metaTitle cities | ✅ "Pune" in title |

**Issues:**

- [HIGH] Expand branch listings to full NAP (address, phone, email) for all 8 units — critical for local SEO.
- [MEDIUM] Change H1 to *"Contact Perforated Sheet Manufacturers — Pune & Mumbai"*
- [MEDIUM] Schema address uses Gat 93; `COMPANY.address` uses Gat 94 — **NAP inconsistency** across schema vs footer vs contact.

---

## 10. Get Quote Page

**File inspected:** `src/app/get-quote/page.tsx`, `src/components/quote/GetQuotePage.tsx`

| Check | Status |
|-------|--------|
| metaTitle | ✅ Keyword-rich, mentions wire mesh (legacy) |
| H1 | ✅ "Get a Free Quote" |
| Schema | 🔴 None |
| Conversion focus | ✅ Strong — 3-step form + WhatsApp fallback |

**Issues:**

- [LOW] Add `WebPage` schema with `potentialAction: QuoteAction` or FAQ schema for common quote questions.
- [LOW] Update meta description to remove wire mesh if de-emphasizing that product line.

---

## 11. Sitemap

**File inspected:** `src/app/sitemap.ts`, `src/lib/constants.ts` (`SITE_ROUTES`)

| Check | Status | Finding |
|-------|--------|---------|
| All public routes included | 🟡 Partial | **38 URLs** in sitemap (13 static + 6 products + 8 industries + 7 locations + 4 blog). Build generates **54 routes** — admin, API, not-found excluded (correct). |
| Wire-mesh in sitemap | 🔴 Yes | Both wire-mesh location URLs included — should redirect or remove |
| changeFrequency | ✅ | Home weekly; products weekly; others monthly |
| priority values | ✅ | Home 1.0; high-priority static 0.95; products 0.9; industries/locations 0.8; blog 0.6 |
| Base URL | ✅ | `COMPANY.website` = `https://jaishreegroup.in` — **not Vercel preview URL** |
| Dynamic blog from Supabase | 🔴 No | Only `BLOG_POSTS` constant — new admin posts won't appear until code/constants updated |
| lastModified | ✅ | Set to `new Date()` on each generation (always "now" — acceptable for SSG) |
| /landing in sitemap | 🟡 Yes | Included — consider noindex if duplicate of home |

**Sitemap URL count:** 38 (not 54 — 54 is total Next.js routes including admin/API)

---

## 12. Robots.txt

**File inspected:** `src/app/robots.ts`

| Check | Status | Finding |
|-------|--------|---------|
| Admin disallowed | 🔴 **No** | `allow: "/"` for all — `/admin/*` crawlable |
| API disallowed | 🔴 **No** | `/api/*` crawlable |
| Landing noindex | 🔴 **No** | `/landing` indexable and in sitemap |
| Sitemap URL | ✅ | `https://jaishreegroup.in/sitemap.xml` — absolute, correct |
| Disallow: / | ✅ Not present |

**Recommended robots.ts update:**

```
rules: [
  { userAgent: "*", allow: "/", disallow: ["/admin/", "/api/"] },
]
```

---

## 13. JSON-LD Schemas

**Files inspected:** `GlobalSchema.tsx`, `BreadcrumbSchema.tsx`, `ContactPageSchema.tsx`, product page inline schemas

| Schema type | Where | Status |
|-------------|-------|--------|
| ManufacturingBusiness | Global (all pages) | 🟡 `sameAs: []` empty; no social/GMB URLs; `areaServed` country codes only (not city names); single Pune address |
| LocalBusiness | Contact page only | ✅ Good NAP + geo + hours |
| Product | 6 product pages | 🟡 Minimal — no image, offers, reviews |
| FAQPage | 6 product pages | ✅ Valid Question/Answer pairs |
| BreadcrumbList | Products index, industries, locations, blog, about, etc. | ✅ Most key pages |
| BreadcrumbList | Product detail | ✅ Duplicate: JSON-LD + microdata (acceptable) |
| FAQPage | Location pages, calculator | 🔴 Missing |
| BlogPosting | Blog posts | 🔴 Missing |
| Service | Industry/location pages | 🔴 Missing |

**Rendering:** All schema is **server-rendered** via `<script type="application/ld+json">` in RSC pages or layout — good for crawlers (not client-hydrated).

**Issues:**

- [CRITICAL] Populate `sameAs` with Google Business Profile, LinkedIn, Facebook, Instagram URLs when available.
- [HIGH] Add city-level `areaServed` (Pune, Mumbai, Maharashtra) to GlobalSchema.
- [HIGH] Add LocalBusiness schema on each of 7 location pages with facility-specific data.
- [MEDIUM] Enrich Product schema with `image`, `offers` (Quote/Offer), `category`.
- [MEDIUM] Fix `iso6523Code` misuse — use proper certification markup.

---

## 14. Next.js Config

**File inspected:** `next.config.ts`

| Check | Status |
|-------|--------|
| 308 redirects for removed products | ✅ All 4 in place |
| Accidental redirects | ✅ None blocking valid pages |
| Security headers | ✅ X-Frame-Options, X-Content-Type-Options, Referrer-Policy |
| Content-Security-Policy | 🔴 Missing |
| Supabase images remotePatterns | ✅ `**.supabase.co` configured |
| trailingSlash | ✅ Not set (default false — consistent URLs) |
| Cache-Control headers | 🔴 Not configured for static assets |

---

## 15. Performance Signals (SEO Impact)

| Check | Status | Finding |
|-------|--------|---------|
| next/image with priority | 🔴 Rare | Used on blog/gallery only — home/product pages use SVG icons, no hero images |
| GSAP / Three.js / Spline deferred | 🟡 Partial | `DimpleSheet3D`, `PerforationPatterns` use `dynamic(..., { ssr: false })` — good. Framer Motion bundled in many client components. |
| Leaflet dynamic import | ✅ Yes | `IndiaMapLoader.tsx` — `dynamic` with `ssr: false` |
| Font display swap | ✅ Yes | `next/font` default behavior |
| loading.tsx skeleton | ✅ Yes | Root `src/app/loading.tsx` present |

**Issues:**

- [MEDIUM] Heavy client JS on home (Framer Motion, particles) — monitor LCP/INP after launch.
- [LOW] Add real product/factory images with `next/image` + `priority` on above-fold hero when assets available.

---

## 16. Content & Keyword Gaps

| Gap | Status |
|-----|--------|
| Product pages missing Pune/Mumbai in H1 | 🔴 All 6 — location only in meta/body |
| Pages missing "Shree Perforators" | 🔴 Home, all products, about, contact H1, industries body |
| Thin content (<300 words) | 🔴 Blog posts (Coming Soon); 🟡 TrustBar/Process sections |
| /maharashtra/, /india/ pages | 🔴 Not implemented |
| FAQ on all product pages | ✅ Yes (4–5 each) |
| Missing location pages | 🔴 6+ high-value combinations (see Section 6) |
| paper-industry / agriculture pages | 🔴 In constants, no detail pages |
| Brand subsidiary pages | 🔴 No pages for "Shree Perforators", "Jai Shree Metal Perforators", "Chandan Metal Perforators" |
| MS/SS/GI/Al material landing pages | 🔴 Not implemented |
| Calculator AEO | 🟡 Strong tool + FAQs in component but **no FAQPage schema** |

---

## Issues by Page

### Home Page (`/`)

- [CRITICAL] H1 lacks primary keyword → Change to keyword-rich H1 while preserving design
- [HIGH] No "Shree Perforators" in visible text → Add brand alias in hero or about snippet
- [HIGH] Hero mentions discontinued "wire mesh" → Update copy to 6 active products
- [MEDIUM] No links to location SEO pages → Add "Pune" / "Mumbai" service area section with 7 links
- [MEDIUM] No page-specific metadata → Add `export const metadata` to `page.tsx`
- [LOW] No `<img>` alt audit needed — icon-based design

### /products (index)

- [MEDIUM] H1 "Our Products" too generic → Use keyword-rich H1
- [LOW] Missing intro paragraph for SEO body content

### /products/perforated-sheets

- [HIGH] Title 74 chars, H1 not keyword-aligned → Align H1 with "Perforated Sheet Manufacturer Pune & Mumbai"
- [MEDIUM] No "Shree Perforators" brand mention → Add once in overview
- [LOW] Strong FAQ + content depth — maintain

### /products/laser-cutting

- [HIGH] Title 75 chars → Shorten
- [MEDIUM] H1 generic → Add "Laser Cutting Services Pune & Mumbai"

### /products/expanded-metal

- [MEDIUM] Overview missing Pune/Mumbai in first paragraph
- [MEDIUM] Title 76 chars

### /products/turret-punching

- [MEDIUM] Title 82 chars; H1 missing "CNC Turret" keyword

### /products/precision-sheet-leveling

- [HIGH] Title 87 chars — worst offender
- [MEDIUM] Only 4 FAQs — add definitional AEO question

### /products/custom-components

- [MEDIUM] Description 172 chars
- [LOW] 3D preview client-only — acceptable

### /industries/automobile

- [MEDIUM] Body doesn't mention Pune — only meta/clients line
- [MEDIUM] Dead `wire-mesh` in products array

### /industries/construction

- [MEDIUM] References removed `aluminum-grill-profile`, `welded-mesh`

### /industries/food-beverage

- [MEDIUM] Title targets wire mesh — product removed

### /industries/pharmaceutical

- [MEDIUM] References `demister-pad`, `wire-mesh`

### /industries/petrochemical

- [HIGH] Entire page SEO targets demister pads — product removed
- [MEDIUM] No Pune/Mumbai in body

### /industries/architecture-interior

- [MEDIUM] References `aluminum-grill-profile`

### /industries/sugar-industry

- [LOW] Good keyword alignment with custom components capability

### /industries/mining-quarrying

- [MEDIUM] References wire mesh, welded mesh

### /pune/perforated-sheet-manufacturers

- [LOW] Strong page — add LocalBusiness schema + phone in NAP block

### /pune/laser-cutting-services

- [LOW] Strong page — add schema

### /pune/expanded-metal-manufacturers

- [LOW] Strong page — add schema

### /pune/wire-mesh-manufacturers

- [CRITICAL] Deprecated product page still indexed → 301 to `/products` or `/pune/perforated-sheet-manufacturers`
- [CRITICAL] References removed Jaliwala branch
- [HIGH] Quote form disabled (no product detail)

### /mumbai/perforated-sheet-manufacturers

- [LOW] Strong — add schema + phone

### /mumbai/laser-cutting-services

- [LOW] Strong — add schema

### /mumbai/wire-mesh-manufacturers

- [CRITICAL] Same issues as Pune wire-mesh page

### /blog (index)

- [MEDIUM] Wire mesh in meta description

### /blog/how-to-calculate-open-area-perforated-sheet

- [CRITICAL] Thin "Coming Soon" content → Publish full guide (calculator page can cross-link)

### /blog/expanded-metal-vs-perforated-sheet

- [CRITICAL] Coming Soon → Publish comparison content

### /blog/wire-mesh-specification-guide

- [CRITICAL] Coming Soon + deprecated product → Rewrite or redirect

### /blog/laser-cutting-vs-turret-punching

- [CRITICAL] Coming Soon → Publish cost comparison (high AEO value)

### /about

- [HIGH] Missing "Shree Perforators" brand name
- [MEDIUM] Add links to location/product pages

### /contact

- [HIGH] Incomplete branch NAP (names only)
- [MEDIUM] H1 generic
- [MEDIUM] Schema vs constants address mismatch (Gat 93 vs 94)

### /get-quote

- [LOW] No structured data

### /calculator

- [MEDIUM] H1 "Open Area Calculator" — add "Perforated Sheet" for AEO: *"Perforated Sheet Open Area Calculator"*
- [MEDIUM] Has `CALCULATOR_FAQS` in component but no FAQPage JSON-LD
- [LOW] Strong informational asset — link from all perforated sheet pages prominently

### /landing

- [MEDIUM] Duplicate SEO intent with home — consider `robots: { index: false }` or canonical to `/`
- [MEDIUM] Included in sitemap — may split ranking signals

### /group

- [LOW] Good for brand E-E-A-T — branch names include Shree Perforators, Jai Shree Metal Perforators

### /gallery

- [MEDIUM] Meta mentions wire mesh; placeholder categories for removed products

---

## Global Issues (Site-Wide)

1. **Dual-brand SEO not implemented** — "Shree Perforators" absent from primary landing, product, and about copy.
2. **Title tag length discipline** — root + all 6 product titles exceed 60 characters.
3. **Google Search Console verification placeholder** — blocks monitoring at launch.
4. **robots.txt allows /admin and /api** — unnecessary crawl exposure.
5. **Wire-mesh product removal incomplete** — location pages, blog post, industry refs, gallery categories, footer copy, hero copy still mention wire mesh.
6. **No internal linking to location pages** — 7 SEO landing pages orphaned from nav/footer/home.
7. **NAP inconsistency** — Gat 93 (ContactPageSchema) vs Gat 94 (`COMPANY.address`, GlobalSchema).
8. **empty `sameAs`** — missed entity linking for Knowledge Panel / AI citation.
9. **Blog thin content** — 4 indexed posts with no article body.
10. **Sitemap not dynamic for blog** — admin-created posts won't be discovered.
11. **No Vercel URL hardcoding found** — ✅ all canonicals use `jaishreegroup.in`.

---

## Content Gap Analysis

### Brand Keywords (client priority)

| Target term | Current coverage |
|-------------|------------------|
| Shree Perforators | 🔴 Almost none — branch name on /group only |
| Jai Shree Perforators | 🔴 Not used |
| Jai Shree Group | ✅ Primary brand throughout |
| Jai Shree Metal Perforators Pune | 🟡 Branch card + location facility names |
| Chandan Metal Perforators | 🟡 Branch card only |
| Dev Shree Metal Perforators | 🟡 Branch + expanded metal location page |

**Recommendation:** Add `/brands/shree-perforators` or weave "Shree Perforators (Jai Shree Group)" into home H1, about, and footer. Create subsidiary brand mention blocks on /group.

### Product Keywords

| Keyword cluster | Page coverage |
|-----------------|---------------|
| Perforated sheet manufacturer Pune/Mumbai/India | 🟡 Meta + location pages; weak H1 on product page |
| Laser cutting services Pune/Mumbai | ✅ Location + product pages |
| Expanded metal manufacturers | ✅ Product + Pune location; missing Mumbai location page |
| Turret punching / CNC turret Pune | 🟡 Product page; no location page |
| Precision sheet leveling Pune | 🟡 Product page; no location page |
| Custom metal components Pune | 🟡 Product page |
| MS/SS/GI/Al perforated sheet | 🔴 Materials as tags only — no dedicated sections |

### Informational / AEO Keywords

| Query | Coverage |
|-------|----------|
| What is open area percentage | 🟡 Calculator FAQs (no schema) |
| How to calculate open area | 🟡 Calculator + blog (Coming Soon) |
| Expanded metal vs perforated sheet | 🔴 Blog Coming Soon |
| Laser vs turret punching cost | 🔴 Blog Coming Soon; product FAQs partial |
| Types of perforations | ✅ Perforated sheets patterns section |

---

## Missing Pages / Opportunities

| Page | SEO value | Priority |
|------|-----------|----------|
| /pune/turret-punching-services | High local intent | P1 |
| /mumbai/expanded-metal-manufacturers | High local intent | P1 |
| /pune/precision-sheet-leveling-services | Medium local | P2 |
| /pune/custom-components-manufacturers | Medium local | P2 |
| /industries/paper-industry | Data in constants | P2 |
| /industries/agriculture | Data in constants | P2 |
| /brands/shree-perforators | Brand SERP capture | P1 |
| /materials/ss-perforated-sheet | Material long-tail | P3 |
| /materials/ms-perforated-sheet | Material long-tail | P3 |
| /maharashtra/perforated-sheet-manufacturers | State-level | P3 |
| /export/perforated-sheet-manufacturers-india | Export intent in keywords | P3 |

---

## Priority Fix List (Top 20)

Ranked by SEO impact:

1. [CRITICAL] Replace Google Search Console verification placeholder in `layout.tsx`
2. [CRITICAL] Rewrite home H1 to include "Perforated Sheet Manufacturers Pune & Mumbai" (or equivalent primary keyword)
3. [CRITICAL] Publish full blog article content — remove "Coming Soon" thin pages
4. [CRITICAL] Redirect or remove `/pune/wire-mesh-manufacturers` and `/mumbai/wire-mesh-manufacturers` (301 → relevant active product location page)
5. [CRITICAL] Add "Shree Perforators" to home, about, and footer as recognized brand alias
6. [HIGH] Shorten all product + root meta titles to ≤60 characters
7. [HIGH] Align product page H1s with target keywords (not just product name)
8. [HIGH] Update `robots.ts` to disallow `/admin/` and `/api/`
9. [HIGH] Populate `GlobalSchema` `sameAs` with GMB + social profile URLs
10. [HIGH] Add internal links to 7 location pages from home and/or footer
11. [HIGH] Add LocalBusiness JSON-LD to each location page
12. [HIGH] Expand /contact branch listings to full NAP for all 8 units
13. [HIGH] Fix NAP inconsistency (Gat 93 vs Gat 94) across schema and constants
14. [HIGH] Remove wire-mesh/welded-mesh/demister references from industry `products` arrays and meta copy
15. [MEDIUM] Add FAQPage JSON-LD to calculator and location pages
16. [MEDIUM] Add BlogPosting schema to blog posts
17. [MEDIUM] Create missing location pages (Mumbai expanded metal, Pune turret punching, etc.)
18. [MEDIUM] Add `en-IN` hreflang; consider noindex or canonical for `/landing`
19. [MEDIUM] Remove "wire mesh" from home hero, gallery meta, get-quote meta where product is deprecated
20. [MEDIUM] Make sitemap dynamically include Supabase blog posts

---

## AEO/GEO Readiness Check

| Signal | Status |
|--------|--------|
| FAQ schema coverage | **6/6 product pages** ✅ — **0/7 location pages**, **0/1 calculator** |
| Informational content | Product pages ✅ — Blog 🔴 — Calculator 🟡 |
| Brand entity signals | Weak — single brand name, empty `sameAs`, no Knowledge Graph anchors |
| Structured data completeness | ~60% — missing Article, location LocalBusiness, calculator FAQ |
| Definitional content ("What is…") | Partial — in product/calculator FAQs but not in blog bodies |
| Comparison content | Intended in blog — not published |
| Tool-based AEO (calculator) | Strong interactive tool — needs FAQ schema + published matching blog post |
| AI citation readiness | Moderate — good factual specs in product tables; undermined by thin blog and missing brand aliases |
| E-E-A-T signals | Good — 50+ years, founder name, ISO, 8 units, client names (Tata, L&T) on industries page |
| Geographic specificity | Strong in location pages and FAQs; weak in H1s and home |

### GEO Recommendations (Generative Engine Optimization)

1. Add concise **definition blocks** at top of product pages (*"Perforated sheets are metal panels with precise hole patterns…"*) — LLMs extract these easily.
2. Publish blog posts as **structured Q&A + comparison tables** — ideal for AI answer synthesis.
3. Add **`Organization` sameAs** links — critical for entity disambiguation in AI search.
4. Include **explicit brand statements**: *"Shree Perforators is a division of Jai Shree Group"* — helps AI connect brand search terms.
5. Add **speakable** FAQ content in plain language (already mostly done on product FAQs).

---

## Appendix: Files Inspected

| Area | Files |
|------|-------|
| Layout/SEO | `src/app/layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `next.config.ts` |
| Schema | `src/components/seo/GlobalSchema.tsx`, `BreadcrumbSchema.tsx`, `ContactPageSchema.tsx` |
| Home | `src/app/page.tsx`, `src/components/home/*.tsx` |
| Products | `src/app/products/**`, `src/data/products.ts`, `ProductPageClient.tsx` |
| Industries | `src/app/industries/**`, `src/data/industries.ts` |
| Locations | `src/app/pune/**`, `src/app/mumbai/**`, `src/data/locations.ts` |
| Blog | `src/app/blog/**` |
| Other pages | about, contact, get-quote, calculator, landing, group, gallery |
| Constants | `src/lib/constants.ts` |
| Chrome | `SiteChrome.tsx`, `Footer.tsx`, `PageViewTracker.tsx` |

---

*End of audit. No files were modified during this inspection.*
