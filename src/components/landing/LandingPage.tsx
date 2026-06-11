"use client";

import dynamic from "next/dynamic";

import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingMarquee } from "@/components/landing/LandingMarquee";
import { ScrollProgress } from "@/components/landing/ScrollProgress";
import { PageViewTracker } from "@/components/shared/PageViewTracker";

const LandingProducts = dynamic(
  () =>
    import("@/components/landing/LandingProducts").then((m) => ({
      default: m.LandingProducts,
    })),
  { ssr: true }
);

const LandingNumbers = dynamic(
  () =>
    import("@/components/landing/LandingNumbers").then((m) => ({
      default: m.LandingNumbers,
    })),
  { ssr: true }
);

const LandingProcess = dynamic(
  () =>
    import("@/components/landing/LandingProcess").then((m) => ({
      default: m.LandingProcess,
    })),
  { ssr: true }
);

const LandingIndustries = dynamic(
  () =>
    import("@/components/landing/LandingIndustries").then((m) => ({
      default: m.LandingIndustries,
    })),
  { ssr: true }
);

const LandingStory = dynamic(
  () =>
    import("@/components/landing/LandingStory").then((m) => ({
      default: m.LandingStory,
    })),
  { ssr: true }
);

const LandingLocations = dynamic(
  () =>
    import("@/components/landing/LandingLocations").then((m) => ({
      default: m.LandingLocations,
    })),
  { ssr: true }
);

const LandingTestimonials = dynamic(
  () =>
    import("@/components/landing/LandingTestimonials").then((m) => ({
      default: m.LandingTestimonials,
    })),
  { ssr: true }
);

const LandingCTA = dynamic(
  () =>
    import("@/components/landing/LandingCTA").then((m) => ({
      default: m.LandingCTA,
    })),
  { ssr: true }
);

export function LandingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0A0A" }}>
      <ScrollProgress />
      <LandingHero />
      <LandingMarquee />
      <LandingProducts />
      <LandingNumbers />
      <LandingProcess />
      <LandingIndustries />
      <LandingStory />
      <LandingLocations />
      <LandingTestimonials />
      <LandingCTA />
      <LandingFooter />
      <PageViewTracker />
    </div>
  );
}
