import type { Metadata } from "next";
import localFont from "next/font/local";

import { PageBack } from "@/components/brochure/pages-back";
import { PageCover, PageHistory, PageIntro } from "@/components/brochure/pages-front";
import {
  PageCustom,
  PageExpanded,
  PageExpandedCont,
  PageLaser,
  PageLeveling,
  PagePatterns,
  PagePerforated,
  PageTurret,
} from "@/components/brochure/pages-products";

import { PrintButton } from "./PrintButton";

import "./brochure.css";

/**
 * Inter and Roboto Mono, as *static* weight files.
 *
 * These deliberately do not come from next/font/google: that serves the
 * variable version of a family, and Chrome cannot embed a variable font in a
 * PDF — it writes Type 3 glyph outlines, which arrive in Canva as artwork
 * rather than text you can retype. Static instances embed as real TrueType.
 */
const sans = localFont({
  src: [
    { path: "../../../public/fonts/canva/inter-400.woff2", weight: "400", style: "normal" },
    { path: "../../../public/fonts/canva/inter-500.woff2", weight: "500", style: "normal" },
    { path: "../../../public/fonts/canva/inter-600.woff2", weight: "600", style: "normal" },
    { path: "../../../public/fonts/canva/inter-700.woff2", weight: "700", style: "normal" },
    { path: "../../../public/fonts/canva/inter-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--js-sans-face",
  display: "block",
});

const mono = localFont({
  src: [
    { path: "../../../public/fonts/canva/robotomono-400.woff2", weight: "400", style: "normal" },
    { path: "../../../public/fonts/canva/robotomono-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--js-mono-face",
  display: "block",
});

export const metadata: Metadata = {
  title: "Company Profile | Jai Shree Group",
  description:
    "Jai Shree Group company profile — perforated sheets, laser cutting, expanded metal, turret punching, precision sheet leveling and custom components.",
  robots: { index: false, follow: false },
};

/**
 * 12 pages, following the 2022 printed brochure page for page. The cover and
 * back cover are the new design; wire mesh, welded mesh and knitted mesh are
 * out, and turret punching, sheet leveling and custom components take their
 * place so the product set matches the website.
 */
export default function BrochurePage() {
  return (
    <div className={`bx ${sans.variable} ${mono.variable}`}>
      <PrintButton />
      <PageCover />
      <PageIntro />
      <PageHistory />
      <PagePerforated />
      <PagePatterns />
      <PageLaser />
      <PageExpanded />
      <PageExpandedCont />
      <PageTurret />
      <PageLeveling />
      <PageCustom />
      <PageBack />
    </div>
  );
}
