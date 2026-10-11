# 04 — Architecture

One Next.js app, one Vercel project, one Supabase project, seven domains. The proxy reads the request's host, works out the site key, and rewrites the request into the `src/app/[site]/` route tree. Pages read their `SiteConfig` from the `site` param.

```
visitor → shreeperforators.com/products
        → src/proxy.ts: host "www.shreeperforators.com" → key "shree-perforators"
        → rewrite to /shree-perforators/products   (URL in the browser does not change)
        → src/app/[site]/products/page.tsx  with params.site = "shree-perforators"
        → getSite("shree-perforators") → theme, contact, products, SEO
```

Next.js references (read before building): `node_modules/next/dist/docs/01-app/02-guides/multi-tenant.md`, `.../03-file-conventions/proxy.md`, `.../03-file-conventions/01-metadata/sitemap.md`, `.../03-file-conventions/layout.md`.

## Target folder layout

```
src/
  proxy.ts                    # host → site rewrite + admin gate (replaces middleware.ts)
  sites/
    types.ts                  # SiteKey, SiteConfig, ThemeTokens
    domains.ts                # host → SiteKey map; no imports (the proxy loads it)
    index.ts                  # getSite(key), ALL_SITES, isSiteKey()
    group.ts                  # one config file per site …
    shree-perforators.ts
    jai-shree-metal-perforators.ts
    jai-shree-industries.ts
    jai-shree-perforator.ts
    jai-shree-filtration.ts
    shree-weld-mesh.ts
    content/<site-key>/       # per-site copy: home sections, product copy, FAQs, about
  app/
    layout.tsx                # <html>/<body> only, no brand values
    [site]/
      layout.tsx              # theme CSS variables, fonts, Navbar/Footer from config
      page.tsx                # home: renders config.home sections in order
      products/…  industries/…  contact/…  get-quote/…  gallery/…  about/…
      export/  privacy/  terms/  tools/<tool>/
      site-sitemap/route.ts   # proxy maps /sitemap.xml here (route handler: Next's sitemap.ts cannot read [site]; folder must NOT be named sitemap.xml — breaks Vercel's build adapter)
      site-robots/route.ts    # proxy maps /robots.txt here (same naming rule)
      (group-only routes: group/, calculator/, brochure/, landing/, pune/, mumbai/, blog/ …)
    admin/                    # NOT under [site]; one panel for all sites
    api/                      # NOT under [site]; reads the site from the x-site header
  components/                 # shared components; read values from config or tokens
  data/                       # shared product data that is the same for every site
```

## SiteConfig

Every brand value lives here. Components never import `COMPANY` directly once Phase 0 is done; `src/lib/constants.ts` keeps only shared, brand-neutral data (materials, product specs) or re-exports from the `group` config during the transition.

```ts
// src/sites/types.ts — shape to implement; adjust names as needed, keep the idea
export type SiteKey =
  | "group"
  | "shree-perforators"
  | "jai-shree-metal-perforators"
  | "jai-shree-industries"
  | "jai-shree-perforator"
  | "jai-shree-filtration"
  | "shree-weld-mesh";

export type ProductSlug =
  | "perforated-sheets" | "laser-cutting" | "expanded-metal"
  | "turret-punching" | "precision-sheet-leveling" | "custom-components"
  | "mechanical-punching"   // Jai Shree Industries, Jai Shree Perforator
  | "welded-mesh";          // Shree Weld Mesh only

export interface ThemeTokens {
  mode: "dark" | "light";
  background: string; surface: string; surface2: string; border: string;
  foreground: string; textSecondary: string; textMuted: string;
  brand: string; brandHover: string; brandForeground: string; brandText: string;
  fontHeading: FontKey; fontBody: FontKey;   // keys into fonts loaded in [site]/layout.tsx
}

export interface SiteConfig {
  key: SiteKey;
  origin: string;                 // canonical production origin, e.g. "https://www.shreeperforators.com"
  name: string;                   // brand shown in header, titles, schema
  descriptor?: string;            // e.g. "Precision Sheet Leveling" (see 03-sites.md naming question)
  unitSlug: string | null;        // BRANCHES slug; null for group
  endorsed: boolean;              // show "A Jai Shree Group company"
  contact: { phone: string; whatsapp: string; email: string; address: string; weeklyHoliday: "Thursday" | "Sunday"; hours?: string };
  tagline?: string;               // client's descriptor line, e.g. "Perforated sheets available in minutes"
  leadEmail: string;              // where enquiries for this site are emailed
  products: ProductSlug[];        // order = importance; first = focus product
  industries: string[];           // industry slugs shown on this site
  theme: ThemeTokens;
  nav: { label: string; href: string }[];
  home: HomeSectionKey[];         // ordered list of home sections to render
  pages: string[];                // enabled top-level routes; others return notFound()
  tool: ToolKey | null;           // signature tool
  seo: { defaultTitle: string; titleTemplate: string; description: string; keywords: string[]; ogImage: string };
  social?: { name: string; href: string }[];
}
```

