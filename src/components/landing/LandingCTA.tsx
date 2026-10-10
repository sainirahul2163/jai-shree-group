"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { COMPANY } from "@/lib/constants";
import { whatsappUrl } from "@/lib/email";

const SPRING = { type: "spring", stiffness: 100, damping: 30 } as const;

const WHATSAPP_URL = whatsappUrl(
  COMPANY.whatsapp,
  "Hi, I need a quote for metal products."
);

const telClass =
  "flex items-center gap-2 text-sm text-foreground/60 transition-colors hover:text-foreground";

export function LandingCTA() {
  const reduceMotion = useReducedMotion() ?? false;

  const enter = (delay: number) => ({
    initial: {
      opacity: 0,
      y: reduceMotion ? 0 : 60,
      filter: reduceMotion ? "blur(0px)" : "blur(12px)",
    },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, margin: "-10% 0px" },
    transition: { ...SPRING, delay },
  });

  return (
    <>
      <section className="relative overflow-hidden bg-background px-6 py-40">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 100%, color-mix(in oklab, var(--brand) 12%, transparent), transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--surface-2) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "linear-gradient(to bottom, transparent, black 80%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 80%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center">
          <h2 className="text-6xl font-black leading-[0.95] tracking-tight md:text-8xl">
            <motion.span {...enter(0)} className="block text-foreground">
              Ready to Work
            </motion.span>
            <motion.span
              {...enter(0.15)}
              className="block bg-gradient-to-r from-brand via-brand-hover to-brand bg-clip-text text-transparent drop-shadow-[0_0_30px_color-mix(in_oklab,var(--brand)_25%,transparent)]"
            >
              With Us?
            </motion.span>
          </h2>

          <motion.p {...enter(0.3)} className="mt-8 text-lg text-text-secondary">
            Share your requirement. Get a quote within 24 hours.
          </motion.p>

          <motion.div {...enter(0.45)} className="mt-12">
            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              transition={SPRING}
              className="rounded-full"
            >
              <Link
                href="/get-quote"
                className="group flex items-center gap-2 rounded-full bg-brand px-10 py-5 text-lg font-semibold text-brand-foreground transition-[background-color,box-shadow] duration-300 hover:bg-brand-hover hover:shadow-[0_0_50px_color-mix(in_oklab,var(--brand)_40%,transparent)]"
              >
                Get a Free Quote
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            {...enter(0.55)}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-8"
          >
            <a
              href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
              className={telClass}
            >
              <Phone className="h-4 w-4" />
              Call {COMPANY.phone}
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={telClass}>
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>
          </motion.div>

          <motion.p
            {...enter(0.65)}
            className="mt-12 text-xs uppercase tracking-[0.2em] text-foreground/40"
          >
            24hr Response <span className="text-brand-text">◆</span> ISO
            9001:2015 <span className="text-brand-text">◆</span> Global Delivery
            Delivery
          </motion.p>
        </div>
      </section>

      <footer className="border-t border-surface-2 bg-background px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <span className="text-sm tracking-widest text-foreground/80">
            JAI SHREE GROUP
          </span>
          <span className="text-xs text-foreground/30">
            © 2026 Jai Shree Group. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xs text-foreground/50 transition-colors hover:text-foreground">
              Main Site →
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-xs text-foreground/50 transition-colors hover:text-foreground">
              WhatsApp →
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}