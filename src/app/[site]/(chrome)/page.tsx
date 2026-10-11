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
import { contentMetadata } from "@/lib/seo";
import { siteIndustryCards } from "@/sites/catalog";
import { getContent } from "@/sites/content";
import type { SiteContent } from "@/sites/content/types";
import { siteForPage, type SiteParams } from "@/sites/params";
import type { HomeSectionKey, SiteConfig } from "@/sites/types";

export async function generateMetadata({ params }: SiteParams): Promise<Metadata> {
  const site = await siteForPage(params, "/");
  return contentMetadata(getContent(site.key).meta.home, "/");
}

/** One renderer per home section; `site.home` decides which appear and in what order. */
function renderSection(
  key: HomeSectionKey,
  site: SiteConfig,
  home: SiteContent["home"]
): React.ReactNode {
  switch (key) {
    case "hero":
      return <HeroSection key={key} content={home.hero} />;
    case "trust":
      return <TrustBar key={key} content={home.trust} />;
    case "video":
      return home.video ? <VideoSection key={key} content={home.video} /> : null;
    case "products":
      return <ProductsSection key={key} content={home.products} />;
    case "about":
      return <AboutSection key={key} content={home.about} />;
    case "industries":
      return (
        <IndustriesSection
          key={key}
          content={home.industries}
          industries={siteIndustryCards(site)}
        />
      );
    case "process":
      return <ProcessSection key={key} content={home.process} />;
    case "group":
      // The units-by-city section with a map: group site only.
      return site.key === "group" ? <GroupSection key={key} /> : null;
    case "cta":
      return <CtaSection key={key} content={home.cta} />;
  }
}

export default async function Home({ params }: SiteParams) {
  const site = await siteForPage(params, "/");
  const { home } = getContent(site.key);

  return (
    <div className="min-h-screen bg-background">
      {site.home.map((key) => renderSection(key, site, home))}
    </div>
  );
}
