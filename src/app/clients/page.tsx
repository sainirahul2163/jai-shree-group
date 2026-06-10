import type { Metadata } from "next";

import { ClientsPage } from "@/components/clients/ClientsPage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Our Clients | Trusted by Leading Manufacturers | Jai Shree Group",
  description:
    "Jai Shree Group serves leading manufacturers in automobile, construction, pharmaceutical, petrochemical and more. ISO 9001:2015 certified since 1970.",
  alternates: {
    canonical: "https://jaishreegroup.in/clients",
  },
};

export default function Clients() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Clients", path: "/clients" },
        ]}
      />
      <ClientsPage />
    </>
  );
}
