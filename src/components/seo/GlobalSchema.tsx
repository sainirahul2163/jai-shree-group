import { COMPANY, PRODUCTS, SEO } from "@/lib/constants";

export function GlobalSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ManufacturingBusiness",
    name: COMPANY.name,
    foundingDate: COMPANY.founded,
    iso6523Code: COMPANY.iso,
    keywords: SEO.primaryKeywords.join(", "),
    areaServed: ["IN", "US", "GB", "AU", "AE", "SG"],
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Gat No. 94, Near Sonawane Wasti, Jyotibanagar, Talawade",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      postalCode: "411062",
      addressCountry: "IN",
    },
    telephone: COMPANY.phone.replace(/\s/g, ""),
    email: COMPANY.email,
    url: COMPANY.website,
    sameAs: [],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Metal Manufacturing Products",
      itemListElement: PRODUCTS.map((product, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Product",
          name: product.name,
          url: `${COMPANY.website}/products/${product.slug}`,
          description: product.description,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
