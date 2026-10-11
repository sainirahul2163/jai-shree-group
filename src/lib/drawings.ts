// Customer drawings for the drawing-upload quote (Jai Shree Metal Perforators).
// Files go to the PRIVATE Supabase bucket "drawings" through one-time signed
// upload URLs (the browser uploads straight to storage, so Vercel's request
// size limit does not apply). Only the admin panel opens them, via signed URLs.

export const DRAWINGS_BUCKET = "drawings";
export const MAX_DRAWING_FILES = 5;
export const MAX_DRAWING_BYTES = 20 * 1024 * 1024;
export const DRAWING_EXTENSIONS = ["dxf", "dwg", "pdf"] as const;
/** For the file input's `accept`. */
export const DRAWING_ACCEPT = DRAWING_EXTENSIONS.map((ext) => `.${ext}`).join(",");

export type DrawingRef = { path: string; name: string; size: number };

function extension(name: string): string {
  return name.split(".").pop()?.toLowerCase() ?? "";
}

/** Why a file cannot be uploaded, or null when it can. */
export function drawingFileError(name: string, size: number): string | null {
  if (!(DRAWING_EXTENSIONS as readonly string[]).includes(extension(name))) {
    return `${name}: only DXF, DWG or PDF files`;
  }
  if (!(size > 0) || size > MAX_DRAWING_BYTES) {
    return `${name}: files must be under 20 MB`;
  }
  return null;
}

/** Storage path for a new upload: <site>/<random id>/<cleaned file name>. */
export function newDrawingPath(siteKey: string, name: string): string {
  const base = name
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `${siteKey}/${crypto.randomUUID()}/${base || "drawing"}.${extension(name)}`;
}

const PATH_PATTERN =
  /^([a-z-]+)\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/[A-Za-z0-9-_]+\.(dxf|dwg|pdf)$/;

/** Drawing references from a request body, kept only if they belong to this site. */
export function parseDrawingRefs(value: unknown, siteKey: string): DrawingRef[] {
  if (!Array.isArray(value)) return [];
  return value
    .flatMap((item): DrawingRef[] => {
      if (!item || typeof item !== "object") return [];
      const { path, name, size } = item as Record<string, unknown>;
      if (typeof path !== "string" || typeof name !== "string") return [];
      const match = PATH_PATTERN.exec(path);
      if (!match || match[1] !== siteKey) return [];
      return [{ path, name: name.slice(0, 120), size: typeof size === "number" ? size : 0 }];
    })
    .slice(0, MAX_DRAWING_FILES);
}
