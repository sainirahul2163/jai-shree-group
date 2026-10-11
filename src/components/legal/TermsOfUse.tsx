// Agency template for an Indian B2B website's terms of use, awaiting legal
// review. Each site's text differs only through its SiteConfig values; the
// courts' city comes from config.jurisdiction.

import Link from "next/link";

import {
  BusinessContact,
  LegalDocument,
  LegalSection,
  businessName,
} from "@/components/legal/LegalDocument";
import { siteHost } from "@/lib/seo";
import { group } from "@/sites/group";
import type { SiteConfig } from "@/sites/types";

const LAST_UPDATED = { iso: "2026-10-11", label: "11 October 2026" };

export function TermsOfUse({ site }: { site: SiteConfig }) {
  const we = site.name;
  const host = siteHost(site);
  const courts = site.jurisdiction ?? "Pune";
  const owners = site.endorsed ? `${we} or ${group.name}` : we;

  return (
    <LegalDocument
      title="Terms of Use"
      subtitle={`The terms for using ${host}, the website of ${we}.`}
      lastUpdated={LAST_UPDATED}
    >
      <LegalSection title="About these terms">
        <p>
          This website, <a href={site.origin}>{host}</a>, is run by{" "}
          {businessName(site)} (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
          &ldquo;our&rdquo;). By using it you agree to these terms. If you do
          not agree, please do not use the website.
        </p>
      </LegalSection>

      <LegalSection title="Using the website">
        <ul>
          <li>
            You may use this website to learn about our products and services
            and to send us enquiries for your business.
          </li>
          <li>
            Please give true and accurate details when you send us a form, and
            send only details you are entitled to share.
          </li>
          <li>
            Do not misuse the website: do not try to break into it, disrupt it,
            send automated or bulk submissions, or send anything harmful or
            unlawful through it.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Information on the website">
        <p>
          The information on this website is general and is given for guidance
          only. Specifications, open-area results, weights and other figures
          from our calculators and tools are approximate, and photos show
          typical work. They are not an offer and do not form part of any
          contract.
        </p>
        <p>
          A quotation, price, delivery date or order is binding only when we
          confirm it to you in writing. The terms in our written quotation and
          order confirmation apply to every supply.
        </p>
        <p>
          We try to keep the website accurate and up to date, but we do not
          promise that it is complete, error-free or always available.
        </p>
      </LegalSection>

      <LegalSection title="Intellectual property">
        <p>
          The text, photos, videos, drawings, designs, logos and names on this
          website belong to {owners}, or are used with permission. You may view
          and print pages for your own business use. You may not copy,
          republish or sell any part of the website without our written
          permission.
        </p>
      </LegalSection>

      <LegalSection title="Links to other websites">
        <p>
          The website links to other websites and services, such as WhatsApp,
          maps and social media. We do not control them and are not responsible
          for their content or how they handle your data. Their own terms and
          privacy policies apply.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <p>
          You use this website at your own risk. As far as the law allows, we
          are not liable for any loss or damage that comes from using the
          website, from relying on its information or calculators, or from the
          website being unavailable. This includes indirect loss such as loss
          of profit, business or data.
        </p>
        <p>
          Our responsibility for products and services we supply is set by the
          written quotation and order confirmation for that supply, not by this
          website. Nothing in these terms limits any liability that cannot be
          limited under Indian law.
        </p>
      </LegalSection>

      <LegalSection title="Your personal data">
        <p>
          How we handle the details you send us is explained in our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </LegalSection>

      <LegalSection title="Governing law">
        <p>
          These terms are governed by the laws of India. The courts at {courts}{" "}
          have exclusive jurisdiction over any dispute arising from them or from
          your use of this website.
        </p>
      </LegalSection>

      <LegalSection title="Changes to these terms">
        <p>
          We may update these terms from time to time. The date at the top
          shows when they last changed. Using the website after a change means
          you accept the updated terms.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>For questions about these terms, contact:</p>
        <BusinessContact site={site} />
      </LegalSection>
    </LegalDocument>
  );
}
