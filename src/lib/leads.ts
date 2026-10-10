import { NextResponse } from "next/server";
import { Resend } from "resend";

import { buildCustomerReplyEmail } from "@/lib/email";
import type { SiteConfig } from "@/sites/types";

/**
 * Inbox for a site's lead notifications. LEAD_EMAIL_OVERRIDE wins everywhere
 * (dev and previews, so units never get test leads). The group site keeps
 * today's CONTACT_EMAIL → RESEND_TO chain so the live inbox does not change.
 */
export function leadEmailRecipient(site: SiteConfig): string {
  const override = process.env.LEAD_EMAIL_OVERRIDE?.trim();
  if (override) return override;
  if (site.key === "group") {
    return (
      process.env.CONTACT_EMAIL?.trim() ||
      process.env.RESEND_TO?.trim() ||
      site.leadEmail
    );
  }
  return site.leadEmail;
}

/** Reference shown to the customer: first 8 characters of the lead id. */
export function leadReference(leadId: string): string {
  return leadId.slice(0, 8).toUpperCase();
}

/** A request-body value as a trimmed string ("" for anything else). */
export function str(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
}

/** One plain address; anything that could name several recipients is rejected. */
export function isEmailAddress(value: string): boolean {
  return /^[^\s@<>,;"]+@[^\s@<>,;"]+\.[^\s@<>,;"]+$/.test(value);
}

/** 503 when the database is not configured; points at the site's own WhatsApp and phone. */
export function serviceUnavailableResponse(site: SiteConfig) {
  return NextResponse.json(
    {
      error: "Service temporarily unavailable.",
      message: "Please contact us directly via WhatsApp or phone.",
      whatsapp: `https://wa.me/${site.contact.whatsapp.replace(/\D/g, "")}`,
      phone: site.contact.phone,
    },
    { status: 503 }
  );
}

function oneLine(text: string): string {
  return text.replace(/[\r\n]+/g, " ").trim();
}

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

/**
 * Lead notification to the site's inbox, plus a confirmation to the customer
 * when they gave an email address. Needs RESEND_API_KEY; without it nothing is
 * sent. Never throws: a failed email must not fail the enquiry.
 */
export async function sendLeadEmails(opts: {
  site: SiteConfig;
  leadId: string;
  subject: string;
  html: string;
  customer: { name: string; email: string };
  reply: {
    kind: "quote" | "enquiry";
    details: [label: string, value: string][];
  };
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const { site, leadId, customer } = opts;
  const resend = new Resend(apiKey);
  const from =
    process.env.RESEND_FROM ?? `${site.name} Website <onboarding@resend.dev>`;
  const inbox = leadEmailRecipient(site);
  const customerEmail = isEmailAddress(customer.email) ? customer.email : null;

  const notify = async () => {
    try {
      const { error } = await resend.emails.send({
        from,
        to: inbox,
        replyTo: customerEmail ?? undefined,
        subject: oneLine(opts.subject),
        html: opts.html,
      });
      if (error) {
        console.error("Lead email failed (non-critical):", leadId, error.message);
      }
    } catch (err) {
      console.error("Lead email failed (non-critical):", leadId, errorMessage(err));
    }
  };

  const confirm = async () => {
    if (!customerEmail) return;
    try {
      const reply = buildCustomerReplyEmail(site, {
        name: customer.name,
        reference: leadReference(leadId),
        ...opts.reply,
      });
      const { error } = await resend.emails.send({
        from,
        to: customerEmail,
        replyTo: inbox,
        subject: oneLine(reply.subject),
        html: reply.html,
        text: reply.text,
      });
      if (error) {
        console.error("Auto-reply failed (non-critical):", leadId, error.message);
      }
    } catch (err) {
      console.error("Auto-reply failed (non-critical):", leadId, errorMessage(err));
    }
  };

  await Promise.all([notify(), confirm()]);
}
