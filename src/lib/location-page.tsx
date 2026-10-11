import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LocationPageClient } from "@/components/location/LocationPageClient";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { getLocationPage } from "@/data/locations";
import { siteUrl } from "@/lib/seo";
import { siteForPage, type SiteParams } from "@/sites/params";

export async function locationMetadata(
  path: string,
  params: SiteParams["params"]
): Promise<Metadata> {
  const site = await siteForPage(params, `/${path.split("/")[0]}`);
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
  const site = await siteForPage(params, `/${path.split("/")[0]}`);
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
