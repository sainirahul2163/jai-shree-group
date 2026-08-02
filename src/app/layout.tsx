import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { GlobalSchema } from "@/components/seo/GlobalSchema";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { COMPANY, SITE_URL } from "@/lib/constants";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function buildSiteVerification(): Metadata["verification"] | undefined {
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

const siteVerification = buildSiteVerification();

export const metadata: Metadata = {
  title: "Perforated Sheet Manufacturers Pune Mumbai | Jai Shree Group",
  description:
    "Perforated sheet manufacturers in Pune & Mumbai. ISO 9001:2015 certified, 50+ years. CNC turret perforation & laser cutting. Get a free quote today.",
  keywords: [
    "Perforated Sheet Manufacturer",
    "Expanded Mesh Manufacturers",
    "CNC Turret Perforated Sheet Manufacturing",
    "perforated sheet manufacturers India export",
    "wire mesh exporters India",
    "expanded metal suppliers India",
    "metal fabrication India",
    "perforated metal sheets India supplier",
    "perforated sheets",
    "expanded metal",
    "laser cutting",
    "Pune",
    "Mumbai",
    "ISO 9001",
    "Jai Shree Group",
    "metal manufacturing",
  ],
  authors: [{ name: COMPANY.name }],
  creator: COMPANY.name,
  metadataBase: new URL(SITE_URL),
  ...(siteVerification ? { verification: siteVerification } : {}),
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "en-IN": "/",
      "en-US": "/",
      "en-GB": "/",
      "en-AU": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: COMPANY.website,
    siteName: COMPANY.name,
    title:
      "Perforated Sheet Manufacturer | Expanded Mesh Manufacturers | Jai Shree Group",
    description:
      "Perforated sheet manufacturer in Pune & Mumbai. CNC turret perforated sheet manufacturing. Export & global delivery. ISO 9001:2015 certified.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Perforated Sheet Manufacturer | Expanded Mesh | Jai Shree Group",
    description:
      "Perforated sheet manufacturer & expanded mesh manufacturers. CNC turret perforated sheet manufacturing. Export & global delivery.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="flex min-h-screen flex-col"
        style={{ backgroundColor: "#0A0A0A", color: "#FFFFFF" }}
      >
        <GlobalSchema />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
