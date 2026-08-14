import { MessageCircle, Phone } from "lucide-react";

import { toWhatsAppNumber } from "@/lib/phone";

/**
 * WhatsApp and call shortcuts for a lead. Plain anchors, so they work on the
 * client's phone as well as the desktop — tapping through to WhatsApp is how
 * these enquiries actually get answered.
 */
export function LeadQuickContact({
  phone,
  name,
  size = "sm",
}: {
  phone: string;
  name: string;
  size?: "sm" | "md";
}) {
  const wa = toWhatsAppNumber(phone);
  const greeting = encodeURIComponent(
    `Hello ${name.split(" ")[0]}, this is Jai Shree Group regarding your enquiry.`
  );
  const box = size === "sm" ? "size-8" : "size-10";
  const icon = size === "sm" ? "size-4" : "size-5";

  return (
    <div className="flex items-center gap-1.5">
      <a
        href={`https://wa.me/${wa}?text=${greeting}`}
        target="_blank"
        rel="noopener noreferrer"
        title={`WhatsApp ${name}`}
        aria-label={`WhatsApp ${name}`}
        className={`flex ${box} items-center justify-center rounded-lg transition-opacity hover:opacity-80`}
        style={{ backgroundColor: "rgba(37,211,102,0.15)", color: "#25D366" }}
      >
        <MessageCircle className={icon} />
      </a>
      <a
        href={`tel:${phone}`}
        title={`Call ${name}`}
        aria-label={`Call ${name}`}
        className={`flex ${box} items-center justify-center rounded-lg border transition-colors hover:border-[#E8521A]`}
        style={{ borderColor: "#2A2A2A", color: "#A0A0A0" }}
      >
        <Phone className={icon} />
      </a>
    </div>
  );
}
