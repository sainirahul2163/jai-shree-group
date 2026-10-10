"use client";

import Image from "next/image";
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
import { cn } from "@/lib/utils";
import { useSite, useSiteProducts } from "@/sites/SiteProvider";

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
        className,
      )}
      style={{ color: "var(--foreground)" }}
    >
      {children}
    </Link>
  );
}

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const site = useSite();
  const products = useSiteProducts();

  // site.nav in order; the "/products" entry opens the products menu.
  const productsAt = site.nav.findIndex((link) => link.href === "/products");
  const linksBefore =
    productsAt === -1 ? site.nav : site.nav.slice(0, productsAt);
  const linksAfter = productsAt === -1 ? [] : site.nav.slice(productsAt + 1);

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
        scrolled ? "border-b backdrop-blur-md" : "bg-transparent",
      )}
      style={
        scrolled
          ? {
              backgroundColor:
                "color-mix(in srgb, var(--background) 95%, transparent)",
              borderColor: "var(--border)",
            }
          : undefined
      }
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-8 lg:px-16">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {linksBefore.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}

          {productsAt !== -1 && (
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="nav-link-underline h-auto bg-transparent px-3 py-2 text-[15px] font-medium hover:bg-transparent data-open:bg-transparent"
                    style={{ color: "var(--foreground)" }}
                  >
                    {site.nav[productsAt].label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div
                      className="w-[760px] rounded-xl border p-4 shadow-2xl"
                      style={{
                        backgroundColor: "var(--surface)",
                        borderColor: "var(--border)",
                        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      <div className="mb-3 flex items-center justify-between px-2">
                        <p
                          className="text-xs font-semibold uppercase tracking-widest"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Our Products
                        </p>
                        <Link
                          href="/products"
                          className="text-xs font-semibold hover:underline"
                          style={{ color: "var(--brand-text)" }}
                        >
                          View All →
                        </Link>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        {products.map((product) => {
                          return (
                            <NavigationMenuLink key={product.slug} asChild>
                              <Link
                                href={`/products/${product.slug}`}
                                className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-surface-2"
                              >
                                <div
                                  className="relative mt-0.5 size-12 shrink-0 overflow-hidden rounded-lg"
                                  style={{
                                    backgroundColor: "var(--surface-2)",
                                  }}
                                >
                                  <Image
                                    src={`/products/${product.slug}.webp`}
                                    alt=""
                                    fill
                                    sizes="48px"
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                  />
                                </div>
                                <div>
                                  <p
                                    className="text-sm font-semibold"
                                    style={{ color: "var(--foreground)" }}
                                  >
                                    {product.name}
                                  </p>
                                  <p
                                    className="mt-0.5 line-clamp-2 text-xs"
                                    style={{ color: "var(--text-muted)" }}
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
          )}

          {linksAfter.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {site.brochureUrl && (
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-10 bg-transparent px-4 font-semibold hover:bg-surface-2"
              style={{
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            >
              <a
                href={site.brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="size-4" />
                Catalogue
              </a>
            </Button>
          )}
          <Button
            asChild
            size="lg"
            className="glow-orange-hover h-10 border-0 px-5 font-semibold hover:opacity-90"
            style={{
              backgroundColor: "var(--brand)",
              color: "var(--brand-foreground)",
            }}
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
              className="hover:bg-surface-2"
              style={{ color: "var(--foreground)" }}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full max-w-sm border p-0 sm:max-w-sm"
            style={{
              backgroundColor: "var(--background)",
              borderColor: "var(--border)",
            }}
          >
            <SheetHeader
              className="border-b p-6"
              style={{ borderColor: "var(--border)" }}
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <Logo />
            </SheetHeader>

            <div className="flex flex-col overflow-y-auto p-6">
              <div className="flex flex-col gap-1">
                {linksBefore.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-4 py-3 hover:bg-surface-2"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>

              {productsAt !== -1 && (
                <div className="mt-6">
                  <div className="mb-3 flex items-center justify-between px-4">
                    <p
                      className="text-xs font-semibold uppercase tracking-widest"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {site.nav[productsAt].label}
                    </p>
                    <Link
                      href="/products"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs font-semibold"
                      style={{ color: "var(--brand-text)" }}
                    >
                      View All
                    </Link>
                  </div>
                  <div className="flex flex-col gap-1">
                    {products.map((product) => {
                      return (
                        <Link
                          key={product.slug}
                          href={`/products/${product.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-surface-2"
                        >
                          <div
                            className="relative size-10 shrink-0 overflow-hidden rounded-md"
                            style={{ backgroundColor: "var(--surface-2)" }}
                          >
                            <Image
                              src={`/products/${product.slug}.webp`}
                              alt=""
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          </div>
                          <span
                            className="text-sm font-medium"
                            style={{ color: "var(--foreground)" }}
                          >
                            {product.name}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-col gap-1">
                {linksAfter.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-4 py-3 hover:bg-surface-2"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3">
                {site.brochureUrl && (
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-12 w-full bg-transparent font-semibold hover:bg-surface-2"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--foreground)",
                    }}
                  >
                    <a
                      href={site.brochureUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Download className="size-4" />
                      Catalogue
                    </a>
                  </Button>
                )}
                <Button
                  asChild
                  size="lg"
                  className="glow-orange h-12 w-full border-0 font-semibold"
                  style={{
                    backgroundColor: "var(--brand)",
                    color: "var(--brand-foreground)",
                  }}
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
