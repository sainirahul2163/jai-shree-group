import type { Metadata } from "next";

import { GetQuotePage } from "@/components/quote/GetQuotePage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title:
    "Get Free Quote | Perforated Sheets, Laser Cutting, Expanded Metal | Jai Shree Group",
  description:
    "Request a free quote for perforated sheets, laser cutting, expanded metal, turret punching and more. ISO certified manufacturers in Pune & Mumbai.",
  alternates: {
    canonical: "/get-quote",
  },
};

export default function GetQuote() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Get Quote", path: "/get-quote" },
        ]}
      />
      <GetQuotePage />
    </>
  );
}
