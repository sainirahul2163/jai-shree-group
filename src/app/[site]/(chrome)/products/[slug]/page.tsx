import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductPageClient } from "@/components/products/ProductPageClient";
import { COMPANY } from "@/lib/constants";
import {
  getProductDetail,
  getRelatedProducts,
  PRODUCT_SLUGS,
} from "@/data/products";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductDetail(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.metaTitle,
    description: product.metaDescription,
    alternates: {
      canonical: `${COMPANY.website}/products/${slug}`,
    },
    openGraph: {
      title: product.metaTitle,
      description: product.metaDescription,
      url: `${COMPANY.website}/products/${slug}`,
      siteName: COMPANY.name,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductDetail(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(slug, 3);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: COMPANY.website,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${COMPANY.website}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${COMPANY.website}/products/${slug}`,
      },
    ],
  };

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
      name: COMPANY.name,
    },
    manufacturer: {
      "@type": "Organization",
      name: COMPANY.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
