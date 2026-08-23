/* eslint-disable @next/next/no-img-element */
import { NETWORK_MUMBAI, NETWORK_PUNE, type BrochureUnit } from "@/data/brochure";
import { INDUSTRY_DETAILS } from "@/data/industries";

import { INDUSTRY_ICONS } from "./industry-icons";
import { IconGlobe, IconMail, IconPhone, IconPin, Sheet, SqList, Tag } from "./kit";

/* ══════════════ 12 · Industries We Serve ══════════════ */

/** Same eight sectors, in the same order, as the website's industries pages —
 *  imported rather than retyped so the two cannot drift apart. */
const INDUSTRY_ORDER = [
  "automobile",
  "construction",
  "food-beverage",
  "pharmaceutical",
  "petrochemical",
  "architecture-interior",
  "sugar-industry",
  "mining-quarrying",
] as const;

export function PageIndustries({ icons = false }: { icons?: boolean }) {
  return (
    <Sheet page={12} foot="Industries We Serve">
      <div className="pad">
        <Tag>Industries We Serve</Tag>

        <p className="lead mb-[6mm]" style={{ maxWidth: "160mm" }}>
          Our sheets, screens and components go into plants across India — from
          automotive filtration and building facades to sugar mills, refineries and
          mining operations.
        </p>

        <div className="grid grid-cols-2 gap-x-[9mm] gap-y-[6mm]">
          {INDUSTRY_ORDER.map((key) => {
            const industry = INDUSTRY_DETAILS[key];
            const Icon = INDUSTRY_ICONS[key];
            return (
              <div key={key} className="border-t-2 border-[var(--orange)] pt-[3mm]">
                {icons ? (
                  <div className="mb-[2mm] flex items-center gap-[3mm]">
                    <Icon className="h-[9mm] w-[9mm] flex-none" style={{ color: "var(--orange)" }} />
                    <h3 className="h3">{industry.name}</h3>
                  </div>
                ) : (
                  <h3 className="h3 mb-[1.6mm]">{industry.name}</h3>
                )}
                <p className="small mb-[2.6mm]" style={{ color: "var(--ink-2)" }}>
                  {industry.description}
                </p>
                <SqList items={industry.applications.slice(0, 3)} size="sm" />
              </div>
            );
          })}
        </div>

      </div>
    </Sheet>
  );
}

const HEX_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'%3E%3Cpath d='M28 0 L56 16 L56 50 L28 66 L0 50 L0 16 Z' fill='none' stroke='%23ffffff' stroke-width='1' opacity='0.07'/%3E%3C/svg%3E\")";

function Unit({ unit }: { unit: BrochureUnit }) {
  const rows: [React.ReactNode, string, boolean][] = [
    [<IconPin key="p" className="unit__i" />, unit.address, false],
    [<IconGlobe key="g" className="unit__i" />, unit.website, true],
    [<IconMail key="m" className="unit__i" />, unit.emails.join("  ·  "), true],
    [<IconPhone key="t" className="unit__i" />, unit.phones.join("  ·  "), true],
  ];
  return (
    <div className="unit">
      <h3 className="unit__n">
        {unit.name}
        {unit.name2 && (
          <>
            <br />
            {unit.name2}
          </>
        )}
      </h3>
      {rows.map(([icon, text, mono], i) => (
        <div key={i} className="unit__r">
          <span style={{ color: "var(--orange)" }}>{icon}</span>
          <span className={mono ? "mono" : ""} style={mono ? { fontSize: "11px" } : undefined}>
            {text}
          </span>
        </div>
      ))}
    </div>
  );
}

function CityBand({ city }: { city: string }) {
  return (
    <div className="mb-[4mm] flex items-center gap-[3mm]">
      <span
        style={{
          background: "var(--orange)",
          color: "#fff",
          fontSize: "14px",
          fontWeight: 800,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "2.4mm 6mm 2.4mm 4mm",
          clipPath: "polygon(0 0, 100% 0, calc(100% - 4mm) 100%, 0 100%)",
        }}
      >
        {city}
      </span>
      <span className="h-[1.5px] flex-1" style={{ background: "var(--orange)", opacity: 0.28 }} />
    </div>
  );
}

/* ══════════════ 13 · Back cover ══════════════ */

export function PageBack() {
  return (
    <Sheet dark>
      <div
        className="absolute inset-0"
        style={{ backgroundImage: HEX_TEXTURE, backgroundSize: "42px 75px" }}
      />

      <div className="relative flex h-full flex-col px-[var(--mx)] pb-[13mm] pt-[12mm]">
        <div className="flex items-start justify-between">
          <div>
            <div className="label label--orange mb-[2.4mm]">Our Network</div>
            <h2 className="h1" style={{ color: "#fff" }}>
              Six units.
              <br />
              Two cities.
            </h2>
          </div>
          <img src="/logo/logo-stacked-dark.svg" alt="Jai Shree Group®" className="h-[26mm] w-auto" />
        </div>

        <div className="rule--orange mt-[6mm] mb-[8mm]" />

        <CityBand city="Pune" />
        <div className="grid grid-cols-3 gap-[6mm]">
          {NETWORK_PUNE.map((u) => (
            <Unit key={u.name} unit={u} />
          ))}
        </div>

        <div className="mt-[9mm]">
          <CityBand city="Mumbai" />
        </div>
        <div className="grid grid-cols-3 gap-[6mm]">
          {NETWORK_MUMBAI.map((u) => (
            <Unit key={u.name} unit={u} />
          ))}
        </div>

        <div className="mt-auto">
          <div className="rule--orange mb-[7mm]" />
          <div className="flex items-end justify-between gap-[9mm]">
            <div>
              <div
                style={{
                  fontSize: "26px",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  color: "#fff",
                  lineHeight: 1.15,
                }}
              >
                Where every solution
                <br />
                meets <span style={{ color: "var(--orange)" }}>precision</span>
              </div>
              <div
                className="mono mt-[4mm]"
                style={{ color: "var(--orange)", fontSize: "13.5px", letterSpacing: "0.02em" }}
              >
                www.jaishreegroup.com
              </div>
              <div className="label mt-[2.4mm]" style={{ color: "#7b838c" }}>
                Est. 1970 — ISO 9001:2015 Certified
              </div>
            </div>

            <div className="flex flex-none flex-col items-center gap-[2mm]">
              <div style={{ background: "#fff", padding: "2.2mm" }}>
                <img src="/brochure/img/qr.png" alt="QR code to jaishreegroup.com" className="h-[22mm] w-[22mm]" />
              </div>
              <span className="label" style={{ color: "#7b838c" }}>
                Scan to visit
              </span>
            </div>
          </div>
        </div>
      </div>
    </Sheet>
  );
}
