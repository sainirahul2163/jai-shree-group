# Research — the group's existing unit websites

Checked in a browser on 2026-10-02 (home pages). Full URL inventory of the two live sites and draft 301 maps: 2026-10-11, at the end of this file.

## Status

| Domain | Status | Notes |
| --- | --- | --- |
| shreeperforators.com | Live | "Shree Metal Perforators", Gat No. 94 Talawade. Footer: "Designed by MID, Hosted by GID, Promoted by PBD". Lists about 20 products, including many discontinued ones (demister pad, wire mesh, crimped mesh, conveyor belts, cable trays, chain link, HDPE mesh). Menu: Home, Profile, Products, Application, Contact Us, Enquiry, Sitemap, Locations We Serve. |
| metalperforatedsheets.com | Live | "Jai Shree Metal Perforators", Gat No. 93 Talawade. Same vendor. Positions as job work: laser cutting, mechanical punching, CNC punching. Has Certificates, Applications, **Open Area Calculator** and Locations We Serve pages. Lists embossing job work, dimple de-stoners, huller and herringbone screens, perforated test sieves. |
| metalperforation.co.in | Not loading (domain not found) | Linked from both live sites |
| wiremeshindia.net | Not loading (domain not found) | Linked from both live sites; discontinued product name |
| weldedmeshindia.com | Not loading (domain not found) | Linked from metalperforatedsheets.com; discontinued product name |
| jaishreefiltration.com | Not loading (domain not found) | Listed in `BRANCHES` for the three Mumbai units; discontinued product name |

## What this means

- Sites 1 and 2 have Google rankings to protect: crawl and redirect every old URL before DNS changes.
- Both old sites use "Locations We Serve" city pages; expect many URLs of the form `<product>-<city>` that need a redirect target.
- The old sites' application lists (automotive, acoustics and sound control, construction and architecture, furniture, fabrication, filters and screens, food processing and pharma, washing machines) are useful input for the unit sites' industry sections.
- Domain control for the two live sites sits with the old vendor (MID / GID). The agency handles the handover.

## Sources

- https://www.shreeperforators.com (home page, 2026-10-02)
- https://www.metalperforatedsheets.com (home page, 2026-10-02)

## URL inventory (crawled 2026-10-11)

Sources: each site's `sitemap.xml`, `sitemap.html`, home page and "Locations We Serve" page. Neither site has city pages: "Locations We Serve" is one page listing countries. `robots.txt` on both allows everything.

### shreeperforators.com (Shree Perforators site, Phase 1) — 22 pages + 57 images

| Old URL | What it was | New URL (301) | Why |
| --- | --- | --- | --- |
| `/`, `/index.html` | Home | `/` | |
| `/shree-perforators.html` | Profile | `/about` | |
| `/perforated-sheets.html`, `/metal-perforated-sheets.html`, `/interior-perforated-sheets.html`, `/finished-perforated-sheets.html` | Perforated sheet product pages | `/products/perforated-sheets` | Focus product |
| `/expanded-metal-perforated-sheets.html` | Expanded metal | `/products/expanded-metal` | Offered by this unit |
| `/laser-cutting.html` | Laser cutting | `/products` | Not offered by this unit (Jai Shree Metal Perforators does it); the products page links to the sister unit. Switch to the sister site's laser page once it is live |
| `/welded-mesh.html` | Welded mesh | `https://www.jaishreegroup.com/group` | Welded mesh is Shree Weld Mesh's; its site is not live yet. Switch to `https://www.weldedmeshindia.com/` when it is |
| `/wire-mesh.html`, `/wire-mesh-specifications.html`, `/knitted-wire-mesh.html`, `/perforated-cable-tray.html` | Discontinued products | `/products` | Never redirect to a page offering them |
| `/gallery.html`, `/products-gallery/*` (57 images) | Gallery | `/gallery` | |
| `/video.html` | Factory video | `/about` | |
| `/applications.html` | Applications | `/industries` | |
| `/locations-we-serve.html` | Country list | `/export` | |
| `/contact.html` | Contact | `/contact` | |
| `/enquiry.php` | Enquiry form | `/get-quote` | |
| `/sitemap.html` | HTML sitemap | `/` | |

### metalperforatedsheets.com (Jai Shree Metal Perforators site, Phase 2) — 16 pages

| Old URL | What it was | New URL (301) | Why |
| --- | --- | --- | --- |
| `/`, `/index.html` | Home | `/` | |
| `/about-us.html` | About | `/about` | |
| `/certificates.html` | Certificates | `/about` | No certificates page on unit sites (ISO line sits on About) |
| `/laser-cuttings-job-works-services-manufacturer.html` | Laser cutting | `/products/laser-cutting` | Focus product |
| `/cnc-punchings-job-works-services-manufacturer.html` | CNC punching | `/products/turret-punching` | Focus product |
| `/mechanical-punchings-job-works-services-manufacturer.html` | Mechanical punching | `/products` | Not this unit's process (Jai Shree Industries, Jai Shree Perforator) |
| `/metal-perforated-sheets-manufacturer.html` | Perforated sheets | `/products/perforated-sheets` | |
| `/expanded-meshes-manufacturer.html` | Expanded metal | `/products` | Not offered by this unit |
| `/welded-meshes-manufacturer.html` | Welded mesh | `https://www.jaishreegroup.com/group` | As above; switch to weldedmeshindia.com when live |
| `/open-area-calculator.html` | Open-area calculator | the site's tool page | Decide in Phase 2 (drawing-upload quote is the signature tool) |
| `/applications.html` | Applications | `/industries` | |
| `/videos.html` | Videos | `/about` | |
| `/locations-we-serve.html` | Country list | `/export` | |
| `/contact-us.html` | Contact | `/contact` | |
| `/enquiry.php` | Enquiry | `/get-quote` | |
