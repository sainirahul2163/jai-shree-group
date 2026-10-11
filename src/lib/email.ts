import { PRODUCTS } from "@/lib/constants";
import type { SiteConfig } from "@/sites/types";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function siteHost(site: SiteConfig): string {
  return site.origin.replace(/^https?:\/\/(www\.)?/, "");
}

function baseTemplate(site: SiteConfig, title: string, body: string): string {
  const { theme, contact } = site;
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${escapeHtml(title)}</title></head>
<body style="font-family: Arial, sans-serif; background:#f5f5f5; padding:24px;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e5e5;">
    <div style="background:${theme.brand};padding:20px 24px;">
      <h1 style="margin:0;color:${theme.brandForeground};font-size:20px;">${escapeHtml(site.name)}</h1>
      <p style="margin:8px 0 0;color:${theme.brandForeground};opacity:0.85;font-size:14px;">${escapeHtml(title)}</p>
    </div>
    <div style="padding:24px;color:#333333;font-size:15px;line-height:1.6;">
      ${body}
    </div>
    <div style="padding:16px 24px;background:#fafafa;border-top:1px solid #e5e5e5;color:#888;font-size:12px;">
      Sent from ${escapeHtml(siteHost(site))} · ${escapeHtml(contact.phone)} · ${escapeHtml(contact.email)}
    </div>
  </div>
</body>
</html>`;
}

function fieldRow(label: string, value: string): string {
  return `<p style="margin:0 0 12px;"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value || "—")}</p>`;
}

const DIVIDER = "<hr style='border:none;border-top:1px solid #eee;margin:16px 0;' />";

/** Product slugs from the quote form → product names (unknown slugs stay as sent). */
export function productNames(slugs: string[]): string[] {
  return slugs.map(
    (slug) => PRODUCTS.find((p) => p.slug === slug)?.name ?? slug
  );
}

/** Where a lead came from; shown at the top of every lead notification. */
export type LeadEmailMeta = {
  site: SiteConfig;
  page: string;
  leadId: string;
};

function metaRows(meta: LeadEmailMeta): string {
  return [
    fieldRow("Site", meta.site.key),
    fieldRow("Page", meta.page),
    fieldRow("Lead ID", meta.leadId),
    DIVIDER,
  ].join("");
}

export function buildContactEmailHtml(
  meta: LeadEmailMeta,
  data: {
    name: string;
    companyName: string;
    phone: string;
    email: string;
    productInterest: string;
    message: string;
  }
): string {
  const body = [
    metaRows(meta),
    fieldRow("Name", data.name),
    fieldRow("Company", data.companyName),
    fieldRow("Phone", data.phone),
    fieldRow("Email", data.email),
    fieldRow("Product Interest", data.productInterest),
    fieldRow("Message", data.message),
  ].join("");

  return baseTemplate(meta.site, "New Contact Enquiry", body);
}

export function buildQuoteEmailHtml(
  meta: LeadEmailMeta,
  data: {
    products: string[];
    material: string;
    thickness: string;
    quantity: string;
    deadline: string;
    additionalRequirements: string;
    customComponentNote: string;
    name: string;
    companyName: string;
    phone: string;
    email: string;
    city: string;
    sendWhatsApp: boolean;
  }
): string {
  const body = [
    metaRows(meta),
    fieldRow("Products", productNames(data.products).join(", ")),
    fieldRow("Material", data.material),
    fieldRow("Thickness", data.thickness),
    fieldRow("Quantity", data.quantity),
    fieldRow("Deadline", data.deadline),
    fieldRow("Additional Requirements", data.additionalRequirements),
    fieldRow("Custom Component Note", data.customComponentNote),
    DIVIDER,
    fieldRow("Name", data.name),
    fieldRow("Company", data.companyName),
    fieldRow("Phone", data.phone),
    fieldRow("Email", data.email),
    fieldRow("City", data.city),
    fieldRow("WhatsApp Copy", data.sendWhatsApp ? "Yes" : "No"),
  ].join("");

  return baseTemplate(meta.site, "Get Quote Form Submission", body);
}

/** "919370606017" → "+91 93706 06017". */
export function formatWhatsAppNumber(digits: string): string {
  const d = digits.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) {
    return `+91 ${d.slice(2, 7)} ${d.slice(7)}`;
  }
  return `+${d}`;
}

/**
 * Confirmation sent to the customer. Plain facts only: what we received, the
 * reference, and the site's own contact details and weekly holiday.
 */
export function buildCustomerReplyEmail(
  site: SiteConfig,
  data: {
    name: string;
    reference: string;
    kind: "quote" | "enquiry";
    details: [label: string, value: string][];
  }
): { subject: string; html: string; text: string } {
  const what = data.kind === "quote" ? "quote request" : "enquiry";
  const title = `We received your ${what}`;
  const { contact } = site;
  const whatsapp = formatWhatsAppNumber(contact.whatsapp);
  const details = data.details.filter(([, value]) => value.trim() !== "");
  const contactRows: [string, string][] = [
    ["Phone", contact.phone],
    ["WhatsApp", whatsapp],
    ["Email", contact.email],
    ["Weekly holiday", contact.weeklyHoliday],
  ];

  const html = baseTemplate(
    site,
    title,
    [
      `<p style="margin:0 0 12px;">Dear ${escapeHtml(data.name)},</p>`,
      `<p style="margin:0 0 12px;">Thank you for contacting ${escapeHtml(site.name)}. We have received your ${what}.</p>`,
      `<p style="margin:0 0 16px;"><strong>Your reference: ${escapeHtml(data.reference)}</strong><br />Please mention this reference when you contact us about this ${what}.</p>`,
      details.length
        ? `<p style="margin:0 0 8px;"><strong>What you asked for</strong></p>${details
            .map(([label, value]) => fieldRow(label, value))
            .join("")}`
        : "",
      DIVIDER,
      `<p style="margin:0 0 8px;"><strong>Contact ${escapeHtml(site.name)}</strong></p>`,
      contactRows.map(([label, value]) => fieldRow(label, value)).join(""),
    ].join("")
  );

  const text = [
    `Dear ${data.name},`,
    "",
    `Thank you for contacting ${site.name}. We have received your ${what}.`,
    "",
    `Your reference: ${data.reference}`,
    `Please mention this reference when you contact us about this ${what}.`,
    ...(details.length
      ? ["", "What you asked for:", ...details.map(([l, v]) => `${l}: ${v}`)]
      : []),
    "",
    `Contact ${site.name}:`,
    ...contactRows.map(([l, v]) => `${l}: ${v}`),
    "",
    siteHost(site),
  ].join("\n");

  return {
    subject: `${site.name}: we received your ${what} (ref ${data.reference})`,
    html,
    text,
  };
}

export function whatsappUrl(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
