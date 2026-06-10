"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <h1
        className="text-3xl font-black sm:text-4xl"
        style={{ color: "#FFFFFF" }}
      >
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-base" style={{ color: "#A0A0A0" }}>
        An unexpected error occurred. Please try again or return to the home page.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          onClick={reset}
          size="lg"
          className="glow-orange"
          style={{ backgroundColor: "#E8521A" }}
        >
          Try Again
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="border-[#2A2A2A] bg-transparent"
        >
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
