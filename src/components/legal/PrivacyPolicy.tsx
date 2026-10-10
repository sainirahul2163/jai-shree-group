// Agency template for an Indian B2B website under the Digital Personal Data
// Protection Act 2023, awaiting legal review. It describes what the site's
// code does today (forms → Supabase + Resend, anonymous page views, no
// analytics or advertising); update it when that changes. Each site's text
// differs only through its SiteConfig values.

import Link from "next/link";

import {
  BusinessContact,
  LegalDocument,
  LegalSection,
  businessName,
} from "@/components/legal/LegalDocument";
import { siteHost } from "@/lib/seo";
import type { SiteConfig } from "@/sites/types";

const LAST_UPDATED = { iso: "2026-10-11", label: "11 October 2026" };

export function PrivacyPolicy({ site }: { site: SiteConfig }) {
  const we = site.name;
  const host = siteHost(site);

  return (
    <LegalDocument
      title="Privacy Policy"
      subtitle={`How ${we} handles the personal data you share through ${host}.`}
      lastUpdated={LAST_UPDATED}
    >
      <LegalSection title="Who we are">
        <p>
          {businessName(site)} (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
          &ldquo;our&rdquo;) runs the website{" "}
          <a href={site.origin}>{host}</a>. This policy explains what personal
          data we collect through this website, why, and the rights you have
          under India&apos;s Digital Personal Data Protection Act, 2023
          (&ldquo;DPDP Act&rdquo;). For that data, we are the Data Fiduciary.
        </p>
        <p>
          This website is for businesses that buy metal products and services.
          We do not sell anything online and we do not take payments through
          it.
        </p>
      </LegalSection>

      <LegalSection title="What we collect">
        <p>
          <strong style={{ color: "var(--foreground)" }}>
            When you send an enquiry or a quote request.
          </strong>{" "}
          Our forms ask for your name, phone number and email address, and
          optionally your company name and city. They also collect the details
          of what you need: the products you are interested in, material,
          thickness, quantity, when you need it and any message you write. We
          note the page you sent the form from and the date and time.
        </p>
        <p>
          <strong style={{ color: "var(--foreground)" }}>
            When you browse the website.
          </strong>{" "}
          We count page views. Each record holds the address of the page you
          opened, as your browser reports it, the product or city named in
          that address, and the date and time. It does not
          include your name, contact details or IP address, and we do not use
          it to identify you.
        </p>
        <p>
          <strong style={{ color: "var(--foreground)" }}>
            When you call, email or message us.
          </strong>{" "}
          We receive whatever you choose to share, such as your number, your
          email address and your message.
        </p>
        <p>
          We do not ask for identity documents, financial details or other
          sensitive information. Please do not include them in a form.
        </p>
      </LegalSection>

      <LegalSection title="Why we use it">
        <ul>
          <li>To answer your enquiry and prepare a quotation.</li>
          <li>
            To follow up on your enquiry by phone, email or WhatsApp, and to
            handle any order that comes from it.
          </li>
          <li>
            To send you an email confirming that we received your request,
            with a reference number.
          </li>
          <li>
            To keep business records of the enquiries we receive.
          </li>
          <li>
            To understand, from the page-view counts, which pages are visited,
            so we can improve the website.
          </li>
        </ul>
        <p>
          We do not use your data for advertising, we do not run analytics or
          advertising trackers on this website, and we do not sell or rent
          your data to anyone.
        </p>
      </LegalSection>

      <LegalSection title="Our basis for using it">
        <p>
          We use the details you give in a form because you consent to it: by
          sending the form you agree that we may use those details for the
          purposes above. You can withdraw your consent at any time by writing
          to us (see &ldquo;Contact and grievances&rdquo; below). Withdrawing
          does not affect what we did before, but we may then be unable to
          answer your enquiry or continue with a quotation.
        </p>
      </LegalSection>

      <LegalSection title="Who else handles it">
        <p>
          We use a small number of service providers to run this website.
          They handle data only on our instructions and only to provide their
          service. Some of them store data on servers outside India.
        </p>
        <ul>
          <li>
            <strong style={{ color: "var(--foreground)" }}>Supabase</strong>{" "}
            stores the enquiries and page-view counts in our database. Only our
            authorised staff can sign in to see enquiries.
          </li>
          <li>
            <strong style={{ color: "var(--foreground)" }}>Resend</strong>{" "}
            delivers the emails the website sends: the enquiry to our inbox and
            the confirmation to you.
          </li>
          <li>
            <strong style={{ color: "var(--foreground)" }}>Vercel</strong>{" "}
            hosts the website. Like any web host, it keeps short-lived
            technical logs, such as IP addresses and browser type, to run and
            protect the service.
          </li>
        </ul>
        <p>
          <strong style={{ color: "var(--foreground)" }}>WhatsApp.</strong>{" "}
          Our WhatsApp buttons open WhatsApp with our number. Anything you send
          there is handled by WhatsApp under its own terms and privacy policy,
          and reaches us as a normal WhatsApp message.
        </p>
        <p>
          <strong style={{ color: "var(--foreground)" }}>Maps.</strong> Some
          pages may show a map. To draw it, your browser loads map images
          directly from the map provider (for example OpenStreetMap or Google
          Maps), which receives your IP address and browser details under its
          own privacy policy.
        </p>
        <p>
          We may also disclose personal data where the law requires it, for
          example to a court or a government authority.
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          This website does not set advertising or analytics cookies, and it
          sets no cookies for ordinary visitors on its live address.
        </p>
        <ul>
          <li>
            Our staff get sign-in cookies when they log in to the website&apos;s
            private admin area, which is for staff only.
          </li>
          <li>
            On our test and preview addresses only (not on {host}), a cookie
            remembers which of our websites is being previewed.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="How long we keep it">
        <p>
          We keep enquiry details for as long as we need them to answer and
          follow up your enquiry, to handle any order that comes from it, and
          for our business records, including what the law requires us to
          keep. When we no longer need them, we delete them. Page-view counts
          do not identify you and may be kept longer.
        </p>
      </LegalSection>

      <LegalSection title="How we protect it">
        <p>
          The website uses an encrypted connection (HTTPS). Enquiries are
          stored in a database that only our authorised staff can access. No
          system is perfectly secure, but if a breach affecting your personal
          data happens, we will inform you and the authorities as the DPDP Act
          requires.
        </p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>Under the DPDP Act you have the right to:</p>
        <ul>
          <li>
            get a summary of the personal data we hold about you and how we
            use it, and know who we have shared it with;
          </li>
          <li>have inaccurate or incomplete data corrected, completed or updated;</li>
          <li>
            have your data erased when it is no longer needed for the purpose
            you gave it for, unless the law requires us to keep it;
          </li>
          <li>withdraw your consent;</li>
          <li>have your grievances about our handling of your data addressed; and</li>
          <li>
            nominate another person to exercise these rights for you if you die
            or become unable to do so.
          </li>
        </ul>
        <p>
          To use any of these rights, write to us at the email or postal
          address below. We may ask you to confirm your identity before we act
          on a request.
        </p>
      </LegalSection>

      <LegalSection title="Contact and grievances">
        <p>
          For questions about this policy, to use your rights, or to raise a
          grievance about how we handle your personal data, contact:
        </p>
        <BusinessContact site={site} />
        <p>
          We will look into your request and reply. If you are not satisfied
          with our response to a grievance, you may complain to the Data
          Protection Board of India.
        </p>
      </LegalSection>

      <LegalSection title="Children">
        <p>
          This website is meant for businesses. It is not directed at children,
          and we do not knowingly collect personal data from anyone under 18.
          If you are under 18, please do not send us your details through the
          website.
        </p>
      </LegalSection>

      <LegalSection title="Changes to this policy">
        <p>
          We may update this policy when the website or the law changes. The
          date at the top shows when it last changed. Please also read our{" "}
          <Link href="/terms">Terms of Use</Link>.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
