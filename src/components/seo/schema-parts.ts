import type { SiteConfig } from "@/sites/types";

// JSON.stringify drops undefined fields, so facts a site does not have are left out.

export function postalAddress(site: SiteConfig) {
  const parts = site.seo.schema?.address;
  return {
    "@type": "PostalAddress",
    streetAddress: site.contact.address,
    addressLocality: parts?.locality,
    addressRegion: parts?.region,
    postalCode: parts?.postalCode,
    addressCountry: parts?.country,
  };
}

export function geoCoordinates(site: SiteConfig) {
  const geo = site.seo.schema?.geo;
  if (!geo) return undefined;
  return {
    "@type": "GeoCoordinates",
    latitude: geo.latitude,
    longitude: geo.longitude,
  };
}

export function telephone(site: SiteConfig) {
  return site.contact.phone.replace(/\s/g, "");
}
