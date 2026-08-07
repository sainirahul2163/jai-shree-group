"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageViewTracker } from "@/components/shared/PageViewTracker";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isLanding = pathname.startsWith("/landing");
  const isBrochure = pathname.startsWith("/brochure");

  if (isAdmin || isLanding || isBrochure) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex-1 bg-[#0A0A0A]">{children}</main>
      <Footer />
      <WhatsAppButton />
      <PageViewTracker />
    </>
  );
}
