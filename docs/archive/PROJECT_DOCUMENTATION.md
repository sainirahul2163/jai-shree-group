# Jai Shree Group — Complete Project Documentation
Last Updated: June 30, 2026

---

> **Purpose:** Enable any developer or AI IDE (Cursor, Claude, Copilot) to understand, maintain, and extend the Jai Shree Group website with **zero additional context**.

---

## 1. PROJECT OVERVIEW

### Business Information

| Field | Value |
|-------|-------|
| **Company Name** | Jai Shree Group |
| **Brand Names** | Jai Shree Group, Shree Perforators, Jai Shree Metal Perforators, Jai Shree Filtration, Jai Shree Industries, Jai Shree Perforator, Shree Weld Mesh |
| **Tagline** | Precision in Every Perforation |
| **Founded** | 1970 (Delhi) by Mr. Tejaram Jangid |
| **ISO Certification** | ISO 9001:2015 (Bureau Veritas) |
| **Manufacturing Units** | 6 (3 in Pune Talawade, 3 in Mumbai region) |
| **Primary Phone** | +91 9370606017 |
| **Primary Email** | shreeperforator@gmail.com |
| **WhatsApp** | +91 9370606017 (`919370606017` for wa.me links) |
| **HQ Address** | Gat No. 94, Near Sonawane Wasti, Jyotibanagar, Talawade, Pune - 411062 |
| **Website** | https://jaishreegroup.in |
| **Client Contact** | Kanishq Jangid |

Jai Shree Group is an ISO 9001:2015 certified Indian metal manufacturing company specializing in perforated sheets, expanded metal, fiber laser cutting, CNC turret punching, precision sheet leveling, and custom metal components. Operating since 1970 with six manufacturing units across Pune and Mumbai, the company serves automobile, construction, pharmaceutical, petrochemical, food processing, sugar, mining, and architecture industries. The website is the primary lead generation channel, SEO platform, and brand authority asset.

### Project Information

| Field | Value |
|-------|-------|
| **Project Type** | Next.js 16 App Router website (React 19, TypeScript) |
| **Purpose** | Lead generation, SEO dominance, brand authority, technical resource (open area calculator) |
| **GitHub Repo** | https://github.com/sainirahul2163/jai-shree-group.git |
| **Staging URL** | Vercel preview deployments on PR; default preview: https://jai-shree-group.vercel.app |
| **Production Domain** | https://jaishreegroup.in |
| **Admin URL** | https://jaishreegroup.in/admin/login |
| **Admin Auth** | Supabase Auth (email/password — create user in Supabase Dashboard) |
| **Agency** | Viralbizz (Rahul + Subhash) |

---

## 2. TECH STACK

### Core Framework

| Package | Version | Purpose |
|---------|---------|---------|
| next | 16.2.7 | App Router framework, SSR/SSG, API routes, Metadata API |
| react | 19.2.4 | UI library |
| react-dom | 19.2.4 | DOM rendering |
| typescript | ^5 | Type safety |

### UI & Styling

| Package | Version | Purpose |
|---------|---------|---------|
| tailwindcss | ^4 | Utility-first CSS v4 |
| @tailwindcss/postcss | ^4 | PostCSS plugin for Tailwind v4 |
| @tailwindcss/typography | ^0.5.20 | Prose styles for blog markdown |
| tailwindcss-animate | ^1.0.7 | Animation utility classes |
| tw-animate-css | ^1.4.0 | Additional animation CSS |
| class-variance-authority | ^0.7.1 | Component variant API (shadcn) |
| clsx | ^2.1.1 | Conditional class names |
| tailwind-merge | ^3.6.0 | Merge Tailwind classes without conflicts |
| radix-ui | ^1.5.0 | Headless UI primitives |
| shadcn | ^4.11.0 | Component library CLI/registry |
| lucide-react | ^1.17.0 | Icon library site-wide |

### Animation

| Package | Version | Purpose |
|---------|---------|---------|
| framer-motion | ^12.40.0 | Page transitions, carousel, hero, modals |
| gsap | ^3.15.0 | Advanced animation library |
| @gsap/react | ^2.1.2 | GSAP React hooks |

### 3D & Canvas

| Package | Version | Purpose |
|---------|---------|---------|
| three | ^0.184.0 | 3D rendering (DimpleSheet3D gallery preview) |
| @types/three | ^0.184.1 | Three.js TypeScript types |
| @splinetool/react-spline | ^4.1.0 | Spline 3D integration (available) |
| @splinetool/runtime | ^1.12.97 | Spline runtime |

### Forms & Validation

| Package | Version | Purpose |
|---------|---------|---------|
| react-hook-form | ^7.78.0 | Form state management |
| @hookform/resolvers | ^5.4.0 | Zod resolver for react-hook-form |
| zod | ^4.4.3 | Schema validation for all forms |

### Database & Auth

| Package | Version | Purpose |
|---------|---------|---------|
| @supabase/supabase-js | ^2.108.1 | Supabase client (DB, auth, storage) |
| @supabase/auth-helpers-nextjs | ^0.15.0 | SSR auth in middleware |
| @supabase/auth-ui-react | ^0.4.7 | Auth UI components |
| @supabase/auth-ui-shared | ^0.1.8 | Shared auth UI styles |

### Email

| Package | Version | Purpose |
|---------|---------|---------|
| resend | ^6.12.4 | Transactional email notifications |

### Maps

| Package | Version | Purpose |
|---------|---------|---------|
| leaflet | ^1.9.4 | India map on group/home sections |
| react-leaflet | ^5.0.0 | React bindings for Leaflet |
| @types/leaflet | ^1.9.21 | Leaflet TypeScript types |

### Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| @tailwindcss/postcss | ^4 | PostCSS plugin for Tailwind v4 |
| @types/leaflet | ^1.9.21 | Leaflet TypeScript types |
| @types/node | ^20 | Node.js types |
| @types/react | ^19 | React types |
| @types/react-dom | ^19 | React DOM types |
| eslint | ^9 | Linting |
| eslint-config-next | 16.2.7 | Next.js ESLint rules |
| tailwindcss | ^4 | Utility-first CSS v4 |
| typescript | ^5 | Type safety |

---

## 3. PROJECT STRUCTURE

```
jai-shree-group/
├── public/                     # Static assets at root URL
│   ├── brochure/jai-shree-brochure.pdf
│   ├── og-image.jpg              # Open Graph image 1200×630
│   └── logo-*.png/svg            # Logo assets (Logo.tsx uses inline SVG)
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout, metadata, fonts
│   │   ├── page.tsx              # Home page
│   │   ├── about/                # About page
│   │   ├── products/             # Product index + [slug]
│   │   ├── industries/           # Industry index + [slug]
│   │   ├── blog/                 # Blog index + [slug]
│   │   ├── calculator/           # Open area calculator
│   │   ├── contact/              # Contact page
│   │   ├── get-quote/            # 3-step quote form
│   │   ├── gallery/              # Product gallery
│   │   ├── group/                # 6 manufacturing units
│   │   ├── certifications/       # ISO certification page
│   │   ├── clients/              # Client testimonials
│   │   ├── landing/              # Marketing landing (noindex)
│   │   ├── pune/                 # Pune location SEO (3 pages)
│   │   ├── mumbai/               # Mumbai location SEO (3 pages)
│   │   ├── admin/                # Admin panel (auth protected)
│   │   └── api/                  # quote, contact, track, health
│   ├── components/               # React components by feature
│   ├── data/                     # Static content (products, locations, blog)
│   ├── lib/                      # Utilities, constants, Supabase
│   └── types/                    # TypeScript definitions
├── middleware.ts                 # Admin route protection
├── next.config.ts                # Redirects, image domains, security headers
├── vercel.json                   # Vercel deployment config
└── package.json
```

### Directory Descriptions

- `src/app/` — Next.js App Router — pages, layouts, API routes, sitemap, robots
- `src/app/about/` — About page route
- `src/app/products/` — Product listing and dynamic product detail pages
- `src/app/industries/` — Industry listing and dynamic industry pages
- `src/app/blog/` — Blog index and dynamic article pages
- `src/app/calculator/` — Open area calculator page
- `src/app/contact/` — Contact form page
- `src/app/get-quote/` — 3-step quote wizard page
- `src/app/gallery/` — Product gallery (Supabase-backed)
- `src/app/group/` — 6 manufacturing units page with map
- `src/app/certifications/` — ISO 9001:2015 certification page
- `src/app/clients/` — Client logos and testimonials page
- `src/app/landing/` — Standalone marketing landing page (noindex)
- `src/app/pune/` — Pune location SEO pages (3 routes)
- `src/app/mumbai/` — Mumbai location SEO pages (3 routes)
- `src/app/admin/` — Admin panel — login + dashboard, leads, blog, gallery, testimonials
- `src/app/api/` — REST API routes for forms, tracking, health
- `src/components/home/` — Home page sections — hero, products, about, industries, group, CTA, video
- `src/components/layout/` — Navbar, Footer, Logo, SiteChrome
- `src/components/products/` — Product pages, 3D preview, quote form
- `src/components/quote/` — GetQuotePage 3-step wizard
- `src/components/calculator/` — OpenAreaCalculator with 10 formulas
- `src/components/admin/` — Admin panel UI components
- `src/components/seo/` — JSON-LD schema markup components
- `src/components/shared/` — PageHero, CtaBanner, WhatsAppButton, IndiaMap, PageViewTracker
- `src/components/ui/` — shadcn/ui primitives (button, input, dialog, etc.)
- `src/data/` — Static JSON-like TypeScript data files
- `src/lib/` — Constants, validations, email helpers, Supabase clients
- `public/` — Static assets — brochure PDF, OG image, logo files

---

## 4. ENVIRONMENT VARIABLES

| Variable | Used In | Purpose | Example | Required | Fallback |
|----------|---------|---------|---------|----------|----------|
| NEXT_PUBLIC_SUPABASE_URL | src/lib/supabase/env.ts, middleware, API routes, admin | Supabase project URL | https://xxx.supabase.co | Yes (forms/admin) | None in API routes; env.ts returns empty if unset |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | env.ts, middleware, client.ts | Public anon key for auth/reads | eyJhbG... | Yes | None if unset |
| SUPABASE_SERVICE_ROLE_KEY | api/quote, api/contact, api/track | Server-side DB writes bypassing RLS | eyJhbG... | Yes (forms) | 503 response if missing |
| RESEND_API_KEY | api/quote, api/contact | Send email notifications | re_xxx | Optional | Email skipped silently |
| RESEND_FROM | api/quote, api/contact | From address for Resend | Jai Shree Group <notifications@jaishreegroup.in> | Optional | onboarding@resend.dev |
| RESEND_TO | api/quote, api/contact | Notification recipient override | shreeperforator@gmail.com | Optional | CONTACT_EMAIL → COMPANY.email |
| CONTACT_EMAIL | api routes, admin/settings | Team notification email | shreeperforator@gmail.com | Optional | COMPANY.email |
| NEXT_PUBLIC_WHATSAPP_NUMBER | constants.ts, API routes | WhatsApp number for wa.me | 919370606017 | Optional | 919370606017 |
| NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION | src/app/layout.tsx | Google Search Console verification meta tag | abc123token | Optional | Omitted from metadata |
| NEXT_PUBLIC_BING_SITE_VERIFICATION | src/app/layout.tsx | Bing Webmaster verification meta tag | abc123token | Optional | Omitted from metadata |

### isSupabaseConfigured() — `src/lib/supabase/env.ts`

Returns `true` only when URL and anon key are set, URL contains `.supabase.co`, URL does not contain `placeholder` or `your-supabase`, and anon key length > 30.

