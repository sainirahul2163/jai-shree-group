import type { Metadata } from "next";

import { PageCapability, PageNetwork } from "@/components/brochure/pages-back";
import {
  PageContents,
  PageCover,
  PageGroup,
  PageHistory,
  PagePrinciples,
} from "@/components/brochure/pages-front";
import {
  PageCapabilities,
  PageCustom,
  PageExpanded,
  PageExpandedTech,
  PageLaser,
  PageLeveling,
  PagePatterns,
  PagePerforated,
  PageTurret,
} from "@/components/brochure/pages-products";

import { PrintButton } from "./PrintButton";

import "./brochure.css";

export const metadata: Metadata = {
  title: "Company Profile | Jai Shree Group",
  description:
    "Jai Shree Group company profile — perforated sheets, laser cutting, expanded metal, turret punching, precision sheet leveling and custom components.",
  robots: { index: false, follow: false },
};

export default function BrochurePage() {
  return (
    <div className="bx">
      <PrintButton />
      <PageCover />
      <PageContents />
      <PageGroup />
      <PageHistory />
      <PagePrinciples />
      <PageCapabilities />
      <PagePerforated />
      <PagePatterns />
      <PageLaser />
      <PageExpanded />
      <PageExpandedTech />
      <PageTurret />
      <PageLeveling />
      <PageCustom />
      <PageCapability />
      <PageNetwork />
    </div>
  );
}
