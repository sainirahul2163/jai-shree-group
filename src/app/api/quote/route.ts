import { NextResponse } from "next/server";
import { Resend } from "resend";

import { buildQuoteEmailHtml, whatsappUrl } from "@/lib/email";
import { COMPANY } from "@/lib/constants";
import { quoteFormSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = quoteFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const contactEmail =
      process.env.CONTACT_EMAIL ?? process.env.RESEND_TO ?? COMPANY.email;
    const resendKey = process.env.RESEND_API_KEY;

    if (resendKey) {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from:
          process.env.RESEND_FROM ??
          "Jai Shree Group <onboarding@resend.dev>",
        to: contactEmail,
        replyTo: data.email,
        subject: `Quote Request — ${data.name} — ${data.products.join(", ")}`,
        html: buildQuoteEmailHtml(data),
      });
    }

    const waMessage = `Hi, I need a quote for: ${data.products.join(", ")}. Material: ${data.material}, Thickness: ${data.thickness}. Contact: ${data.name}, ${data.phone}`;
    return NextResponse.json({
      success: true,
      whatsappUrl: data.sendWhatsApp
        ? whatsappUrl(COMPANY.whatsapp, waMessage)
        : undefined,
    });
  } catch (error) {
    console.error("Quote API error:", error);
    return NextResponse.json(
      { error: "Failed to submit quote request. Please contact us directly." },
      { status: 500 }
    );
  }
}
