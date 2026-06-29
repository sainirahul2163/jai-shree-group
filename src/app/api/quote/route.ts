import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { Resend } from "resend";

import { whatsappUrl } from "@/lib/email";
import { COMPANY } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Quote form received:", body);

    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      console.error("Missing Supabase environment variables");
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const {
      name,
      phone,
      email,
      companyName,
      city,
      products,
      material,
      thickness,
      quantity,
      quantityUnit,
      deadline,
      additionalRequirements,
      customComponentNote,
      sendWhatsApp,
    } = body;

    const productsSelected = Array.isArray(products) ? products : [];
    const quantityLabel =
      quantity && quantityUnit ? `${quantity} ${quantityUnit}` : quantity || null;

    const { data, error } = await supabase
      .from("leads")
      .insert({
        name: name || "Unknown",
        phone: phone || "Unknown",
        email: email || null,
        company: companyName || null,
        city: city || null,
        products_selected: productsSelected,
        material: material || null,
        thickness: thickness || null,
        size: null,
        quantity: quantityLabel,
        deadline: deadline || null,
        message: additionalRequirements || null,
        specifications: {
          products: productsSelected,
          material,
          thickness,
          quantity,
          quantityUnit,
          deadline,
          custom_component_note: customComponentNote || null,
        },
        source: "quote_form",
        source_page:
          request.headers.get("referer")?.split("?")[0] ?? "/get-quote",
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
          subject: `Quote Request from ${name}`,
          html: `
            <h2>New Quote Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email || "Not provided"}</p>
            <p><strong>Company:</strong> ${companyName || "Not provided"}</p>
            <p><strong>City:</strong> ${city || "Not provided"}</p>
            <p><strong>Products:</strong> ${productsSelected.join(", ") || "Not specified"}</p>
            <p><strong>Material:</strong> ${material || "Not specified"}</p>
            <p><strong>Thickness:</strong> ${thickness || "Not specified"}</p>
            <p><strong>Quantity:</strong> ${quantityLabel || "Not specified"}</p>
            <p><strong>Deadline:</strong> ${deadline || "Not specified"}</p>
            <p><strong>Additional requirements:</strong> ${additionalRequirements || "None"}</p>
            <p><strong>Custom component note:</strong> ${customComponentNote || "None"}</p>
            <p><strong>Lead ID:</strong> ${data?.[0]?.id ?? "N/A"}</p>
          `,
        });
      }
    } catch (emailErr) {
      console.error("Email failed (non-critical):", emailErr);
    }

    const waNumber =
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? COMPANY.whatsapp;
    const waMessage = `Hi, I need a quote for: ${productsSelected.join(", ")}. Material: ${material}, Thickness: ${thickness}. Contact: ${name}, ${phone}`;

    return NextResponse.json({
      success: true,
      leadId: data?.[0]?.id,
      whatsappUrl: sendWhatsApp
        ? whatsappUrl(waNumber, waMessage)
        : undefined,
    });
  } catch (err) {
    console.error("API route error:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
