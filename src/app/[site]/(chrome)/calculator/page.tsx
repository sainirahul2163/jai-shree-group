import type { Metadata } from "next";

import { OpenAreaCalculator } from "@/components/calculator/OpenAreaCalculator";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { CALCULATOR_FAQS } from "@/data/calculator-faqs";
import { contentMetadata } from "@/lib/seo";
import { getContent } from "@/sites/content";
import { siteFromParams, type SiteParams } from "@/sites/params";

export async function generateMetadata({ params }: SiteParams): Promise<Metadata> {
  const site = await siteFromParams(params);
  return contentMetadata(getContent(site.key).meta.calculator!, "/calculator");
}

export default async function CalculatorPage({ params }: SiteParams) {
  const site = await siteFromParams(params);
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
        site={site}
        items={[
          { name: "Home", path: "/" },
          { name: "Calculator", path: "/calculator" },
        ]}
      />
      <OpenAreaCalculator />
    </>
  );
}
