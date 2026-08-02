import type { Metadata } from "next";

import { GroupPage } from "@/components/group/GroupPage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title:
    "Our Group | 6 Manufacturing Units Pune & Mumbai | Jai Shree Group",
  description:
    "Jai Shree Group operates 6 manufacturing units across Pune (Talawade) and Mumbai (Bhayander, Masjid Bunder, Palghar). Contact your nearest unit.",
  alternates: {
    canonical: "/group",
  },
};

export default function Group() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Our Group", path: "/group" },
        ]}
      />
      <GroupPage />
    </>
  );
}
