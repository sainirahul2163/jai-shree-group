import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { Resend } from "resend";

import { whatsappUrl } from "@/lib/email";
import { COMPANY } from "@/lib/constants";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export async function POST(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        {
          error: "Service temporarily unavailable.",
          message: "Please contact us directly via WhatsApp or phone.",
          whatsapp: "https://wa.me/919370606017",
          phone: "+91 9370606017",
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    console.log("Contact form received:", body);

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        {
          error: "Service temporarily unavailable.",
          message: "Please contact us directly via WhatsApp or phone.",
          whatsapp: "https://wa.me/919370606017",
          phone: "+91 9370606017",
        },
        { status: 503 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { name, phone, email, companyName, productInterest, message } = body;

    const { data, error } = await supabase
      .from("leads")
      .insert({
        name: name || "Unknown",
        phone: phone || "Unknown",
        email: email || null,
        company: companyName || null,
        product_interest: productInterest || null,
        message: message || null,
        source: "contact_form",
        source_page:
          request.headers.get("referer")?.split("?")[0] ?? "/contact",
        status: "new",
      })
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    console.log("Lead saved:", data);

    try {
      if (process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from:
            process.env.RESEND_FROM ??
            "Jai Shree Group Website <onboarding@resend.dev>",
          to:
            process.env.CONTACT_EMAIL ??
            process.env.RESEND_TO ??
            COMPANY.email,
          replyTo: email || undefined,
          subject: `New Enquiry from ${name}`,
          html: `
            <h2>New Contact Enquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email || "Not provided"}</p>
            <p><strong>Company:</strong> ${companyName || "Not provided"}</p>
            <p><strong>Product:</strong> ${productInterest || "Not specified"}</p>
            <p><strong>Message:</strong> ${message}</p>
            <p><strong>Lead ID:</strong> ${data?.[0]?.id ?? "N/A"}</p>
          `,
        });
      }
    } catch (emailErr) {
      console.error("Email failed (non-critical):", emailErr);
    }

    const waNumber =
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? COMPANY.whatsapp;
    const waMessage = `Hi, I'm ${name}. Product: ${productInterest}. ${message}`;

    return NextResponse.json({
      success: true,
      leadId: data?.[0]?.id,
      whatsappUrl: whatsappUrl(waNumber, waMessage),
    });
  } catch (err) {
    console.error("API route error:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
