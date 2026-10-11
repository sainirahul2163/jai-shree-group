import { isPreview } from "@/lib/seo";
import { ALL_SITES, findSite } from "@/sites";

// Served as /robots.txt on each site's domain (the proxy rewrites it here).
// Same text format as Next's robots.ts convention.

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_SITES.map((site) => ({ site: site.key }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ site: string }> }
) {
  const site = findSite((await params).site);
  if (!site) return new Response("Not Found", { status: 404 });

  const body = isPreview()
    ? "User-Agent: *\nDisallow: /\n\n"
    : "User-Agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\n\n" +
      `Sitemap: ${site.origin}/sitemap.xml\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
