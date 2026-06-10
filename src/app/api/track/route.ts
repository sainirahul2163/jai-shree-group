import { NextResponse } from "next/server";

import { createAnonClient } from "@/lib/supabase/anon";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export async function POST(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ success: true });
    }

    const { page, product, city } = await request.json();
    const supabase = createAnonClient();

    await supabase.from("page_views").insert({
      page: page ?? "/",
      product: product ?? null,
      city: city ?? null,
      referrer: request.headers.get("referer"),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false });
  }
}
