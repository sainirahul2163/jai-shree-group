import { TestimonialsAdminClient } from "@/components/admin/TestimonialsAdminClient";
import { createServerClient } from "@/lib/supabase/server";
import { parseSiteFilter } from "@/sites/names";

export const metadata = {
  title: "Testimonials | Admin | Jai Shree Group",
};

export default async function AdminTestimonialsPage({
  searchParams,
}: {
  searchParams: Promise<{ site?: string }>;
}) {
  const site = parseSiteFilter((await searchParams).site);
  const supabase = await createServerClient();
  let query = supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });
  if (site) query = query.eq("site", site);
  const { data: testimonials } = await query;

  return <TestimonialsAdminClient testimonials={testimonials ?? []} site={site} />;
}
