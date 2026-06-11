import type { Metadata } from "next";

import { LandingCapabilities } from "@/components/landing/LandingCapabilities";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingIndustries } from "@/components/landing/LandingIndustries";
import { LandingMarquee } from "@/components/landing/LandingMarquee";
import { LandingNav } from "@/components/landing/LandingNav";
import { LandingProcess } from "@/components/landing/LandingProcess";
import { LandingProducts } from "@/components/landing/LandingProducts";
import { LandingStats } from "@/components/landing/LandingStats";
import { ScrollProgress } from "@/components/landing/ScrollProgress";
import { COMPANY } from "@/lib/constants";

const TITLE = "Jai Shree Group — Precision in Every Perforation | Since 1970";
const DESCRIPTION =
  "ISO 9001:2015 certified perforated sheet manufacturers in Pune & Mumbai. 50+ years. 9 manufacturing units. CNC perforation, fiber laser cutting, wire mesh. Pan India delivery.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "perforated sheet manufacturers Pune",
    "laser cutting Mumbai",
    "wire mesh India",
    "expanded metal manufacturers",
    "ISO certified metal fabrication",
  ],
  alternates: {
    canonical: `${COMPANY.website}/landing`,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${COMPANY.website}/landing`,
    siteName: COMPANY.name,
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#060606] text-[#FAFAFA]">
      <ScrollProgress />
      <LandingNav />
      <LandingHero />
      <LandingStats />
      <LandingMarquee />
      <LandingProducts />
      <LandingCapabilities />
      <LandingProcess />
      <LandingIndustries />
    </main>
  );
}