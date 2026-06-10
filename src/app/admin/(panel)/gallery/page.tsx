import { GalleryAdminClient } from "@/components/admin/GalleryAdminClient";
import { createServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Gallery | Admin | Jai Shree Group",
};

export default async function AdminGalleryPage() {
  const supabase = await createServerClient();
  const { data: items } = await supabase
    .from("gallery_items")
    .select("*")
    .order("sort_order", { ascending: true });

  return <GalleryAdminClient items={items ?? []} />;
}
