/* eslint-disable @next/next/no-img-element */
import {
  BROCHURE_EDGE,
  BROCHURE_HISTORY,
  BROCHURE_HISTORY_NOTE,
  BROCHURE_INTRO,
  BROCHURE_MISSION,
  BROCHURE_VISION,
} from "@/data/brochure";

import { Caps, Masthead, Sheet, Stat } from "./kit";

/* ══════════════ 01 · Cover ══════════════ */

export function PageCover() {
  return (
    <Sheet dark>
      <img
        src="/gallery/perforated-sheet-detail.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0.5 }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(16,18,21,0.94) 0%, rgba(16,18,21,0.55) 34%, rgba(16,18,21,0.93) 72%, #101215 100%)",
        }}
      />
      <div
        className="glow"
        style={{
          right: "-40mm",
          top: "22mm",
          width: "130mm",
          height: "130mm",
          background: "radial-gradient(circle, rgba(232,82,26,0.30), transparent 68%)",
        }}
      />

      <div className="relative flex h-full flex-col justify-between px-[var(--mx)] pb-[18mm] pt-[16mm]">
        <div className="flex items-start justify-between">
          <img src="/logo/logo-horizontal-dark.svg" alt="Jai Shree Group®" className="h-[15mm] w-auto" />
          <div className="text-right">
            <div className="label" style={{ color: "#fff" }}>
              Company Profile
            </div>
            <div className="mono mt-[1.6mm]" style={{ color: "#7d858e" }}>
              Edition 2026
            </div>
          </div>
        </div>

        <div>
          <div className="label label--brand mb-[6mm]">
            Est. 1970 — ISO 9001:2015 Certified
          </div>
          <h1 className="display" style={{ color: "#fff" }}>
            Precision
            <br />
            perforated
            <br />
            metal.
          </h1>
          <div
            className="my-[8mm]"
            style={{ height: "3px", width: "38mm", background: "var(--brand)" }}
          />
          <p className="lead" style={{ maxWidth: "128mm", color: "#c8ced5" }}>
            Perforated sheets, laser cutting, expanded metal and custom components —
            engineered to specification and manufactured across six units in Pune and
            Mumbai for over fifty years.
          </p>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex gap-[14mm]">
            {[
              ["50+", "Years"],
              ["06", "Units"],
              ["02", "Cities"],
            ].map(([v, k]) => (
              <div key={k}>
                <div
                  className="mono"
                  style={{ fontSize: "26px", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}
                >
                  {v}
                </div>
                <div className="label mt-[1mm]" style={{ color: "#7d858e" }}>
                  {k}
                </div>
              </div>
            ))}
          </div>
          <span className="mono" style={{ color: "#6e767f" }}>
            jaishreegroup.com
          </span>
        </div>
      </div>
    </Sheet>
  );
}

/* ══════════════ 02 · Contents ══════════════ */

const TOC = [
  ["01", "The Group", "03"],
  ["02", "Fifty Years of Growth", "04"],
  ["03", "Vision, Mission & Edge", "05"],
  ["04", "Our Capabilities", "06"],
  ["05", "Perforated Sheets", "07"],
  ["06", "Perforation Patterns", "08"],
  ["07", "Laser Cutting", "09"],
  ["08", "Expanded Metal", "10"],
  ["09", "Turret Punching", "12"],
  ["10", "Precision Sheet Leveling", "13"],
  ["11", "Custom Components", "14"],
  ["12", "Materials & Industries", "15"],
  ["13", "Our Network", "16"],
] as const;

