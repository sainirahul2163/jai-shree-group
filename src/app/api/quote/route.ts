import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

import { parseDrawingRefs } from "@/lib/drawings";
import { buildQuoteEmailHtml, productNames, whatsappUrl } from "@/lib/email";
import {
  leadReference,
  sendLeadEmails,
  serviceUnavailableResponse,
  str,
} from "@/lib/leads";
import { siteFromRequest, unknownSiteResponse } from "@/lib/site-from-request";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export async function POST(request: Request) {
  try {
    const site = await siteFromRequest();
    if (!site) return unknownSiteResponse();

    if (!isSupabaseConfigured() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return serviceUnavailableResponse(site);
    }

    const raw: unknown = await request.json();
    const body = (raw && typeof raw === "object" ? raw : {}) as Record<
      string,
      unknown
    >;

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const name = str(body.name);
    const phone = str(body.phone);
    const email = str(body.email);
    const companyName = str(body.companyName);
    const city = str(body.city);
    const material = str(body.material);
    const thickness = str(body.thickness);
    const quantity = str(body.quantity);
    const quantityUnit = str(body.quantityUnit);
    const deadline = str(body.deadline);
    const additionalRequirements = str(body.additionalRequirements);
    const customComponentNote = str(body.customComponentNote);
    const sendWhatsApp = body.sendWhatsApp === true;
    // Drawings uploaded through /api/drawings/sign (only paths of this site).
    const drawings = site.tool === "drawing-upload" ? parseDrawingRefs(body.drawings, site.key) : [];

    const productsSelected = Array.isArray(body.products)
      ? body.products.map(str).filter(Boolean)
      : [];
    const quantityLabel =
      quantity && quantityUnit ? `${quantity} ${quantityUnit}` : quantity || null;
    const sourcePage =
      request.headers.get("referer")?.split("?")[0] ?? "/get-quote";

    const { data, error } = await supabase
      .from("leads")
      .insert({
        site: site.key,
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
          ...(drawings.length ? { drawings } : {}),
        },
        source: drawings.length ? "drawing_upload" : "quote_form",
        source_page: sourcePage,
        status: "new",
      })
      .select("id")
      .single();

    if (error || !data) {
      console.error("Supabase insert error:", error?.message);
      return NextResponse.json(
        { success: false, error: error?.message ?? "Insert failed" },
        { status: 500 }
      );
    }

    const leadId: string = data.id;
    console.info("Lead saved:", leadId, site.key);

    await sendLeadEmails({
      site,
      leadId,
      subject: `${site.name}: quote request from ${name || "Unknown"}`,
      html: buildQuoteEmailHtml(
        { site, page: sourcePage, leadId },
        {
          products: productsSelected,
          material,
          thickness,
          quantity: quantityLabel ?? "",
          deadline,
          additionalRequirements,
          customComponentNote,
          drawings: drawings.map((drawing) => drawing.name),
          name,
          companyName,
          phone,
          email,
          city,
          sendWhatsApp,
        }
      ),
      customer: { name: name || "Customer", email },
      reply: {
        kind: "quote",
        details: [
          ["Products", productNames(productsSelected).join(", ")],
          ["Material", material],
          ["Thickness", thickness],
          ["Quantity", quantityLabel ?? ""],
          ["Deadline", deadline.charAt(0).toUpperCase() + deadline.slice(1)],
          ["Additional requirements", additionalRequirements],
          ["Custom component note", customComponentNote],
          ["Drawings", drawings.map((drawing) => drawing.name).join(", ")],
        ],
      },
    });

    const waMessage = `Hi, I need a quote for: ${productsSelected.join(", ")}. Material: ${material}, Thickness: ${thickness}. Contact: ${name}, ${phone}`;

    return NextResponse.json({
      success: true,
      leadId,
      reference: leadReference(leadId),
      whatsappUrl: sendWhatsApp
        ? whatsappUrl(site.contact.whatsapp, waMessage)
        : undefined,
    });
  } catch (err) {
    console.error("API route error:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
