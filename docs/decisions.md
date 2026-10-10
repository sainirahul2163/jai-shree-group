# Decisions log

Newest first. Add a row whenever scope, a site, or a rule changes. "Assumption" means we decided without client confirmation and it can change.

| Date | Decision | Why | Status |
| --- | --- | --- | --- |
| 2026-10-11 | Route move (0.5): chrome lives in a `[site]/(chrome)` route group instead of a client `SiteChrome` that reads the path; theme variables are written on `:root` by `[site]/layout.tsx` instead of on a wrapper element; unmatched paths go to `[site]/[...rest]` outside every `loading.tsx` | `usePathname()` reads the rewritten `/group/...` path after a proxy rewrite (hydration mismatch); a wrapper would miss portals (dialogs, selects) and the page background; a `loading.tsx` above a `notFound()` streams a 200 instead of a 404 | Decided |
| 2026-10-11 | Logo flame stays `#E84512` (the client's artwork). It is not remapped to `brand-hover`. Group brand hex defaults live in `src/sites/theme.css` so the rest of `src/` can use tokens | Mapping `#E84512` → `#FF6B35` would change the logo. The acceptance grep allows `#E8521A` / `#FF6B35` only under `src/sites/`, brochure and admin | Decided |
| 2026-10-10 | `public/` keeps only files the code uses (92 → 38 files, 30 MB → 14 MB). Removed: 20 unused logo files (the site uses the client's logo inline in `Logo.tsx`), Next.js starter SVGs, the 2022 brochure PDF, 30 brochure photos not on any page, one unused gallery photo, a stale README | Keep the folder clean for building; deleted files stay in git history (commit `d379076`) | Done |
| 2026-10-10 | No more client questions before building; missing data uses fallbacks in `08-content-checklist.md` | Agency decision | Decided |
| 2026-10-07 | Client approved the questionnaire (Kanishq Jangid). Final unit focus: Bhayander = expanded metal + CNC and mechanical punching; Palghar = mechanical punching only; Masjid Bunder = godown, ready stock only; Shree Weld Mesh = welded mesh only | Client answers (`client/answers-2026-10-07.md`) | Decided — replaces the 2026-10-05 mapping assumption |
| 2026-10-07 | Welded mesh is active at Shree Weld Mesh (overrides the 2026-10-02 note that it was discontinued); wire mesh, crimped mesh, demister pads stay discontinued | Client answer | Decided |
| 2026-10-07 | Unit names stay; descriptors are the client's: "Shree Weld Mesh — Manufacturing in welded mesh", "Jai Shree Filtration — Perforated sheets available in minutes" | Client answer | Decided |
| 2026-10-07 | Main domain is jaishreegroup.com; new phones for Jai Shree Metal Perforators (+91 93733 24492), Jai Shree Industries and Jai Shree Perforator (+91 89089 21111); weekly holiday Thursday (Pune units) / Sunday (Mumbai units) | Client answer | Decided |
| 2026-10-07 | weldedmeshindia.com and jaishreefiltration.com are used again (units keep their names); only wiremeshindia.net stays retired | Follows from the client's answers | Decided |
| 2026-10-07 | Jai Shree Filtration gets an admin-editable stock board (`stock_items`), hidden until the client adds items | Ready-stock site with no stock list from the client yet | Decided |
| 2026-10-05 | Shree Perforators' site also lists expanded metal | Client request (WhatsApp, Kanishq) | Decided |
| 2026-10-05 | Jai Shree Perforator (Palghar) has no laser cutting machine; its architectural-panels site is now a question to the client | Client correction (WhatsApp, Kanishq) | Waiting on client questionnaire |
| 2026-10-05 | Client answers collected through a Word questionnaire (`docs/client/Jai-Shree-Unit-Websites-Questions.docx`) instead of chat | Chat replies were partial | In progress |
| 2026-10-05 | Unit → product-site mapping as in `03-sites.md` (Industries → expanded metal, Perforator → architectural, Filtration → process screens, Weld Mesh → precision leveling) | Fits each unit's location and past products; all 6 units confirmed active | Superseded 2026-10-07 |
| 2026-10-05 | Six unit sites, none optional (site 6 precision leveling is in) | All six units are active, one site each | Decided |
| 2026-10-05 | Work happens in `/Users/rahul/Documents/jai-shree-multisite` on branch `multi-site`; the original folder stays as the production checkout | Keep the live site safe while refactoring | Decided |
| 2026-10-05 | Domains are bought and managed by the agency; no client approval step | Agency's call | Decided |
| 2026-10-05 | Separate `brand` (fills) and `brand-text` (words on background) tokens | Two palettes could not pass WCAG AA with one brand colour | Decided |
| 2026-10-05 | Brochure and admin keep their current hard-coded look | Brochure is a group-only print piece; admin is shared | Decided |
| 2026-10-05 | Cleanup of discontinued-product copy on the main site runs as a separate task on `main` | Live-site fix, independent of the multi-site build | Done as branch `claude/pensive-feynman-t9pehu` (not merged). Must be corrected for welded mesh and unit products before merging |
| 2026-10-02 | Sites are organised by product line the group makes today; wire mesh, welded mesh and demister pads are excluded | The group has stopped making them (told by the agency) | Welded mesh part superseded 2026-10-07 |
| 2026-10-02 | Do not build on weldedmeshindia.com, wiremeshindia.net, jaishreefiltration.com; 301 them if controlled | Named after discontinued products; none load today | Partly superseded 2026-10-07 (only wiremeshindia.net stays retired) |
| 2026-10-02 | One Next.js app serving all domains (multi-tenant), not separate repos | One fix reaches all sites; one admin; lower cost | Decided |
| 2026-10-02 | Pilot = Shree Perforators, then Jai Shree Metal Perforators | Both are live and indexed; protecting their rankings comes first | Decided |
