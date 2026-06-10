"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  FileText,
  Image,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Star,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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

function NavLinks({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
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
    </>
  );
}

function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();

  async function handleLogout() {
    await signOutAdmin();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <Button
      variant="outline"
      className={cn(
        "w-full border-red-900/50 bg-transparent text-red-400 hover:bg-red-950/30",
        className
      )}
      onClick={handleLogout}
    >
      <LogOut className="mr-2 size-4" />
      Logout
    </Button>
  );
}

export function AdminShell({
  email,
  children,
}: {
  email?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div
      className="flex min-h-screen flex-col lg:flex-row"
      style={{ backgroundColor: "#0A0A0A", color: "#FFFFFF" }}
    >
      <aside
        className="hidden w-64 shrink-0 flex-col border-r lg:flex"
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
          <NavLinks pathname={pathname} />
        </nav>

        <div className="border-t p-4" style={{ borderColor: "#2A2A2A" }}>
          <LogoutButton />
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header
          className="flex h-16 items-center justify-between border-b px-4 lg:px-8"
          style={{ borderColor: "#2A2A2A", backgroundColor: "#111111" }}
        >
          <div className="flex items-center gap-3">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden hover:bg-[#1A1A1A]"
                  aria-label="Open admin menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-72 border p-0"
                style={{
                  backgroundColor: "#111111",
                  borderColor: "#2A2A2A",
                }}
              >
                <SheetHeader className="border-b p-6" style={{ borderColor: "#2A2A2A" }}>
                  <SheetTitle className="text-left text-lg font-black">
                    Admin Menu
                  </SheetTitle>
                  {email && (
                    <p className="truncate text-left text-xs" style={{ color: "#A0A0A0" }}>
                      {email}
                    </p>
                  )}
                </SheetHeader>
                <nav className="space-y-1 p-4">
                  <NavLinks
                    pathname={pathname}
                    onNavigate={() => setMobileOpen(false)}
                  />
                </nav>
                <div className="border-t p-4" style={{ borderColor: "#2A2A2A" }}>
                  <LogoutButton />
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="text-sm font-semibold" style={{ color: "#A0A0A0" }}>
              Jai Shree Group Admin
            </h1>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
