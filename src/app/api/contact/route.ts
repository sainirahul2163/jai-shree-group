import { NextResponse } from "next/server";
import { Resend } from "resend";

import { buildContactEmailHtml, whatsappUrl } from "@/lib/email";
import { COMPANY } from "@/lib/constants";
import { contactFormSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

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
        subject: `Contact Enquiry — ${data.name} — ${data.productInterest}`,
        html: buildContactEmailHtml(data),
      });
    }

    const waMessage = `Hi, I'm ${data.name}. Product: ${data.productInterest}. ${data.message}`;
    return NextResponse.json({
      success: true,
      whatsappUrl: whatsappUrl(COMPANY.whatsapp, waMessage),
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to send enquiry. Please try WhatsApp or call us directly." },
      { status: 500 }
    );
  }
}
