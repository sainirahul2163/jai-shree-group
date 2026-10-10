import { notFound } from "next/navigation";

import { ALL_SITES, findSite } from "@/sites";
import { themeCss } from "@/sites/theme-vars";

// One static build per configured site; the proxy rewrites each host to /<key>/….
export function generateStaticParams() {
  return ALL_SITES.map((site) => ({ site: site.key }));
}

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ site: string }>;
}) {
  const { site: key } = await params;
  const site = findSite(key);
  if (!site) notFound();

  return (
    <>
      <style>{themeCss(site.theme)}</style>
      {children}
    </>
  );
}
