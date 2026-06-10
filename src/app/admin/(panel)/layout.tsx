import { createServerClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div
      className="flex min-h-screen"
      style={{ backgroundColor: "#0A0A0A", color: "#FFFFFF" }}
    >
      <AdminSidebar email={user?.email} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header
          className="flex h-16 items-center border-b px-8"
          style={{ borderColor: "#2A2A2A", backgroundColor: "#111111" }}
        >
          <h1 className="text-sm font-semibold" style={{ color: "#A0A0A0" }}>
            Jai Shree Group Admin
          </h1>
        </header>
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