export function PageContents() {
  return (
    <Sheet foot="Contents" page={2}>
      <div className="pad">
        <div className="masthead">
          <div className="masthead__top">
            <span className="secno">—</span>
            <span className="label">Company Profile · Edition 2026</span>
          </div>
          <h2 className="h1">Contents</h2>
        </div>

        <div className="grid grid-cols-2 gap-x-[12mm]">
          <div>
            {TOC.slice(0, 7).map(([no, title, pg]) => (
              <div key={no} className="toc">
                <span className="toc__no">{no}</span>
                <span>{title}</span>
                <span className="toc__pg">{pg}</span>
              </div>
            ))}
          </div>
          <div>
            {TOC.slice(7).map(([no, title, pg]) => (
              <div key={no} className="toc">
                <span className="toc__no">{no}</span>
                <span>{title}</span>
                <span className="toc__pg">{pg}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[10mm] grid grid-cols-4 gap-[8mm] border-t-2 border-[var(--ink)] pt-[7mm]">
          <Stat value="50" accent="+" label="Years of experience" />
          <Stat value="06" label="Manufacturing units" />
          <Stat value="12" accent="mm" label="Max punch thickness" />
          <Stat value="14" accent="mm" label="Max laser thickness" />
        </div>

        <figure className="shot bleed mt-auto" style={{ height: "72mm" }}>
          <img src="/brochure/img/factory.jpg" alt="Jai Shree Group plant at Talawade, Pune" />
          <figcaption className="shot__cap">Talawade, Pune — Group manufacturing facility</figcaption>
        </figure>
      </div>
    </Sheet>
  );
}

/* ══════════════ 03 · The Group ══════════════ */

export function PageGroup() {
  return (
    <Sheet foot="The Group" page={3}>
      <div className="pad">
        <Masthead no="01" kicker="Introduction" title="The Group" />

        <p className="lead mb-[7mm]" style={{ maxWidth: "150mm" }}>
          {BROCHURE_INTRO[0]}
        </p>

        <div className="grid grid-cols-2 gap-x-[11mm] gap-y-[4mm]">
          {BROCHURE_INTRO.slice(1).map((p) => (
            <p key={p.slice(0, 20)} className="body">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-[8mm] rule" />

        <div className="mt-[7mm] grid grid-cols-[1fr_62mm] items-start gap-[11mm]">
          <p className="pull">
            Our key goal is to reduce rejection — and our rejection percentage is
            negligible, because our operators and supervisors are highly trained.
          </p>
          <div>
            <div className="label mb-[3mm]">Certified to</div>
            <div className="h3">ISO 9001:2015</div>
            <p className="small mt-[2mm]">
              Quality management across every plant, audited and maintained group-wide.
            </p>
          </div>
        </div>

        <figure className="shot bleed mt-auto" style={{ height: "78mm" }}>
          <img src="/brochure/img/perforated-collage.jpg" alt="Perforated sheets in a range of hole patterns" />
          <figcaption className="shot__cap">Standard and custom perforation patterns</figcaption>
        </figure>
      </div>
    </Sheet>
  );
}

/* ══════════════ 04 · Fifty Years ══════════════ */

export function PageHistory() {
  return (
    <Sheet foot="Fifty Years of Growth" page={4}>
      <div className="pad">
        <Masthead no="02" kicker="History" title="Fifty years of growth" />

        <div className="grid gap-0">
          {BROCHURE_HISTORY.map((item) => (
            <div
              key={item.year}
              className="grid grid-cols-[26mm_1fr] gap-[8mm] border-t border-[var(--rule)] py-[4.2mm]"
            >
              <div
                className="mono"
                style={{ fontSize: "22px", fontWeight: 700, color: "var(--brand)", letterSpacing: "-0.02em" }}
              >
                {item.year}
              </div>
              <p className="body" style={{ marginTop: "0.6mm" }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-[8mm] border-t-2 border-[var(--ink)] pt-[6mm]">
          <p className="body" style={{ columnCount: 2, columnGap: "11mm" }}>
            {BROCHURE_HISTORY_NOTE}
          </p>
        </div>
      </div>
    </Sheet>
  );
}

/* ══════════════ 05 · Vision, Mission & Edge ══════════════ */

export function PagePrinciples() {
  return (
    <Sheet dark foot="Vision, Mission & Edge" page={5}>
      <div
        className="glow"
        style={{
          left: "-30mm",
          top: "-30mm",
          width: "120mm",
          height: "120mm",
          background: "radial-gradient(circle, rgba(232,82,26,0.22), transparent 68%)",
        }}
      />
      <div className="pad relative">
        <Masthead no="03" kicker="What drives us" title="Vision, mission & edge" />

        <div className="grid grid-cols-2 gap-[11mm]">
          <div>
            <div className="label label--brand mb-[3.4mm]">Our Vision</div>
            <p className="body" style={{ fontSize: "15px" }}>
              {BROCHURE_VISION}
            </p>
          </div>
          <div>
            <div className="label label--brand mb-[3.4mm]">Our Mission</div>
            <p className="body" style={{ fontSize: "15px" }}>
              {BROCHURE_MISSION}
            </p>
          </div>
        </div>

        <div className="mt-[9mm] rule" />

        <div className="mt-[7mm]">
          <div className="label mb-[5mm]" style={{ color: "#fff" }}>
            Our Edge on Others
          </div>
          <div className="grid grid-cols-2 gap-x-[11mm]">
            <Caps items={BROCHURE_EDGE.slice(0, 4)} />
            <Caps items={BROCHURE_EDGE.slice(4)} start={4} />
          </div>
        </div>

        <div className="mt-auto grid grid-cols-3 gap-[8mm] border-t border-[var(--dark-rule)] pt-[7mm]">
          <Stat value="100" accent="%" label="Privately owned, zero debt" />
          <Stat value="02" label="Cities — Pune & Mumbai" />
          <Stat value="All" label="States of India served" />
        </div>
      </div>
    </Sheet>
  );
}