Values for each site: `03-sites.md` (theme, products, focus) and `02-business-facts.md` (contact). The `group` config must reproduce today's values exactly.

## Routing (proxy)

- Rename `src/middleware.ts` → `src/proxy.ts` (Next codemod in the proxy docs, or by hand: rename the file and the exported function to `proxy`). Keep the existing admin gate logic exactly.
- Order inside `proxy`:
  1. `/admin` paths → existing Supabase admin check. No rewrite.
  2. `/api`, `/_next`, static files, `public/` assets → pass through (use a negative `matcher`, see proxy docs → Negative matching). API calls get an `x-site` request header set from the host.
  3. Everything else → resolve the site key from the host, rewrite to `/${key}${pathname}`.
- Host resolution (`src/sites/domains.ts`, a plain object, no imports):
  - production: `www.shreeperforators.com` and `shreeperforators.com` → `shree-perforators`, etc.
  - local: `<key>.localhost` → `<key>` (browsers resolve `*.localhost` to 127.0.0.1)
  - Vercel previews and unknown hosts → `group`, unless a `?site=<key>` query is present (preview only — set a cookie so navigation keeps the site; never honour it on production domains)
- A request whose path already starts with a site key from outside (e.g. `/shree-perforators/...` typed on the group domain) must 404, so sites cannot be reached under each other's domains.
- Apex → `www` redirects are done in Vercel domain settings, not in code.
- `generateStaticParams` in `[site]/layout.tsx` returns all site keys so pages stay static. Pages not in `config.pages` call `notFound()`.

## Theming (Tailwind v4)

`src/app/globals.css` maps Tailwind colour names to CSS variables. `[site]/layout.tsx` sets those variables from `config.theme` on a wrapper element, so every token class switches per site.

```css
/* globals.css — the variables replace today's fixed hex values */
@theme inline {
  --color-background: var(--background);
  --color-surface: var(--surface);
  --color-surface-2: var(--surface-2);
  --color-border: var(--border);
  --color-foreground: var(--foreground);
  --color-text-secondary: var(--text-secondary);
  --color-text-muted: var(--text-muted);
  --color-brand: var(--brand);
  --color-brand-hover: var(--brand-hover);
  --color-brand-foreground: var(--brand-foreground);
  --color-brand-text: var(--brand-text);
  /* keep the shadcn names (primary, card, muted …) pointing at the same variables */
}
```

Replace hard-coded values in components using this table (counts are occurrences in `src/` on 2026-10-05):

