import { TestimonialsAdminClient } from "@/components/admin/TestimonialsAdminClient";
import { createServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Testimonials | Admin | Jai Shree Group",
};

export default async function AdminTestimonialsPage() {
  const supabase = await createServerClient();
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  return <TestimonialsAdminClient testimonials={testimonials ?? []} />;
}
