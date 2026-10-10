# Phase 0.1 — Baseline of the main site

Captured 2026-10-11 from `main` at commit `5035e14` (the code live on jaishreegroup.com), using a production build (`npm run build && npm run start`). Used by the Phase 0 acceptance check: after the rebuild, the main site must look the same.

## What is in `docs/research/baseline/` (local only, git-ignored, 54 MB)

| Folder / file | Contents |
| --- | --- |
| `desktop-1440/` | 40 full-page screenshots at 1440 px wide |
| `mobile-390/` | 40 full-page screenshots at 390 px wide (phone) |
| `head/` | The `<head>` HTML of every page (titles, descriptions, canonicals, JSON-LD) |
| `seo/` | `sitemap` and `robots` — `.local` from the local build, `.live` from jaishreegroup.com |
| `report.json` | HTTP status and console errors per capture: all 200/304, no console errors; the deliberate 404 test page returns 404 |

Pages: every URL in the sitemap (37) plus `/brochure`, `/brochure/icons` and a missing page (`/this-page-does-not-exist`).

Note: the local `.env.local` sets `NEXT_PUBLIC_SITE_URL` to `http://localhost:3000`, so local sitemaps, canonicals and the `head/` files use `localhost:3000`. Compare local with local; compare `seo/*.live.*` against the live site after Phase 0 is deployed.

## How to compare after a change

```bash
# 1. Production build of the branch, served on port 3000
npm run build && npm run start

# 2. In another terminal: capture tools (not project dependencies, so --no-save)
npm install --no-save puppeteer-core pngjs pixelmatch

# 3. Capture the same pages into a new folder (needs Google Chrome installed)
node scripts/baseline/capture.js docs/research/after-phase-0 http://localhost:3000

# 4. Compare: prints % of pixels changed per page, writes red-marked diff images
node scripts/baseline/compare.js docs/research/baseline docs/research/after-phase-0
```

Also compare `head/*.html` file by file (`diff -r docs/research/baseline/head docs/research/after-phase-0/head`) and the sitemap and robots output.

## Reading the results

- **0.00% on most pages** is the goal.
- Small differences are expected where the page animates on its own: the home hero product carousel and hexagon background, the factory video section, `/landing` (marquee, counters), and the map (tiles load at slightly different moments). Open the diff image and check that only those areas are marked.
- A **height change** or a large % on a page without animation means something moved. Fix it before ticking Phase 0.
- `diff/` images: changed pixels are red; unchanged areas are faded.
