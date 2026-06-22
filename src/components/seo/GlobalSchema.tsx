import { COMPANY, PRODUCTS, SEO } from "@/lib/constants";

export function GlobalSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ManufacturingBusiness",
    name: COMPANY.name,
    foundingDate: COMPANY.founded,
    keywords: SEO.primaryKeywords.join(", "),
    areaServed: [
      { "@type": "City", name: "Pune" },
      { "@type": "City", name: "Mumbai" },
      { "@type": "State", name: "Maharashtra" },
      { "@type": "Country", name: "India" },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.address,
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      postalCode: "411062",
      addressCountry: "IN",
    },
    telephone: COMPANY.phone.replace(/\s/g, ""),
    email: COMPANY.email,
    url: COMPANY.website,
    sameAs: [
      "https://www.google.com/maps/place/Jai+Shree+Group",
      "https://www.indiamart.com/shree-perforators/",
      "https://www.linkedin.com/company/jai-shree-group/",
    ],
    hasCertification: {
      "@type": "Certification",
      name: "ISO 9001:2015",
      issuedBy: {
        "@type": "Organization",
        name: "Bureau Veritas",
      },
    },
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
