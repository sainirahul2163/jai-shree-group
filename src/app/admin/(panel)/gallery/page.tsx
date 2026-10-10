import { GalleryAdminClient } from "@/components/admin/GalleryAdminClient";
import { createServerClient } from "@/lib/supabase/server";
import { parseSiteFilter } from "@/sites/names";

export const metadata = {
  title: "Gallery | Admin | Jai Shree Group",
};

export default async function AdminGalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ site?: string }>;
}) {
  const site = parseSiteFilter((await searchParams).site);
  const supabase = await createServerClient();
  let query = supabase
    .from("gallery_items")
    .select("*")
    .order("sort_order", { ascending: true });
  if (site) query = query.eq("site", site);
  const { data: items } = await query;

  // Remount per filter so ticked photos from another site cannot stay selected.
  return (
    <GalleryAdminClient key={site ?? "all"} items={items ?? []} site={site} />
  );
}
