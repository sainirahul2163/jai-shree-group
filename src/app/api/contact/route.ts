import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

import { buildContactEmailHtml, whatsappUrl } from "@/lib/email";
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
    const productInterest = str(body.productInterest);
    const message = str(body.message);
    const sourcePage =
      request.headers.get("referer")?.split("?")[0] ?? "/contact";

    const { data, error } = await supabase
      .from("leads")
      .insert({
        site: site.key,
        name: name || "Unknown",
        phone: phone || "Unknown",
        email: email || null,
        company: companyName || null,
        product_interest: productInterest || null,
        message: message || null,
        source: "contact_form",
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
      subject: `${site.name}: new enquiry from ${name || "Unknown"}`,
      html: buildContactEmailHtml(
        { site, page: sourcePage, leadId },
        { name, companyName, phone, email, productInterest, message }
      ),
      customer: { name: name || "Customer", email },
      reply: {
        kind: "enquiry",
        details: [
          ["Product", productInterest],
          ["Message", message],
        ],
      },
    });

    const waMessage = `Hi, I'm ${name}. Product: ${productInterest}. ${message}`;

    return NextResponse.json({
      success: true,
      leadId,
      reference: leadReference(leadId),
      whatsappUrl: whatsappUrl(site.contact.whatsapp, waMessage),
    });
  } catch (err) {
    console.error("API route error:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
