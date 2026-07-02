# Jai Shree Group — Diagnostic Report
Generated: June 29, 2026

> **Method:** Static code analysis only (file reads + grep). No browser or network requests. Production env vars on Vercel were not inspected.

---

## 🔴 CRITICAL ISSUES (broken, will affect users immediately)

| Page/File | Element | Issue | Details |
|-----------|---------|-------|---------|
| `src/app/mumbai/` | Route | **Missing page — 404** | `/mumbai/expanded-metal-manufacturers` is documented in PROJECT_DOCUMENTATION.md and listed in audit scope, but **no `page.tsx` exists**. Only Pune has `expanded-metal-manufacturers`. Visiting this URL returns 404. |
| `src/app/api/quote/route.ts`, `src/app/api/contact/route.ts` | Form submission | **API returns 500 without Supabase env** | Both routes require `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`. If unset, POST returns `{ error: "Server configuration error" }` with HTTP 500. Quote & contact forms show error state; leads are not saved. |
| `src/components/home/VideoSection.tsx` | Factory Tour play button | **Empty onClick — no action** | `VideoPlaceholder onPlay={() => {}}` — clicking play does nothing. `COMPANY_VIDEO.youtubeId` and `localVideo` are both empty strings, so placeholder always renders. |
| `src/lib/supabase/env.ts` | `isSupabaseConfigured()` | **False positive configuration check** | Falls back to `https://placeholder.supabase.co` and `placeholder-anon-key`, so `isSupabaseConfigured()` is **always true** even when real env vars are missing. Gallery/blog queries attempt placeholder host and fail silently → empty results. |

---

## 🟠 HIGH ISSUES (placeholder content, dead links)

| Page/File | Element | Issue | Details |
|-----------|---------|-------|---------|
| `src/components/gallery/GalleryPage.tsx` | Product grid | **Placeholder gallery — no real images** | When Supabase returns no items (`hasDbItems === false`), shows 12 placeholder cards with Camera icon and text-only labels. Banner: "Product photography coming soon" / "Images coming soon". |
| `src/components/home/VideoSection.tsx` | Video section | **"Coming Soon" factory tour** | Visible copy: "Coming Soon — Drone & walkthrough footage" and "Video available soon". No YouTube ID or local video configured in `COMPANY_VIDEO`. |
| `src/components/certifications/CertificationsPage.tsx` | Download ISO Certificate | **Disabled button — no PDF** | Button is `disabled` with note "Certificate download coming soon". No certificate file in `/public`. |
| `src/components/about/AboutPage.tsx` | Download ISO Certificate CTA | **Misleading link** | Links to `/certifications`, but that page's download button is disabled. Users expect a download; they get a disabled button. |
| `src/lib/constants.ts` → `FOOTER.social` | LinkedIn, Facebook | **Placeholder social links** | Both use `href: "#"`. Footer renders them as non-clickable disabled spans with tooltip "coming soon" — not real profiles. |
| `src/data/locations.ts` | `PUNE_MAP`, `MUMBAI_MAP` | **Placeholder Google Maps embed coords** | Embed URLs contain `1s0x0%3A0x0` — generic placeholder place IDs, not verified business pins. "Get Directions" search URLs use real addresses and are OK. |
| `src/app/api/` | `/api/health` | **Route missing** | No health-check endpoint for UptimeRobot or similar monitoring. Only `/api/quote`, `/api/contact`, `/api/track` exist. |
| `public/`, `src/app/` | Favicon | **No favicon file found** | No `favicon.ico`, `icon.png`, or `app/icon.*`. Browsers request `/favicon.ico` by default → likely 404. |
| `src/data/blog-posts.ts` | Blog slug | **Slug/title mismatch** | Title: "Perforated Sheet Specification Guide" but slug is `wire-mesh-specification-guide`. URL is confusing; content is complete (not Coming Soon). |
| `src/components/clients/ClientsPage.tsx` | Client logos grid | **Placeholder client names** | `CLIENT_PLACEHOLDERS` shows generic names ("Automotive OEM — Pune", etc.) with letter avatars, not real client logos. |
| `src/lib/constants.ts` | `INDUSTRIES` entries | **2 industries have no detail pages** | `paper-industry` and `agriculture` exist in `INDUSTRIES` constant but **not** in `INDUSTRY_DETAILS`. `/industries/paper-industry` and `/industries/agriculture` would 404. Not currently linked from UI (HOME_INDUSTRIES uses first 8 only). |

