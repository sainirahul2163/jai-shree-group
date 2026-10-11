import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

import {
  DRAWINGS_BUCKET,
  drawingFileError,
  MAX_DRAWING_FILES,
  newDrawingPath,
} from "@/lib/drawings";
import { serviceUnavailableResponse } from "@/lib/leads";
import { siteFromRequest, unknownSiteResponse } from "@/lib/site-from-request";
import { isSupabaseConfigured } from "@/lib/supabase/env";

/**
 * One-time signed upload URLs for drawing files. Only sites whose tool is the
 * drawing upload may ask; type and size are checked here and by the bucket.
 */
export async function POST(request: Request) {
  const site = await siteFromRequest();
  if (!site) return unknownSiteResponse();
  if (site.tool !== "drawing-upload") {
    return NextResponse.json({ success: false, error: "Not available" }, { status: 404 });
  }
  if (!isSupabaseConfigured() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return serviceUnavailableResponse(site);
  }

  const raw: unknown = await request.json().catch(() => null);
  const files = (raw as { files?: unknown } | null)?.files;
  if (!Array.isArray(files) || files.length === 0 || files.length > MAX_DRAWING_FILES) {
    return NextResponse.json(
      { success: false, error: `Attach 1 to ${MAX_DRAWING_FILES} files` },
      { status: 400 }
    );
  }

  const checked = files.map((file) => {
    const { name, size } = (file ?? {}) as { name?: unknown; size?: unknown };
    const fileName = typeof name === "string" ? name : "";
    const fileSize = typeof size === "number" ? size : 0;
    return { name: fileName, size: fileSize, error: drawingFileError(fileName, fileSize) };
  });
  const errors = checked.flatMap((file) => (file.error ? [file.error] : []));
  if (errors.length) {
    return NextResponse.json({ success: false, error: errors.join("; ") }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const uploads = [];
  for (const file of checked) {
    const path = newDrawingPath(site.key, file.name);
    const { data, error } = await supabase.storage
      .from(DRAWINGS_BUCKET)
      .createSignedUploadUrl(path);
    if (error || !data) {
      console.error("Drawing upload URL failed:", error?.message);
      return NextResponse.json({ success: false, error: "Upload not available" }, { status: 500 });
    }
    uploads.push({ path, token: data.token, name: file.name, size: file.size });
  }

  return NextResponse.json({ success: true, uploads });
}
