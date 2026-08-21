/* eslint-disable @next/next/no-img-element */
import {
  BROCHURE_EDGE,
  BROCHURE_HISTORY,
  BROCHURE_HISTORY_NOTE,
  BROCHURE_INTRO,
  BROCHURE_MISSION,
  BROCHURE_VISION,
} from "@/data/brochure";

import { Field, NumList, Sheet, Stat, Tag } from "./kit";

/** Faint hexagonal texture, the group's own motif, used to stop the black
 *  areas of the cover reading as flat empty boxes. */
const HEX_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'%3E%3Cpath d='M28 0 L56 16 L56 50 L28 66 L0 50 L0 16 Z' fill='none' stroke='%23ffffff' stroke-width='1' opacity='0.07'/%3E%3C/svg%3E\")";

const COVER_PRODUCTS = [
  "Perforated Sheets",
  "Laser Cutting",
  "Expanded Metal",
  "Turret Punching",
  "Precision Sheet Leveling",
  "Custom Components",
] as const;

/* ══════════════ 01 · Cover ══════════════ */

export function PageCover() {
  return (
    <Sheet dark>
      <div
        className="absolute inset-0"
        style={{ backgroundImage: HEX_TEXTURE, backgroundSize: "42px 75px" }}
      />

      {/* hero band — black above and below, photo feathered into it */}
      <div className="absolute inset-x-0" style={{ top: "44mm", height: "171mm" }}>
        <img src="/brochure/img/cover-hero.jpg" alt="" className="h-full w-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg,#0b0c0d 0%,rgba(11,12,13,0) 16%,rgba(11,12,13,0) 66%,#0b0c0d 100%)",
          }}
        />
      </div>

      <div className="relative flex h-full flex-col px-[var(--mx)] pb-[13mm] pt-[12mm]">
        {/* masthead */}
        <div className="flex items-start justify-between">
          <img src="/logo/logo-stacked-dark.svg" alt="Jai Shree Group®" className="h-[30mm] w-auto" />

          <div className="pt-[1mm] text-right">
            <div
              style={{
                fontSize: "88px",
                fontWeight: 800,
                lineHeight: 0.84,
                letterSpacing: "-0.045em",
                background: "linear-gradient(172deg,#ffcaa3 0%,#ff8b52 22%,#ee5c22 52%,#c04310 78%,#8f2f06 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                // stacked shadows read as an extruded face, as on the Canva cover
                textShadow:
                  "1px 1px 0 #a8380a, 2px 2px 0 #973108, 3px 3px 0 #862b06, 4px 5px 10px rgba(0,0,0,0.55)",
              }}
            >
              50
            </div>
            <div className="label label--orange mt-[1.6mm]">Over Years of Experience</div>
            <div
              className="mt-[2.4mm]"
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                color: "#e4e7ea",
                textTransform: "uppercase",
              }}
            >
              Est. 1970 — ISO 9001:2015 Certified
            </div>
          </div>
        </div>

        <div className="rule--orange mt-[5mm]" />

        {/* headline + product list sit over the foot of the photo */}
        <div className="mt-auto">
          <h1 className="display" style={{ color: "#fff" }}>
            Where every solution
            <br />
            meets precision
          </h1>

          <div className="mt-[8mm] grid grid-cols-2 gap-x-[10mm] gap-y-[3.4mm]">
            {COVER_PRODUCTS.map((p) => (
              <div key={p} className="border-b border-[var(--orange)] pb-[2.4mm]">
                <span className="flex items-center gap-[3mm]">
                  <span
                    className="flex-none"
                    style={{ width: "2.6mm", height: "2.6mm", background: "var(--orange)" }}
                  />
                  <span style={{ fontSize: "16px", fontWeight: 500, color: "#fff" }}>{p}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="rule--orange mt-[9mm]" />
        </div>
      </div>
    </Sheet>
  );
}

/* ══════════════ 02 · Introduction ══════════════ */

export function PageIntro() {
  return (
    <Sheet page={2} foot="Introduction">
      <div className="pad">
        <Tag>Introduction</Tag>

        <div className="grid grid-cols-2 gap-x-[9mm] gap-y-[3.4mm]">
          {BROCHURE_INTRO.map((p) => (
            <p key={p.slice(0, 22)} className="body">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-[6mm] grid grid-cols-4 gap-[6mm] border-t border-[var(--rule)] pt-[5mm]">
          <Stat value="50" accent="+" label="Years of experience" />
          <Stat value="06" label="Manufacturing units" />
          <Stat value="02" label="Cities — Pune & Mumbai" />
          <Stat value="ISO" accent=" 9001" label="2015 certified" />
        </div>

        <div className="mt-[6mm] grid grid-cols-2 gap-[9mm]">
          <Field k="Our Vision">{BROCHURE_VISION}</Field>
          <Field k="Our Mission">{BROCHURE_MISSION}</Field>
        </div>

        <figure className="shot bleed mt-auto" style={{ height: "62mm" }}>
          <img src="/brochure/img/factory.jpg" alt="Jai Shree Group plant at Talawade, Pune" />
          <figcaption className="shot__cap">Talawade, Pune — group manufacturing facility</figcaption>
        </figure>
      </div>
    </Sheet>
  );
}

/* ══════════════ 03 · History, Vision, Mission, Edge ══════════════ */

export function PageHistory() {
  return (
    <Sheet page={3} foot="History of the Group">
      <div className="pad">
        <Tag>History of the Group</Tag>

        <div className="grid gap-0">
          {BROCHURE_HISTORY.map((h) => (
            <div
              key={h.year}
              className="grid grid-cols-[20mm_1fr] gap-[6mm] border-b border-[var(--rule)] py-[2.6mm]"
            >
              <span
                className="mono"
                style={{ fontSize: "17px", fontWeight: 700, color: "var(--orange)", letterSpacing: "-0.02em" }}
              >
                {h.year}
              </span>
              <p className="body" style={{ fontSize: "13.5px" }}>
                {h.text}
              </p>
            </div>
          ))}
        </div>

        <p className="body mt-[4mm]" style={{ fontSize: "13.5px" }}>
          {BROCHURE_HISTORY_NOTE}
        </p>

        <div className="mt-[5mm]">
          <div className="field__k mb-[2.4mm]">Edge on Others</div>
          <div className="grid grid-cols-2 gap-x-[8mm]">
            <NumList items={BROCHURE_EDGE.slice(0, 4)} />
            <ol className="nums" style={{ counterReset: "n 4" }}>
              {BROCHURE_EDGE.slice(4).map((t) => (
                <li key={t}>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

      </div>
    </Sheet>
  );
}