---

## 🟡 MEDIUM ISSUES (missing features, incomplete data)

| Page/File | Element | Issue | Details |
|-----------|---------|-------|---------|
| `src/app/api/quote/route.ts`, `contact/route.ts` | Email notifications | **Resend optional — emails may never send** | Email only sent if `RESEND_API_KEY` is set. No user-facing warning; lead may save to Supabase but team gets no email. |
| `src/lib/constants.ts` | `BRANCHES[2]` Shree Weld Mesh | **Wrong website URL** | `website: "www.shreeperforators.com"` — duplicate of Shree Perforators; likely should be a weld-mesh-specific domain. |
| `src/lib/constants.ts` | `BRANCHES[5]` Jai Shree Perforator | **Website may be wrong** | `website: "www.jaishreefiltration.com"` — same as Mumbai filtration branch; Palghar perforator may need its own URL. |
| `src/components/gallery/GalleryPage.tsx` | Filter tabs | **Obsolete product categories** | Filters include `wire-mesh` and `welded-mesh`, but those products were removed from catalog (redirect to `/products`). Placeholder items still use these categories. |
| `src/components/calculator/OpenAreaCalculator.tsx` | Page | **No CTA links** | Calculator has no links to `/get-quote` or `/contact` — missed conversion opportunity (not broken). |
| `src/app/clients/page.tsx` | `/clients` | **Orphan page — not in navbar** | Route exists and is in sitemap (`SITE_ROUTES.static`), but not in `NAV_LINKS` or footer quick links. Hard to discover. |
| `src/lib/supabase/env.ts` | Placeholder fallbacks | **Admin login may fail silently in dev** | Without real Supabase, admin auth against `placeholder.supabase.co` will fail; middleware still redirects unauthenticated users to `/admin/login`. |
| `src/components/home/AboutSection.tsx` | Highlights | **Stale wire mesh spec** | Still shows "2–400 Mesh — Wire Mesh Range" in highlights; wire mesh is no longer an active product line. |
| `src/app/layout.tsx`, `src/app/page.tsx` | Metadata | **Hero H1 vs metadata mismatch** | Hero H1 updated to "PERFORATED SHEET / MANUFACTURERS / SINCE 1970" but site metadata still emphasizes "Pune & Mumbai" — SEO inconsistency, not a runtime bug. |

---

## 🔵 LOW ISSUES (minor, SEO or polish)

