"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FileText,
  Image,
  LayoutDashboard,
  LogOut,
  Settings,
  Star,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { signOutAdmin } from "@/lib/supabase/actions";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/gallery", label: "Gallery", icon: Image },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar({ email }: { email?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await signOutAdmin();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside
      className="flex w-64 shrink-0 flex-col border-r"
      style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}
    >
      <div className="border-b p-6" style={{ borderColor: "#2A2A2A" }}>
        <p className="text-lg font-black" style={{ color: "#FFFFFF" }}>
          Jai Shree Group
        </p>
        <p className="text-xs" style={{ color: "#666666" }}>
          Admin Portal
        </p>
        {email && (
          <p className="mt-2 truncate text-xs" style={{ color: "#A0A0A0" }}>
            {email}
          </p>
        )}
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-[#1A1A1A]" : "hover:bg-[#1A1A1A]"
              )}
              style={{ color: active ? "#E8521A" : "#A0A0A0" }}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4" style={{ borderColor: "#2A2A2A" }}>
        <Button
          variant="outline"
          className="w-full border-red-900/50 bg-transparent text-red-400 hover:bg-red-950/30"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 size-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
