import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LocationPageClient } from "@/components/location/LocationPageClient";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { getLocationPage } from "@/data/locations";
import { siteUrl } from "@/lib/seo";
import { siteFromParams, type SiteParams } from "@/sites/params";

export async function locationMetadata(
  path: string,
  params: SiteParams["params"]
): Promise<Metadata> {
  const site = await siteFromParams(params);
  const data = getLocationPage(path);
  if (!data) return {};

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      canonical: siteUrl(site, `/${data.city}/${data.slug}`),
    },
  };
}

export async function renderLocationPage(
  path: string,
  params: SiteParams["params"]
) {
  const site = await siteFromParams(params);
  const data = getLocationPage(path);
  if (!data) {
    notFound();
  }
  return (
    <>
      <BreadcrumbSchema
        site={site}
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
