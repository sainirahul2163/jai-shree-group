import { redirect } from "next/navigation";

import { isAdminEmail } from "@/lib/admin";
import { createServerClient } from "@/lib/supabase/server";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Server-side gate: only allow-listed admins render the panel.
  if (!isAdminEmail(user?.email)) {
    redirect("/admin/login");
  }

  return <AdminShell email={user?.email}>{children}</AdminShell>;
}