| Hard-coded today | Count | Token |
| --- | --- | --- |
| `#E8521A` | 348 | `brand` (fills) or `brand-text` (words on background) |
| `#FF6B35`, `#E84512` | 27 | `brand-hover` |
| `rgba(232,82,26,a)` | ~45 | `brand/[a]` (Tailwind opacity modifier) or `color-mix(in oklab, var(--brand) a, transparent)` |
| `#0A0A0A`, `#060606`, `#0C0C0C`, `#0B0C0D` | ~118 | `background` |
| `#111111`, `#16181A` | ~109 | `surface` |
| `#1A1A1A`, `#1C1C1C`, `#1E1E1E` | ~100 | `surface-2` |
| `#2A2A2A`, `#3A3A3A` | ~229 | `border` (add `border-strong` for `#3A3A3A` if needed) |
| `#FFFFFF`, `#FAFAFA` | ~169 | `foreground`, or `brand-foreground` when it is text on a brand fill |
| `#A0A0A0`, `#888888`, `#8A8A8A` | ~199 | `text-secondary` |
| `#666666` | 62 | `text-muted` |
| `#25D366` | 11 | keep — WhatsApp's own green |
| `#EF4444`, `#F87171` | 5 | `destructive` |

Out of scope for tokens: `src/app/brochure/` and `src/components/brochure/` (a group-only print document) and the admin panel (one shared look). Three.js and canvas components (`ProductViewer3D`, `DimpleSheet3D`, `MagneticHexBackground`) read the brand colour with `getComputedStyle(...).getPropertyValue("--brand")`. Email templates (`src/lib/email.ts`) take the colour from the site config.

Fonts: load every font used by any site once with `next/font/google` in `[site]/layout.tsx` (Geist, Geist Mono, Barlow Condensed, Fraunces), and apply only the active site's font variables.

## Data (Supabase)

One project for all sites. Migration (add to `src/lib/supabase/migrations/`):

```sql
alter table leads         add column site text not null default 'group';
alter table blog_posts    add column site text not null default 'group';
alter table gallery_items add column site text not null default 'group';
alter table testimonials  add column site text not null default 'group';
alter table page_views    add column site text not null default 'group';
create index on leads (site, created_at desc);
-- blog_posts.slug is unique today; make it unique per site instead:
alter table blog_posts drop constraint if exists blog_posts_slug_key;
create unique index blog_posts_site_slug on blog_posts (site, slug);
```

-- Jai Shree Filtration stock board (admin-editable; hidden on the site while empty)
create table stock_items (
  id uuid primary key default gen_random_uuid(),
  site text not null default 'jai-shree-filtration',
  material text not null, thickness_mm numeric not null, hole text, pitch text,
  note text, in_stock boolean not null default true, sort_order int not null default 0,
  updated_at timestamptz not null default now()
);
-- RLS: admin full access; public read where in_stock = true

Existing rows become `group`. RLS policies stay as they are. Public reads filter by `site`. Drawing uploads (site 2) go to a new **private** bucket `drawings`; the lead stores the file paths, and the admin panel opens them with signed URLs.

## Leads and email

- `/api/quote` and `/api/contact` read the site from the `x-site` header, save `site` on the lead, and email `config.leadEmail`.
- `LEAD_EMAIL_OVERRIDE` (env) sends every notification to one inbox in development and previews, so units do not get test leads.
- The customer gets an auto-reply with a reference number (first 8 characters of the lead id) and the site's contact details.
- Admin panel: a site filter on leads, blog, gallery and testimonials; the lead detail shows the site badge.

## Environment variables

Existing (unchanged): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `RESEND_FROM`, `RESEND_TO`, `CONTACT_EMAIL`, `ADMIN_EMAILS` (server-only admin allow-list), `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION`.

Changed or new:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Now only overrides the **group** origin; each site's origin comes from its config |
| `LEAD_EMAIL_OVERRIDE` | Send all lead emails here (dev and preview) |
| `RESEND_FROM` | Must be a verified sender; one sending domain can serve all sites, or verify each domain later |
| Search Console verification | Per domain: verify with DNS records rather than meta tags, so no per-site env var is needed |

## Local development

```bash
npm run dev
# main site:           http://localhost:3000
# a unit site:         http://shree-perforators.localhost:3000
# any site on preview: https://<preview-url>/?site=jai-shree-industries
```

## Deployment

- One Vercel project. Add every domain (apex and `www`) to it; Vercel issues certificates.
- `main` = production. The `multi-site` branch deploys as a preview until Phase 0 passes its checks, then merges to `main`.
- Turning on a unit domain is a DNS change only after its site passes `05-build-plan.md` → launch checklist.
