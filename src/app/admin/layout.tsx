import type { Metadata } from "next";

import { siteProductCards } from "@/sites/catalog";
import { group } from "@/sites/group";
import { SiteProvider } from "@/sites/SiteProvider";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// One admin panel for every site. Shared components it reuses (the logo) read
// the group site.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteProvider site={group} products={siteProductCards(group)}>
      {children}
    </SiteProvider>
  );
}
