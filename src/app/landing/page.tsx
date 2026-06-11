import type { Metadata } from "next";

import { LandingPage } from "@/components/landing/LandingPage";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Jai Shree Group | Precision Metal Manufacturing Since 1970",
  description:
    "ISO 9001:2015 certified perforated sheet manufacturers. 50+ years. 9 units. Pune & Mumbai.",
  alternates: {
    canonical: `${COMPANY.website}/landing`,
  },
  openGraph: {
    title: "Jai Shree Group | Precision Metal Manufacturing Since 1970",
    description:
      "ISO 9001:2015 certified perforated sheet manufacturers. 50+ years. 9 units. Pune & Mumbai.",
    url: `${COMPANY.website}/landing`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function Landing() {
  return <LandingPage />;
}
