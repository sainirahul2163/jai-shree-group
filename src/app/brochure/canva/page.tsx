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

import "../brochure.css";
import "./canva.css";

/**
 * Handover build of the brochure for the designer's Canva import.
 *
 * Two things differ from /brochure, and only two:
 *
 * 1. Geist is a variable font, and Chrome cannot embed a variable font in a
 *    PDF — it falls back to Type 3, which arrives in Canva as outlines rather
 *    than editable text. canva.css self-hosts static Inter and Roboto Mono
 *    instead, which embed as real CID TrueType, so the text stays editable.
 * 2. Inter and Roboto Mono exist in Canva's font library; Geist does not, so
 *    Canva would substitute it anyway and reflow the layout.
 *
 * Everything else — layout, colour, spacing, imagery — is the same components
 * as the print master.
 */
export const metadata: Metadata = {
  title: "Company Profile — Canva handover | Jai Shree Group",
  robots: { index: false, follow: false },
};

export default function BrochureCanvaPage() {
  return (
    <div className="bx canva">
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
