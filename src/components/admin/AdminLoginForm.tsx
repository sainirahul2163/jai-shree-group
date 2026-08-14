"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { isCurrentUserAdmin } from "@/lib/supabase/actions";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      // Correct credentials are not enough: /admin is gated by the ADMIN_EMAILS
      // allow-list. Check that here, because otherwise the middleware silently
      // bounces this account back to the page it is already on and the form
      // sits on "Signing in..." forever with nothing to explain why.
      if (!(await isCurrentUserAdmin())) {
        await supabase.auth.signOut();
        setError(
          "This account is not authorised for the admin panel. Ask your developer to add it to ADMIN_EMAILS."
        );
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Sign-in failed. Please try again."
      );
    } finally {
      // Reset on every path, success included - a spinner that can never clear
      // is what made this failure invisible in the first place.
      setLoading(false);
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div
        className="w-full max-w-md rounded-2xl border p-8"
        style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}
      >
        <div className="mb-8 flex flex-col items-center">
          <Logo />
          <h1
            className="mt-6 text-2xl font-black"
            style={{ color: "#FFFFFF" }}
          >
            Admin Portal
          </h1>
          <p className="mt-2 text-sm" style={{ color: "#A0A0A0" }}>
            Sign in to manage leads and content
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" style={{ color: "#A0A0A0" }}>
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1.5 border-[#2A2A2A] bg-[#0A0A0A]"
              style={{ color: "#FFFFFF" }}
            />
          </div>
          <div>
            <Label htmlFor="password" style={{ color: "#A0A0A0" }}>
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1.5 border-[#2A2A2A] bg-[#0A0A0A]"
              style={{ color: "#FFFFFF" }}
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="glow-orange w-full"
            style={{ backgroundColor: "#E8521A" }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
