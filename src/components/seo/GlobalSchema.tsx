import { PRODUCTS } from "@/lib/constants";
import { siteUrl } from "@/lib/seo";
import { group } from "@/sites/group";
import type { SiteConfig } from "@/sites/types";

import { geoCoordinates, postalAddress, telephone } from "./schema-parts";

/** The site's products that have shared product data, in config order. */
function offerCatalog(site: SiteConfig) {
  const products = site.products.flatMap(
    (slug) => PRODUCTS.find((product) => product.slug === slug) ?? []
  );
  if (!products.length) return undefined;
  return {
    "@type": "OfferCatalog",
    name: site.seo.schema?.catalogName,
    itemListElement: products.map((product, index) => ({
      "@type": "Offer",
      position: index + 1,
      itemOffered: {
        "@type": "Product",
        name: product.name,
        url: siteUrl(site, `/products/${product.slug}`),
        description: product.description,
      },
    })),
  };
}

function certification(site: SiteConfig) {
  const cert = site.seo.schema?.certification;
  if (!cert) return undefined;
  return {
    "@type": "Certification",
    name: cert.name,
    issuedBy: { "@type": "Organization", name: cert.issuedBy },
  };
}

/** Main site: the group as a whole. */
function groupSchema(site: SiteConfig) {
  const facts = site.seo.schema;
  return {
    "@context": "https://schema.org",
    "@type": facts?.type ?? "Organization",
    name: site.name,
    foundingDate: facts?.foundingDate,
    keywords: facts?.keywords?.join(", "),
    areaServed: facts?.areaServed?.map((area) => ({
      "@type": area.type,
      name: area.name,
    })),
    address: postalAddress(site),
    telephone: telephone(site),
    email: site.contact.email,
    url: site.origin,
    sameAs: facts?.sameAs,
    hasCertification: certification(site),
    hasOfferCatalog: offerCatalog(site),
  };
}

/** Unit site: the unit's own business, owned by Jai Shree Group (docs/07-seo-rules.md). */
function unitSchema(site: SiteConfig) {
  const facts = site.seo.schema;
  return {
    "@context": "https://schema.org",
    "@type": facts?.type ?? "LocalBusiness",
    name: site.name,
    description: site.seo.description,
    url: site.origin,
    telephone: telephone(site),
    email: site.contact.email,
    address: postalAddress(site),
    geo: geoCoordinates(site),
    foundingDate: facts?.foundingDate,
    sameAs: facts?.sameAs,
    hasCertification: certification(site),
    hasOfferCatalog: offerCatalog(site),
    parentOrganization: {
      "@type": "Organization",
      name: group.name,
      url: group.origin,
    },
  };
}

export function GlobalSchema({ site }: { site: SiteConfig }) {
  const schema = site.unitSlug ? unitSchema(site) : groupSchema(site);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
