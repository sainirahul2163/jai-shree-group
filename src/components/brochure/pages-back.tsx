/* eslint-disable @next/next/no-img-element */
import { CONSULTANCY_QUOTE, NETWORK_MUMBAI, NETWORK_PUNE, type BrochureUnit } from "@/data/brochure";

import { IconGlobe, IconMail, IconPhone, IconPin, Masthead, Sheet } from "./kit";

/* ══════════════ 15 · Materials & Industries ══════════════ */

const MATERIALS = [
  "Stainless Steel",
  "Carbon Steel",
  "Mild Steel (MS)",
  "Galvanized Iron (GI)",
  "Aluminum",
  "Brass",
  "Copper",
  "Titanium",
  "Nickel",
  "PVC / PP Sheet",
] as const;

const INDUSTRIES = [
  "Automobile",
  "Construction & Architecture",
  "Food & Beverage",
  "Pharmaceutical",
  "Petrochemical",
  "Interior & Façade",
  "Sugar Industry",
  "Mining & Quarrying",
  "Filtration & Separation",
  "Paper & Packaging",
] as const;

const LIMITS = [
  ["12mm", "Maximum punch thickness"],
  ["14mm", "Maximum laser thickness"],
  ["2200 × 4000mm", "Maximum sheet handling (W × L)"],
  ["6mm", "Maximum expanded metal thickness"],
  ["5mm", "Maximum leveling thickness"],
] as const;

export function PageCapability() {
  return (
    <Sheet dark foot="Materials & Industries" page={15}>
      <div
        className="glow"
        style={{
          left: "-34mm",
          top: "10mm",
          width: "120mm",
          height: "120mm",
          background: "radial-gradient(circle, rgba(232,82,26,0.20), transparent 68%)",
        }}
      />
      <div className="pad relative">
        <Masthead no="12" kicker="Capability at a glance" title="Materials & industries" />

        <div className="grid grid-cols-2 gap-[11mm]">
          <div>
            <div className="label mb-[4mm]" style={{ color: "#fff" }}>
              Materials We Process
            </div>
            <div className="flex flex-wrap gap-[2.4mm]">
              {MATERIALS.map((m) => (
                <span key={m} className="chip">
                  {m}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="label mb-[4mm]" style={{ color: "#fff" }}>
              Industries We Serve
            </div>
            <div className="flex flex-wrap gap-[2.4mm]">
              {INDUSTRIES.map((m) => (
                <span key={m} className="chip">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-[10mm] rule" />

        <div className="mt-[7mm]">
          <div className="label mb-[5mm]" style={{ color: "#fff" }}>
            Production Limits
          </div>
          <div className="grid gap-0">
            {LIMITS.map(([v, k]) => (
              <div
                key={k}
                className="grid grid-cols-[54mm_1fr] items-baseline gap-[6mm] border-t border-[var(--dark-rule)] py-[3.8mm]"
              >
                <span
                  className="mono"
                  style={{ fontSize: "18px", fontWeight: 700, color: "var(--brand)", letterSpacing: "-0.02em" }}
                >
                  {v}
                </span>
                <span className="body">{k}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pb-[3mm]">
          <p
            className="pull"
            style={{ fontSize: "16px", borderLeftColor: "var(--brand)", color: "#fff" }}
          >
            {CONSULTANCY_QUOTE}
          </p>
        </div>
      </div>
    </Sheet>
  );
}

/* ══════════════ 16 · Network / back cover ══════════════ */

function Unit({ unit }: { unit: BrochureUnit }) {
  return (
    <div className="border-t border-[var(--dark-rule)] pt-[3.6mm]">
      <h4 className="h3 mb-[3mm]" style={{ fontSize: "15px", color: "#fff" }}>
        {unit.name}
        {unit.name2 && (
          <>
            <br />
            {unit.name2}
          </>
        )}
      </h4>
      {[
        [<IconPin key="p" className="h-[3.8mm] w-[3.8mm]" />, unit.address, false],
        [<IconGlobe key="g" className="h-[3.8mm] w-[3.8mm]" />, unit.website, true],
        [<IconMail key="m" className="h-[3.8mm] w-[3.8mm]" />, unit.emails.join("  ·  "), true],
        [<IconPhone key="t" className="h-[3.8mm] w-[3.8mm]" />, unit.phones.join("  ·  "), true],
      ].map(([icon, text, mono], i) => (
        <div key={i} className="mb-[1.8mm] flex gap-[2.6mm]">
          <span className="mt-[0.3mm] flex-none" style={{ color: "var(--brand)" }}>
            {icon as React.ReactNode}
          </span>
          <span
            className={mono ? "mono" : ""}
            style={{
              fontSize: mono ? "12px" : "12.5px",
              lineHeight: 1.5,
              color: "var(--dark-ink-2)",
            }}
          >
            {text as string}
          </span>
        </div>
      ))}
    </div>
  );
}

export function PageNetwork() {
  return (
    <Sheet dark>
      <div
        className="glow"
        style={{
          right: "-40mm",
          top: "-30mm",
          width: "140mm",
          height: "140mm",
          background: "radial-gradient(circle, rgba(232,82,26,0.24), transparent 68%)",
        }}
      />
      <div className="relative flex h-full flex-col px-[var(--mx)] pb-[16mm] pt-[16mm]">
        <div className="masthead">
          <div className="masthead__top">
            <span className="secno">13</span>
            <span className="label">Six units · Pune & Mumbai</span>
          </div>
          <h2 className="h1">Our network</h2>
        </div>

        <div className="mb-[3mm] flex items-baseline gap-[4mm]">
          <span className="h3" style={{ color: "var(--brand)" }}>
            Pune
          </span>
          <span className="flex-1" style={{ height: "1px", background: "var(--dark-rule)" }} />
        </div>
        <div className="grid grid-cols-3 gap-[7mm]">
          {NETWORK_PUNE.map((u) => (
            <Unit key={u.name} unit={u} />
          ))}
        </div>

        <div className="mb-[3mm] mt-[9mm] flex items-baseline gap-[4mm]">
          <span className="h3" style={{ color: "var(--brand)" }}>
            Mumbai
          </span>
          <span className="flex-1" style={{ height: "1px", background: "var(--dark-rule)" }} />
        </div>
        <div className="grid grid-cols-3 gap-[7mm]">
          {NETWORK_MUMBAI.map((u) => (
            <Unit key={u.name} unit={u} />
          ))}
        </div>

        <div className="mt-auto">
          <div className="mb-[8mm] rule" />
          <div className="flex items-end justify-between gap-[10mm]">
            <div>
              <img src="/logo/logo-horizontal-dark.svg" alt="Jai Shree Group®" className="h-[17mm] w-auto" />
              <p className="lead mt-[5mm]" style={{ maxWidth: "104mm", fontSize: "16px", color: "#c8ced5" }}>
                One group, every metal solution — from a single blank to
                coil-to-coil production runs.
              </p>
              <div className="mono mt-[4mm]" style={{ color: "var(--brand)", fontSize: "14px" }}>
                www.jaishreegroup.com
              </div>
            </div>
            <div className="flex flex-none flex-col items-center gap-[2.4mm]">
              <div style={{ background: "#fff", padding: "2.4mm", borderRadius: "2mm" }}>
                <img src="/brochure/img/qr.png" alt="QR code to jaishreegroup.com" className="h-[24mm] w-[24mm]" />
              </div>
              <span className="label" style={{ color: "#7d858e" }}>
                Scan to visit
              </span>
            </div>
          </div>
        </div>
      </div>
    </Sheet>
  );
}
