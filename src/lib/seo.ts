import type { Metadata } from "next";

import type { SiteConfig } from "@/sites/types";

/** Vercel preview deployments must never be indexed. */
export function isPreview(): boolean {
  return process.env.VERCEL_ENV === "preview";
}

/** Absolute URL on the site's own origin; "/" is the bare origin. */
export function siteUrl(site: SiteConfig, path: string): string {
  return `${site.origin}${path === "/" ? "" : path}`;
}

/** Google and Bing meta-tag verification. Group only; unit domains verify by DNS. */
function siteVerification(site: SiteConfig): Metadata["verification"] | undefined {
  if (site.key !== "group") return undefined;
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bing = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
  if (!google && !bing) return undefined;

  const verification: NonNullable<Metadata["verification"]> = {};
  if (google) verification.google = google;
  if (bing) {
    verification.other = { "msvalidate.01": bing };
  }
  return verification;
}

/** Site-wide metadata for `[site]/layout.tsx`; pages override fields as needed. */
export function siteMetadata(site: SiteConfig): Metadata {
  const { seo } = site;
  const ogTitle = seo.ogTitle ?? seo.defaultTitle;
  const ogDescription = seo.ogDescription ?? seo.description;
  const verification = siteVerification(site);

  return {
    title: { default: seo.defaultTitle, template: seo.titleTemplate },
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: site.name }],
    creator: site.name,
    metadataBase: new URL(site.origin),
    ...(verification ? { verification } : {}),
    alternates: {
      canonical: "/",
      ...(seo.languages?.length
        ? { languages: Object.fromEntries(seo.languages.map((code) => [code, "/"])) }
        : {}),
    },
    openGraph: {
      type: "website",
      locale: seo.locale ?? "en_IN",
      url: site.origin,
      siteName: site.name,
      title: ogTitle,
      description: ogDescription,
      images: [{ url: seo.ogImage, ...seo.ogImageSize }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.twitterTitle ?? ogTitle,
      description: seo.twitterDescription ?? ogDescription,
    },
    robots: isPreview()
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
