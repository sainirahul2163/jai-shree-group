# 07 — SEO rules

Seven sites from one group can lift each other or sink each other. These rules keep them lifting.

## Duplicate content

- **Every page's copy is written for its site.** Do not reuse paragraphs, product descriptions, FAQs or blog posts across sites, even with light edits. Shared React components are fine; shared text is not.
- Product facts (thickness limits, materials) may repeat — they are facts. The sentences around them must not.
- Each unit site covers its focus product in depth (applications, specs, FAQs, case studies). Other products appear only as short cards linking to the unit's own short pages or to the main site.
- Unit sites never copy the main site's blog. Each site's blog, when it starts, has its own topics tied to its product.

## Canonicals and indexing

- Every page's canonical points to its own site's origin (`config.origin`). Never point one site's canonical at another site.
- Each site has its own `sitemap.xml` and `robots.txt` listing only its own URLs.
- A site's pages must not be reachable under another site's domain (the proxy returns 404 — see `04-architecture.md`).
- Vercel preview URLs must not be indexed: send `noindex` on any host that is not a production domain.

## Links between sites

- Unit sites: "A Jai Shree Group company" mark plus one link to the main site (header or footer).
- Main site: the Our Group page links to all six unit sites with a short description of each.
- No site-wide footer blocks linking every site to every other site, and no keyword-stuffed anchor text. Link where it helps a buyer ("Need laser cutting? Our Talawade unit does it").

## Structured data (JSON-LD)

- Unit sites: `LocalBusiness` (or `Organization`) with the unit's own name, address, phone and geo, and `parentOrganization` = Jai Shree Group.
- Main site: `Organization` with `subOrganization` listing the six units.
- Product pages: `Product`; FAQ sections: `FAQPage`; all pages: `BreadcrumbList`.

## Legacy sites (shreeperforators.com, metalperforatedsheets.com)

Both are live and indexed. Before DNS moves:

1. Crawl every URL on the old site (sitemap if present, otherwise a crawler) into `research/legacy-sites.md`.
2. Map each old URL to the closest new page. Welded mesh pages map to the Shree Weld Mesh site. Pages for discontinued products (wire mesh, demister pads, crimped mesh and similar) map to the site's home or products page — never to a page that offers them.
3. Add the map as 301 redirects in `next.config.ts` using a `host` condition (`has: [{ type: "host", value: "www.shreeperforators.com" }]`).
4. After launch, check Search Console coverage for that domain every week for a month and fix any 404s.

## Retired domains

wiremeshindia.net only (wire mesh is discontinued): if the agency controls it, 301 the whole domain to jaishreegroup.com. weldedmeshindia.com and jaishreefiltration.com are live site domains again (2026-10-07).

## Four perforated-sheet sites

Shree Perforators, Jai Shree Industries, Jai Shree Perforator and Jai Shree Filtration all sell perforated sheets. Each keeps its own angle and target searches (table in `03-sites.md`): CNC patterns in Pune; expanded metal and punching in Mumbai; mechanical punching in bulk in Palghar; ready stock in Masjid Bunder. Before launching sites 3–5, compare their home and product pages side by side with Shree Perforators and rewrite anything that reads alike.

## Per-site keyword targets

Starting targets are listed per site in `03-sites.md`. They are hypotheses: confirm with Search Console data after launch and adjust titles and copy.
