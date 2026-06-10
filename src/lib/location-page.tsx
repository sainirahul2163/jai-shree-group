import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LocationPageClient } from "@/components/location/LocationPageClient";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { getLocationPage } from "@/data/locations";
import { COMPANY } from "@/lib/constants";

export function locationMetadata(path: string): Metadata {
  const data = getLocationPage(path);
  if (!data) return {};

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      canonical: `${COMPANY.website}/${data.city}/${data.slug}`,
    },
  };
}

export function renderLocationPage(path: string) {
  const data = getLocationPage(path);
  if (!data) {
    notFound();
  }
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          {
            name: `${data.productName} in ${data.cityName}`,
            path: `/${data.city}/${data.slug}`,
          },
        ]}
      />
      <LocationPageClient data={data} />
    </>
  );
}