### .env.local Template

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=re_your_key
RESEND_FROM=Jai Shree Group Website <notifications@jaishreegroup.in>
RESEND_TO=shreeperforator@gmail.com
CONTACT_EMAIL=shreeperforator@gmail.com
NEXT_PUBLIC_WHATSAPP_NUMBER=919370606017
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-code
NEXT_PUBLIC_BING_SITE_VERIFICATION=your-bing-code
```

---

## 5. DATABASE SCHEMA (Supabase)

### `leads`

**Purpose:** Quote and contact form submissions

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | TEXT | Contact name |
| phone | TEXT | Phone number |
| email | TEXT | Optional email |
| company | TEXT | Company name |
| product_interest | TEXT | Legacy single product field |
| products_selected | TEXT[] | Array of product slugs from quote form |
| message | TEXT | Additional message/requirements |
| specifications | JSONB | Full spec object from quote form |
| material | TEXT | Material selection |
| thickness | TEXT | Thickness value |
| size | TEXT | Legacy size field (unused in UI) |
| quantity | TEXT | Quantity with unit |
| deadline | TEXT | urgent | standard | flexible |
| city | TEXT | Customer city |
| source | TEXT | quote_form | contact_form |
| source_page | TEXT | Referrer page URL |
| status | TEXT | new | contacted | quoted | won | lost |
| notes | TEXT | Admin notes |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Auto-updated via trigger |

**Used by:** Written by: `/api/quote`, `/api/contact`. Read by: admin leads pages.

**RLS Policies:**
- Admin full access (authenticated)
- Public can insert (anon)

### `follow_ups`

**Purpose:** CRM follow-up notes on leads

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| lead_id | UUID FK | References leads.id |
| type | TEXT | Follow-up type |
| notes | TEXT | Follow-up notes |
| followed_up_at | TIMESTAMPTZ | When follow-up occurred |
| created_at | TIMESTAMPTZ | Creation timestamp |

**Used by:** Written/read by: admin LeadDetailClient via server actions.

**RLS Policies:**
- Admin full access (authenticated)

### `blog_posts`

**Purpose:** CMS blog articles

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| title | TEXT | Article title |
| slug | TEXT UNIQUE | URL slug |
| content | TEXT | Markdown/HTML content |
| excerpt | TEXT | Short summary |
| category | TEXT | Category label |
| meta_title | TEXT | SEO title override |
| meta_description | TEXT | SEO description override |
| cover_image_url | TEXT | Supabase storage URL |
| is_published | BOOLEAN | Publish flag |
| published_at | TIMESTAMPTZ | Publish date |
| author | TEXT | Author name |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Auto-updated |

**Used by:** Written by: admin blog CMS. Read by: `/blog`, `/blog/[slug]`, sitemap. Seed data also in `src/data/blog-posts.ts`.

**RLS Policies:**
- Admin full access (authenticated)
- Public read published (anon)

### `gallery_items`

**Purpose:** Product gallery images

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| image_url | TEXT | Supabase storage public URL |
| title | TEXT | Image title |
| description | TEXT | Optional description |
| product_category | TEXT | Product slug filter category |
| is_published | BOOLEAN | Visibility flag |
| sort_order | INTEGER | Display order |
| created_at | TIMESTAMPTZ | Creation timestamp |

**Used by:** Written by: admin gallery CMS. Read by: GalleryPage.

**RLS Policies:**
- Admin full access (authenticated)
- Public read published (anon)

### `testimonials`

**Purpose:** Client testimonials

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| client_name | TEXT | Client contact name |
| company_name | TEXT | Company name |
| industry | TEXT | Industry sector |
| message | TEXT | Testimonial text |
| rating | INTEGER 1-5 | Star rating |
| is_featured | BOOLEAN | Featured on homepage |
| is_published | BOOLEAN | Visibility flag |
| created_at | TIMESTAMPTZ | Creation timestamp |

**Used by:** Written by: admin testimonials CMS. Read by: ClientsPage, landing.

**RLS Policies:**
- Admin full access (authenticated)
- Public read published (anon)

### `page_views`

**Purpose:** Analytics page view tracking

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| page | TEXT | Page path |
| product | TEXT | Optional product slug |
| city | TEXT | Optional city |
| referrer | TEXT | HTTP referrer |
| created_at | TIMESTAMPTZ | View timestamp |

**Used by:** Written by: `/api/track` via PageViewTracker. Read by: admin dashboard.

**RLS Policies:**
- Admin full access (authenticated)
- Public can insert (anon)

### Storage Buckets (create in Supabase Dashboard)

| Bucket | Access | Purpose |
|--------|--------|---------|
| gallery | public | Product gallery images |
| blog-covers | public | Blog post cover images |
| documents | private | ISO certificates, internal docs |

---
## 6. ALL PAGES & ROUTES

### Static Routes

| Route | File | Meta Title | Purpose | Key Components | Schema |
|-------|------|------------|---------|----------------|--------|
| `/` | `src/app/page.tsx` | Perforated Sheet Manufacturers Pune & Mumbai | Jai Shree Group | Home — hero, products, about, industries, group, process, video, CTA | HeroSection, ProductShowcase, ProductsSection, AboutSection, IndustriesSection, GroupSection, ProcessSection, VideoSection, CtaSection | ManufacturingBusiness (GlobalSchema) |
| `/about` | `src/app/about/page.tsx` | About Jai Shree Group | 50+ Years Metal Manufacturing Pune Mumbai | Company history, timeline, leadership, ISO mention | AboutPage, CtaBanner | BreadcrumbList |
| `/products` | `src/app/products/page.tsx` | Perforated Sheets, Laser Cutting & Expanded Metal | Jai Shree Group Products | Product index — 6 active products | ProductsIndexPage | BreadcrumbList |
| `/industries` | `src/app/industries/page.tsx` | Industries We Serve | Metal Manufacturing | Jai Shree Group | Industry index — 8 detail pages | IndustriesIndexPage | No |
| `/calculator` | `src/app/calculator/page.tsx` | Perforated Sheet Open Area Calculator | Jai Shree Group | 10-formula open area calculator tool | OpenAreaCalculator | FAQPage (calculator FAQs) |
| `/contact` | `src/app/contact/page.tsx` | Contact Jai Shree Group | Perforated Sheet Manufacturers Pune | Contact form, branch details, map | ContactPage, ContactPageSchema | ContactPage, LocalBusiness |
| `/get-quote` | `src/app/get-quote/page.tsx` | Get a Free Quote | Perforated Sheets & Metal Fabrication | Jai Shree Group | 3-step quote wizard | GetQuotePage | No |
| `/gallery` | `src/app/gallery/page.tsx` | Product Gallery | Perforated Sheets & Wire Mesh | Jai Shree Group | Supabase gallery with product filters | GalleryPage | No |
| `/group` | `src/app/group/page.tsx` | Our Group | 6 Manufacturing Units Pune & Mumbai | Jai Shree Group | All 6 branches with map | GroupPage, IndiaMap | LocalBusiness |
| `/certifications` | `src/app/certifications/page.tsx` | ISO 9001:2015 Certification | Jai Shree Group Quality Standards | ISO certification details | CertificationsPage | Certification |
| `/clients` | `src/app/clients/page.tsx` | Our Clients | Trusted by Leading Manufacturers | Jai Shree Group | Client logos and testimonials | ClientsPage | No |
| `/blog` | `src/app/blog/page.tsx` | Metal Manufacturing Insights | Blog | Jai Shree Group | Blog index — 4 seed posts | Blog list from BLOG_POSTS + Supabase | No |
| `/landing` | `src/app/landing/page.tsx` | Perforated Sheet Manufacturers Since 1970 | Jai Shree Group | Standalone marketing landing (robots: noindex) | LandingHero, LandingProducts, etc. | No |

### Dynamic Routes — Products

| Route | File | Data Source | Static Params |
|-------|------|-------------|---------------|
| `/products/[slug]` | `src/app/products/[slug]/page.tsx` | `src/data/products.ts` → `PRODUCT_DETAILS` | `generateStaticParams()` from `PRODUCT_SLUGS` (6 slugs) |

Slugs: `perforated-sheets`, `laser-cutting`, `expanded-metal`, `turret-punching`, `precision-sheet-leveling`, `custom-components`

### Dynamic Routes — Industries

| Route | File | Data Source | Static Params |
|-------|------|-------------|---------------|
| `/industries/[slug]` | `src/app/industries/[slug]/page.tsx` | `src/data/industries.ts` → `INDUSTRY_DETAILS` | 8 slugs from `INDUSTRY_SLUGS` |

### Dynamic Routes — Blog

| Route | File | Data Source | Notes |
|-------|------|-------------|-------|
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | `src/data/blog-posts.ts` + Supabase `blog_posts` | Supabase overrides seed when published |

### Dynamic Routes — Location SEO

| Route | File | Data Source |
|-------|------|-------------|
| `/pune/perforated-sheet-manufacturers` | `src/app/pune/perforated-sheet-manufacturers/page.tsx` | `src/data/locations.ts` → `LOCATION_PAGES['pune/perforated-sheet-manufacturers']` |
| `/pune/laser-cutting-services` | `src/app/pune/laser-cutting-services/page.tsx` | `src/data/locations.ts` → `LOCATION_PAGES['pune/laser-cutting-services']` |
| `/pune/expanded-metal-manufacturers` | `src/app/pune/expanded-metal-manufacturers/page.tsx` | `src/data/locations.ts` → `LOCATION_PAGES['pune/expanded-metal-manufacturers']` |
| `/mumbai/perforated-sheet-manufacturers` | `src/app/mumbai/perforated-sheet-manufacturers/page.tsx` | `src/data/locations.ts` → `LOCATION_PAGES['mumbai/perforated-sheet-manufacturers']` |
| `/mumbai/laser-cutting-services` | `src/app/mumbai/laser-cutting-services/page.tsx` | `src/data/locations.ts` → `LOCATION_PAGES['mumbai/laser-cutting-services']` |
| `/mumbai/expanded-metal-manufacturers` | `src/app/mumbai/expanded-metal-manufacturers/page.tsx` | `src/data/locations.ts` → `LOCATION_PAGES['mumbai/expanded-metal-manufacturers']` |

Location pages use `locationMetadata(PATH)` and `renderLocationPage(PATH)` from `src/lib/location-page.tsx`.

### API Routes

#### `POST /api/quote`

- **File:** `src/app/api/quote/route.ts`
- **Purpose:** Save 3-step quote form submission to Supabase `leads` table; optional Resend email; optional WhatsApp URL
- **Request body:**
```json
{
  "name": "string",
  "phone": "string",
  "email": "string (optional)",
  "companyName": "string (optional)",
  "city": "string (optional)",
  "products": ["perforated-sheets", "laser-cutting"],
  "material": "string",
  "thickness": "string",
  "quantity": "string",
  "quantityUnit": "pcs | sqft | kg | sheets",
  "deadline": "urgent | standard | flexible",
  "additionalRequirements": "string (optional)",
  "customComponentNote": "string (optional)",
  "sendWhatsApp": "boolean"
}
```
- **Success response (200):** `{ success: true, leadId: string, whatsappUrl?: string }`
- **Error responses:** 503 if Supabase not configured; 500 on insert failure
- **Dependencies:** Supabase service role, Resend (optional)

#### `POST /api/contact`

- **File:** `src/app/api/contact/route.ts`
- **Purpose:** Save contact/product quote form to `leads` with `source: contact_form`
- **Request body:** Validated by `contactFormSchema` — name, phone, email, company, product, message, city
- **Success (200):** `{ success: true, whatsappUrl: string }`
- **Error:** 503 if Supabase unavailable; 500 on failure

#### `POST /api/track`

- **File:** `src/app/api/track/route.ts`
- **Purpose:** Insert page view into `page_views` table
- **Request body:** `{ page, product?, city?, referrer? }`
- **Response:** `{ success: true }` — fails silently if Supabase unavailable

#### `GET /api/health`

- **File:** `src/app/api/health/route.ts`
- **Purpose:** Uptime monitoring health check
- **Response (200):** `{ status: "ok", timestamp, service: "jai-shree-group", version: "1.0.0" }`

### Admin Routes

| Route | Purpose |
|-------|---------|
| `/admin/login` | Admin login — Supabase email/password |
| `/admin/dashboard` | Overview stats — leads count, page views |
| `/admin/leads` | Leads CRM table with status filters |
| `/admin/leads/[id]` | Lead detail — status update, follow-up notes |
| `/admin/blog` | Blog post list — publish/unpublish |
| `/admin/blog/new` | Create new blog post |
| `/admin/blog/[id]` | Edit existing blog post |
| `/admin/gallery` | Gallery CMS — upload/delete images |
| `/admin/testimonials` | Testimonials CMS |
| `/admin/settings` | Admin settings — contact email display |

All `/admin/*` routes except `/admin/login` are protected by `src/middleware.ts` via Supabase session.

---

## 7. COMPONENTS LIBRARY

Components grouped by directory. All paths relative to `src/components/`.

### `AdminLoginForm` — `admin/AdminLoginForm.tsx`

- **Props:** None
- **Renders:** Email/password login via Supabase signInWithPassword
- **Dependencies:** supabase client
- **Notes:** Redirects to /admin/dashboard on success

### `OpenAreaCalculator` — `calculator/OpenAreaCalculator.tsx`

- **Props:** None
- **Renders:** Interactive 10-calculator open area tool with shape/arrangement picker
- **Dependencies:** CALCULATOR_CONFIG (ids 1-10), calculator-faqs data
- **Notes:** Rebuilt June 29-30 2026 with all 10 industry-standard formulas

### `HeroSection` — `home/HeroSection.tsx`

- **Props:** None
- **Renders:** Hero with 3-line H1 (PERFORATED SHEET / MANUFACTURERS / SINCE 1970), CTAs, ProductShowcase carousel, MagneticDotsBackground canvas
- **Dependencies:** ProductShowcase, MagneticDotsBackground, framer-motion, constants
- **Notes:** H1 updated June 30 2026 to three-line format

### `MagneticDotsBackground` — `home/MagneticDotsBackground.tsx`

- **Props:** containerRef: RefObject<HTMLElement | null>
- **Renders:** Canvas-based dot grid with mouse magnetic repulsion effect on hero
- **Dependencies:** Canvas API, requestAnimationFrame
- **Notes:** Replaces previous FloatingParticles hex grid

### `ProductShowcase` — `home/ProductShowcase.tsx`

- **Props:** None
- **Renders:** Animated 6-product carousel card with auto-rotate (3.5s), hover pause, progress bar, dot pills, in-card arrows
- **Dependencies:** framer-motion AnimatePresence, PRODUCTS constant
- **Notes:** Carousel animation improved June 29 2026

### `VideoSection` — `home/VideoSection.tsx`

- **Props:** None
- **Renders:** Factory tour section — shows Coming Soon modal on play click when no video configured
- **Dependencies:** COMPANY_VIDEO constant, Dialog
- **Notes:** youtubeId and localVideo empty — client to provide video

### `Footer` — `layout/Footer.tsx`

- **Props:** None
- **Renders:** 4-column footer — company, products, quick links, contact, social icons
- **Dependencies:** FOOTER, PRODUCTS, COMPANY
- **Notes:** LinkedIn/Facebook/Instagram now real URLs (June 30 fix)

### `Navbar` — `layout/Navbar.tsx`

- **Props:** None
- **Renders:** Sticky nav with products dropdown, mobile sheet menu, Get Quote CTA, catalogue download
- **Dependencies:** NAV_LINKS, BROCHURE_URL, Logo
- **Notes:** Products dropdown lists all 6 active products

### `SiteChrome` — `layout/SiteChrome.tsx`

- **Props:** children: React.ReactNode
- **Renders:** Wraps pages with Navbar, Footer, WhatsAppButton, PageViewTracker (excludes /admin, /landing)
- **Dependencies:** Navbar, Footer, WhatsAppButton, PageViewTracker
- **Notes:** Landing page uses own nav

### `ProductPageClient` — `products/ProductPageClient.tsx`

- **Props:** product: ProductDetail
- **Renders:** Full product page — specs table, patterns, FAQs, applications, ProductQuoteForm, related products
- **Dependencies:** ProductDetail type, BreadcrumbSchema, ProductQuoteForm
- **Notes:** Size fields removed per client request

### `ProductQuoteForm` — `products/ProductQuoteForm.tsx`

- **Props:** productSlug?: string, variant?: 'default' | 'compact', className?: string
- **Renders:** Inline quote form POST to /api/contact
- **Dependencies:** react-hook-form, contactFormSchema
- **Notes:** Used on product and location pages

### `GetQuotePage` — `quote/GetQuotePage.tsx`

- **Props:** None
- **Renders:** 3-step quote wizard with smart product incompatibility rules
- **Dependencies:** PRODUCTS, MATERIALS, quoteFormSchema, /api/quote
- **Notes:** INCOMPATIBLE matrix documented in Section 15

### `GlobalSchema` — `seo/GlobalSchema.tsx`

- **Props:** None
- **Renders:** Site-wide JSON-LD ManufacturingBusiness schema in root layout
- **Dependencies:** COMPANY, PRODUCTS, SEO constants
- **Notes:** Includes hasOfferCatalog with all 6 products

### `WhatsAppButton` — `shared/WhatsAppButton.tsx`

- **Props:** None
- **Renders:** Fixed floating WhatsApp button bottom-right
- **Dependencies:** COMPANY.whatsapp, whatsappUrl helper
- **Notes:** Hidden on /admin and /landing routes

### All Component Files

| Component | Path | Type |
|-----------|------|------|
| AboutPage | `about/AboutPage.tsx` | Client |
| AdminShell | `admin/AdminShell.tsx` | Client |
| BlogAdminClient | `admin/BlogAdminClient.tsx` | Client |
| BlogEditorClient | `admin/BlogEditorClient.tsx` | Client |
| BlogEditorForm | `admin/BlogEditorForm.tsx` | Client |
| GalleryAdminClient | `admin/GalleryAdminClient.tsx` | Client |
| LeadDetailClient | `admin/LeadDetailClient.tsx` | Client |
| LeadsTable | `admin/LeadsTable.tsx` | Client |
| StatusBadge | `admin/StatusBadge.tsx` | Server |
| TestimonialsAdminClient | `admin/TestimonialsAdminClient.tsx` | Client |
| BlogArticleContent | `blog/BlogArticleContent.tsx` | Server |
| CertificationsPage | `certifications/CertificationsPage.tsx` | Client |
| ClientsPage | `clients/ClientsPage.tsx` | Client |
| ContactPage | `contact/ContactPage.tsx` | Client |
| GalleryPage | `gallery/GalleryPage.tsx` | Client |
| GroupPage | `group/GroupPage.tsx` | Client |
| AboutSection | `home/AboutSection.tsx` | Client |
| CtaSection | `home/CtaSection.tsx` | Client |
| GroupSection | `home/GroupSection.tsx` | Client |
| IndustriesSection | `home/IndustriesSection.tsx` | Client |
| ProcessSection | `home/ProcessSection.tsx` | Client |
| ProductsSection | `home/ProductsSection.tsx` | Client |
| TrustBar | `home/TrustBar.tsx` | Client |
| IndustriesIndexPage | `industries/IndustriesIndexPage.tsx` | Client |
| IndustryPageClient | `industries/IndustryPageClient.tsx` | Client |
| LandingCTA | `landing/LandingCTA.tsx` | Client |
| LandingCapabilities | `landing/LandingCapabilities.tsx` | Client |
| LandingHero | `landing/LandingHero.tsx` | Client |
| LandingIndustries | `landing/LandingIndustries.tsx` | Client |
| LandingLocations | `landing/LandingLocations.tsx` | Client |
| LandingMarquee | `landing/LandingMarquee.tsx` | Client |
| LandingNav | `landing/LandingNav.tsx` | Client |
| LandingProcess | `landing/LandingProcess.tsx` | Client |
| LandingProducts | `landing/LandingProducts.tsx` | Client |
| LandingStats | `landing/LandingStats.tsx` | Client |
| LandingStory | `landing/LandingStory.tsx` | Client |
| LandingTestimonials | `landing/LandingTestimonials.tsx` | Client |
| ScrollProgress | `landing/ScrollProgress.tsx` | Client |
| Logo | `layout/Logo.tsx` | Client |
| LocationPageClient | `location/LocationPageClient.tsx` | Client |
| DimpleSheet3D | `products/DimpleSheet3D.tsx` | Client |
| PerforationPatterns | `products/PerforationPatterns.tsx` | Client |
| ProductsIndexPage | `products/ProductsIndexPage.tsx` | Client |
| BlogPostingSchema | `seo/BlogPostingSchema.tsx` | Server |
| BreadcrumbSchema | `seo/BreadcrumbSchema.tsx` | Server |
| ContactPageSchema | `seo/ContactPageSchema.tsx` | Server |
| CtaBanner | `shared/CtaBanner.tsx` | Client |
| IndiaMap | `shared/IndiaMap.tsx` | Client |
| IndiaMapLoader | `shared/IndiaMapLoader.tsx` | Client |
| PageHero | `shared/PageHero.tsx` | Client |
| PageViewTracker | `shared/PageViewTracker.tsx` | Client |
| accordion | `ui/accordion.tsx` | Client |
| badge | `ui/badge.tsx` | Server |
| button | `ui/button.tsx` | Server |
| card | `ui/card.tsx` | Server |
| dialog | `ui/dialog.tsx` | Client |
| input | `ui/input.tsx` | Server |
| label | `ui/label.tsx` | Client |
| navigation-menu | `ui/navigation-menu.tsx` | Server |
| select | `ui/select.tsx` | Client |
| sheet | `ui/sheet.tsx` | Client |
| tabs | `ui/tabs.tsx` | Client |
| textarea | `ui/textarea.tsx` | Server |

---

## 8. DATA FILES

| File | Contents | Interface | Consumed By |
|------|----------|-----------|-------------|
| `src/data/products.ts` | ProductDetail records for all 6 products — specs, FAQs, SEO meta, materials, patterns | ProductDetail type | ProductPageClient, products/[slug]/page.tsx, sitemap |
| `src/data/locations.ts` | 6 location SEO page definitions (Pune×3, Mumbai×3) | LocationPageData type | location-page.tsx, sitemap, location routes |
| `src/data/industries.ts` | 8 industry detail pages | IndustryDetail type | industries/[slug]/page.tsx, IndustriesIndexPage |
| `src/data/blog-posts.ts` | 4 seed blog posts with full markdown content | BlogPostSeed type | blog pages, constants BLOG_POSTS export, sitemap |
| `src/data/branches.ts` | Branch map helpers and extended branch data | Branch helpers | GroupPage, ContactPage |
| `src/data/about.ts` | About page timeline, stats, leadership bios | About data objects | AboutPage |
| `src/data/landing.ts` | Landing page copy, stats, marquee text | Landing content | landing page components |
| `src/data/calculator-faqs.ts` | FAQ accordion for calculator page | FAQ array | OpenAreaCalculator, calculator page |

---
## 9. CONSTANTS & CONFIGURATION

Source: `src/lib/constants.ts`

### COMPANY Object

```typescript
name: "Jai Shree Group"
tagline: "Precision in Every Perforation"
founded: "1970"
founder: "Mr. Tejaram Jangid"
foundedIn: "Delhi"
experience: "50+"
iso: "ISO 9001:2015"
email: "shreeperforator@gmail.com"
phone: "+91 9370606017"
whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919370606017"
address: "Gat No. 94, Near Sonawane Wasti, Jyotibanagar, Talawade, Pune - 411062"
website: "https://jaishreegroup.in"
locations: ["Pune (Talawade)", "Mumbai (Bhayander, Palghar)"]
manufacturingUnits: 6
```

### BRANCHES Array (6 units)

| # | Name | Slug | Area | City | Phone | Email | Website |
|---|------|------|------|------|-------|-------|---------|
| 1 | Jai Shree Metal Perforators | jai-shree-metal-perforators | Talawade | Pune | +91 9320204156 | jsmppune@gmail.com | www.metalperforatedsheets.com |
| 2 | Shree Perforators | shree-perforators | Talawade | Pune | +91 9370606017 | shreeperforator@gmail.com | www.shreeperforators.com |
| 3 | Shree Weld Mesh | shree-weld-mesh | Talawade | Pune | +91 9049456019 | balajiwelded@gmail.com | www.shreeperforators.com |
| 4 | Jai Shree Filtration | jai-shree-filtration | Masjid Bunder | Mumbai | +91 9320204151 | inderjangid@gmail.com | www.jaishreefiltration.com |
| 5 | Jai Shree Industries | jai-shree-industries | Bhayander | Mumbai | +91 8181815592 | inderjangid@gmail.com | www.jaishreefiltration.com |
| 6 | Jai Shree Perforator | jai-shree-perforator | Palghar | Maharashtra | +91 9320204151 | inderjangid@gmail.com | www.jaishreefiltration.com |

**Note:** Dev Shree and Chandan units were removed — site documents **6 units only**, not 8.

### PRODUCTS Array (6 active)

| Name | Slug | Description | Max Spec | Materials |
|------|------|-------------|----------|-----------|
| Perforated Sheets | `perforated-sheets` | CNC & Turret perforation in all metals. Up to 12mm thickness. | 12mm | Stainless Steel, MS, GI, Aluminum, Copper, Brass |
| Laser Cutting | `laser-cutting` | Fiber laser cutting for any custom drawing. Up to 14mm thickness. | 14mm | SS, MS, Aluminum, Copper, Brass, Titanium |
| Expanded Metal | `expanded-metal` | Diamond, square & hexagonal patterns. Up to 6mm thick. | 6mm | SS, MS, GI, Brass, Copper, Aluminum, Titanium |
| Turret Punching | `turret-punching` | CNC turret punching. Any hole shape. | CNC Turret | SS, MS, GI, Aluminum, Copper, Brass |
| Precision Sheet Leveling | `precision-sheet-leveling` | Bow/warpage control for perforated and laser cut sheets. | Up to 5mm | All Metals |
| Custom Components | `custom-components` | Custom-engineered metal components per drawing. | Custom | SS, MS, GI, Aluminum, Brass, Copper |

**Removed products** (301 redirect to `/products`): wire-mesh, welded-mesh, demister-pad, aluminum-grill-profile

### NAV_LINKS

- Home → `/`
- About → `/about`
- Industries → `/industries`
- Our → `Group /group`
- Calculator → `/calculator`
- Gallery → `/gallery`
- Contact → `/contact`

### FOOTER Object

- **description:** ISO 9001:2015 certified manufacturer of perforated sheets, wire mesh & expanded metal. Serving India since 1970.
- **copyright:** © 2026 Jai Shree Group. All rights reserved.
- **certification:** ISO 9001:2015 Certified | Pune & Mumbai, India
- **social:** LinkedIn (https://www.linkedin.com/company/jai-shree-group/), Facebook (https://www.facebook.com/jaishreegroup/), Instagram (https://www.instagram.com/jaishreegroup/)
- **quickLinks:** About, Our Group, Industries, Calculator, Gallery, Certifications, Contact, Get Quote
- **buttons:** Download Catalogue → `/brochure/jai-shree-brochure.pdf`, WhatsApp Us → wa.me

### Other Constants

- **MATERIALS:** Stainless Steel, MS, GI, Aluminum, Copper, Brass, Titanium, PVC, Nickel — **Carbon Steel removed** per client request
- **STATS:** 50+ Years, 6 Manufacturing Units, ISO 9001:2015, **Global Delivery** (not Pan India)
- **DELIVERY_CITIES:** Mumbai, Pune, Nashik, Nagpur, Indore, Bangalore, Chennai, Delhi
- **DESIGN_TOKENS:** background #0A0A0A, primary #E8521A, surface #111111
- **BROCHURE_URL:** `/brochure/jai-shree-brochure.pdf`
- **COMPANY_VIDEO:** youtubeId empty, localVideo empty — factory tour pending

---

## 10. ACTIVE PRODUCTS (6)

### Perforated Sheets (`perforated-sheets`)

- **Meta Title:** Perforated Sheet Manufacturer Pune Mumbai | Jai Shree
- **Meta Description:** Leading perforated sheet manufacturer in Pune & Mumbai. CNC turret perforated sheet manufacturing up to 12mm. Export & global delivery. ISO 9001:2015. Get quote.
- **H1:** Perforated Sheet Manufacturer — Pune & Mumbai
- **Materials:** Stainless Steel, MS, GI, Aluminum, Copper, Brass, Titanium, PVC
- **Thickness Range:** Up to 12mm
- **Key Specifications:** Max Thickness 12mm; Hole Diameter up to thickness; CNC/Turret/Multi/Coil/Laser categories; Painted/Polished/Electro Plating finishes
- **FAQ Questions:**
  - Max thickness? 12mm
  - Materials? SS, MS, GI, Al, Cu, Brass, Ti, PVC
  - Custom patterns? Yes via R&D dies
  - Pune/Mumbai supply? 3 units each region
- **Location Pages:** pune/perforated-sheet-manufacturers, mumbai/perforated-sheet-manufacturers
- **Industries Served:** Automobile, Construction, Pharmaceutical, Food, Sugar, Mining, Architecture

### Laser Cutting (`laser-cutting`)

- **Meta Title:** Laser Cutting Services Pune & Mumbai | Jai Shree Group
- **Meta Description:** Professional fiber laser cutting services in Pune & Mumbai. Up to 14mm thickness, any metal, any drawing. ISO certified. CNC precision. Get free quote today.
- **H1:** Laser Cutting Services — Pune & Mumbai
- **Materials:** SS, MS, Aluminum, GI, Copper, Brass, Titanium
- **Thickness Range:** Up to 14mm
- **Key Specifications:** Fiber Laser; DXF/DWG drawings; Turret+Laser combo for cost saving; Bow/warpage control
- **FAQ Questions:**
  - Max thickness 14mm
  - Custom drawings accepted DXF/DWG
  - Turret+Laser advantage cost saving
  - Pune facility Talawade
  - Turnaround 2-5 days
- **Location Pages:** pune/laser-cutting-services, mumbai/laser-cutting-services
- **Industries Served:** Aerospace, Automotive, Electronics, Medical, Architecture

### Expanded Metal (`expanded-metal`)

- **Meta Title:** Expanded Metal Manufacturers Pune Mumbai | Jai Shree
- **Meta Description:** Expanded mesh manufacturers in Pune & Mumbai. Diamond, square, hexagonal patterns. Up to 6mm thick. Export & global delivery. ISO certified. Get quote.
- **H1:** Expanded Metal Manufacturer — Pune & Mumbai
- **Materials:** SS, MS, Brass, Copper, Aluminum, GI, Titanium, Nickel
- **Thickness Range:** Up to 6mm
- **Key Specifications:** Diamond/Square/Hex/Grating/Half Round patterns; Widths 900/1250/1500mm
- **FAQ Questions:**
  - What is expanded metal?
  - Patterns: Diamond, Square, Hex, Grating, Half Round
  - Max thickness 6mm
  - vs perforated sheet comparison
- **Location Pages:** pune/expanded-metal-manufacturers, mumbai/expanded-metal-manufacturers
- **Industries Served:** Construction, Architecture, Mining, Automobile

### Turret Punching (`turret-punching`)

- **Meta Title:** CNC Turret Punching Services Pune | Jai Shree Group
- **Meta Description:** CNC turret perforated sheet manufacturing in Pune & Mumbai. Any hole shape in SS, MS, GI, Aluminum. Combined with laser for cost saving. ISO certified. Get free quote.
- **H1:** CNC Turret Punching — Pune
- **Materials:** SS, MS, GI, Aluminum, Brass, Copper
- **Thickness Range:** Various (combined with laser for thick/complex)
- **Key Specifications:** Round/Square/Rect/Oblong/Hex/Conical/Custom holes; CNC Turret; Special R&D dies
- **FAQ Questions:**
  - Hole shapes available
  - Turret vs Laser cost advantage
  - Custom dies for bulk orders
  - Materials list
  - Job work in Pune
- **Location Pages:** None dedicated — covered under Pune perforated pages
- **Industries Served:** Industrial panels, architectural, filtration

### Precision Sheet Leveling (`precision-sheet-leveling`)

- **Meta Title:** Precision Sheet Leveling Pune & Mumbai | Jai Shree
- **Meta Description:** Precision sheet leveling and flattening services in Pune. Bow and warpage correction for perforated sheets and laser cut parts. All metals. ISO certified. Get quote.
- **H1:** Precision Sheet Leveling — Pune & Mumbai
- **Materials:** All Metals
- **Thickness Range:** Up to 5mm
- **Key Specifications:** Roller/tension leveling; Post-perforation and post-laser; Customer tolerance specs
- **FAQ Questions:**
  - Why leveling needed after perforation
  - All metals supported
  - Standalone job work available
  - Flatness tolerance per customer spec
- **Location Pages:** None dedicated
- **Industries Served:** Automotive, Architecture, Precision Engineering

### Custom Components (`custom-components`)

- **Meta Title:** Custom Metal Components Manufacturer Pune | Jai Shree
- **Meta Description:** Custom metal component manufacturers in Pune. Special dies, embossed plates, huller screens, herringbone screens, custom perforation. Any drawing, any metal. ISO certified.
- **H1:** Custom Metal Components — Pune
- **Materials:** SS, MS, GI, Aluminum, Brass, Copper
- **Thickness Range:** Per drawing
- **Key Specifications:** Embossed plates, huller screens, herringbone screens, dimple de-stoners, test sieves; DXF/DWG/sample accepted
- **FAQ Questions:**
  - Custom drawing accepted
  - MOQ depends on complexity
  - Lead time 5-15 days
  - All hole shapes via special dies
- **Location Pages:** None dedicated
- **Industries Served:** Sugar, Food, Mining, OEM parts

---

## 11. LOCATION SEO PAGES (6)

| Route | City | Product | H1 | Meta Title | Map Coords | Branch | Schema |
|-------|------|---------|----|-----------:|------------|--------|--------|
| `/pune/perforated-sheet-manufacturers` | Pune | Perforated Sheets | Perforated Sheet Manufacturers in Pune | Perforated Sheet Manufacturers Pune | CNC Perforation Talawade | Jai Shree Group | 18.68313, 73.78999 (Talawade embed) | Jai Shree Metal Perforators — Talawade | LocalBusiness + FAQPage |
| `/pune/laser-cutting-services` | Pune | Laser Cutting | Laser Cutting Services in Pune | Laser Cutting Services Pune | Fiber Laser 14mm | Jai Shree Group Talawade | 18.68313, 73.78999 | Jai Shree Metal Perforators — Talawade | LocalBusiness + FAQPage |
| `/pune/expanded-metal-manufacturers` | Pune | Expanded Metal | Expanded Metal Manufacturers in Pune | Expanded Metal Manufacturers Pune | Diamond & Hex Patterns | Jai Shree Group | 18.68313, 73.78999 | Jai Shree Metal Perforators — Talawade | LocalBusiness + FAQPage |
| `/mumbai/perforated-sheet-manufacturers` | Mumbai | Perforated Sheets | Perforated Sheet Manufacturers in Mumbai | Perforated Sheet Manufacturers Mumbai | Bhayander & Masjid Bunder | Jai Shree Group | 19.34521, 72.85452 (Bhayander embed) | Jai Shree Industries — Bhayander | LocalBusiness + FAQPage |
| `/mumbai/laser-cutting-services` | Mumbai | Laser Cutting | Laser Cutting Services in Mumbai | Laser Cutting Services Mumbai | Fiber Laser Metal Cutting | Jai Shree Group | Palghar unit coords | Jai Shree Perforator — Palghar | LocalBusiness + FAQPage |
| `/mumbai/expanded-metal-manufacturers` | Mumbai | Expanded Metal | Expanded Metal Manufacturers in Mumbai | Expanded Metal Manufacturers in Mumbai | Jai Shree Group | 19.34521, 72.85452 | Jai Shree Industries — Bhayander | LocalBusiness + FAQPage |

Wire mesh location pages redirect 301 to perforated sheet equivalents.

---

## 12. INDUSTRY PAGES (8)

| Route | Industry | Products Linked | Meta Title | Key Content |
|-------|----------|-----------------|------------|-------------|
| `/industries/automobile` | Automobile Industry | perforated-sheets, expanded-metal, laser-cutting, turret-punching | Perforated Sheets for Automobile Industry | Automotive Mesh Pune | Jai Shree Group | Filters, grills, guards for Tata, Bajaj, Tier-1 suppliers |
| `/industries/construction` | Construction & Architecture | perforated-sheets, expanded-metal, laser-cutting, turret-punching | Perforated Sheets for Construction | Architectural Metal Panels Pune | Jai Shree Group | Facades, cladding, safety guards, cable trays |
| `/industries/food-beverage` | Food & Beverage | perforated-sheets, laser-cutting, custom-components | Perforated Sheets for Food Processing Industry | SS Screens India | Jai Shree Group | Conveyor screens, vibrating screens, food-grade sieves |
| `/industries/pharmaceutical` | Pharmaceutical | perforated-sheets, laser-cutting, custom-components | Perforated Sheets for Pharmaceutical Industry | SS Mesh India | Jai Shree Group | Clean room panels, equipment screens, tablet coating drums |
| `/industries/petrochemical` | Petrochemical | perforated-sheets, expanded-metal, laser-cutting, custom-components | Perforated Sheets for Petrochemical Industry | Metal Components India | Jai Shree Group | Process vessel internals, filtration, ventilation screens |
| `/industries/architecture-interior` | Architecture & Interior | perforated-sheets, expanded-metal, custom-components | Architectural Perforated Panels | Decorative Metal Mesh India | Jai Shree Group | Decorative panels, facades, room dividers, ceiling tiles |
| `/industries/sugar-industry` | Sugar Industry | perforated-sheets, custom-components | Sugar Industry Screens Manufacturers India | Huller Screens | Jai Shree Group | Huller screens, herringbone screens, vibrating screens |
| `/industries/mining-quarrying` | Mining & Quarrying | perforated-sheets, expanded-metal, laser-cutting, custom-components | Mining Screens Manufacturers India | Perforated & Expanded Metal | Jai Shree Group | Vibrating screen panels, crusher decks, aggregate sizing |

**Note:** `paper-industry` and `agriculture` exist in `INDUSTRIES` constant but have **no detail pages** — would 404 if linked.

---
## 13. BLOG POSTS (4)

| Slug | Title | Meta Title | Target Keyword | ~Words | Internal Links |
|------|-------|------------|----------------|--------|----------------|
| `how-to-calculate-open-area-perforated-sheet` | How to Calculate Open Area of Perforated Sheet | How to Calculate Open Area of Perforated Sheet | Jai Shree Group | perforated sheet open area calculator | ~1200 | /calculator, /products/perforated-sheets |
| `expanded-metal-vs-perforated-sheet` | Expanded Metal vs Perforated Sheet: Which to Choose? | Expanded Metal vs Perforated Sheet | Jai Shree Group | expanded metal vs perforated sheet | ~1100 | /products/expanded-metal, /products/perforated-sheets |
| `perforated-sheet-specification-guide` | Perforated Sheet Specification Guide | Perforated Sheet Specification Guide | Jai Shree Group | perforated sheet specification guide | ~1400 | /calculator, /products/perforated-sheets, /get-quote |
| `laser-cutting-vs-turret-punching` | Laser Cutting vs Turret Punching: Cost Comparison | Laser Cutting vs Turret Punching | Jai Shree Group | laser cutting vs turret punching cost | ~1000 | /products/laser-cutting, /products/turret-punching |

**Redirect:** `/blog/wire-mesh-specification-guide` → `/blog/perforated-sheet-specification-guide` (301 in next.config.ts)

---

## 14. SEO IMPLEMENTATION

### Meta Tags

- **Root layout** (`src/app/layout.tsx`): Default title, description, keywords, OpenGraph, Twitter cards, canonical `/`, hreflang en variants, robots index/follow
- **Page-level overrides:** Each `page.tsx` exports `metadata: Metadata` object or uses `generateMetadata()` for dynamic routes
- **Dynamic routes:** Products/industries/blog use data file `metaTitle`/`metaDescription`; location pages use `locationMetadata(PATH)`
- **Verification:** `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and `NEXT_PUBLIC_BING_SITE_VERIFICATION` injected when set

### Schema Markup (JSON-LD)

| Schema Type | Where | Key Fields |
|-------------|-------|------------|
| ManufacturingBusiness | GlobalSchema in layout.tsx | name, foundingDate, address, telephone, email, hasCertification ISO 9001:2015, hasOfferCatalog (6 products), sameAs (Google Maps, IndiaMART, LinkedIn) |
| BreadcrumbList | BreadcrumbSchema on product/industry/blog pages | Home → section → current page |
| Product | Product [slug] page | name, description, brand, offers |
| FAQPage | Product pages, location pages, calculator | Product FAQs and location FAQs |
| BlogPosting | BlogPostingSchema on blog articles | headline, datePublished, author, description |
| ContactPage | ContactPageSchema on /contact | Contact point, address, phone |
| LocalBusiness | Location SEO pages via LocationPageClient | Facility name, address, geo, products served |

### Sitemap — `src/app/sitemap.ts`

Base URL: `https://jaishreegroup.in`

| Page Type | Count | Priority | Change Frequency |
|-----------|-------|----------|------------------|
| Home `/` | 1 | 1.0 | weekly |
| High-priority static (/products, /contact, /get-quote, /about, /group) | 5 | 0.95 | monthly |
| Other static (/calculator, /gallery, /blog, /landing, etc.) | 7 | 0.7 | monthly |
| Product pages | 6 | 0.9 | weekly |
| Industry pages | 8 | 0.8 | monthly |
| Location SEO pages | 6 | 0.8 | monthly |
| Blog posts | 4 | 0.6 | monthly |
| **Total URLs** | **~37** | | |

### Robots.txt — `src/app/robots.ts`

- **Allow:** `/` (all public pages)
- **Disallow:** `/admin/`, `/api/`
- **Sitemap:** https://jaishreegroup.in/sitemap.xml

### Redirects — `next.config.ts`

| Source | Destination | Type |
|--------|-------------|------|
| `/products/wire-mesh` | `/products` | 301 permanent |
| `/products/welded-mesh` | `/products` | 301 permanent |
| `/products/demister-pad` | `/products` | 301 permanent |
| `/products/aluminum-grill-profile` | `/products` | 301 permanent |
| `/pune/wire-mesh-manufacturers` | `/pune/perforated-sheet-manufacturers` | 301 permanent |
| `/mumbai/wire-mesh-manufacturers` | `/mumbai/perforated-sheet-manufacturers` | 301 permanent |
| `/blog/wire-mesh-specification-guide` | `/blog/perforated-sheet-specification-guide` | 301 permanent |

---

## 15. KEY FEATURES

### Open Area Calculator

- **Route:** `/calculator`
- **Component:** `OpenAreaCalculator.tsx`
- **10 calculators with formulas:**

| # | Name | Formula | Inputs |
|---|------|---------|--------|
| 1 | Round Perforation — 60° Staggered | OA = (D² × 90.69) / C² | D (hole diameter), C (pitch) |
| 2 | Round Perforation — 45° Staggered | OA = (D² × 78.5) / C² | D, C |
| 3 | Round Perforation — Straight Line | OA = (D² × 78.5) / (C₁ × C₂) | D, C₁, C₂ |
| 4 | Square Perforation — Straight Line | OA = (S² × 100) / (C₁ × C₂) | S (hole size), C₁, C₂ |
| 5 | Square Perforation — Staggered | OA = (S² × 100) / (C₁ × C₂) | S, C₁, C₂ |
| 6 | Hex Perforation — Standard | OA = (S² × 100) / C² | S, C |
| 7 | Round End Slot — Side Staggered | OA = (WL − 0.215W²) × 100 / (C₁ × C₂) | W, L, C₁, C₂ |
| 8 | Round End Slot — Straight Line | OA = (WL − 0.215W²) × 100 / (C₁ × C₂) | W, L, C₁, C₂ |
| 9 | Square End Slot — Straight Line | OA = (W × L × 100) / (C₁ × C₂) | W, L, C₁, C₂ |
| 10 | Square End Slot — Staggered | OA = (W × L × 100) / (C₁ × C₂) | W, L, C₁, C₂ |

User flow: Select hole shape (round/square/hex/slot) → arrangement → calculator auto-selected → enter dimensions → result as % open area.

### Get Quote Form (3-step)

**Component:** `GetQuotePage.tsx` — **API:** `POST /api/quote`

**Step 1 — Product Selection:** Multi-select from 6 products with incompatibility rules

**Incompatibility Matrix (`INCOMPATIBLE` constant):**

| Selected Product | Disables |
|------------------|----------|
| perforated-sheets | expanded-metal, turret-punching |
| laser-cutting | expanded-metal |
| expanded-metal | perforated-sheets, turret-punching |
| turret-punching | perforated-sheets, expanded-metal |
| precision-sheet-leveling | (none — compatible with all) |
| custom-components | (none — compatible with all) |

**Special rules:**
- Selecting `precision-sheet-leveling` shows hint that it pairs with perforated or laser jobs
- Selecting `custom-components` alone requires `customComponentNote` text
- Multiple compatible products can be selected (e.g., perforated-sheets + laser-cutting + precision-sheet-leveling)

**Step 2 — Specifications:** Material (from MATERIALS constant), thickness, quantity + unit (pcs/sqft/kg/sheets), deadline (urgent/standard/flexible), additional requirements

**Step 3 — Contact:** Name, company, phone, email, city, optional WhatsApp redirect checkbox

### Hero Product Carousel

- **Component:** `ProductShowcase.tsx`
- **Products:** All 6 from PRODUCTS constant rotate automatically
- **Animation:** framer-motion AnimatePresence; 3.5s auto-rotate; pauses on hover; progress bar; dot pill navigation; in-card prev/next arrows
- **Card content:** Product icon, name, description, max thickness, View Product Details link

### Magnetic Dots Background

- **Component:** `MagneticDotsBackground.tsx`
- **Technology:** HTML Canvas 2D
- **Behavior:** Grid of dots on hero background; dots repel from cursor with magnetic effect; subtle orange tint on primary dots; resize-aware
- **Integration:** Rendered inside HeroSection behind content; receives containerRef for bounds

### Admin Panel

- **URL:** `/admin/login` → `/admin/dashboard`
- **Auth:** Supabase Auth email/password
- **Sections:** Dashboard (stats), Leads CRM, Blog CMS, Gallery CMS, Testimonials CMS, Settings
- **Protection:** `src/middleware.ts` matcher `/admin/:path*` — redirects unauthenticated users to login

---

## 16. THIRD-PARTY INTEGRATIONS

### Supabase

- **Usage:** Database (leads, blog, gallery, testimonials, page_views), Auth (admin), Storage (gallery/blog images)
- **Project reference:** Set via `NEXT_PUBLIC_SUPABASE_URL` env var (not hardcoded in repo)
- **Tables:** leads, follow_ups, blog_posts, gallery_items, testimonials, page_views
- **Auth:** Email/password admin user created in Supabase Dashboard → Authentication → Users
- **Storage buckets:** gallery (public), blog-covers (public), documents (private)
- **Schema file:** `src/lib/supabase/schema.sql` — run in SQL Editor to initialize

### Resend

- **Used for:** Quote and contact form email notifications to team
- **From email:** `RESEND_FROM` env or default `Jai Shree Group Website <onboarding@resend.dev>`
- **To email:** `RESEND_TO` → `CONTACT_EMAIL` → `shreeperforator@gmail.com`
- **Templates:** Inline HTML in API routes (not separate template files)
- **Optional:** If `RESEND_API_KEY` unset, leads still save to Supabase but no email sent

### Vercel

- **Config:** `vercel.json` — framework nextjs, buildCommand npm run build
- **Deploy:** Auto-deploy on push to main branch
- **Env vars:** Set in Vercel Dashboard → Project → Settings → Environment Variables
- **Cron jobs:** None configured
- **Image domains:** `**.supabase.co` configured in next.config.ts for gallery/blog images

---

## 17. REMOVED PRODUCTS & REDIRECTS

| Removed Product | Old Slug | Redirect | Reason |
|-----------------|----------|----------|--------|
| Wire Mesh | /products/wire-mesh | /products (301) | No longer active product line |
| Welded Mesh | /products/welded-mesh | /products (301) | Consolidated — not offered standalone |
| Demister Pad | /products/demister-pad | /products (301) | Removed from catalog |
| Aluminum Grill Profile | /products/aluminum-grill-profile | /products (301) | Removed from catalog |

**Location page redirects:**
- `/pune/wire-mesh-manufacturers` → `/pune/perforated-sheet-manufacturers`
- `/mumbai/wire-mesh-manufacturers` → `/mumbai/perforated-sheet-manufacturers`

**Blog redirect:** `/blog/wire-mesh-specification-guide` → `/blog/perforated-sheet-specification-guide`

---
## 18. KNOWN ISSUES & PENDING ITEMS

### Pending from Client

| # | Item | What's Needed | Files |
|---|------|---------------|-------|
| 1 | Factory tour video | Provide YouTube video ID or MP4 file for `COMPANY_VIDEO.youtubeId` or `COMPANY_VIDEO.localVideo` in constants.ts. Currently shows Coming Soon modal on play. | VideoSection.tsx, constants.ts |
| 2 | ISO certificate PDF | Upload ISO 9001:2015 certificate PDF to Supabase `documents` bucket or `/public/certificates/` and enable download on /certifications | CertificationsPage.tsx |
| 3 | Gallery product photos | Upload real product photography to Supabase gallery via /admin/gallery for all 6 product categories | Gallery CMS, gallery bucket |
| 4 | Google Search Console verification | Provide verification code for `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` env var | layout.tsx |
| 5 | Real client logos | Provide client logo images for /clients page — currently uses placeholder letter avatars | ClientsPage.tsx |
| 6 | Industry pages for paper & agriculture | Either add detail pages in industries.ts for paper-industry and agriculture, or remove from INDUSTRIES constant | industries.ts |
| 7 | Branch website URLs | Confirm correct websites for Shree Weld Mesh and Jai Shree Perforator (Palghar) — currently duplicate parent domains | constants.ts BRANCHES |
| 8 | Bing Webmaster verification | Provide code for `NEXT_PUBLIC_BING_SITE_VERIFICATION` | layout.tsx |
| 9 | Social media profile verification | Confirm LinkedIn/Facebook/Instagram URLs are correct and active | constants.ts FOOTER.social |

### Technical Debt

| Issue | Status | Notes |
|-------|--------|-------|
| Gallery empty without Supabase data | Partial fix | Empty state shown cleanly; no placeholder grid |
| `/clients` not in main nav | Open | Page in sitemap but not NAV_LINKS or footer |
| Calculator page missing quote CTA | Open | No link to /get-quote from calculator results |
| API routes log request bodies | Open | console.log may leak PII in Vercel function logs |
| Demister pad references in copy | Partial | IndustriesIndexPage and ClientsPage still mention demister pads |
| paper-industry / agriculture 404 risk | Open | In INDUSTRIES constant but no INDUSTRY_DETAILS entry |
| Supabase seed blog slug mismatch in SQL | Fixed in app | schema.sql seed still has old slug; app uses blog-posts.ts |

### Important Notes for Future Developer

- **sync_background_jobs** must remain `false` in Supabase until Edge Function is deployed (if applicable to your Supabase project settings).
- **Admin routes** are protected by middleware — always test auth flow after Supabase URL changes.
- **isSupabaseConfigured()** in `src/lib/supabase/env.ts` rejects placeholder URLs — forms return 503 with WhatsApp fallback when not configured.
- **Thursday holiday:** Contact page and branch hours should reflect Thursday as weekly holiday when client provides official hours.
- **Global delivery** — site copy says Global Delivery, NOT Pan India only. Do not revert to Pan-India language.
- **6 manufacturing units** — NOT 8. Dev Shree and Chandan units were removed from the site.
- **Carbon Steel removed** from materials lists per client request — do not re-add.
- **Size fields removed** — quote forms and product specs use thickness only, not sheet size/dimensions.
- **Hero H1** is three lines: PERFORATED SHEET / MANUFACTURERS / SINCE 1970 — do not change without client approval.
- **Favicon** is inline SVG in layout.tsx metadata icons — no separate favicon.ico file needed.

---

## 19. DEPLOYMENT

### Current Setup

- **GitHub:** https://github.com/sainirahul2163/jai-shree-group.git
- **Vercel:** Auto-deploy on push to `main` branch
- **Production:** https://jaishreegroup.in
- **Preview:** Vercel generates preview URLs per PR/commit

### Go-Live Checklist

1. Set all env vars in Vercel production (Supabase URL, anon key, service role, Resend)
2. Add GSC verification code via NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
3. Connect domain jaishreegroup.in in Vercel project settings
4. Add production domain to Supabase Auth allowed redirect URLs
5. Submit sitemap https://jaishreegroup.in/sitemap.xml to Google Search Console
6. Submit sitemap to Bing Webmaster Tools
7. Enable UptimeRobot monitoring on GET /api/health
8. Verify Google Maps embeds show correct pins for Pune and Mumbai facilities
9. Upload gallery photos to Supabase via /admin/gallery
10. Set RESEND_API_KEY for email notifications on quote/contact
11. Confirm social media URLs in FOOTER.social are correct
12. Upload ISO certificate PDF and enable download

### Commands

```bash
npm run dev        # Local development server (http://localhost:3000)
npm run build      # Production build — must pass with 0 TS errors
npm run start      # Start production server locally
npm run lint       # ESLint check
```

### Local Development Setup

1. Clone repo: `git clone https://github.com/sainirahul2163/jai-shree-group.git`
2. Install: `npm install`
3. Copy env template above to `.env.local` and fill Supabase credentials
4. Run Supabase schema: paste `src/lib/supabase/schema.sql` in SQL Editor
5. Create admin user in Supabase Auth dashboard
6. Create storage buckets: gallery, blog-covers, documents
7. Run: `npm run dev`

---

## 20. CHANGELOG

### SEO Phase (June 29, 2026)

- Added 6 location SEO pages (Pune×3, Mumbai×3) with LocalBusiness schema
- Dynamic sitemap with priority weighting per page type
- robots.txt disallow /admin/ and /api/
- 301 redirects for removed products and wire mesh location pages
- Blog posts with target keywords and internal linking
- Root metadata with primary keywords and OpenGraph image
- Canonical URLs and hreflang on root layout
- Industry pages with product cross-links and meta titles
- Product pages with FAQPage schema and meta descriptions
- BreadcrumbList schema on product/industry/blog pages

### Client Changes Phase (June 29, 2026)

- Removed Size fields — thickness only across products and quote forms
- Removed Carbon Steel from materials lists
- Changed Pan India delivery language to Global delivery
- Reduced manufacturing units from 8 to 6 (removed Dev Shree, Chandan)
- Removed wire mesh from active product catalog with 301 redirects
- Updated home about highlights — removed wire mesh mesh range stat

### Get Quote Smart Selection (June 29, 2026)

- Added 3-step quote wizard at `/get-quote`
- Multi-product selection with INCOMPATIBLE matrix preventing conflicting combinations
- precision-sheet-leveling and custom-components compatible with all products
- Custom component note required when custom-components selected alone
- POST to /api/quote with full specifications JSONB in Supabase
- Optional WhatsApp redirect after successful submission

### Calculator Rebuild (June 29–30, 2026)

- Rebuilt OpenAreaCalculator with 10 industry-standard formulas
- Shape picker: round, square, hex, slot with arrangement sub-options
- Auto-selects correct calculator based on shape + arrangement
- Input validation and animated result display
- FAQ accordion from calculator-faqs.ts data

### Hero Section Updates (June 30, 2026)

- H1 changed to three lines: PERFORATED SHEET / MANUFACTURERS / SINCE 1970
- Added MagneticDotsBackground canvas with magnetic cursor interaction
- Removed FloatingParticles and hex grid background
- ProductShowcase carousel: AnimatePresence, 3.5s auto-rotate, hover pause, progress bar, dot pills, in-card arrows

### Diagnostic Fixes (June 30, 2026)

1. Created /mumbai/expanded-metal-manufacturers page and locations.ts entry
2. Added GET /api/health endpoint for uptime monitoring
3. Fixed isSupabaseConfigured() to reject placeholder Supabase URLs
4. VideoSection play button opens Coming Soon modal instead of no-op
5. Footer social links updated to real LinkedIn/Facebook/Instagram URLs
6. Google Maps embed URLs updated with real coordinates in locations.ts
7. ISO cert page: email request CTA; About page CTA → View Certifications
8. Favicon via inline SVG in layout.tsx metadata icons
9. Gallery: clean empty state; filters limited to 6 active products only
10. Blog slug renamed perforated-sheet-specification-guide with 301 redirect
11. API routes return 503 (not 500) when Supabase unavailable with WhatsApp fallback
12. Removed wire mesh highlight from HOME_SECTIONS.about.highlights
13. ContactPage, ClientsPage, IndustriesIndexPage copy updates
14. OpenAreaCalculator minor UX improvements
15. next.config.ts blog slug redirect added
16. Footer TypeScript fix for social href type comparison
17. ProductQuoteForm and GetQuotePage validation improvements
18. CertificationsPage and AboutPage CTA alignment
19. GlobalSchema sameAs URLs verified

---

## APPENDIX C — Public Assets

| File | Path | Purpose |
|------|------|---------|
| jai-shree-brochure.pdf | `/brochure/jai-shree-brochure.pdf` | Product catalogue PDF — linked from navbar, footer, product pages |
| og-image.jpg | `/og-image.jpg` | Open Graph social share image 1200×630 |
| logo-navbar.svg/png | `/logo-navbar.*` | Navbar logo assets (Logo.tsx uses inline SVG instead) |
| logo-dark.svg/png | `/logo-dark.*` | Dark theme logo variant |
| logo-transparent.svg/png | `/logo-transparent.*` | Transparent background logo |
| logo-icon-only.svg/png | `/logo-icon-only.*` | Icon-only logo mark |
| file.svg, globe.svg, window.svg | `/file.svg etc.` | Default Next.js template assets (unused) |
| vercel.svg, next.svg | `/` | Template assets (unused) |

---

## APPENDIX D — TypeScript Configuration

**File:** `tsconfig.json`

- **Compiler target:** ES2017
- **Module:** esnext with bundler resolution
- **Strict mode:** enabled
- **Path alias:** `@/*` → `./src/*`
- **JSX:** react-jsx (React 19)
- **Include:** all `.ts`/`.tsx` files, `.next/types`

---

## APPENDIX E — Middleware & Auth Flow

```
Request → /admin/dashboard
  ↓
middleware.ts checks Supabase session
  ↓
No session? → redirect /admin/login
Has session? → allow through
  ↓
Admin panel renders with AdminShell layout
```

- Matcher: `/admin/:path*` only — public pages unaffected
- Login page: if session exists, redirect to /admin/dashboard
- Without Supabase env: unauthenticated users always redirected to login

---

## APPENDIX F — Form Validation Schemas

Source: `src/lib/validations.ts`

### contactFormSchema
- name: string min 2
- phone: string min 10
- email: optional email
- company: optional string
- product: optional string
- message: string min 10
- city: optional string

### quoteFormSchema
- products: array min 1
- material: string min 1
- thickness: string min 1
- quantity: string min 1
- quantityUnit: enum pcs|sqft|kg|sheets
- deadline: enum urgent|standard|flexible
- additionalRequirements: optional
- customComponentNote: optional (required if custom-components alone)
- name, phone required; email optional; companyName, city optional
- sendWhatsApp: boolean optional

---

## APPENDIX G — Complete Component Props Reference

### `AboutPage` — `src/components/about/AboutPage.tsx`

No props interface — self-contained component.
**Imports from @/:** components/shared/CtaBanner, components/shared/PageHero, components/ui/button, data/about, lib/constants

### `AdminLoginForm` — `src/components/admin/AdminLoginForm.tsx`

No props interface — self-contained component.
**Imports from @/:** components/layout/Logo, components/ui/button, components/ui/input, components/ui/label, lib/supabase/client

### `AdminShell` — `src/components/admin/AdminShell.tsx`

No props interface — self-contained component.
**Imports from @/:** components/ui/button, components/ui/sheet, lib/supabase/actions, lib/utils

### `BlogAdminClient` — `src/components/admin/BlogAdminClient.tsx`

No props interface — self-contained component.
**Imports from @/:** components/ui/button, lib/supabase/actions, types/database

### `BlogEditorClient` — `src/components/admin/BlogEditorClient.tsx`

No props interface — self-contained component.
**Imports from @/:** components/admin/BlogEditorForm, types/database

### `BlogEditorForm` — `src/components/admin/BlogEditorForm.tsx`

No props interface — self-contained component.
**Imports from @/:** components/ui/button, components/ui/input, components/ui/label, components/ui/select, components/ui/textarea, lib/supabase/actions, lib/supabase/client, types/database

### `GalleryAdminClient` — `src/components/admin/GalleryAdminClient.tsx`

No props interface — self-contained component.
**Imports from @/:** components/ui/button, components/ui/input, components/ui/label, components/ui/select, components/ui/textarea, lib/constants, lib/supabase/actions, lib/supabase/client, types/database

### `LeadDetailClient` — `src/components/admin/LeadDetailClient.tsx`

No props interface — self-contained component.
**Imports from @/:** components/ui/button, components/ui/label, components/ui/select, components/ui/textarea, lib/supabase/actions, types/database

### `LeadsTable` — `src/components/admin/LeadsTable.tsx`

No props interface — self-contained component.
**Imports from @/:** components/admin/StatusBadge, components/ui/button, components/ui/input, components/ui/select, types/database

### `StatusBadge` — `src/components/admin/StatusBadge.tsx`

No props interface — self-contained component.
**Imports from @/:** types/database

### `TestimonialsAdminClient` — `src/components/admin/TestimonialsAdminClient.tsx`

No props interface — self-contained component.
**Imports from @/:** components/ui/button, components/ui/input, components/ui/label, components/ui/textarea, lib/supabase/actions, types/database

### `BlogArticleContent` — `src/components/blog/BlogArticleContent.tsx`

No props interface — self-contained component.

### `OpenAreaCalculator` — `src/components/calculator/OpenAreaCalculator.tsx`

No props interface — self-contained component.
**Imports from @/:** components/ui/button, components/ui/input

### `CertificationsPage` — `src/components/certifications/CertificationsPage.tsx`

No props interface — self-contained component.
**Imports from @/:** components/shared/CtaBanner, components/shared/PageHero, components/ui/button, lib/constants

### `ClientsPage` — `src/components/clients/ClientsPage.tsx`

No props interface — self-contained component.
**Imports from @/:** components/shared/CtaBanner, components/shared/PageHero, lib/constants, types/database

### `ContactPage` — `src/components/contact/ContactPage.tsx`

No props interface — self-contained component.
**Imports from @/:** components/ui/button, components/ui/input, components/ui/label, components/ui/select, components/ui/textarea, lib/constants, lib/email, lib/validations

### `GalleryPage` — `src/components/gallery/GalleryPage.tsx`

No props interface — self-contained component.
**Imports from @/:** components/shared/PageHero, components/ui/tabs, types/database

### `GroupPage` — `src/components/group/GroupPage.tsx`

No props interface — self-contained component.
**Imports from @/:** components/shared/IndiaMapLoader, components/shared/PageHero, components/ui/button, data/branches, lib/constants

### `AboutSection` — `src/components/home/AboutSection.tsx`

No props interface — self-contained component.
**Imports from @/:** components/ui/button, lib/constants

### `CtaSection` — `src/components/home/CtaSection.tsx`

No props interface — self-contained component.
**Imports from @/:** components/ui/button, lib/constants

### `GroupSection` — `src/components/home/GroupSection.tsx`

No props interface — self-contained component.
**Imports from @/:** components/shared/IndiaMapLoader, components/ui/tabs, lib/constants

### `HeroSection` — `src/components/home/HeroSection.tsx`

No props interface — self-contained component.
**Imports from @/:** components/home/MagneticDotsBackground, components/home/ProductShowcase, components/ui/button, lib/constants

### `IndustriesSection` — `src/components/home/IndustriesSection.tsx`

No props interface — self-contained component.
**Imports from @/:** components/ui/button, lib/constants, lib/icons

### `MagneticDotsBackground` — `src/components/home/MagneticDotsBackground.tsx`

**MagneticDotsBackgroundProps:**
- `containerRef: RefObject<HTMLElement | null>`

### `ProcessSection` — `src/components/home/ProcessSection.tsx`

No props interface — self-contained component.
**Imports from @/:** lib/constants, lib/icons

### `ProductShowcase` — `src/components/home/ProductShowcase.tsx`

No props interface — self-contained component.

### `ProductsSection` — `src/components/home/ProductsSection.tsx`

No props interface — self-contained component.
**Imports from @/:** lib/constants, lib/icons, lib/utils

### `TrustBar` — `src/components/home/TrustBar.tsx`

No props interface — self-contained component.

### `VideoSection` — `src/components/home/VideoSection.tsx`

No props interface — self-contained component.
**Imports from @/:** lib/constants

### `IndustriesIndexPage` — `src/components/industries/IndustriesIndexPage.tsx`

No props interface — self-contained component.
**Imports from @/:** components/shared/PageHero, data/industries, lib/constants, lib/icons

### `IndustryPageClient` — `src/components/industries/IndustryPageClient.tsx`

No props interface — self-contained component.
**Imports from @/:** components/shared/CtaBanner, components/shared/PageHero, components/ui/button, data/industries, data/products, lib/constants, lib/icons

### `LandingCTA` — `src/components/landing/LandingCTA.tsx`

No props interface — self-contained component.
**Imports from @/:** lib/constants, lib/email

### `LandingCapabilities` — `src/components/landing/LandingCapabilities.tsx`

No props interface — self-contained component.

### `LandingHero` — `src/components/landing/LandingHero.tsx`

No props interface — self-contained component.

### `LandingIndustries` — `src/components/landing/LandingIndustries.tsx`

No props interface — self-contained component.
**Imports from @/:** data/industries

### `LandingLocations` — `src/components/landing/LandingLocations.tsx`

No props interface — self-contained component.

### `LandingMarquee` — `src/components/landing/LandingMarquee.tsx`

No props interface — self-contained component.

### `LandingNav` — `src/components/landing/LandingNav.tsx`

No props interface — self-contained component.

### `LandingProcess` — `src/components/landing/LandingProcess.tsx`

No props interface — self-contained component.

### `LandingProducts` — `src/components/landing/LandingProducts.tsx`

No props interface — self-contained component.
**Imports from @/:** lib/constants, lib/icons

### `LandingStats` — `src/components/landing/LandingStats.tsx`

No props interface — self-contained component.

### `LandingStory` — `src/components/landing/LandingStory.tsx`

No props interface — self-contained component.

### `LandingTestimonials` — `src/components/landing/LandingTestimonials.tsx`

No props interface — self-contained component.

### `ScrollProgress` — `src/components/landing/ScrollProgress.tsx`

No props interface — self-contained component.

### `Footer` — `src/components/layout/Footer.tsx`

No props interface — self-contained component.
**Imports from @/:** components/layout/Logo, components/ui/button, lib/constants

### `Logo` — `src/components/layout/Logo.tsx`

**LogoProps:**
- `className?: string`
- `size?: "sm" | "md" | "lg"`

### `Navbar` — `src/components/layout/Navbar.tsx`

No props interface — self-contained component.
**Imports from @/:** components/layout/Logo, components/ui/button, components/ui/navigation-menu, components/ui/sheet, lib/constants, lib/icons, lib/utils

### `SiteChrome` — `src/components/layout/SiteChrome.tsx`

No props interface — self-contained component.
**Imports from @/:** components/layout/Footer, components/layout/Navbar, components/shared/PageViewTracker, components/shared/WhatsAppButton

### `LocationPageClient` — `src/components/location/LocationPageClient.tsx`

No props interface — self-contained component.
**Imports from @/:** components/products/ProductQuoteForm, components/shared/PageHero, components/ui/accordion, components/ui/button, data/locations, data/products

### `DimpleSheet3D` — `src/components/products/DimpleSheet3D.tsx`

No props interface — self-contained component.

### `PerforationPatterns` — `src/components/products/PerforationPatterns.tsx`

No props interface — self-contained component.

### `ProductPageClient` — `src/components/products/ProductPageClient.tsx`

No props interface — self-contained component.
**Imports from @/:** components/products/ProductQuoteForm, components/ui/accordion, components/ui/button, data/products, lib/constants, lib/icons

### `ProductQuoteForm` — `src/components/products/ProductQuoteForm.tsx`

No props interface — self-contained component.
**Imports from @/:** components/ui/button, components/ui/input, components/ui/label, components/ui/textarea, lib/constants, lib/email, lib/validations

### `ProductsIndexPage` — `src/components/products/ProductsIndexPage.tsx`

No props interface — self-contained component.
**Imports from @/:** components/shared/PageHero, lib/constants, lib/icons, lib/utils

### `GetQuotePage` — `src/components/quote/GetQuotePage.tsx`

No props interface — self-contained component.
**Imports from @/:** components/ui/button, components/ui/input, components/ui/label, components/ui/select, components/ui/textarea, lib/constants, lib/email, lib/icons, lib/validations

### `BlogPostingSchema` — `src/components/seo/BlogPostingSchema.tsx`

No props interface — self-contained component.
**Imports from @/:** lib/constants

### `BreadcrumbSchema` — `src/components/seo/BreadcrumbSchema.tsx`

No props interface — self-contained component.
**Imports from @/:** lib/constants

### `ContactPageSchema` — `src/components/seo/ContactPageSchema.tsx`

No props interface — self-contained component.
**Imports from @/:** lib/constants

### `GlobalSchema` — `src/components/seo/GlobalSchema.tsx`

No props interface — self-contained component.
**Imports from @/:** lib/constants

### `CtaBanner` — `src/components/shared/CtaBanner.tsx`

No props interface — self-contained component.
**Imports from @/:** components/ui/button

### `IndiaMap` — `src/components/shared/IndiaMap.tsx`

No props interface — self-contained component.

### `PageHero` — `src/components/shared/PageHero.tsx`

No props interface — self-contained component.

### `PageViewTracker` — `src/components/shared/PageViewTracker.tsx`

No props interface — self-contained component.

### `WhatsAppButton` — `src/components/shared/WhatsAppButton.tsx`

No props interface — self-contained component.
**Imports from @/:** lib/constants, lib/email

---

## APPENDIX H — Supabase Query Functions

Source: `src/lib/supabase/queries.ts`

| Function | Returns | Used By |
|----------|---------|---------|
| `getGalleryItems()` | Returns published gallery_items ordered by sort_order | GalleryPage |
| `getBlogPosts()` | Returns published blog_posts ordered by published_at desc | blog/page.tsx, blog/[slug] |
| `getBlogPostBySlug(slug)` | Single blog post by slug | blog/[slug]/page.tsx |
| `getLeads()` | All leads for admin CRM | admin/leads |
| `getLeadById(id)` | Single lead with follow_ups | admin/leads/[id] |
| `getDashboardStats()` | Counts: total leads, new leads, page views | admin/dashboard |
| `getTestimonials()` | Published testimonials | ClientsPage, landing |

---

## APPENDIX I — Design System Tokens

From `DESIGN_TOKENS` in constants.ts and globals.css:

| Token | Value | Usage |
|-------|-------|-------|
| background | `#0A0A0A` | Page background |
| surface | `#111111` | Card backgrounds |
| surface2 | `#1A1A1A` | Elevated surfaces |
| border | `#2A2A2A` | Borders and dividers |
| primary | `#E8521A` | Brand orange — CTAs, accents |
| primaryHover | `#FF6B35` | Hover state orange |
| textPrimary | `#FFFFFF` | Headings and body text |
| textSecondary | `#A0A0A0` | Secondary text |
| textMuted | `#666666` | Muted/placeholder text |

Fonts: Geist Sans (body), Geist Mono (code) via next/font/google

---

## APPENDIX A — Branch Directory

Full details for all 6 manufacturing units:

### Jai Shree Metal Perforators

- **Address:** Gat no. 93, Near Sonawane Wasti, Jyotibanagar, Talawade, Pune- 411062
- **City/Area:** Pune — Talawade
- **Phone:** +91 9320204156
- **Email:** jsmppune@gmail.com
- **Website:** https://www.metalperforatedsheets.com
- **Products/Specialization:** Perforated sheets, laser cutting, turret punching, expanded metal

### Shree Perforators

- **Address:** Gat no. 94, Near Sonawane Wasti, Jyotibanagar, Talawade, Pune- 411062
- **City/Area:** Pune — Talawade
- **Phone:** +91 9370606017
- **Email:** shreeperforator@gmail.com
- **Website:** https://www.shreeperforators.com
- **Products/Specialization:** Perforated sheets (primary HQ unit), all Pune manufacturing

### Shree Weld Mesh

- **Address:** Gat no. 93, Near Sonawane Wasti, Jyotibanagar, Talawade, Pune- 411062
- **City/Area:** Pune — Talawade
- **Phone:** +91 9049456019
- **Email:** balajiwelded@gmail.com
- **Website:** https://www.shreeperforators.com
- **Products/Specialization:** Welded mesh (legacy unit — not on website product catalog)

### Jai Shree Filtration

- **Address:** Shop No. 80-B, Gr. Floor, Keshavji Jadhavji Bldg., 24/26, Khadak Street, Nr. Satkar Hotel, Masjid Bunder Road, Mumbai-400009
- **City/Area:** Mumbai — Masjid Bunder
- **Phone:** +91 9320204151
- **Email:** inderjangid@gmail.com
- **Website:** https://www.jaishreefiltration.com
- **Products/Specialization:** Filtration screens, perforated sheets for petrochemical/refinery

### Jai Shree Industries

- **Address:** L-9, Swastik Industrial Estate, Behind Gaurav Dharam Kanta, Bhayander East, Mumbai- 401105
- **City/Area:** Mumbai — Bhayander
- **Phone:** +91 8181815592
- **Email:** inderjangid@gmail.com
- **Website:** https://www.jaishreefiltration.com
- **Products/Specialization:** Perforated sheets, expanded metal, Mumbai region distribution

### Jai Shree Perforator

- **Address:** 2, Marudhar Estate, Vill. Aliyali, Next to Tembhode Village, New Satpati Road, Palghar West- Maharashtra
- **City/Area:** Palghar (Maharashtra) — Palghar West
- **Phone:** +91 9320204151
- **Email:** inderjangid@gmail.com
- **Website:** https://www.jaishreefiltration.com
- **Products/Specialization:** Laser cutting, export-oriented production, Palghar facility

---

## APPENDIX B — File Index

Complete index of every file under `src/`:

| File | Description |
|------|-------------|
| `src/app/about/page.tsx` | Page route: /about |
| `src/app/admin/(panel)/blog/[id]/page.tsx` | Page route: /admin/(panel)/blog/[id] |
| `src/app/admin/(panel)/blog/new/page.tsx` | Page route: /admin/(panel)/blog/new |
| `src/app/admin/(panel)/blog/page.tsx` | Page route: /admin/(panel)/blog |
| `src/app/admin/(panel)/dashboard/page.tsx` | Page route: /admin/(panel)/dashboard |
| `src/app/admin/(panel)/gallery/page.tsx` | Page route: /admin/(panel)/gallery |
| `src/app/admin/(panel)/layout.tsx` | Source file |
| `src/app/admin/(panel)/leads/[id]/page.tsx` | Page route: /admin/(panel)/leads/[id] |
| `src/app/admin/(panel)/leads/page.tsx` | Page route: /admin/(panel)/leads |
| `src/app/admin/(panel)/settings/page.tsx` | Page route: /admin/(panel)/settings |
| `src/app/admin/(panel)/testimonials/page.tsx` | Page route: /admin/(panel)/testimonials |
| `src/app/admin/login/page.tsx` | Page route: /admin/login |
| `src/app/api/contact/route.ts` | API handler: /api/contact |
| `src/app/api/health/route.ts` | API handler: /api/health |
| `src/app/api/quote/route.ts` | API handler: /api/quote |
| `src/app/api/track/route.ts` | API handler: /api/track |
| `src/app/blog/[slug]/page.tsx` | Page route: /blog/[slug] |
| `src/app/blog/page.tsx` | Page route: /blog |
| `src/app/calculator/page.tsx` | Page route: /calculator |
| `src/app/certifications/page.tsx` | Page route: /certifications |
| `src/app/clients/page.tsx` | Page route: /clients |
| `src/app/contact/page.tsx` | Page route: /contact |
| `src/app/error.tsx` | Global error boundary with retry button |
| `src/app/favicon.ico` | Source file |
| `src/app/gallery/page.tsx` | Page route: /gallery |
| `src/app/get-quote/page.tsx` | Page route: /get-quote |
| `src/app/globals.css` | Tailwind v4 global CSS, design tokens as CSS variables, prose styles |
| `src/app/group/page.tsx` | Page route: /group |
| `src/app/industries/[slug]/page.tsx` | Page route: /industries/[slug] |
| `src/app/industries/page.tsx` | Page route: /industries |
| `src/app/landing/page.tsx` | Page route: /landing |
| `src/app/layout.tsx` | Root layout — Geist fonts, metadata, favicon SVG, GlobalSchema, SiteChrome |
| `src/app/loading.tsx` | Global loading spinner |
| `src/app/mumbai/expanded-metal-manufacturers/page.tsx` | Page route: /mumbai/expanded-metal-manufacturers |
| `src/app/mumbai/laser-cutting-services/page.tsx` | Page route: /mumbai/laser-cutting-services |
| `src/app/mumbai/perforated-sheet-manufacturers/page.tsx` | Page route: /mumbai/perforated-sheet-manufacturers |
| `src/app/not-found.tsx` | 404 page with home and products links |
| `src/app/page.tsx` | Home page — HeroSection, TrustBar, ProductsSection, AboutSection, IndustriesSection, GroupSection, ProcessSection, VideoSection, CtaSection |
| `src/app/products/[slug]/page.tsx` | Page route: /products/[slug] |
| `src/app/products/page.tsx` | Page route: /products |
| `src/app/pune/expanded-metal-manufacturers/page.tsx` | Page route: /pune/expanded-metal-manufacturers |
| `src/app/pune/laser-cutting-services/page.tsx` | Page route: /pune/laser-cutting-services |
| `src/app/pune/perforated-sheet-manufacturers/page.tsx` | Page route: /pune/perforated-sheet-manufacturers |
| `src/app/robots.ts` | Generates robots.txt — allow /, disallow /admin/ /api/ |
| `src/app/sitemap.ts` | Generates sitemap.xml from SITE_ROUTES + dynamic slugs (~37 URLs) |
| `src/components/about/AboutPage.tsx` | About page: AboutPage |
| `src/components/admin/AdminLoginForm.tsx` | Admin panel component: AdminLoginForm |
| `src/components/admin/AdminShell.tsx` | Admin panel component: AdminShell |
| `src/components/admin/BlogAdminClient.tsx` | Admin panel component: BlogAdminClient |
| `src/components/admin/BlogEditorClient.tsx` | Admin panel component: BlogEditorClient |
| `src/components/admin/BlogEditorForm.tsx` | Admin panel component: BlogEditorForm |
| `src/components/admin/GalleryAdminClient.tsx` | Admin panel component: GalleryAdminClient |
| `src/components/admin/LeadDetailClient.tsx` | Admin panel component: LeadDetailClient |
| `src/components/admin/LeadsTable.tsx` | Admin panel component: LeadsTable |
| `src/components/admin/StatusBadge.tsx` | Admin panel component: StatusBadge |
| `src/components/admin/TestimonialsAdminClient.tsx` | Admin panel component: TestimonialsAdminClient |
| `src/components/blog/BlogArticleContent.tsx` | Blog: BlogArticleContent |
| `src/components/calculator/OpenAreaCalculator.tsx` | Calculator: OpenAreaCalculator |
| `src/components/certifications/CertificationsPage.tsx` | Certifications: CertificationsPage |
| `src/components/clients/ClientsPage.tsx` | Clients page: ClientsPage |
| `src/components/contact/ContactPage.tsx` | Contact page: ContactPage |
| `src/components/gallery/GalleryPage.tsx` | Gallery: GalleryPage |
| `src/components/group/GroupPage.tsx` | Group page: GroupPage |
| `src/components/home/AboutSection.tsx` | Home section: AboutSection |
| `src/components/home/CtaSection.tsx` | Home section: CtaSection |
| `src/components/home/GroupSection.tsx` | Home section: GroupSection |
| `src/components/home/HeroSection.tsx` | Home section: HeroSection |
| `src/components/home/IndustriesSection.tsx` | Home section: IndustriesSection |
| `src/components/home/MagneticDotsBackground.tsx` | Home section: MagneticDotsBackground |
| `src/components/home/ProcessSection.tsx` | Home section: ProcessSection |
| `src/components/home/ProductShowcase.tsx` | Home section: ProductShowcase |
| `src/components/home/ProductsSection.tsx` | Home section: ProductsSection |
| `src/components/home/TrustBar.tsx` | Home section: TrustBar |
| `src/components/home/VideoSection.tsx` | Home section: VideoSection |
| `src/components/industries/IndustriesIndexPage.tsx` | Industries: IndustriesIndexPage |
| `src/components/industries/IndustryPageClient.tsx` | Industries: IndustryPageClient |
| `src/components/landing/LandingCTA.tsx` | Landing page component: LandingCTA |
| `src/components/landing/LandingCapabilities.tsx` | Landing page component: LandingCapabilities |
| `src/components/landing/LandingHero.tsx` | Landing page component: LandingHero |
| `src/components/landing/LandingIndustries.tsx` | Landing page component: LandingIndustries |
| `src/components/landing/LandingLocations.tsx` | Landing page component: LandingLocations |
| `src/components/landing/LandingMarquee.tsx` | Landing page component: LandingMarquee |
| `src/components/landing/LandingNav.tsx` | Landing page component: LandingNav |
| `src/components/landing/LandingProcess.tsx` | Landing page component: LandingProcess |
| `src/components/landing/LandingProducts.tsx` | Landing page component: LandingProducts |
| `src/components/landing/LandingStats.tsx` | Landing page component: LandingStats |
| `src/components/landing/LandingStory.tsx` | Landing page component: LandingStory |
| `src/components/landing/LandingTestimonials.tsx` | Landing page component: LandingTestimonials |
| `src/components/landing/ScrollProgress.tsx` | Landing page component: ScrollProgress |
| `src/components/landing/hooks/useCardSpotlight.ts` | Landing page component: useCardSpotlight |
| `src/components/layout/Footer.tsx` | Layout component: Footer |
| `src/components/layout/Logo.tsx` | Layout component: Logo |
| `src/components/layout/Navbar.tsx` | Layout component: Navbar |
| `src/components/layout/SiteChrome.tsx` | Layout component: SiteChrome |
| `src/components/location/LocationPageClient.tsx` | Location SEO: LocationPageClient |
| `src/components/products/DimpleSheet3D.tsx` | Product page component: DimpleSheet3D |
| `src/components/products/PerforationPatterns.tsx` | Product page component: PerforationPatterns |
| `src/components/products/ProductPageClient.tsx` | Product page component: ProductPageClient |
| `src/components/products/ProductQuoteForm.tsx` | Product page component: ProductQuoteForm |
| `src/components/products/ProductsIndexPage.tsx` | Product page component: ProductsIndexPage |
| `src/components/quote/GetQuotePage.tsx` | Quote form: GetQuotePage |
| `src/components/seo/BlogPostingSchema.tsx` | JSON-LD schema: BlogPostingSchema |
| `src/components/seo/BreadcrumbSchema.tsx` | JSON-LD schema: BreadcrumbSchema |
| `src/components/seo/ContactPageSchema.tsx` | JSON-LD schema: ContactPageSchema |
| `src/components/seo/GlobalSchema.tsx` | JSON-LD schema: GlobalSchema |
| `src/components/shared/CtaBanner.tsx` | Shared component: CtaBanner |
| `src/components/shared/IndiaMap.tsx` | Shared component: IndiaMap |
| `src/components/shared/IndiaMapLoader.tsx` | Shared component: IndiaMapLoader |
| `src/components/shared/PageHero.tsx` | Shared component: PageHero |
| `src/components/shared/PageViewTracker.tsx` | Shared component: PageViewTracker |
| `src/components/shared/WhatsAppButton.tsx` | Shared component: WhatsAppButton |
| `src/components/ui/accordion.tsx` | shadcn/ui component: accordion |
| `src/components/ui/badge.tsx` | shadcn/ui component: badge |
| `src/components/ui/button.tsx` | shadcn/ui component: button |
| `src/components/ui/card.tsx` | shadcn/ui component: card |
| `src/components/ui/dialog.tsx` | shadcn/ui component: dialog |
| `src/components/ui/input.tsx` | shadcn/ui component: input |
| `src/components/ui/label.tsx` | shadcn/ui component: label |
| `src/components/ui/navigation-menu.tsx` | shadcn/ui component: navigation-menu |
| `src/components/ui/select.tsx` | shadcn/ui component: select |
| `src/components/ui/sheet.tsx` | shadcn/ui component: sheet |
| `src/components/ui/tabs.tsx` | shadcn/ui component: tabs |
| `src/components/ui/textarea.tsx` | shadcn/ui component: textarea |
| `src/data/about.ts` | About page timeline, stats, leadership |
| `src/data/blog-posts.ts` | BLOG_POSTS — 4 seed articles with markdown content |
| `src/data/branches.ts` | Branch helpers and Google Maps URL builder |
| `src/data/calculator-faqs.ts` | Calculator page FAQ accordion data |
| `src/data/industries.ts` | INDUSTRY_DETAILS — 8 industry pages |
| `src/data/landing.ts` | Landing page marketing copy |
| `src/data/locations.ts` | LOCATION_PAGES — 6 city×product SEO pages |
| `src/data/products.ts` | PRODUCT_DETAILS for 6 products — full page content |
| `src/lib/constants.ts` | COMPANY, BRANCHES, PRODUCTS, NAV, FOOTER, SEO, HOME_SECTIONS |
| `src/lib/email.ts` | whatsappUrl(number, message) helper |
| `src/lib/icons.ts` | getProductIcon(name) → Lucide component |
| `src/lib/location-page.tsx` | locationMetadata() + renderLocationPage() for SEO location routes |
| `src/lib/supabase/actions.ts` | Server actions: updateLeadStatus, createFollowUp, blog CRUD, gallery upload |
| `src/lib/supabase/anon.ts` | Anonymous client for public reads |
| `src/lib/supabase/client.ts` | Browser Supabase client (createBrowserClient) |
| `src/lib/supabase/env.ts` | getSupabaseUrl, getSupabaseAnonKey, isSupabaseConfigured |
| `src/lib/supabase/queries.ts` | getGalleryItems, getBlogPosts, getLeads, getDashboardStats |
| `src/lib/supabase/route.ts` | createRouteHandlerClient helper |
| `src/lib/supabase/schema.sql` | Full DDL, RLS policies, seed data for Supabase |
| `src/lib/supabase/server.ts` | Server Supabase client with cookies |
| `src/lib/utils.ts` | cn() className merge utility |
| `src/lib/validations.ts` | Zod schemas: contactFormSchema, quoteFormSchema, productQuoteSchema |
| `src/middleware.ts` | Supabase session check for /admin/* routes |
| `src/types/database.ts` | Supabase table TypeScript interfaces |

---

## APPENDIX J — Security Headers

Configured in `next.config.ts` headers() for all routes:

| Header | Value | Purpose |
|--------|-------|---------|
| X-Frame-Options | DENY | Prevent clickjacking |
| X-Content-Type-Options | nosniff | Prevent MIME sniffing |
| Referrer-Policy | strict-origin-when-cross-origin | Control referrer leakage |

---

## APPENDIX K — WhatsApp Integration

All WhatsApp links use `whatsappUrl(number, message)` from `src/lib/email.ts`:

- **Number source:** `process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? COMPANY.whatsapp` (default 919370606017)
- **Format:** `https://wa.me/{number}?text={encodeURIComponent(message)}`
- **Used in:** WhatsAppButton (floating), Footer, ContactPage, GetQuotePage success, API error fallbacks, LandingCTA
- **Default message (floating button):** Pre-filled enquiry about perforated sheets

---

## APPENDIX L — Page View Tracking

- **Component:** `PageViewTracker.tsx` in SiteChrome
- **Trigger:** useEffect on pathname change
- **API:** POST `/api/track` with `{ page: pathname }`
- **Storage:** Supabase `page_views` table
- **Excluded routes:** None explicitly — tracks all pages wrapped in SiteChrome
- **Admin visibility:** Dashboard stats show total page views

---

## APPENDIX M — Landing Page Notes

- **Route:** `/landing`
- **robots:** noindex, nofollow (set in landing/page.tsx metadata)
- **Layout:** Does NOT use SiteChrome — has own LandingNav
- **Purpose:** Paid ads / campaign landing page separate from main site SEO
- **Sections:** LandingHero, LandingStats, LandingCapabilities, LandingProducts, LandingIndustries, LandingProcess, LandingStory, LandingTestimonials, LandingLocations, LandingMarquee, LandingCTA, ScrollProgress
- **Link to main site:** Footer link to https://jaishreegroup.in

---

## APPENDIX N — Product FAQ Full Text

### `perforated-sheets`

**Q:** What is the maximum thickness you can perforate?
**A:** We can perforate up to 12mm thickness plates in any metal including Stainless Steel, MS, GI, Aluminum, Copper, and Brass.

**Q:** What materials are available for perforated sheets?
**A:** We work with Stainless Steel, MS (Mild Steel), GI (Galvanized Iron), Aluminum, Copper, Brass, Titanium, PVC, and PP Sheet.

**Q:** Can you make custom hole patterns?
**A:** Yes, our R&D team develops special dies and tools for any custom hole pattern, shape, or configuration as per your drawing.

**Q:** Do you supply perforated sheets in Pune and Mumbai?
**A:** Yes, we have 3 manufacturing units in Pune (Talawade) and 3 units in Mumbai (Masjid Bunder, Bhayander, Palghar).

### `laser-cutting`

**Q:** What thickness can you laser cut?
**A:** We accept up to 14mm thickness plates for laser cutting in MS, Stainless Steel, Aluminum, Copper, Brass, and Titanium.

**Q:** Can you cut from my custom drawing?
**A:** Yes, we can process any specific drawing in any metal. We accept DXF, DWG, and other standard CAD formats.

**Q:** What is the advantage of combining Turret Punching with Laser?
**A:** The combination allows cost optimization — standard holes are turret punched (faster, cheaper) while complex shapes are laser cut.

**Q:** Do you offer laser cutting services in Pune?
**A:** Yes, our laser cutting facility is located at Talawade, Pune with the latest fiber laser technology.

**Q:** How long does a laser cutting job take?
**A:** Standard jobs are completed within 2-5 working days depending on complexity and quantity.

### `expanded-metal`

**Q:** What is expanded metal?
**A:** Expanded metal is made by slitting and stretching a single metal sheet — no material is removed, resulting in minimum waste.

**Q:** What patterns are available?
**A:** Diamond, Square, Hexagonal, Grating, and Half Round patterns. Special designs at customer request.

**Q:** What is the maximum thickness?
**A:** Maximum thickness is 6mm. Sheets can also be supplied in coil form.

**Q:** Difference vs perforated sheet?
**A:** Expanded metal = slitting/stretching (no waste); perforated = punching holes (material removed). Expanded metal is more cost-effective with better strength-to-weight ratio.

### `turret-punching`

**Q:** What hole shapes can you punch?
**A:** Round, Square, Rectangular, Oblong, Hexagonal, and Conical holes. Custom shapes with special R&D dies.

**Q:** What is the advantage of Turret Punching over Laser Cutting?
**A:** Turret Punching is faster and more economical for standard shapes in high volumes. Combined with Laser for complex shapes, overall job cost is significantly reduced.

**Q:** Can you make special dies for custom hole shapes?
**A:** Yes, our R&D team develops special dies and tools for any customer specification. Custom tooling for bulk orders.

**Q:** What materials can be turret punched?
**A:** Stainless Steel, MS, GI, Aluminum, Brass, and Copper in various thicknesses.

**Q:** Do you offer turret punching job work in Pune?
**A:** Yes, from our Talawade, Pune facility serving Pune, Mumbai, and worldwide.

### `precision-sheet-leveling`

**Q:** Why do perforated sheets need leveling?
**A:** Perforation and laser cutting create internal stresses causing bowing or warping. Precision leveling restores flatness for proper fit and function.

**Q:** What metals can you level?
**A:** All metals including Stainless Steel, MS, GI, Aluminum, Copper, and Brass sheets.

**Q:** Is sheet leveling available as a standalone service?
**A:** Yes — send perforated or cut sheets to our Pune facility for leveling job work.

**Q:** What flatness tolerance can you achieve?
**A:** Depends on material, thickness, and application. We work to customer-specified tolerances.

### `custom-components`

**Q:** Can you manufacture from my custom drawing?
**A:** Yes — DXF, DWG, PDF drawings or physical samples accepted. R&D develops special dies if required.

**Q:** What is the minimum order quantity for custom components?
**A:** MOQ depends on job complexity. Contact us with your drawing for a quote.

**Q:** How long does custom component development take?
**A:** Standard jobs: 5-7 working days. New die development: 10-15 working days. Urgent jobs accommodated.

**Q:** What hole shapes can you make for custom jobs?
**A:** Round, Square, Rectangular, Oblong, Hexagonal, Conical, and completely custom shapes via special dies.

---

## Document Statistics

- **Total sections:** 20 main sections + 14 appendices (A–N)
- **Source files indexed:** 147 files under `src/`
- **Documented routes:** 13 static + 6 product + 8 industry + 4 blog + 6 location + 4 API + 10 admin
- **Maintained by:** Viralbizz (Rahul + Subhash)

*End of documentation.*