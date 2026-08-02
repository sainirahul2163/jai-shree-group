import type { Metadata } from "next";

import { GetQuotePage } from "@/components/quote/GetQuotePage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title:
    "Get Free Quote | Perforated Sheets, Wire Mesh, Laser Cutting | Jai Shree Group",
  description:
    "Request a free quote for perforated sheets, wire mesh, laser cutting, expanded metal and more. ISO certified manufacturers in Pune & Mumbai.",
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
