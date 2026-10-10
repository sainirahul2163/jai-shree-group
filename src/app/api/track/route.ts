import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

import { siteFromRequest, unknownSiteResponse } from "@/lib/site-from-request";

export async function POST(request: Request) {
  try {
    const site = await siteFromRequest();
    if (!site) return unknownSiteResponse();

    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      return NextResponse.json({ success: true });
    }

    const { page, product, city } = await request.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { error } = await supabase.from("page_views").insert({
      site: site.key,
      page: page ?? "/",
      product: product ?? null,
      city: city ?? null,
      referrer: request.headers.get("referer"),
    });

    if (error) {
      console.error("Page view insert error:", error.message);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Track API error:", err instanceof Error ? err.message : err);
    return NextResponse.json({ success: false });
  }
}
