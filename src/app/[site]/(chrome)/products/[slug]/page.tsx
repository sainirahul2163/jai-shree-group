import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductPageClient } from "@/components/products/ProductPageClient";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import {
  getProductDetail,
  getRelatedProducts,
  PRODUCT_SLUGS,
} from "@/data/products";
import { siteUrl } from "@/lib/seo";
import { siteFromParams } from "@/sites/params";

type PageProps = {
  params: Promise<{ site: string; slug: string }>;
};

export async function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const site = await siteFromParams(params);
  const product = getProductDetail(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.metaTitle,
    description: product.metaDescription,
    alternates: {
      canonical: siteUrl(site, `/products/${slug}`),
    },
    openGraph: {
      title: product.metaTitle,
      description: product.metaDescription,
      url: siteUrl(site, `/products/${slug}`),
      siteName: site.name,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const site = await siteFromParams(params);
  const product = getProductDetail(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(slug, 3);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.metaDescription,
    brand: {
      "@type": "Brand",
      name: site.name,
    },
    manufacturer: {
      "@type": "Organization",
      name: site.name,
    },
  };

  return (
    <>
      <BreadcrumbSchema
        site={site}
        items={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: product.name, path: `/products/${slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductPageClient
        product={product}
        relatedProducts={relatedProducts}
      />
    </>
  );
}