| Page/File | Element | Issue | Details |
|-----------|---------|-------|---------|
| `public/logo-*.png/svg` | Logo assets | **Unused public logo files** | `Logo.tsx` uses inline SVG; PNG/SVG logo files in `/public` are not referenced by the component. |
| `PROJECT_DOCUMENTATION.md` | Docs | **References missing favicon & Mumbai expanded-metal page** | Documentation out of sync with codebase. |
| `src/lib/constants.ts` | `NEXT_PUBLIC_SITE_URL` | **Documented but unused in code** | `COMPANY.website` (`https://jaishreegroup.in`) used for canonical URLs instead. |
| `src/app/layout.tsx` | Google/Bing verification | **Env-dependent only** | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` / `NEXT_PUBLIC_BING_SITE_VERIFICATION` — no hardcoded placeholder; omitted from metadata if unset. |
| `src/components/seo/GlobalSchema.tsx` | `sameAs` | **Populated (not empty)** | Contains Google Maps, IndiaMART, LinkedIn company URLs. Footer social icons still placeholder. |
| `src/components/industries/IndustriesIndexPage.tsx` | Subtitle | **References demister pads** | Copy mentions "demister pads" — product line removed from catalog. |
| `src/components/clients/ClientsPage.tsx` | Testimonial | **References demister pads** | Hardcoded testimonial mentions demister pads for petrochemical client. |
| Blog internal links | Markdown links | **All relative paths valid** | Blog content links to `/calculator`, `/products/*` — all routes exist. |

---

## ✅ CONFIRMED WORKING

- **All 6 product pages** (`perforated-sheets`, `laser-cutting`, `expanded-metal`, `turret-punching`, `precision-sheet-leveling`, `custom-components`) — routes, data, breadcrumbs, quote forms.
- **8 industry pages** in scope (automobile through mining-quarrying) — full content in `INDUSTRY_DETAILS`.
- **5 location SEO pages** that exist: Pune (3) + Mumbai (2) — content, maps search links, product CTAs.
- **4 blog posts** in `BLOG_POSTS` — all have full markdown content; "Coming Soon" block only appears when `content` is empty (not triggered for seed posts).
- **Phone numbers** — real Indian mobiles (`+91 9370606017`, branch numbers); no fake patterns (1234567890, etc.).
- **WhatsApp** — `919370606017` matches main phone; floating button, footer, contact, quote, landing CTAs all use `wa.me` correctly.
- **Email** — `shreeperforator@gmail.com` and branch emails are real domains (gmail.com), not placeholders.
- **Catalogue PDF** — `/brochure/jai-shree-brochure.pdf` exists in `public/brochure/`. Linked from navbar, footer, product pages.
- **OG image** — `/public/og-image.jpg` exists; referenced in root layout OpenGraph.
- **Get Quote form** — 3-step UI, Zod validation, POST to `/api/quote`, success/error states, optional WhatsApp redirect.
- **Contact form** — validation, POST to `/api/contact`, success/error + WhatsApp fallback on error.
- **Product quote forms** — on product/location pages; POST to `/api/contact`.
- **Navbar & footer navigation** — all linked routes exist (except social `#` placeholders handled as disabled).
- **Redirects** — removed products (`wire-mesh`, `welded-mesh`, etc.) and wire-mesh location pages redirect correctly (`next.config.ts`).
- **Admin panel** — routes exist under `/admin/*`; middleware protects with Supabase session (matcher: `/admin/:path*`).
- **Open Area Calculator** — 10 formulas, validation, UI functional (no external API dependency).
- **404 page** — `not-found.tsx` with links to `/` and `/products`.
- **6 branches** in `BRANCHES` — all have name, address, phone, email (complete data).

---

## 📋 ALL BUTTONS & LINKS AUDIT

| Page | Element | href/action | Status | Notes |
|------|---------|-------------|--------|-------|
| **Global — Navbar (desktop)** | Home | `/` | ✅ Valid | |
| | About | `/about` | ✅ Valid | |
| | Products → View All | `/products` | ✅ Valid | |
| | Products → Perforated Sheets | `/products/perforated-sheets` | ✅ Valid | |
| | Products → Laser Cutting | `/products/laser-cutting` | ✅ Valid | |
| | Products → Expanded Metal | `/products/expanded-metal` | ✅ Valid | |
| | Products → Turret Punching | `/products/turret-punching` | ✅ Valid | |
| | Products → Precision Sheet Leveling | `/products/precision-sheet-leveling` | ✅ Valid | |
| | Products → Custom Components | `/products/custom-components` | ✅ Valid | |
| | Industries | `/industries` | ✅ Valid | |
| | Our Group | `/group` | ✅ Valid | |
| | Calculator | `/calculator` | ✅ Valid | |
| | Gallery | `/gallery` | ✅ Valid | |
| | Contact | `/contact` | ✅ Valid | |
| | Catalogue | `/brochure/jai-shree-brochure.pdf` | ✅ Valid | PDF exists |
| | Get Quote | `/get-quote` | ✅ Valid | |
| **Global — Navbar (mobile)** | Same links as desktop | — | ✅ Valid | |
| **Global — Footer** | Logo | `/` | ✅ Valid | |
| | Product links (×6) | `/products/{slug}` | ✅ Valid | All 6 slugs |
| | Quick links (×8) | `/about`, `/group`, etc. | ✅ Valid | |
| | Phone | `tel:+919370606017` | ✅ Real | |
| | Email | `mailto:shreeperforator@gmail.com` | ✅ Real | |
| | Download Catalogue | `/brochure/jai-shree-brochure.pdf` | ✅ Valid | |
| | WhatsApp Us | `https://wa.me/919370606017` | ✅ Real | |
| | LinkedIn | `#` | 🟠 Placeholder | Rendered disabled |
| | Facebook | `#` | 🟠 Placeholder | Rendered disabled |
| **Global — WhatsAppButton** | Floating button | `wa.me/919370606017?text=...` | ✅ Real | All pages except /admin, /landing |
| **/** Home — Hero | Get a Free Quote | `/get-quote` | ✅ Valid | |
| | Explore Products | `/products` | ✅ Valid | |
| | ProductShowcase → View Product Details | `/products/{slug}` | ✅ Valid | 6 rotating slugs |
| | ProductShowcase → dots/arrows | carousel nav | ✅ Valid | Internal state |
| **/** Home — AboutSection | Read Full Story | `/about` | ✅ Valid | |
| **/** Home — ProductsSection | Product cards (×6) | `/products/{slug}` | ✅ Valid | |
| **/** Home — IndustriesSection | Industry cards (×8) | `/industries/{slug}` | ✅ Valid | |
| | Talk to Our Experts | `/contact` | ✅ Valid | |
| **/** Home — GroupSection | Branch phone (×6) | `tel:` per branch | ✅ Real | |
| | Branch email (×6) | `mailto:` per branch | ✅ Real | |
| | Branch website (×6) | `https://{website}` | ⚠️ Check | Some URLs may be wrong (see MEDIUM) |
| **/** Home — CtaSection | Get a Free Quote | `/get-quote` | ✅ Valid | |
| | Call Us Now | `tel:+919370606017` | ✅ Real | |
| **/** Home — VideoSection | Play button | `onClick={() => {}}` | 🔴 Broken | No video plays |
| **/about** | Download ISO Certificate | `/certifications` | 🟠 Misleading | Target page download disabled |
| | CtaBanner | `/get-quote`, `/contact` | ✅ Valid | |
| **/products** | Product cards (×6) | `/products/{slug}` | ✅ Valid | |
| **/products/[slug]** | Breadcrumb Home | `/` | ✅ Valid | |
| | Breadcrumb Products | `/products` | ✅ Valid | |
| | Get a Quote | `/get-quote` | ✅ Valid | |
| | Download Product Catalogue | `/brochure/jai-shree-brochure.pdf` | ✅ Valid | |
| | Related products | `/products/{slug}` | ✅ Valid | |
| | ProductQuoteForm submit | POST `/api/contact` | ✅ Valid* | *Requires Supabase env |
| **/industries** | Industry cards (×8) | `/industries/{slug}` | ✅ Valid | |
| **/industries/[slug]** | Related product cards | `/products/{slug}` | ✅ Valid | |
| | Get Quote | `/get-quote?industry={slug}` | ✅ Valid | |
| | CtaBanner | `/get-quote`, `/contact` | ✅ Valid | |
| **/pune/perforated-sheet-manufacturers** | Get Directions | Google Maps search URL | ✅ Valid | Real address query |
| | Map iframe | embed URL with 0x0 | 🟠 Placeholder coords | |
| | View Product Details | `/products/perforated-sheets` | ✅ Valid | |
| | Get Quote form | POST `/api/contact` | ✅ Valid* | |
| **/pune/laser-cutting-services** | Same pattern | — | ✅ Valid | |
| **/pune/expanded-metal-manufacturers** | Same pattern | — | ✅ Valid | |
| **/mumbai/perforated-sheet-manufacturers** | Same pattern | — | ✅ Valid | |
| **/mumbai/laser-cutting-services** | Same pattern | — | ✅ Valid | |
| **/mumbai/expanded-metal-manufacturers** | — | — | 🔴 404 | **Route file missing** |
| **/calculator** | (no outbound links) | — | ⚠️ No CTAs | Functional calculator only |
| **/blog** | Post cards | `/blog/{slug}` | ✅ Valid | 4 seed slugs |
| **/blog/how-to-calculate-open-area-perforated-sheet** | Internal links | `/calculator`, `/products/perforated-sheets` | ✅ Valid | Full content |
| **/blog/expanded-metal-vs-perforated-sheet** | Internal links | `/products/*` | ✅ Valid | Full content |
| **/blog/laser-cutting-vs-turret-punching** | Internal links | `/products/*` | ✅ Valid | Full content |
| **/blog/wire-mesh-specification-guide** | Internal links | `/calculator`, `/products/perforated-sheets` | ✅ Valid | Full content; slug misleading |
| **/gallery** | Contact us | `/contact` | ✅ Valid | |
| | Filter tabs | client-side filter | ✅ Valid | Placeholder images if no DB |
| **/contact** | Phone | `tel:+919370606017` | ✅ Real | |
| | WhatsApp | `wa.me/919370606017` | ✅ Real | |
| | Email | `mailto:shreeperforator@gmail.com` | ✅ Real | |
| | Address map | `maps.google.com/?q=...` | ✅ Valid | Encoded real address |
| | Branch phones/emails | per branch | ✅ Real | |
| | Form submit | POST `/api/contact` | ✅ Valid* | Success/error states |
| **/get-quote** | Call / WhatsApp / Email | tel, wa.me, mailto | ✅ Real | |
| | Get Quote on WhatsApp | `wa.me` with message | ✅ Real | |
| | 3-step form submit | POST `/api/quote` | ✅ Valid* | Success/error states |
| | Back to Home (success) | `/` | ✅ Valid | |
| **/group** | Branch maps | Google Maps search | ✅ Valid | Per-address |
| | Branch tel/mail/website | per branch | ✅ Real* | *Some websites questionable |
| **/certifications** | Download ISO Certificate | `disabled` button | 🟠 Non-functional | Coming soon |
| **/clients** | CtaBanner | `/get-quote`, `/contact` | ✅ Valid | |
| **/landing** | Get Quote | `/get-quote` | ✅ Valid | |
| | Explore Products | `/products` | ✅ Valid | |
| | WhatsApp / tel | real numbers | ✅ Real | |
| | Full site link | `/` | ✅ Valid | |
| | Industry/product links | valid routes | ✅ Valid | |
| **/admin/login** | Sign In | Supabase auth | ✅ Valid* | *Requires real Supabase |
| **/admin/** | Nav links | `/admin/dashboard`, leads, blog, etc. | ✅ Valid | Auth protected |
| **404** | Back to Home | `/` | ✅ Valid | |
| | Browse Products | `/products` | ✅ Valid | |

---

## 📋 ALL FORMS AUDIT

| Page | Form | Submit action | API route exists | Success state | Notes |
|------|------|--------------|-----------------|---------------|-------|
| `/get-quote` | 3-step quote form | `POST /api/quote` | ✅ Yes | ✅ Thank you + optional WhatsApp | Zod validation all steps; fails if Supabase env missing |
| `/contact` | Contact enquiry form | `POST /api/contact` | ✅ Yes | ✅ Success message + WhatsApp link | On error, still offers WhatsApp fallback |
| `/products/[slug]` | ProductQuoteForm | `POST /api/contact` | ✅ Yes | ✅ Inline success message | Compact variant on location pages too |
| `/pune/*`, `/mumbai/*` | ProductQuoteForm (sidebar) | `POST /api/contact` | ✅ Yes | ✅ Same as above | |
| `/admin/login` | Admin login | Supabase `signInWithPassword` | N/A (client auth) | Redirect to dashboard | Not a REST API form |
| `/admin/leads/[id]` | Follow-up notes | Server action (Supabase) | N/A | Inline update | Admin only |
| `/admin/blog/*` | Blog CRUD | Server actions | N/A | Admin UI | Admin only |
| `/admin/gallery` | Gallery upload | Server actions | N/A | Admin UI | Admin only |
| Global | WhatsApp floating button | External `wa.me` | N/A | Opens WhatsApp | Not a form — works |
| — | Newsletter signup | — | ❌ None | — | **Not present on site** |

---

## 📋 ALL API ROUTES

| Route | Method | Handler exists | Notes |
|-------|--------|---------------|-------|
| `/api/quote` | POST | ✅ Yes | Inserts to Supabase `leads`; optional Resend email; returns `whatsappUrl` if checkbox checked |
| `/api/contact` | POST | ✅ Yes | Inserts to Supabase `leads`; optional Resend email; always returns `whatsappUrl` |
| `/api/track` | POST | ✅ Yes | Inserts page views to `page_views`; silently succeeds if Supabase missing |
| `/api/health` | GET | ❌ **Missing** | Needed for uptime monitoring |

**Security notes:**
- No hardcoded API keys in source code — all via `process.env`.
- No webhook signature verification routes present.
- API routes log request bodies to console (`console.log`) — may leak PII in server logs.

---

## 📋 ENVIRONMENT VARIABLES USED

| Variable | Used in | Has fallback | Notes |
|----------|---------|-------------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | API routes, admin, queries | ⚠️ Placeholder in `env.ts` | API routes: **no fallback** (500 if missing). `env.ts`: falls back to `placeholder.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Middleware, client, queries | ⚠️ Placeholder | `placeholder-anon-key` if unset |
| `SUPABASE_SERVICE_ROLE_KEY` | `/api/quote`, `/api/contact`, `/api/track` | ❌ None | Required for form submissions |
| `RESEND_API_KEY` | `/api/quote`, `/api/contact` | ❌ None (optional) | Email skipped if unset |
| `RESEND_FROM` | API email sends | ✅ Default onboarding@resend.dev | |
| `RESEND_TO` | API email sends | ✅ Falls back to `CONTACT_EMAIL` → `COMPANY.email` | |
| `CONTACT_EMAIL` | API email sends, admin settings | ✅ Falls back to `COMPANY.email` | |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | constants, API routes | ✅ `919370606017` | |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | `layout.tsx` metadata | ❌ Omitted if unset | Not a hardcoded placeholder |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | `layout.tsx` metadata | ❌ Omitted if unset | |
| `NEXT_PUBLIC_SITE_URL` | — | — | **Not used in code**; docs only. `COMPANY.website` used instead |

---

## 📋 IMAGES & ASSETS CHECK

| File/URL | Referenced in | Exists in /public | Notes |
|----------|--------------|------------------|-------|
| `/og-image.jpg` | `src/app/layout.tsx` OpenGraph | ✅ Yes | |
| `/brochure/jai-shree-brochure.pdf` | Navbar, Footer, ProductPageClient | ✅ Yes | Catalogue download works |
| `/favicon.ico` | Browser default request | ❌ No | Missing |
| `/logo-navbar.svg/png` | — | ✅ Yes | Unused — Logo is inline SVG |
| `/logo-dark.svg/png` | — | ✅ Yes | Unused |
| `/logo-transparent.svg/png` | — | ✅ Yes | Unused |
| `/logo-icon-only.svg/png` | — | ✅ Yes | Unused |
| Gallery `item.image_url` | GalleryPage (when DB populated) | Supabase remote | Remote pattern configured in `next.config.ts` |
| Blog `cover_image_url` | blog pages (when DB populated) | Supabase remote | Falls back to no image for seed posts |
| YouTube thumbnail | VideoSection (if youtubeId set) | External | Not used — youtubeId empty |
| Leaflet marker icon | IndiaMap.tsx | External unpkg | CDN URL |
| ISO certificate PDF | CertificationsPage | ❌ No | Download disabled |
| Gallery placeholders | GalleryPage | N/A | Camera icon + text only |

---

## 📋 REDIRECTS CONFIGURED (`next.config.ts`)

| Source | Destination | Status |
|--------|-------------|--------|
| `/products/wire-mesh` | `/products` | ✅ 301 |
| `/products/welded-mesh` | `/products` | ✅ 301 |
| `/products/demister-pad` | `/products` | ✅ 301 |
| `/products/aluminum-grill-profile` | `/products` | ✅ 301 |
| `/pune/wire-mesh-manufacturers` | `/pune/perforated-sheet-manufacturers` | ✅ 301 |
| `/mumbai/wire-mesh-manufacturers` | `/mumbai/perforated-sheet-manufacturers` | ✅ 301 |

**Pages linked but with no route (would 404 without redirect):**
- `/mumbai/expanded-metal-manufacturers` — **no redirect, no page**

---

## 📋 PAGE-BY-PAGE SCOPE CHECK

| Page | Route exists | Content complete | Issues |
|------|-------------|------------------|--------|
| `/` | ✅ | Mostly | Video placeholder; gallery N/A on home |
| `/about` | ✅ | ✅ | ISO download link misleading |
| `/products` | ✅ | ✅ | — |
| `/products/perforated-sheets` | ✅ | ✅ | — |
| `/products/laser-cutting` | ✅ | ✅ | — |
| `/products/expanded-metal` | ✅ | ✅ | — |
| `/products/turret-punching` | ✅ | ✅ | — |
| `/products/precision-sheet-leveling` | ✅ | ✅ | — |
| `/products/custom-components` | ✅ | ✅ | — |
| `/industries/automobile` | ✅ | ✅ | — |
| `/industries/construction` | ✅ | ✅ | — |
| `/industries/food-beverage` | ✅ | ✅ | — |
| `/industries/pharmaceutical` | ✅ | ✅ | — |
| `/industries/petrochemical` | ✅ | ✅ | — |
| `/industries/architecture-interior` | ✅ | ✅ | — |
| `/industries/sugar-industry` | ✅ | ✅ | — |
| `/industries/mining-quarrying` | ✅ | ✅ | — |
| `/pune/perforated-sheet-manufacturers` | ✅ | ✅ | Map embed placeholder coords |
| `/pune/laser-cutting-services` | ✅ | ✅ | Map embed placeholder coords |
| `/pune/expanded-metal-manufacturers` | ✅ | ✅ | Map embed placeholder coords |
| `/mumbai/perforated-sheet-manufacturers` | ✅ | ✅ | Map embed placeholder coords |
| `/mumbai/laser-cutting-services` | ✅ | ✅ | Map embed placeholder coords |
| `/mumbai/expanded-metal-manufacturers` | ❌ **404** | — | **Route missing** |
| `/calculator` | ✅ | ✅ | No quote CTA |
| `/blog` | ✅ | ✅ | — |
| `/blog/how-to-calculate-open-area-perforated-sheet` | ✅ | ✅ Full article | — |
| `/blog/expanded-metal-vs-perforated-sheet` | ✅ | ✅ Full article | — |
| `/blog/laser-cutting-vs-turret-punching` | ✅ | ✅ Full article | — |
| `/blog/wire-mesh-specification-guide` | ✅ | ✅ Full article | Slug/title mismatch |
| `/gallery` | ✅ | 🟠 Placeholders | No real photos without Supabase |
| `/contact` | ✅ | ✅ | Form needs Supabase |
| `/get-quote` | ✅ | ✅ | Form needs Supabase |
| `/group` | ✅ | ✅ | — |
| `/certifications` | ✅ | 🟠 Partial | ISO download disabled |
| `/landing` | ✅ | ✅ | Separate layout, no global nav |
| `/admin` | ✅ | ✅ | Auth + Supabase required |
| `/clients` | ✅ | 🟠 Placeholders | Not in main nav |

---

## 🎯 TOP 15 PRIORITY FIXES

Ranked by user impact:

1. **[CRITICAL]** Create `/mumbai/expanded-metal-manufacturers` page (or add redirect) — currently 404.
2. **[CRITICAL]** Ensure `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` are set in production — forms fail without them.
3. **[CRITICAL]** Fix `isSupabaseConfigured()` to detect placeholder values — prevents silent gallery/blog DB failures.
4. **[CRITICAL]** Fix VideoSection play button — add YouTube ID or remove clickable affordance until video exists.
5. **[HIGH]** Upload real product photos to Supabase gallery — replace placeholder grid on `/gallery`.
6. **[HIGH]** Add `/api/health` GET endpoint for uptime monitoring.
7. **[HIGH]** Add real LinkedIn/Facebook URLs to `FOOTER.social` (or remove icons).
8. **[HIGH]** Add ISO certificate PDF and enable download on `/certifications` + fix About page CTA.
9. **[HIGH]** Replace Google Maps embed placeholder URLs (`0x0`) with real place embeds for Pune & Mumbai facilities.
10. **[HIGH]** Add `favicon.ico` to `public/` or `src/app/icon.ico`.
11. **[MEDIUM]** Rename blog slug `wire-mesh-specification-guide` → `perforated-sheet-specification-guide` (with redirect).
12. **[MEDIUM]** Add industry detail pages for `paper-industry` and `agriculture`, or remove from `INDUSTRIES` constant.
13. **[MEDIUM]** Fix branch website URLs (Shree Weld Mesh, Jai Shree Perforator Palghar).
14. **[MEDIUM]** Set `RESEND_API_KEY` in production so quote/contact emails reach the team.
15. **[LOW]** Add `/get-quote` CTA to calculator page; add `/clients` to footer or remove from sitemap.

---

*End of diagnostic report. No files were modified except this report.*
