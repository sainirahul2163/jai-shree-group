import type { Metadata } from "next";

import { ContactPage } from "@/components/contact/ContactPage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ContactPageSchema } from "@/components/seo/ContactPageSchema";
import { contentMetadata } from "@/lib/seo";
import { getContent } from "@/sites/content";
import { siteForPage, type SiteParams } from "@/sites/params";

export async function generateMetadata({ params }: SiteParams): Promise<Metadata> {
  const site = await siteForPage(params, "/contact");
  return contentMetadata(getContent(site.key).meta.contact, "/contact");
}

export default async function Contact({ params }: SiteParams) {
  const site = await siteForPage(params, "/contact");

  return (
    <>
      <ContactPageSchema site={site} />
      <BreadcrumbSchema
        site={site}
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <ContactPage content={getContent(site.key).contact} />
    </>
  );
}
