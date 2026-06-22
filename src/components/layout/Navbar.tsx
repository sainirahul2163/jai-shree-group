"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight, Download, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/Logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BROCHURE_URL, NAV_LINKS, PRODUCTS } from "@/lib/constants";
import { getProductIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

function NavLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "nav-link-underline relative px-3 py-2 text-[15px] font-medium transition-colors hover:opacity-80",
        className
      )}
      style={{ color: "#FFFFFF" }}
    >
      {children}
    </Link>
  );
}

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b backdrop-blur-md" : "bg-transparent"
      )}
      style={
        scrolled
          ? {
              backgroundColor: "rgba(10, 10, 10, 0.95)",
              borderColor: "#2A2A2A",
            }
          : undefined
      }
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-8 lg:px-16">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>

          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="nav-link-underline h-auto bg-transparent px-3 py-2 text-[15px] font-medium hover:bg-transparent data-open:bg-transparent"
                  style={{ color: "#FFFFFF" }}
                >
                  Products
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div
                    className="w-[640px] rounded-xl border p-4 shadow-2xl"
                    style={{
                      backgroundColor: "#111111",
                      borderColor: "#2A2A2A",
                      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <div className="mb-3 flex items-center justify-between px-2">
                      <p
                        className="text-xs font-semibold uppercase tracking-widest"
                        style={{ color: "#666666" }}
                      >
                        Our Products
                      </p>
                      <Link
                        href="/products"
                        className="text-xs font-semibold hover:underline"
                        style={{ color: "#E8521A" }}
                      >
                        View All →
                      </Link>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      {PRODUCTS.map((product) => {
                        const Icon = getProductIcon(product.icon);
                        return (
                          <NavigationMenuLink key={product.slug} asChild>
                            <Link
                              href={`/products/${product.slug}`}
                              className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-[#1A1A1A]"
                            >
                              <div
                                className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors group-hover:text-white"
                                style={{
                                  backgroundColor: "rgba(232, 82, 26, 0.1)",
                                  color: "#E8521A",
                                }}
                              >
                                <Icon className="size-4" />
                              </div>
                              <div>
                                <p
                                  className="text-sm font-semibold"
                                  style={{ color: "#FFFFFF" }}
                                >
                                  {product.name}
                                </p>
                                <p
                                  className="mt-0.5 line-clamp-2 text-xs"
                                  style={{ color: "#666666" }}
                                >
                                  {product.description}
                                </p>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        );
                      })}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {NAV_LINKS.slice(2).map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-10 bg-transparent px-4 font-semibold hover:bg-[#1A1A1A]"
            style={{
              borderColor: "#2A2A2A",
              color: "#FFFFFF",
            }}
          >
            <a
              href={BROCHURE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="size-4" />
              Catalogue
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            className="glow-orange-hover h-10 border-0 px-5 font-semibold hover:opacity-90"
            style={{ backgroundColor: "#E8521A", color: "#FFFFFF" }}
          >
            <Link href="/get-quote">
              Get Quote
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button
              variant="ghost"
              size="icon-lg"
              className="hover:bg-[#1A1A1A]"
              style={{ color: "#FFFFFF" }}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full max-w-sm border p-0 sm:max-w-sm"
            style={{
              backgroundColor: "#0A0A0A",
              borderColor: "#2A2A2A",
            }}
          >
            <SheetHeader
              className="border-b p-6"
              style={{ borderColor: "#2A2A2A" }}
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <Logo />
            </SheetHeader>

            <div className="flex flex-col overflow-y-auto p-6">
              <div className="flex flex-col gap-1">
                <NavLink
                  href="/"
                  className="rounded-lg px-4 py-3 hover:bg-[#1A1A1A]"
                  onClick={() => setMobileOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  href="/about"
                  className="rounded-lg px-4 py-3 hover:bg-[#1A1A1A]"
                  onClick={() => setMobileOpen(false)}
                >
                  About
                </NavLink>
              </div>

              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between px-4">
                  <p
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "#666666" }}
                  >
                    Products
                  </p>
                  <Link
                    href="/products"
                    onClick={() => setMobileOpen(false)}
                    className="text-xs font-semibold"
                    style={{ color: "#E8521A" }}
                  >
                    View All
                  </Link>
                </div>
                <div className="flex flex-col gap-1">
                  {PRODUCTS.map((product) => {
                    const Icon = getProductIcon(product.icon);
                    return (
                      <Link
                        key={product.slug}
                        href={`/products/${product.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-[#1A1A1A]"
                      >
                        <Icon className="size-4" style={{ color: "#E8521A" }} />
                        <span
                          className="text-sm font-medium"
                          style={{ color: "#FFFFFF" }}
                        >
                          {product.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-1">
                {NAV_LINKS.slice(2).map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-4 py-3 hover:bg-[#1A1A1A]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 w-full bg-transparent font-semibold hover:bg-[#1A1A1A]"
                  style={{
                    borderColor: "#2A2A2A",
                    color: "#FFFFFF",
                  }}
                >
                  <a
                    href={BROCHURE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Download className="size-4" />
                    Catalogue
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="glow-orange h-12 w-full border-0 font-semibold"
                  style={{ backgroundColor: "#E8521A", color: "#FFFFFF" }}
                >
                  <Link href="/get-quote" onClick={() => setMobileOpen(false)}>
                    Get Quote
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
