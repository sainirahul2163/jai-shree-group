// 301s from the old vendor-built unit websites to the new pages (task 1.4).
// Each rule only applies on that unit's own domain (apex or www).
// URL inventory and reasoning: docs/research/legacy-sites.md.
// No imports: next.config.ts loads this file.

type Redirect = {
  source: string;
  destination: string;
  permanent: true;
  has: { type: "host"; value: string }[];
};

const SHREE_PERFORATORS_HOST = "(www\\.)?shreeperforators\\.com";

/** Old path → new path (or absolute URL) on shreeperforators.com. */
const SHREE_PERFORATORS: [string, string][] = [
  ["/index.html", "/"],
  ["/shree-perforators.html", "/about"],
  ["/perforated-sheets.html", "/products/perforated-sheets"],
  ["/metal-perforated-sheets.html", "/products/perforated-sheets"],
  ["/interior-perforated-sheets.html", "/products/perforated-sheets"],
  ["/finished-perforated-sheets.html", "/products/perforated-sheets"],
  ["/expanded-metal-perforated-sheets.html", "/products/expanded-metal"],
  // Not made at this unit (Jai Shree Metal Perforators does laser cutting).
  ["/laser-cutting.html", "/products"],
  // Welded mesh belongs to Shree Weld Mesh; its site is not live yet.
  ["/welded-mesh.html", "https://www.jaishreegroup.com/group"],
  // Discontinued products: never redirect to a page that offers them.
  ["/wire-mesh.html", "/products"],
  ["/wire-mesh-specifications.html", "/products"],
  ["/knitted-wire-mesh.html", "/products"],
  ["/perforated-cable-tray.html", "/products"],
  ["/gallery.html", "/gallery"],
  ["/products-gallery/:path*", "/gallery"],
  ["/video.html", "/about"],
  ["/applications.html", "/industries"],
  ["/locations-we-serve.html", "/export"],
  ["/contact.html", "/contact"],
  ["/enquiry.php", "/get-quote"],
  ["/sitemap.html", "/"],
];

export const legacyRedirects: Redirect[] = SHREE_PERFORATORS.map(
  ([source, destination]) => ({
    source,
    destination,
    permanent: true,
    has: [{ type: "host", value: SHREE_PERFORATORS_HOST }],
  })
);
