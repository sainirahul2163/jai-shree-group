import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { IndustryPageClient } from "@/components/industries/IndustryPageClient";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { siteUrl } from "@/lib/seo";
import { findSite } from "@/sites";
import { siteIndustryDetail, siteIndustryProducts } from "@/sites/catalog";
import { getContent } from "@/sites/content";
import { siteForPage } from "@/sites/params";

type PageProps = {
  params: Promise<{ site: string; slug: string }>;
};

// Only the site's industries that have a page; any other slug 404s.
export async function generateStaticParams({
  params,
}: {
  params: { site: string };
}) {
  const site = findSite(params.site);
  if (!site) return [];
  return site.industries.flatMap((slug) =>
    siteIndustryDetail(site, slug) ? [{ slug }] : []
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const site = await siteForPage(params, "/industries");
  const industry = siteIndustryDetail(site, slug);
  if (!industry) return {};

  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    alternates: {
      canonical: siteUrl(site, `/industries/${slug}`),
    },
  };
}

export default async function IndustryPage({ params }: PageProps) {
  const { slug } = await params;
  const site = await siteForPage(params, "/industries");
  const industry = siteIndustryDetail(site, slug);

  if (!industry) {
    notFound();
  }

  return (
    <>
      <BreadcrumbSchema
        site={site}
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: industry.name, path: `/industries/${slug}` },
        ]}
      />
      <IndustryPageClient
        industry={industry}
        relatedProducts={siteIndustryProducts(site, industry)}
        banner={getContent(site.key).ctaBanner}
        quoteText={getContent(site.key).industryQuoteText}
      />
    </>
  );
}
