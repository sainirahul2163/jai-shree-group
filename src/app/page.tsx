import type { Metadata } from "next";

import { AboutSection } from "@/components/home/AboutSection";
import { CtaSection } from "@/components/home/CtaSection";
import { GroupSection } from "@/components/home/GroupSection";
import { HeroSection } from "@/components/home/HeroSection";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { TrustBar } from "@/components/home/TrustBar";
import { VideoSection } from "@/components/home/VideoSection";

export const metadata: Metadata = {
  title: "Perforated Sheet Manufacturers Pune & Mumbai | Jai Shree Group",
  description:
    "ISO 9001:2015 certified perforated sheet manufacturers in Pune & Mumbai. 50+ years of precision metalwork — perforated sheets, expanded metal, laser cutting, turret punching. Get free quote.",
  alternates: {
    canonical: "https://jaishreegroup.in",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <HeroSection />
      <TrustBar />
      <VideoSection />
      <ProductsSection />
      <AboutSection />
      <IndustriesSection />
      <ProcessSection />
      <GroupSection />
      <CtaSection />
    </div>
  );
}
