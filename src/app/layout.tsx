import { Barlow_Condensed, Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

// No brand values here: metadata and JSON-LD come from the active site in [site]/layout.tsx.

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Heading font of sites whose theme asks for it (fontHeading "barlow-condensed").
// Not preloaded: browsers fetch it only on pages that use it.
const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  preload: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <body
        className="flex min-h-screen flex-col"
        style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
      >
        {children}
      </body>
    </html>
  );
}
