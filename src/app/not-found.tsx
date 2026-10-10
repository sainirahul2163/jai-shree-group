import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center"
      style={{ backgroundColor: "var(--background)" }}
    >
      <p
        className="text-sm font-semibold uppercase tracking-widest"
        style={{ color: "var(--brand-text)" }}
      >
        404
      </p>
      <h1
        className="mt-2 text-3xl font-black sm:text-4xl"
        style={{ color: "var(--foreground)" }}
      >
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-base" style={{ color: "var(--text-secondary)" }}>
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg" className="glow-orange">
          <Link href="/">Back to Home</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="border-border bg-transparent"
        >
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    </div>
  );
}
