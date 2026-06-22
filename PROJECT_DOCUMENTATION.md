# Jai Shree Group Website — Project Documentation

> **Last updated:** June 2026  
> **Purpose:** Complete reference for developers and AI agents to understand, maintain, and extend this project from scratch.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Environment Variables](#4-environment-variables)
5. [Database Schema (Supabase)](#5-database-schema-supabase)
6. [Design System](#6-design-system)
7. [Company Data](#7-company-data)
8. [Active Products](#8-active-products)
9. [SEO Strategy](#9-seo-strategy)
10. [Admin Panel](#10-admin-panel)
11. [API Routes](#11-api-routes)
12. [Key Components](#12-key-components)
13. [Supabase Storage](#13-supabase-storage)
14. [Deployment](#14-deployment)
15. [Video Section](#15-video-section)
16. [Logo](#16-logo)
17. [Known Issues & Pending Tasks](#17-known-issues--pending-tasks)
18. [How to Run Locally](#18-how-to-run-locally)
19. [How to Add New Product](#19-how-to-add-new-product)
20. [How to Update Content](#20-how-to-update-content)
21. [Contacts & Credentials](#21-contacts--credentials)

---

## 1. Project Overview

| Field | Value |
|-------|-------|
| **Project name** | Jai Shree Group Website |
| **Business** | Metal manufacturing — perforated sheets, laser cutting, expanded metal, turret punching, precision sheet leveling, custom components |
| **Website purpose** | Lead generation, SEO dominance, brand authority, product showcase |
| **Built by** | Viralbizz ([admin@viralbizz.com](mailto:admin@viralbizz.com)) |
| **Client** | Shree Perforators / Jai Shree Group (Kanishq Jangid) |
| **Live URL** | https://jai-shree-group.vercel.app |
| **Target domain** | https://jaishreegroup.in |
| **Date** | June 2026 |

Jai Shree Group is an ISO 9001:2015 certified metal manufacturer with 50+ years of experience and 8 manufacturing units across Pune and Mumbai. The website serves as a high-conversion lead generation platform with deep SEO coverage for product × location keyword combinations, a cinematic landing page, open area calculator, and a full admin CMS for leads, blog, gallery, and testimonials.

---

## 2. Tech Stack

All versions from `package.json` (project version `0.1.0`).

### Core Framework

| Technology | Version | Notes |
|------------|---------|-------|
| **Next.js** | 16.2.7 | App Router, Turbopack dev/build |
| **React** | 19.2.4 | Server + Client Components |
| **React DOM** | 19.2.4 | |
| **TypeScript** | ^5 | Strict typing throughout |
| **Node.js** | 18+ recommended | Vercel default: Node.js 24 LTS |

### Styling & UI

| Technology | Version | Notes |
|------------|---------|-------|
| **Tailwind CSS** | ^4 | v4 with `@tailwindcss/postcss` |
| **shadcn/ui** | ^4.11.0 | Radix + Nova preset |
| **radix-ui** | ^1.5.0 | Headless primitives |
| **tailwindcss-animate** | ^1.0.7 | Animation utilities |
| **tw-animate-css** | ^1.4.0 | Additional animations |
| **@tailwindcss/typography** | ^0.5.20 | Prose styling for blog |
| **class-variance-authority** | ^0.7.1 | Component variants |
| **clsx** | ^2.1.1 | Conditional classes |
| **tailwind-merge** | ^3.6.0 | Merge Tailwind classes |
| **lucide-react** | ^1.17.0 | Icon library |

### Animation & 3D

| Technology | Version | Notes |
|------------|---------|-------|
| **Framer Motion** | ^12.40.0 | Page transitions, scroll animations |
| **GSAP** | ^3.15.0 | Landing page cinematic effects |
| **@gsap/react** | ^2.1.2 | React GSAP integration |
| **Three.js** | ^0.184.0 | 3D dimple sheet render |
| **@types/three** | ^0.184.1 | TypeScript types |
| **@splinetool/react-spline** | ^4.1.0 | Optional 3D scenes |
| **@splinetool/runtime** | ^1.12.97 | Spline runtime |

### Backend & Data

| Technology | Version | Notes |
|------------|---------|-------|
| **Supabase** | @supabase/supabase-js ^2.108.1 | PostgreSQL database |
| **Supabase Auth** | @supabase/auth-helpers-nextjs ^0.15.0 | Session middleware |
| **Supabase Auth UI** | @supabase/auth-ui-react ^0.4.7 | Admin login form |
| **Resend** | ^6.12.4 | Transactional email |

### Forms & Validation

| Technology | Version | Notes |
|------------|---------|-------|
| **react-hook-form** | ^7.78.0 | Form state management |
| **@hookform/resolvers** | ^5.4.0 | Schema resolvers |
| **zod** | ^4.4.3 | Request validation |

### Maps

| Technology | Version | Notes |
|------------|---------|-------|
| **Leaflet** | ^1.9.4 | Interactive India map |
| **react-leaflet** | ^5.0.0 | React bindings |
| **@types/leaflet** | ^1.9.21 | TypeScript types |

### Dev Tools

| Technology | Version | Notes |
|------------|---------|-------|
| **ESLint** | ^9 | Linting |
| **eslint-config-next** | 16.2.7 | Next.js ESLint rules |
| **@types/node** | ^20 | Node types |
| **@types/react** | ^19 | React types |
| **@types/react-dom** | ^19 | React DOM types |

### Infrastructure

| Service | Details |
|---------|---------|
| **Deployment** | Vercel |
| **Version control** | GitHub — [sainirahul2163/jai-shree-group](https://github.com/sainirahul2163/jai-shree-group) |
| **Package manager** | npm |

### Fonts

- **Geist Sans** — loaded via `next/font/google` in `src/app/layout.tsx`
- **Geist Mono** — monospace companion font

---

## 3. Project Structure

### `src/` Directory Tree

```
src/
├── app/                              # Next.js App Router
│   ├── about/page.tsx
│   ├── admin/
│   │   ├── login/page.tsx
│   │   └── (panel)/
│   │       ├── layout.tsx
│   │       ├── dashboard/page.tsx
│   │       ├── leads/
│   │       │   ├── page.tsx
│   │       │   └── [id]/page.tsx
│   │       ├── gallery/page.tsx
│   │       ├── blog/
│   │       │   ├── page.tsx
│   │       │   ├── new/page.tsx
│   │       │   └── [id]/page.tsx
│   │       ├── testimonials/page.tsx
│   │       └── settings/page.tsx
│   ├── api/
│   │   ├── contact/route.ts
│   │   ├── quote/route.ts
│   │   └── track/route.ts
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── calculator/page.tsx
│   ├── certifications/page.tsx
│   ├── clients/page.tsx
│   ├── contact/page.tsx
│   ├── gallery/page.tsx
│   ├── get-quote/page.tsx
│   ├── group/page.tsx
│   ├── industries/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── landing/page.tsx
│   ├── mumbai/
│   │   ├── laser-cutting-services/page.tsx
│   │   ├── perforated-sheet-manufacturers/page.tsx
│   │   └── wire-mesh-manufacturers/page.tsx
│   ├── pune/
│   │   ├── expanded-metal-manufacturers/page.tsx
│   │   ├── laser-cutting-services/page.tsx
│   │   ├── perforated-sheet-manufacturers/page.tsx
│   │   └── wire-mesh-manufacturers/page.tsx
│   ├── products/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── error.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── page.tsx                      # Home page
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── about/
│   ├── admin/
│   ├── calculator/
│   ├── certifications/
│   ├── clients/
│   ├── contact/
│   ├── gallery/
│   ├── group/
│   ├── home/                         # Home page sections
│   ├── industries/
│   ├── landing/                      # Cinematic landing page
│   ├── layout/                       # Navbar, Footer, Logo, SiteChrome
│   ├── location/
│   ├── products/
│   ├── quote/
│   ├── seo/                          # JSON-LD schema components
│   ├── shared/                       # WhatsApp, IndiaMap, PageViewTracker
│   └── ui/                           # shadcn/ui primitives
├── data/
│   ├── about.ts
│   ├── branches.ts
│   ├── industries.ts
│   ├── landing.ts
│   ├── locations.ts
│   └── products.ts
├── lib/
│   ├── constants.ts                  # Single source of truth for company data
│   ├── email.ts
│   ├── icons.ts
│   ├── location-page.tsx
│   ├── utils.ts
│   ├── validations.ts
│   └── supabase/
│       ├── actions.ts
│       ├── anon.ts
│       ├── client.ts
│       ├── env.ts
│       ├── queries.ts
│       ├── route.ts
│       ├── schema.sql
│       └── server.ts
├── middleware.ts                     # Admin auth protection
└── types/
    └── database.ts                   # Supabase TypeScript types
```

### `public/` Directory

```
public/
├── brochure/
│   └── jai-shree-brochure.pdf        # Downloadable catalogue
├── logo-dark.png / logo-dark.svg
├── logo-icon-only.png / logo-icon-only.svg
├── logo-navbar.png / logo-navbar.svg
├── logo-transparent.png / logo-transparent.svg
├── og-image.jpg                      # Open Graph image (1200×630)
├── file.svg, vercel.svg, window.svg  # Placeholder assets
└── README.md
```

> **Note:** `public/logo.png` is the intended location for the client's official logo PNG when provided. Current logo assets use alternate filenames.

### Major Folder Purposes

| Folder | Purpose |
|--------|---------|
| `src/app/` | Next.js App Router pages, layouts, API routes, sitemap, robots |
| `src/components/` | React components organized by feature (home, products, admin, etc.) |
| `src/lib/` | Utilities, constants, Supabase clients, validation schemas |
| `src/data/` | Static data files — product details, industries, locations, branches |
| `src/types/` | TypeScript type definitions (database models) |
| `public/` | Static assets — logos, brochure PDF, OG image |

### All Routes

| Route | Type | Purpose |
|-------|------|---------|
| `/` | Static | Home page — hero, products, about, industries, process, group map, CTA |
| `/landing` | Static | Cinematic standalone landing page (no site navbar) |
| `/about` | Static | Company history, timeline, founder story |
| `/group` | Static | 8 manufacturing units with branch details |
| `/products` | Static | Product index — 6 active products |
| `/products/perforated-sheets` | SSG | Perforated sheets product detail |
| `/products/laser-cutting` | SSG | Laser cutting product detail |
| `/products/expanded-metal` | SSG | Expanded metal product detail |
| `/products/turret-punching` | SSG | Turret punching product detail |
| `/products/precision-sheet-leveling` | SSG | Precision sheet leveling product detail |
| `/products/custom-components` | SSG | Custom components product detail |
| `/industries` | Static | Industry index |
| `/industries/automobile` | SSG | Automobile industry page |
| `/industries/construction` | SSG | Construction industry page |
| `/industries/food-beverage` | SSG | Food & beverage industry page |
| `/industries/pharmaceutical` | SSG | Pharmaceutical industry page |
| `/industries/petrochemical` | SSG | Petrochemical industry page |
| `/industries/architecture-interior` | SSG | Architecture & interior industry page |
| `/industries/sugar-industry` | SSG | Sugar industry page |
| `/industries/mining-quarrying` | SSG | Mining & quarrying industry page |
| `/calculator` | Static | Open area calculator (6 formulas) |
| `/gallery` | Static | Product photo gallery (Supabase-backed) |
| `/clients` | Static | Client logos and testimonials |
| `/certifications` | Static | ISO certification page |
| `/contact` | Static | Contact form + branch info |
| `/get-quote` | Static | Detailed quote request form |
| `/blog` | Static | Blog index |
| `/blog/how-to-calculate-open-area-perforated-sheet` | SSG | Blog post |
| `/blog/expanded-metal-vs-perforated-sheet` | SSG | Blog post |
| `/blog/wire-mesh-specification-guide` | SSG | Blog post |
| `/blog/laser-cutting-vs-turret-punching` | SSG | Blog post |
| `/pune/perforated-sheet-manufacturers` | Static | Pune location SEO page |
| `/pune/laser-cutting-services` | Static | Pune location SEO page |
| `/pune/expanded-metal-manufacturers` | Static | Pune location SEO page |
| `/pune/wire-mesh-manufacturers` | Static | Pune location SEO page (wire mesh removed as product) |
| `/mumbai/perforated-sheet-manufacturers` | Static | Mumbai location SEO page |
| `/mumbai/laser-cutting-services` | Static | Mumbai location SEO page |
| `/mumbai/wire-mesh-manufacturers` | Static | Mumbai location SEO page |
| `/admin/login` | Static | Admin authentication |
| `/admin/dashboard` | Dynamic | Admin overview — stats, recent leads, page views |
| `/admin/leads` | Dynamic | Lead management table with search/filter |
| `/admin/leads/[id]` | Dynamic | Lead detail, status update, follow-ups |
| `/admin/gallery` | Dynamic | Upload photos to Supabase Storage |
| `/admin/blog` | Dynamic | Blog post list |
| `/admin/blog/new` | Dynamic | Create blog post |
| `/admin/blog/[id]` | Dynamic | Edit blog post |
| `/admin/testimonials` | Dynamic | CRUD testimonials |
| `/admin/settings` | Dynamic | Environment status |
| `/api/contact` | Dynamic | Contact form submission |
| `/api/quote` | Dynamic | Quote form submission |
| `/api/track` | Dynamic | Page view analytics |
| `/sitemap.xml` | Static | Auto-generated sitemap |
| `/robots.txt` | Static | Search engine directives |

---

## 4. Environment Variables

Create `.env.local` in the project root. No `.env.example` file exists in the repository — use the template below.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL (e.g. `https://xxx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous/public key — used by client and middleware |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key — bypasses RLS for API routes |
| `RESEND_API_KEY` | Yes | Resend API key for email notifications |
| `CONTACT_EMAIL` | Yes | Recipient email for form notifications (e.g. `shreeperforator@gmail.com`) |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical site URL (e.g. `https://jaishreegroup.in`) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Yes | WhatsApp number without `+` (e.g. `919370606017`) |

### Optional Variables

| Variable | Description |
|----------|-------------|
| `RESEND_FROM` | Custom sender address (default: `Jai Shree Group Website <onboarding@resend.dev>`) |
| `RESEND_TO` | Fallback recipient if `CONTACT_EMAIL` is unset |

### Template

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
RESEND_API_KEY=your_resend_key
CONTACT_EMAIL=shreeperforator@gmail.com
NEXT_PUBLIC_SITE_URL=https://jaishreegroup.in
NEXT_PUBLIC_WHATSAPP_NUMBER=919370606017
```

---

## 5. Database Schema (Supabase)

Schema file: `src/lib/supabase/schema.sql`  
TypeScript types: `src/types/database.ts`

Run the SQL file in **Supabase Dashboard → SQL → New query** to create all tables, triggers, and RLS policies.

### Extension

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

---

### Table: `leads`

**Purpose:** Stores all inbound enquiries from contact forms, quote forms, and product/location pages.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | `uuid_generate_v4()` | Primary key |
| `name` | TEXT | No | — | Contact name |
| `phone` | TEXT | No | — | Phone number |
| `email` | TEXT | Yes | — | Email address |
| `company` | TEXT | Yes | — | Company name |
| `product_interest` | TEXT | Yes | — | Single product interest (contact form) |
| `products_selected` | TEXT[] | Yes | — | Array of products (quote form) |
| `message` | TEXT | Yes | — | Free-text message |
| `specifications` | JSONB | Yes | — | Structured quote specs |
| `material` | TEXT | Yes | — | Material type |
| `thickness` | TEXT | Yes | — | Thickness |
| `size` | TEXT | Yes | — | Dimensions |
| `quantity` | TEXT | Yes | — | Quantity with unit |
| `deadline` | TEXT | Yes | — | Required delivery date |
| `city` | TEXT | Yes | — | Customer city |
| `source` | TEXT | No | `'contact_form'` | Lead source identifier |
| `source_page` | TEXT | Yes | — | Referring page URL |
| `status` | TEXT | No | `'new'` | Pipeline status |
| `notes` | TEXT | Yes | — | Admin notes |
| `created_at` | TIMESTAMPTZ | Yes | `NOW()` | Created timestamp |
| `updated_at` | TIMESTAMPTZ | Yes | `NOW()` | Updated timestamp (auto-trigger) |

**Status values:** `new`, `contacted`, `quoted`, `converted`, `lost`  
**Source values:** `contact_form`, `quote_form`, `product_page`, `location_page`

**Foreign keys:** None  
**Indexes:** Primary key on `id`  
**Trigger:** `leads_updated_at` — auto-updates `updated_at` on row update

**RLS Policies:**

| Policy | Role | Operation | Rule |
|--------|------|-----------|------|
| Admin full access leads | `authenticated` | ALL | Full read/write for admin users |
| Public can insert leads | `anon` | INSERT | Anyone can submit leads via public forms |

> API routes use `SUPABASE_SERVICE_ROLE_KEY` which bypasses RLS entirely.

---

### Table: `follow_ups`

**Purpose:** Tracks follow-up activities (calls, emails, WhatsApp, meetings) for each lead.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | `uuid_generate_v4()` | Primary key |
| `lead_id` | UUID | Yes | — | FK → `leads(id)` ON DELETE CASCADE |
| `type` | TEXT | No | — | Follow-up type |
| `notes` | TEXT | No | — | Follow-up notes |
| `followed_up_at` | TIMESTAMPTZ | Yes | `NOW()` | When follow-up occurred |
| `created_at` | TIMESTAMPTZ | Yes | `NOW()` | Record created |

**Follow-up types:** `whatsapp`, `call`, `email`, `meeting`

**Foreign keys:** `lead_id` → `leads(id)` ON DELETE CASCADE

**RLS Policies:**

| Policy | Role | Operation | Rule |
|--------|------|-----------|------|
| Admin full access follow_ups | `authenticated` | ALL | Admin only |

---

### Table: `blog_posts`

**Purpose:** CMS-managed blog content for SEO and technical guides.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | `uuid_generate_v4()` | Primary key |
| `title` | TEXT | No | — | Post title |
| `slug` | TEXT | No | — | URL slug (UNIQUE) |
| `content` | TEXT | No | `''` | Full HTML/Markdown content |
| `excerpt` | TEXT | No | `''` | Short summary |
| `category` | TEXT | No | `'General'` | Category label |
| `meta_title` | TEXT | Yes | — | SEO title override |
| `meta_description` | TEXT | Yes | — | SEO description override |
| `cover_image_url` | TEXT | Yes | — | Cover image URL |
| `is_published` | BOOLEAN | Yes | `FALSE` | Publish flag |
| `published_at` | TIMESTAMPTZ | Yes | — | Publish date |
| `author` | TEXT | Yes | `'Jai Shree Group'` | Author name |
| `created_at` | TIMESTAMPTZ | Yes | `NOW()` | Created timestamp |
| `updated_at` | TIMESTAMPTZ | Yes | `NOW()` | Updated timestamp (auto-trigger) |

**Foreign keys:** None  
**Indexes:** UNIQUE on `slug`  
**Trigger:** `blog_posts_updated_at`

**RLS Policies:**

| Policy | Role | Operation | Rule |
|--------|------|-----------|------|
| Admin full access blog_posts | `authenticated` | ALL | Admin CRUD |
| Public read published blogs | `anon` | SELECT | `is_published = true` |

**Seed data:** 4 blog posts inserted on schema run (see `BLOG_POSTS` constant).

---

### Table: `gallery_items`

**Purpose:** Product photo gallery managed via admin panel.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | `uuid_generate_v4()` | Primary key |
| `image_url` | TEXT | No | — | Supabase Storage public URL |
| `title` | TEXT | No | — | Photo title |
| `description` | TEXT | Yes | — | Photo description |
| `product_category` | TEXT | No | `'General'` | Product category filter |
| `is_published` | BOOLEAN | Yes | `TRUE` | Visibility flag |
| `sort_order` | INTEGER | Yes | `0` | Display order |
| `created_at` | TIMESTAMPTZ | Yes | `NOW()` | Created timestamp |

**RLS Policies:**

| Policy | Role | Operation | Rule |
|--------|------|-----------|------|
| Admin full access gallery | `authenticated` | ALL | Admin CRUD |
| Public read published gallery | `anon` | SELECT | `is_published = true` |

---

### Table: `testimonials`

**Purpose:** Client testimonials displayed on site and landing page.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | `uuid_generate_v4()` | Primary key |
| `client_name` | TEXT | No | — | Client contact name |
| `company_name` | TEXT | Yes | — | Company name |
| `industry` | TEXT | Yes | — | Industry sector |
| `message` | TEXT | No | — | Testimonial text |
| `rating` | INTEGER | Yes | `5` | Star rating (1–5, CHECK constraint) |
| `is_featured` | BOOLEAN | Yes | `FALSE` | Featured on homepage |
| `is_published` | BOOLEAN | Yes | `TRUE` | Visibility flag |
| `created_at` | TIMESTAMPTZ | Yes | `NOW()` | Created timestamp |

**RLS Policies:**

| Policy | Role | Operation | Rule |
|--------|------|-----------|------|
| Admin full access testimonials | `authenticated` | ALL | Admin CRUD |
| Public read published testimonials | `anon` | SELECT | `is_published = true` |

**Seed data:** 3 testimonials (Tata AutoComp, Piramal Pharma, L&T Construction).

---

### Table: `page_views`

**Purpose:** Lightweight analytics — tracks page visits with product/city context.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | `uuid_generate_v4()` | Primary key |
| `page` | TEXT | No | — | Page path |
| `product` | TEXT | Yes | — | Product slug if applicable |
| `city` | TEXT | Yes | — | City if location page |
| `referrer` | TEXT | Yes | — | HTTP referer header |
| `created_at` | TIMESTAMPTZ | Yes | `NOW()` | View timestamp |

**RLS Policies:**

| Policy | Role | Operation | Rule |
|--------|------|-----------|------|
| Admin full access page_views | `authenticated` | ALL | Admin read |
| Public can insert page_views | `anon` | INSERT | Public tracking via `/api/track` |

---

## 6. Design System

Dark industrial aesthetic with orange accent. All tokens defined in `src/app/globals.css` and `DESIGN_TOKENS` in `src/lib/constants.ts`.

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#0A0A0A` | Page background |
| Surface | `#111111` | Card backgrounds |
| Surface 2 | `#1A1A1A` | Elevated surfaces, secondary bg |
| Border | `#2A2A2A` | Card borders, dividers |
| Primary Orange | `#E8521A` | CTAs, accents, links |
| Orange Bright | `#FF6B35` | Hover states, gradients |
| Text Primary | `#FFFFFF` | Headings, body text |
| Text Secondary | `#A0A0A0` | Subtitles, descriptions |
| Text Muted | `#666666` | Captions, metadata |
| Metallic | `#C0C0C0` | Gradient text highlight |
| Steel | `#8A8A8A` | Secondary metallic tone |

### Typography

| Element | Style |
|---------|-------|
| **Font family** | Geist Sans (via shadcn Nova preset + `next/font`) |
| **Base size** | 17px (`html { font-size: 17px }`) |
| **Body** | `text-base`, `leading-relaxed` (line-height 1.75) |
| **Display headings** | `font-black`, `tracking-tight` |
| **Section labels** | Uppercase orange eyebrow text |
| **Monospace** | Geist Mono for code/technical content |

### Key CSS Utilities

Defined in `@layer utilities` in `globals.css`:

| Class | Effect |
|-------|--------|
| `.glow-orange` | Orange box-shadow glow (`rgba(232, 82, 26, 0.3)`) |
| `.glow-orange-hover:hover` | Stronger glow on hover |
| `.metallic-text` | White-to-silver gradient text clip |
| `.orange-gradient` | `#E8521A → #FF6B35` background gradient |
| `.orange-gradient-text` | Solid orange text color |
| `.surface-card` | `#1A1A1A` bg, `#2A2A2A` border, rounded-xl |
| `.section-padding` | `px-4 py-20 md:px-8 lg:px-16` |
| `.font-display` | Black weight, uppercase, tight tracking |
| `.hex-grid-bg` | Subtle hex SVG pattern background |
| `.nav-link-underline` | Animated orange underline on hover |
| `.landing-rail` | 60s infinite horizontal marquee scroll |
| `.landing-marquee-left/right` | Dual-speed marquee animations |
| `.landing-shimmer` | Sweeping light band animation |

### Component Patterns

**Section headers:**
```
[Small orange label — e.g. "WHAT WE MANUFACTURE"]
[Large white heading — font-black]
[Optional gray subtext]
```

**Cards:**
- Background: `#111111`
- Border: `#2A2A2A`
- Hover: orange border glow via `.glow-orange-hover`

**Buttons:**
- Primary: Orange filled (`#E8521A`), white text
- Secondary: White outline, transparent background
- Hover: `#FF6B35`

**Badges:**
- Dark pill background
- Orange border
- Small uppercase text

---

## 7. Company Data

All centralized in `src/lib/constants.ts`. Change once, updates everywhere.

### COMPANY Object

| Field | Value |
|-------|-------|
| `name` | Jai Shree Group |
| `tagline` | Precision in Every Perforation |
| `founded` | 1970 |
| `founder` | Mr. Tejaram Jangid |
| `foundedIn` | Delhi |
| `experience` | 50+ |
| `iso` | ISO 9001:2015 |
| `email` | shreeperforator@gmail.com |
| `phone` | +91 9370606017 |
| `whatsapp` | From `NEXT_PUBLIC_WHATSAPP_NUMBER` or `919370606017` |
| `address` | Gat No. 94, Near Sonawane Wasti, Jyotibanagar, Talawade, Pune - 411062 |
| `website` | https://jaishreegroup.in |
| `locations` | Pune (Talawade), Mumbai (Bhayander, Palghar) |
| `manufacturingUnits` | 8 |

### PRODUCTS (6 Active)

| # | Name | Slug | Icon | Materials |
|---|------|------|------|-----------|
| 1 | Perforated Sheets | `perforated-sheets` | Grid3X3 | SS, MS, GI, Aluminum, Copper, Brass |
| 2 | Laser Cutting | `laser-cutting` | Zap | SS, MS, Aluminum, Copper, Brass, Titanium |
| 3 | Expanded Metal | `expanded-metal` | Diamond | SS, MS, GI, Brass, Copper, Aluminum, Titanium |
| 4 | Turret Punching | `turret-punching` | Circle | SS, MS, GI, Aluminum, Copper, Brass |
| 5 | Precision Sheet Leveling | `precision-sheet-leveling` | Ruler | All Metals |
| 6 | Custom Components | `custom-components` | Settings2 | SS, MS, GI, Aluminum, Brass, Copper |

### BRANCHES (8 Units)

| # | Name | City | Area | Phone | Email |
|---|------|------|------|-------|-------|
| 1 | Jai Shree Metal Perforators | Pune | Talawade | +91 9320204156 | jsmppune@gmail.com |
| 2 | Shree Perforators | Pune | Talawade | +91 9370606017 | shreeperforator@gmail.com |
| 3 | Shree Weld Mesh | Pune | Talawade | +91 9049456019 | balajiwelded@gmail.com |
| 4 | Dev Shree Metal Perforators | Pune | Talawade | +91 9890797298 | devshreemetalperforators@gmail.com |
| 5 | Chandan Metal Perforators | Pune | Pisoli | +91 9822216242 | chandanmetalperforators@gmail.com |
| 6 | Jai Shree Filtration | Mumbai | Masjid Bunder | +91 9320204151 | inderjangid@gmail.com |
| 7 | Jai Shree Industries | Mumbai | Bhayander | +91 8181815592 | inderjangid@gmail.com |
| 8 | Jai Shree Perforator | Maharashtra | Palghar | +91 9320204151 | inderjangid@gmail.com |

> Jaliwala branch (Bhosari) was removed from the group listing. Wire mesh location pages still reference it.

### INDUSTRIES

**8 industry detail pages** (in `src/data/industries.ts`):

| Name | Slug |
|------|------|
| Automobile | `automobile` |
| Construction | `construction` |
| Food & Beverage | `food-beverage` |
| Pharmaceutical | `pharmaceutical` |
| Petrochemical | `petrochemical` |
| Architecture & Interior | `architecture-interior` |
| Sugar Industry | `sugar-industry` |
| Mining & Quarrying | `mining-quarrying` |

**Additional industries in constants** (shown on home grid context, no dedicated pages yet):

| Name | Slug |
|------|------|
| Paper Industry | `paper-industry` |
| Agriculture | `agriculture` |

### STATS

| Value | Label |
|-------|-------|
| 50+ | Years of Experience |
| 8 | Manufacturing Units |
| ISO | 9001:2015 Certified |
| PAN | India Delivery |

### PROCESS_STEPS

| Step | Icon | Title | Description |
|------|------|-------|-------------|
| 1 | ClipboardList | Submit Enquiry | Share your requirements |
| 2 | PenTool | Design & Drawing | We review specs |
| 3 | Layers | Material Selection | Best metal for your use |
| 4 | Cog | Manufacturing | CNC precision production |
| 5 | Truck | QC & Delivery | Inspection + Pan India delivery |

### BLOG_POSTS (Static Seed)

| Title | Slug | Category | Date |
|-------|------|----------|------|
| How to Calculate Open Area of Perforated Sheet | `how-to-calculate-open-area-perforated-sheet` | Technical Guide | 2024-01-15 |
| Expanded Metal vs Perforated Sheet: Which to Choose? | `expanded-metal-vs-perforated-sheet` | Product Guide | 2024-01-22 |
| Complete Wire Mesh Specification Guide | `wire-mesh-specification-guide` | Technical Guide | 2024-02-01 |
| Laser Cutting vs Turret Punching: Cost Comparison | `laser-cutting-vs-turret-punching` | Cost Guide | 2024-02-10 |

### Other Constants

| Constant | Purpose |
|----------|---------|
| `MATERIALS` | 9 material options for quote forms |
| `KEY_DIFFERENTIATORS` | 7 USP bullet points |
| `DELIVERY_CITIES` | 8 cities for delivery messaging |
| `WEBSITE_GOALS` | 4 strategic website objectives |
| `ABOUT_TIMELINE` | 7 milestone years (1970–2015) |
| `BROCHURE_URL` | `/brochure/jai-shree-brochure.pdf` |
| `NAV_LINKS` | Main navigation items |
| `FOOTER` | Footer copy, links, social placeholders |

---

## 8. Active Products

### 6 Active Product Pages

| # | Product | Route | Target Keyword |
|---|---------|-------|----------------|
| 1 | Perforated Sheets | `/products/perforated-sheets` | Perforated Sheet Manufacturer Pune Mumbai |
| 2 | Laser Cutting | `/products/laser-cutting` | Laser Cutting Services in Pune & Mumbai |
| 3 | Expanded Metal | `/products/expanded-metal` | Expanded Mesh Manufacturers Pune & Mumbai |
| 4 | Turret Punching | `/products/turret-punching` | CNC Turret Perforated Sheet Manufacturing Pune |
| 5 | Precision Sheet Leveling | `/products/precision-sheet-leveling` | Precision Sheet Leveling Services in Pune |
| 6 | Custom Components | `/products/custom-components` | Custom Metal Components Manufacturers Pune |

### Removed Products (308 Permanent Redirects → `/products`)

| Product | Old Route | Redirect |
|---------|-----------|----------|
| Wire Mesh | `/products/wire-mesh` | → `/products` |
| Welded Mesh | `/products/welded-mesh` | → `/products` |
| Demister Pad | `/products/demister-pad` | → `/products` |
| Aluminum Grill & Profile | `/products/aluminum-grill-profile` | → `/products` |

Configured in `next.config.ts` with `permanent: true` (HTTP 308).

---

## 9. SEO Strategy

### Page Target Keywords

| Page | Target Keyword |
|------|----------------|
| Home (`/`) | Perforated Sheet Manufacturers Pune Mumbai |
| `/products/perforated-sheets` | Perforated Sheet Manufacturer Pune & Mumbai \| CNC Turret |
| `/products/laser-cutting` | Laser Cutting Services in Pune & Mumbai \| CNC Fiber Laser |
| `/products/expanded-metal` | Expanded Mesh Manufacturers Pune & Mumbai |
| `/products/turret-punching` | CNC Turret Perforated Sheet Manufacturing Pune |
| `/products/precision-sheet-leveling` | Precision Sheet Leveling Services in Pune |
| `/products/custom-components` | Custom Metal Components Manufacturers Pune |
| `/industries/automobile` | Perforated Sheets for Automobile Industry |
| `/industries/construction` | Perforated Sheets for Construction |
| `/industries/food-beverage` | Wire Mesh for Food Processing Industry |
| `/industries/pharmaceutical` | Perforated Sheets for Pharmaceutical Industry |
| `/industries/petrochemical` | Demister Pads for Petrochemical Industry |
| `/industries/architecture-interior` | Architectural Perforated Panels |
| `/industries/sugar-industry` | Sugar Industry Screens Manufacturers India |
| `/industries/mining-quarrying` | Mining Screens Manufacturers India |

### Location SEO Pages

| Route | Target Keyword |
|-------|----------------|
| `/pune/perforated-sheet-manufacturers` | Perforated Sheet Manufacturers Pune |
| `/pune/laser-cutting-services` | Laser Cutting Services Pune |
| `/pune/expanded-metal-manufacturers` | Expanded Metal Manufacturers Pune |
| `/pune/wire-mesh-manufacturers` | Wire Mesh Manufacturers Pune |
| `/mumbai/perforated-sheet-manufacturers` | Perforated Sheet Manufacturers Mumbai |
| `/mumbai/laser-cutting-services` | Laser Cutting Services Mumbai |
| `/mumbai/wire-mesh-manufacturers` | Wire Mesh Manufacturers Mumbai |

### Technical SEO

| Feature | Implementation |
|---------|----------------|
| **Sitemap** | Auto-generated at `/sitemap.xml` via `src/app/sitemap.ts` |
| **Robots** | `/robots.txt` — allow all, sitemap reference |
| **JSON-LD schemas** | `ManufacturingBusiness`, `Product`, `FAQPage`, `BreadcrumbList`, `LocalBusiness` |
| **Global schema** | `src/components/seo/GlobalSchema.tsx` — ManufacturingBusiness with offer catalog |
| **Canonical tags** | Set per-page via `generateMetadata()` |
| **OG tags** | Open Graph on all pages via root layout + page metadata |
| **Twitter cards** | `summary_large_image` with `/og-image.jpg` |
| **hreflang** | `en`, `en-US`, `en-GB`, `en-AU` in root layout alternates |
| **areaServed** | IN, US, GB, AU, AE, SG (in GlobalSchema) |
| **Google verification** | Placeholder in layout — `add-your-verification-code-here` |

### Sitemap Priority Weights

| Path type | Priority |
|-----------|----------|
| `/` | 1.0 |
| `/products`, `/contact`, `/get-quote`, `/about`, `/group` | 0.95 |
| Product pages | 0.9 |
| Industry + location pages | 0.8 |
| Other static pages | 0.7 |
| Blog posts | 0.6 |

---

## 10. Admin Panel

### Access

| Field | Value |
|-------|-------|
| **URL** | `/admin/login` |
| **Auth provider** | Supabase Auth |
| **Default admin email** | `admin@jaishreegroup.in` |
| **Setup** | Create user in Supabase Dashboard → Authentication → Users |

### Admin Routes

| Route | Purpose |
|-------|---------|
| `/admin/login` | Email/password authentication |
| `/admin/dashboard` | Overview stats, recent leads, page views |
| `/admin/leads` | Lead management table with search/filter |
| `/admin/leads/[id]` | Lead detail, status update, follow-ups |
| `/admin/gallery` | Upload photos to Supabase Storage |
| `/admin/blog` | Blog post list |
| `/admin/blog/new` | Create new blog post |
| `/admin/blog/[id]` | Edit existing blog post |
| `/admin/testimonials` | CRUD testimonials |
| `/admin/settings` | Environment variable status check |

### Middleware Protection

File: `src/middleware.ts`

```
Matcher: /admin/:path*

Rules:
1. All /admin/* routes (except /admin/login) → redirect to /admin/login if no session
2. /admin/login with active session → redirect to /admin/dashboard
3. If Supabase env vars missing → still redirects unauthenticated admin routes to login
4. Uses @supabase/auth-helpers-nextjs createServerClient with cookie session
```

---

## 11. API Routes

### POST `/api/contact`

**Purpose:** Contact form submissions from `/contact` and inline forms.

**Request body:**

```json
{
  "name": "string",
  "phone": "string",
  "email": "string (optional)",
  "companyName": "string (optional)",
  "productInterest": "string (optional)",
  "message": "string (optional)"
}
```

**Behavior:**
1. Validates Supabase env vars
2. Inserts into `leads` table with `source: 'contact_form'`
3. Uses `SUPABASE_SERVICE_ROLE_KEY` (bypasses RLS)
4. Sends notification email via Resend (non-blocking)
5. Returns WhatsApp deep link

**Response:**

```json
{
  "success": true,
  "leadId": "uuid",
  "whatsappUrl": "https://wa.me/919370606017?text=..."
}
```

---

### POST `/api/quote`

**Purpose:** Detailed quote requests from `/get-quote` and product page forms.

**Request body:**

```json
{
  "name": "string",
  "phone": "string",
  "email": "string (optional)",
  "companyName": "string (optional)",
  "city": "string (optional)",
  "products": ["string"],
  "material": "string (optional)",
  "thickness": "string (optional)",
  "dimensions": "string (optional)",
  "quantity": "string (optional)",
  "quantityUnit": "string (optional)",
  "deadline": "string (optional)",
  "additionalRequirements": "string (optional)",
  "sendWhatsApp": "boolean (optional)"
}
```

**Behavior:**
1. Inserts into `leads` with `source: 'quote_form'`
2. Saves `products_selected`, `material`, `thickness`, `size`, `quantity`, `deadline`
3. Stores full specs in `specifications` JSONB column
4. Sends email via Resend
5. Optionally returns WhatsApp URL

**Response:**

```json
{
  "success": true,
  "leadId": "uuid",
  "whatsappUrl": "https://wa.me/... (if sendWhatsApp=true)"
}
```

---

### POST `/api/track`

**Purpose:** Client-side page view analytics.

**Request body:**

```json
{
  "page": "string",
  "product": "string (optional)",
  "city": "string (optional)"
}
```

**Behavior:**
1. Inserts into `page_views` table
2. Captures `referrer` from request headers
3. Fails silently — always returns `{ success: true }` unless env vars missing

**Response:**

```json
{ "success": true }
```

---

## 12. Key Components

### Layout

| Component | Path | Description |
|-----------|------|-------------|
| `Navbar` | `src/components/layout/Navbar.tsx` | Fixed header, scroll-blur, mega dropdown for products |
| `Footer` | `src/components/layout/Footer.tsx` | 4-column layout, all links, WhatsApp CTA, brochure download |
| `Logo` | `src/components/layout/Logo.tsx` | Inline SVG flame mark + text, links to home |
| `SiteChrome` | `src/components/layout/SiteChrome.tsx` | Wraps Navbar + Footer + WhatsApp button (hidden on `/landing`) |

### Home Page Sections (in order)

| # | Component | Path | Description |
|---|-----------|------|-------------|
| 1 | `HeroSection` | `src/components/home/HeroSection.tsx` | Animated headline, perforated dot pattern, spotlight |
| 2 | `TrustBar` | `src/components/home/TrustBar.tsx` | Count-up stats animation |
| 3 | `VideoSection` | `src/components/home/VideoSection.tsx` | YouTube embed or local video; placeholder if empty |
| 4 | `ProductsSection` | `src/components/home/ProductsSection.tsx` | 3×2 grid of 6 products |
| 5 | `AboutSection` | `src/components/home/AboutSection.tsx` | Timeline, founder story |
| 6 | `IndustriesSection` | `src/components/home/IndustriesSection.tsx` | 4×2 industry grid |
| 7 | `ProcessSection` | `src/components/home/ProcessSection.tsx` | 5-step scroll-linked timeline |
| 8 | `GroupSection` | `src/components/home/GroupSection.tsx` | Tabs (Pune/Mumbai), Leaflet map |
| 9 | `CtaSection` | `src/components/home/CtaSection.tsx` | Final conversion CTA |

### Product Pages

| Component | Path | Description |
|-----------|------|-------------|
| `ProductPageClient` | `src/components/products/ProductPageClient.tsx` | Full product detail layout |
| `ProductQuoteForm` | `src/components/products/ProductQuoteForm.tsx` | Inline quote form on product pages |
| `PerforationPatterns` | `src/components/products/PerforationPatterns.tsx` | SVG pattern selector (perforated-sheets only) |
| `DimpleSheet3D` | `src/components/products/DimpleSheet3D.tsx` | Three.js 3D render (custom-components) |
| `ProductsIndexPage` | `src/components/products/ProductsIndexPage.tsx` | Product listing page |

### Shared Components

| Component | Path | Description |
|-----------|------|-------------|
| `WhatsAppButton` | `src/components/shared/WhatsAppButton.tsx` | Fixed green floating WhatsApp button |
| `IndiaMap` | `src/components/shared/IndiaMap.tsx` | Leaflet interactive dark-themed map |
| `IndiaMapLoader` | `src/components/shared/IndiaMapLoader.tsx` | Dynamic import wrapper for Leaflet |
| `PageViewTracker` | `src/components/shared/PageViewTracker.tsx` | Fires POST to `/api/track` on mount |
| `PageHero` | `src/components/shared/PageHero.tsx` | Reusable page hero banner |
| `CtaBanner` | `src/components/shared/CtaBanner.tsx` | Reusable CTA strip |

### SEO Components

| Component | Path | Schema Type |
|-----------|------|-------------|
| `GlobalSchema` | `src/components/seo/GlobalSchema.tsx` | ManufacturingBusiness |
| `BreadcrumbSchema` | `src/components/seo/BreadcrumbSchema.tsx` | BreadcrumbList |
| `ContactPageSchema` | `src/components/seo/ContactPageSchema.tsx` | LocalBusiness |

### Landing Page (`/landing`)

Separate cinematic experience — no site navbar/footer.

| Section | Component | Description |
|---------|-----------|-------------|
| Progress | `ScrollProgress` | Orange scroll progress bar |
| Nav | `LandingNav` | Appears after 80% hero scroll |
| Hero | `LandingHero` | Full-viewport cinematic intro |
| Stats | `LandingStats` | Animated statistics |
| Marquee | `LandingMarquee` | Dual-direction text marquee |
| Products | `LandingProducts` | Product showcase cards |
| Capabilities | `LandingCapabilities` | Manufacturing capabilities |
| Process | `LandingProcess` | Production process steps |
| Industries | `LandingIndustries` | Industry rail marquee (`.landing-rail`) |
| Story | `LandingStory` | Company narrative |
| Locations | `LandingLocations` | Pune/Mumbai facility cards |
| Testimonials | `LandingTestimonials` | Client quotes |
| CTA | `LandingCTA` | Final conversion |

### Calculator

| Component | Path | Description |
|-----------|------|-------------|
| `OpenAreaCalculator` | `src/components/calculator/OpenAreaCalculator.tsx` | 6 formulas from brochure |

**Hole shapes:** Round, Square, Rectangular, Capsule  
**Pitch types:** Triangular, Rectangular, Staggered

### Admin Components

| Component | Path |
|-----------|------|
| `AdminLoginForm` | `src/components/admin/AdminLoginForm.tsx` |
| `AdminShell` | `src/components/admin/AdminShell.tsx` |
| `LeadsTable` | `src/components/admin/LeadsTable.tsx` |
| `LeadDetailClient` | `src/components/admin/LeadDetailClient.tsx` |
| `GalleryAdminClient` | `src/components/admin/GalleryAdminClient.tsx` |
| `BlogAdminClient` | `src/components/admin/BlogAdminClient.tsx` |
| `BlogEditorClient` | `src/components/admin/BlogEditorClient.tsx` |
| `TestimonialsAdminClient` | `src/components/admin/TestimonialsAdminClient.tsx` |
| `StatusBadge` | `src/components/admin/StatusBadge.tsx` |

---

## 13. Supabase Storage

Create buckets in **Supabase Dashboard → Storage**.

| Bucket | Access | Purpose |
|--------|--------|---------|
| `gallery` | Public | Product photos uploaded via admin gallery |
| `blog-covers` | Public | Blog post cover images |
| `documents` | Private | ISO certificates, brochures |

### Storage Policies

**Public buckets (`gallery`, `blog-covers`):**
- Anyone (`anon`) can **read** (SELECT)
- Only authenticated admin can **upload** (INSERT) and **delete** (DELETE)

**Private bucket (`documents`):**
- Only authenticated admin can read, upload, and delete

Policy SQL (commented in `schema.sql`):

```sql
CREATE POLICY "Public read gallery" ON storage.objects
FOR SELECT TO anon USING (bucket_id = 'gallery');

CREATE POLICY "Auth upload gallery" ON storage.objects
FOR INSERT TO authenticated WITH CHECK (bucket_id = 'gallery');

CREATE POLICY "Auth delete gallery" ON storage.objects
FOR DELETE TO authenticated USING (bucket_id = 'gallery');
```

Next.js image config allows Supabase storage URLs via `remotePatterns` in `next.config.ts`.

---

## 14. Deployment

### Hosting Configuration

| Setting | Value |
|---------|-------|
| **Platform** | Vercel |
| **GitHub repo** | [sainirahul2163/jai-shree-group](https://github.com/sainirahul2163/jai-shree-group) |
| **Branch** | `main` |
| **Auto-deploy** | Yes — every push to `main` triggers Vercel deploy |
| **Live URL** | https://jai-shree-group.vercel.app |
| **Target domain** | https://jaishreegroup.in (pending DNS connection) |

### `vercel.json`

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### Security Headers

Set in both `next.config.ts` and Vercel:

| Header | Value |
|--------|-------|
| `X-Frame-Options` | DENY |
| `X-Content-Type-Options` | nosniff |
| `Referrer-Policy` | strict-origin-when-cross-origin |

### Build Statistics (verified June 2026)

| Metric | Count |
|--------|-------|
| **Total static pages** | 54 |
| **Product routes (SSG)** | 6 |
| **Industry routes (SSG)** | 8 |
| **Location routes (Static)** | 7 |
| **Blog routes (SSG)** | 4 |
| **API routes (Dynamic)** | 3 |
| **Admin routes (Dynamic)** | 9 |

### Redirects (`next.config.ts`)

| Source | Destination | Type |
|--------|-------------|------|
| `/products/wire-mesh` | `/products` | 308 Permanent |
| `/products/welded-mesh` | `/products` | 308 Permanent |
| `/products/demister-pad` | `/products` | 308 Permanent |
| `/products/aluminum-grill-profile` | `/products` | 308 Permanent |

---

## 15. Video Section

Constant: `COMPANY_VIDEO` in `src/lib/constants.ts`

```typescript
export const COMPANY_VIDEO = {
  youtubeId: "",        // Empty until client provides video
  localVideo: "",       // Or set to "/video/factory-tour.mp4"
  label: "FACTORY TOUR",
  heading: "50 Years of Precision,",
  headingOrange: "One Facility at a Time.",
  subtext: "Step inside our Talawade, Pune facility...",
  stats: [
    { value: "15,000", label: "Sq. ft. facility" },
    { value: "20+", label: "CNC machines" },
    { value: "3", label: "Production shifts" },
  ],
};
```

### Activation

**Option A — YouTube:**

```typescript
COMPANY_VIDEO.youtubeId = "YOUR_YOUTUBE_VIDEO_ID";
```

**Option B — Local video:**

1. Place MP4 at `public/video/factory-tour.mp4`
2. Set `COMPANY_VIDEO.localVideo = "/video/factory-tour.mp4"`

**Placeholder:** When both `youtubeId` and `localVideo` are empty, `VideoSection` displays a styled placeholder with factory stats.

---

## 16. Logo

| Item | Details |
|------|---------|
| **Intended PNG location** | `public/logo.png` (place here when client shares official file) |
| **Current assets** | `logo-navbar.png`, `logo-transparent.png`, `logo-dark.png`, SVG variants |
| **Component** | `src/components/layout/Logo.tsx` |
| **Implementation** | Inline SVG flame mark (always visible on dark background) |
| **Fallback** | Text logo if image fails to load |
| **Tagline** | "Precision in Every Perforation" |
| **Recommended specs** | Min 400px wide, transparent background |

---

## 17. Known Issues & Pending Tasks

### Pending from Client

- [ ] Official logo PNG/SVG file (drop at `public/logo.png`)
- [ ] Factory/drone video for hero section
- [ ] Real product photos for gallery
- [ ] Social media links (Facebook, LinkedIn, Instagram, YouTube)
- [ ] ISO certificate PDF for `/certifications` page
- [ ] Google Search Console verification code (replace placeholder in `layout.tsx`)
- [ ] Custom domain `jaishreegroup.in` connection to Vercel

### Technical Improvements (Future)

- [ ] India map SVG blob — replace with proper GeoJSON map
- [ ] Location pages for wire-mesh still exist (`/pune/wire-mesh-manufacturers`, `/mumbai/wire-mesh-manufacturers`) — remove or redirect
- [ ] Industry pages still reference some removed products (wire-mesh, welded-mesh, demister-pad, aluminum-grill-profile)
- [ ] Blog posts show "Coming Soon" content — need real article bodies
- [ ] Gallery has placeholder cards — needs real photos via admin
- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER` env var needs update to `919370606017` on Vercel production
- [ ] Next.js 16 deprecation warning: middleware file convention → migrate to `proxy`
- [ ] Paper Industry and Agriculture exist in constants but have no detail pages
- [ ] No `.env.example` file in repository

---

## 18. How to Run Locally

### Prerequisites

- Node.js v18+ (v24 LTS recommended)
- npm
- Git
- Supabase project (for forms/admin)
- Resend account (for email notifications)

### Setup

```bash
git clone https://github.com/sainirahul2163/jai-shree-group.git
cd jai-shree-group
npm install
```

### Create `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
RESEND_API_KEY=your_resend_key
CONTACT_EMAIL=shreeperforator@gmail.com
NEXT_PUBLIC_SITE_URL=https://jaishreegroup.in
NEXT_PUBLIC_WHATSAPP_NUMBER=919370606017
```

### Run Development Server

```bash
npm run dev
# Open http://localhost:3000
```

### Production Build

```bash
npm run build
npm run start
```

### Other Scripts

```bash
npm run lint    # ESLint
```

### Supabase Setup (First Time)

1. Create Supabase project at [supabase.com](https://supabase.com)
2. Run `src/lib/supabase/schema.sql` in SQL Editor
3. Create Storage buckets: `gallery`, `blog-covers`, `documents`
4. Apply storage policies from schema comments
5. Create admin user: Authentication → Users → Add user (`admin@jaishreegroup.in`)

---

## 19. How to Add New Product

Step-by-step guide for adding a 7th product:

### 1. Add to PRODUCTS array

File: `src/lib/constants.ts`

```typescript
{
  name: "New Product Name",
  slug: "new-product-slug",
  description: "Short description for cards.",
  icon: "IconName",  // Lucide icon name
  specs: { /* ... */ },
  materials: ["Stainless Steel", "MS (Mild Steel)"],
}
```

### 2. Add product details

File: `src/data/products.ts` — add entry to `PRODUCT_DETAILS`:

```typescript
"new-product-slug": {
  slug: "new-product-slug",
  name: "New Product Name",
  tagline: "...",
  overview: ["..."],
  specifications: [{ label: "...", value: "..." }],
  strengths: ["..."],
  applications: ["..."],
  faqs: [{ q: "...", a: "..." }],
  metaTitle: "SEO Title | Jai Shree Group",
  metaDescription: "SEO description...",
  materials: ["..."],
}
```

### 3. Add icon mapping

File: `src/lib/icons.ts` — import Lucide icon and add to `PRODUCT_ICONS`:

```typescript
import { NewIcon } from "lucide-react";

export const PRODUCT_ICONS: Record<string, LucideIcon> = {
  // ...existing
  NewIcon,
};
```

### 4. Verify PRODUCT_SLUGS

`PRODUCT_SLUGS` is auto-derived from `Object.keys(PRODUCT_DETAILS)` — no manual update needed.

### 5. Update related products (optional)

`getRelatedProducts()` in `src/data/products.ts` automatically excludes current slug.

### 6. Build and verify

```bash
npm run build
# Confirm /products/new-product-slug appears in build output
```

### 7. Update sitemap (automatic)

`sitemap.ts` reads from `PRODUCT_SLUGS` — new product is included automatically.

---

## 20. How to Update Content

Quick reference for common content changes.

### Update phone, email, or address

```
→ src/lib/constants.ts → COMPANY object
→ One change updates Navbar, Footer, Contact, Schema, and all pages
```

### Add or remove a branch

```
→ src/lib/constants.ts → BRANCHES array
→ src/data/branches.ts → BRANCH_PRODUCTS mapping
→ Update manufacturingUnits count if total changes
→ Update "8 Manufacturing Units" copy in HOME_SECTIONS.group
```

### Activate factory video

```
→ src/lib/constants.ts → COMPANY_VIDEO
→ Set youtubeId = "YouTube_ID" OR localVideo = "/video/filename.mp4"
```

### Upload official logo

```
→ Drop PNG at public/logo.png (min 400px wide, transparent bg)
→ Logo component will use it when integrated
```

### Add gallery photo

```
→ Login at /admin/login
→ Navigate to Gallery
→ Upload photo, set title, select category, publish
```

### Write blog post

```
→ Login at /admin/login
→ Navigate to Blog → New Post
→ Write title, content, excerpt, set category
→ Upload cover image (blog-covers bucket)
→ Publish
```

### View and manage leads

```
→ Login at /admin/login
→ Navigate to Leads
→ Search, filter by status, click row for detail
→ Update status, add follow-ups, export CSV
```

### Update SEO metadata

```
→ Product pages: src/data/products.ts → metaTitle, metaDescription
→ Industry pages: src/data/industries.ts → metaTitle, metaDescription
→ Location pages: src/data/locations.ts → metaTitle, metaDescription
→ Home/global: src/app/layout.tsx → metadata export
```

### Update brochure PDF

```
→ Replace public/brochure/jai-shree-brochure.pdf
→ BROCHURE_URL constant points to this path
```

---

## 21. Contacts & Credentials

> **Note:** See separate credentials document for passwords and API keys. Do not commit secrets to the repository.

### Viralbizz (Developer)

| Field | Value |
|-------|-------|
| Email | [Admin@viralbizz.com](mailto:Admin@viralbizz.com) |
| Phone | +91 93252 30125 |

### Client (Shree Perforators / Jai Shree Group)

| Field | Value |
|-------|-------|
| Contact | Kanishq Jangid |
| Email | [shreeperforator@gmail.com](mailto:shreeperforator@gmail.com) |
| Phone | +91 9370606017 |
| WhatsApp | +91 9370606017 |

### Services & Accounts

| Service | URL | Login Method |
|---------|-----|--------------|
| **Vercel** | [vercel.com](https://vercel.com) | GitHub login |
| **Supabase** | [supabase.com](https://supabase.com) | Project dashboard |
| **Resend** | [resend.com](https://resend.com) | API key in env |
| **GitHub** | [github.com/sainirahul2163/jai-shree-group](https://github.com/sainirahul2163/jai-shree-group) | Repository |
| **Domain** | jaishreegroup.in | Cloudflare DNS (pending Vercel connection) |

### Admin Access

| Field | Value |
|-------|-------|
| Admin URL | https://jaishreegroup.in/admin/login |
| Default email | admin@jaishreegroup.in |
| Auth | Supabase Auth (password in credentials doc) |

---

*Documentation generated June 2026 by Viralbizz for Jai Shree Group.*
