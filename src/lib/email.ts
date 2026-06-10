import { COMPANY } from "@/lib/constants";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function baseTemplate(title: string, body: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${escapeHtml(title)}</title></head>
<body style="font-family: Arial, sans-serif; background:#f5f5f5; padding:24px;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e5e5;">
    <div style="background:#E8521A;padding:20px 24px;">
      <h1 style="margin:0;color:#ffffff;font-size:20px;">${escapeHtml(COMPANY.name)}</h1>
      <p style="margin:8px 0 0;color:#ffe8de;font-size:14px;">${escapeHtml(title)}</p>
    </div>
    <div style="padding:24px;color:#333333;font-size:15px;line-height:1.6;">
      ${body}
    </div>
    <div style="padding:16px 24px;background:#fafafa;border-top:1px solid #e5e5e5;color:#888;font-size:12px;">
      Sent from jaishreegroup.in · ${escapeHtml(COMPANY.phone)} · ${escapeHtml(COMPANY.email)}
    </div>
  </div>
</body>
</html>`;
}

function fieldRow(label: string, value: string): string {
  return `<p style="margin:0 0 12px;"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value || "—")}</p>`;
}

export function buildContactEmailHtml(data: {
  name: string;
  companyName?: string;
  phone: string;
  email: string;
  productInterest: string;
  message: string;
}): string {
  const body = [
    fieldRow("Name", data.name),
    fieldRow("Company", data.companyName ?? ""),
    fieldRow("Phone", data.phone),
    fieldRow("Email", data.email),
    fieldRow("Product Interest", data.productInterest),
    fieldRow("Message", data.message),
  ].join("");

  return baseTemplate("New Contact Enquiry", body);
}

export function buildProductQuoteEmailHtml(data: {
  name: string;
  phone: string;
  email: string;
  product: string;
  message: string;
}): string {
  const body = [
    fieldRow("Name", data.name),
    fieldRow("Phone", data.phone),
    fieldRow("Email", data.email),
    fieldRow("Product", data.product),
    fieldRow("Requirements", data.message),
  ].join("");

  return baseTemplate("Product Quote Request", body);
}

export function buildQuoteEmailHtml(data: {
  products: string[];
  material: string;
  thickness: string;
  dimensions: string;
  quantity: string;
  quantityUnit: string;
  deadline: string;
  additionalRequirements?: string;
  name: string;
  companyName?: string;
  phone: string;
  email: string;
  city?: string;
  sendWhatsApp?: boolean;
}): string {
  const body = [
    fieldRow("Products", data.products.join(", ")),
    fieldRow("Material", data.material),
    fieldRow("Thickness", data.thickness),
    fieldRow("Dimensions", data.dimensions),
    fieldRow("Quantity", `${data.quantity} ${data.quantityUnit}`),
    fieldRow("Deadline", data.deadline),
    fieldRow("Additional Requirements", data.additionalRequirements ?? ""),
    "<hr style='border:none;border-top:1px solid #eee;margin:16px 0;' />",
    fieldRow("Name", data.name),
    fieldRow("Company", data.companyName ?? ""),
    fieldRow("Phone", data.phone),
    fieldRow("Email", data.email),
    fieldRow("City", data.city ?? ""),
    fieldRow("WhatsApp Copy", data.sendWhatsApp ? "Yes" : "No"),
  ].join("");

  return baseTemplate("Get Quote Form Submission", body);
}

export function whatsappUrl(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
