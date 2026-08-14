/**
 * Indian numbers arrive from the forms in a mix of shapes: "+91 98765 43210",
 * "098765 43210", "9876543210". wa.me needs bare digits with the country code,
 * so normalise once here rather than in every place that links to WhatsApp.
 */
export function toWhatsAppNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("91")) return digits;
  return `91${digits.replace(/^0/, "")}`;
}

/** Days since a timestamp, floored. Used to age leads on the dashboard. */
export function daysSince(iso: string): number {
  const ms = Date.now() - new Date(iso).getTime();
  return Math.max(0, Math.floor(ms / 86_400_000));
}
