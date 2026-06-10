import type { Metadata } from "next";

import { OpenAreaCalculator } from "@/components/calculator/OpenAreaCalculator";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title:
    "Perforated Sheet Open Area Calculator | Free Online Tool | Jai Shree Group",
  description:
    "Free online perforated sheet open area calculator. Calculate open area % for round, square, rectangular holes with triangular, rectangular or staggered pitch. All 6 formulas.",
  alternates: {
    canonical: "https://jaishreegroup.in/calculator",
  },
};

export default function CalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Calculator", path: "/calculator" },
        ]}
      />
      <OpenAreaCalculator />
    </>
  );
}
