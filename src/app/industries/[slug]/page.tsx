import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { IndustryPageClient } from "@/components/industries/IndustryPageClient";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import {
  getIndustryDetail,
  INDUSTRY_SLUGS,
} from "@/data/industries";
import { COMPANY } from "@/lib/constants";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return INDUSTRY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryDetail(slug);
  if (!industry) return {};

  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    alternates: {
      canonical: `${COMPANY.website}/industries/${slug}`,
    },
  };
}

export default async function IndustryPage({ params }: PageProps) {
  const { slug } = await params;
  const industry = getIndustryDetail(slug);

  if (!industry) {
    notFound();
  }

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: industry.name, path: `/industries/${slug}` },
        ]}
      />
      <IndustryPageClient industry={industry} />
    </>
  );
}
