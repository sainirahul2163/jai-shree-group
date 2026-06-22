import type { Metadata } from "next";

import { OpenAreaCalculator } from "@/components/calculator/OpenAreaCalculator";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { CALCULATOR_FAQS } from "@/data/calculator-faqs";

export const metadata: Metadata = {
  title: "Perforated Sheet Open Area Calculator | Jai Shree Group",
  description:
    "Free online perforated sheet open area calculator. Calculate open area % for round, square, rectangular holes with triangular, rectangular or staggered pitch. All 6 formulas.",
  alternates: {
    canonical: "https://jaishreegroup.in/calculator",
  },
};

export default function CalculatorPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CALCULATOR_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
