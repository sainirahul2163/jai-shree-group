import type { Metadata } from "next";

import { GlobalSchema } from "@/components/seo/GlobalSchema";
import { siteMetadata } from "@/lib/seo";
import { ALL_SITES } from "@/sites";
import { siteProductCards } from "@/sites/catalog";
import { siteFromParams } from "@/sites/params";
import { SiteProvider } from "@/sites/SiteProvider";
import { themeCss } from "@/sites/theme-vars";

// One static build per configured site; the proxy rewrites each host to /<key>/….
export function generateStaticParams() {
  return ALL_SITES.map((site) => ({ site: site.key }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ site: string }>;
}): Promise<Metadata> {
  return siteMetadata(await siteFromParams(params));
}

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ site: string }>;
}) {
  const site = await siteFromParams(params);

  return (
    <>
      <GlobalSchema site={site} />
      <style>{themeCss(site.theme)}</style>
      <SiteProvider site={site} products={siteProductCards(site)}>
        {children}
      </SiteProvider>
    </>
  );
}
