import type { Metadata } from "next";

import { PageCover, PageHistory, PageIntro } from "@/components/brochure/pages-front";
import { PageNetwork } from "@/components/brochure/pages-network";
import {
  PageCustom,
  PageExpanded,
  PageExpanded2,
  PageLaser,
  PageLeveling,
  PagePatterns,
  PagePerforated,
  PageTurret,
} from "@/components/brochure/pages-products";

import { PrintButton } from "./PrintButton";

import "./brochure.css";

export const metadata: Metadata = {
  title: "Company Brochure | Jai Shree Group",
  description:
    "Official Jai Shree Group catalogue — perforated sheets, laser cutting, expanded metal, wire mesh, welded mesh and demister pads.",
  robots: { index: false, follow: false },
};

export default function BrochurePage() {
  return (
    <div className="b-root">
      <PrintButton />
      <PageCover />
      <PageIntro />
      <PageHistory />
      <PagePerforated />
      <PagePatterns />
      <PageLaser />
      <PageExpanded />
      <PageExpanded2 />
      <PageTurret />
      <PageLeveling />
      <PageCustom />
      <PageNetwork />
    </div>
  );
}
