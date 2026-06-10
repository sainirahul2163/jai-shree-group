import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { GlobalSchema } from "@/components/seo/GlobalSchema";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { COMPANY } from "@/lib/constants";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Jai Shree Group | Perforated Sheet Manufacturers Pune Mumbai | ISO 9001:2015",
  description:
    "ISO 9001:2015 certified perforated sheet, wire mesh & expanded metal manufacturers. 50+ years experience. 9 manufacturing units in Pune & Mumbai. Pan India delivery. Get quote today.",
  keywords: [
    "perforated sheets",
    "wire mesh",
    "expanded metal",
    "laser cutting",
    "Pune",
    "Mumbai",
    "ISO 9001",
    "Jai Shree Group",
    "metal manufacturing",
    "welded mesh",
  ],
  authors: [{ name: COMPANY.name }],
  creator: COMPANY.name,
  metadataBase: new URL("https://jaishreegroup.in"),
  verification: {
    google: "add-your-verification-code-here",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: COMPANY.website,
    siteName: COMPANY.name,
    title:
      "Jai Shree Group | Perforated Sheet Manufacturers Pune Mumbai | ISO 9001:2015",
    description:
      "ISO 9001:2015 certified perforated sheet, wire mesh & expanded metal manufacturers. 50+ years experience. 9 manufacturing units in Pune & Mumbai.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Jai Shree Group | Perforated Sheet Manufacturers Pune Mumbai | ISO 9001:2015",
    description:
      "ISO 9001:2015 certified perforated sheet, wire mesh & expanded metal manufacturers. 50+ years experience.",
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
