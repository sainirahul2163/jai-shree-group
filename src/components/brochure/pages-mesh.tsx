/* eslint-disable @next/next/no-img-element */
import {
  CONSULTANCY_QUOTE,
  KNITTED,
  NETWORK_MUMBAI,
  NETWORK_PUNE,
  WELDED,
  WIRE_MESH,
  WIRE_MESH_SPECS,
  type BrochureUnit,
  type WireMeshGroup,
} from "@/data/brochure";

import { Field, IconGlobe, IconMail, IconPhone, IconPin, NumList, QuoteBanner, SectionTag, Sheet } from "./ui";

/* ── Page 9 · Wire Mesh + specifications ── */

/** Split spec groups into `n` columns of roughly equal row counts, keeping groups whole. */
function splitColumns(groups: readonly WireMeshGroup[], n: number): WireMeshGroup[][] {
  const total = groups.reduce((sum, g) => sum + g.rows.length, 0);
  const target = total / n;
  const cols: WireMeshGroup[][] = Array.from({ length: n }, () => []);
  let index = 0;
  let filled = 0;
  for (const group of groups) {
    const remainingCols = n - index - 1;
    if (filled > 0 && filled + group.rows.length / 2 > target && remainingCols > 0) {
      index += 1;
      filled = 0;
    }
    cols[index].push(group);
    filled += group.rows.length;
  }
  return cols;
}

function SpecColumn({ groups }: { groups: readonly WireMeshGroup[] }) {
  return (
    <table className="b-table">
      <thead>
        <tr>
          <th>Mesh</th>
          <th>S.W.G.</th>
          <th>
            Dia of Wire
            <br />
            (mm)
          </th>
          <th>
            Opening
            <br />
            (mm)
          </th>
          <th>
            Open
            <br />
            Area %
          </th>
        </tr>
      </thead>
      <tbody>
        {groups.map((group, gi) =>
          group.rows.map(([swg, dia, opening, oa], ri) => (
            <tr
              key={`${group.mesh}-${swg}`}
              className={`${ri === 0 ? "b-group-start " : ""}${gi % 2 ? "b-alt" : ""}`}
            >
              {ri === 0 && (
                <td className="b-mesh-cell" rowSpan={group.rows.length}>
                  {group.mesh}
                </td>
              )}
              <td>{swg}</td>
              <td>{dia}</td>
              <td>{opening}</td>
              <td>{oa}</td>
            </tr>
          )),
        )}
      </tbody>
    </table>
  );
}

export function PageWireMesh() {
  const columns = splitColumns(WIRE_MESH_SPECS, 5);
  return (
    <Sheet page={9}>
      <div className="b-pad">
        <div className="grid grid-cols-[1fr_72mm] gap-[5mm]">
          <div>
            <SectionTag>Wire Mesh</SectionTag>
            <Field label="Material">{WIRE_MESH.material}</Field>
            <Field label="Mesh Types">{WIRE_MESH.meshTypes}</Field>
            <Field label="Application">{WIRE_MESH.application}</Field>
          </div>
          <div className="grid h-[60mm] grid-cols-2 grid-rows-2 gap-[2.4mm] pt-[1mm]">
            {[1, 2, 3, 4].map((i) => (
              <figure key={i} className="b-photo rounded-[8px]">
                <img src={`/brochure/img/wire-${i}.jpg`} alt={`Wire mesh weave ${i}`} />
              </figure>
            ))}
          </div>
        </div>

        <div className="mb-[2.4mm] mt-[3mm] flex items-center gap-[3mm]">
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#e8521a]" />
          <h3 className="text-[13px] font-black uppercase tracking-[0.1em] text-white">
            Wire Mesh <span className="text-[#ff6b35]">Specifications</span>
          </h3>
          <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#e8521a]" />
        </div>

        <div className="grid flex-1 grid-cols-5 items-start gap-[2mm]">
          {columns.map((col, i) => (
            <SpecColumn key={i} groups={col} />
          ))}
        </div>
        <div className="h-[3mm]" />
      </div>
    </Sheet>
  );
}

/* ── Page 10 · Welded Wire Mesh ── */

export function PageWelded() {
  return (
    <Sheet page={10}>
      <div className="b-pad">
        <SectionTag>Welded Wire Mesh</SectionTag>
        <Field label="Material">{WELDED.material}</Field>
        <Field label="Application">{WELDED.application}</Field>

        <figure className="b-photo b-photo-tick mt-[1.6mm] h-[98mm]">
          <img src="/brochure/img/welded-machine.jpg" alt="Welded mesh production line" />
          <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent px-[4mm] pb-[2.6mm] pt-[8mm] text-[8.4px] font-bold uppercase tracking-[0.18em] text-[#e6e6e6]">
            In-house Welded Mesh Production Line
          </figcaption>
        </figure>

        <div className="mb-[2.6mm] mt-[4.6mm] flex items-center gap-[3mm]">
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#e8521a]" />
          <h3 className="text-[12px] font-black uppercase tracking-[0.1em] text-white">
            Specification List of <span className="text-[#ff6b35]">Welded Wire Mesh</span>
          </h3>
          <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#e8521a]" />
        </div>

        <table className="b-table" style={{ fontSize: "9px" }}>
          <thead>
            <tr>
              <th style={{ fontSize: "8px" }}>Opening (in Inch)</th>
              <th style={{ fontSize: "8px" }}>Opening (in mm)</th>
              <th style={{ fontSize: "8px" }}>Wire Diameter (in SWG)</th>
            </tr>
          </thead>
          <tbody>
            {WELDED.specs.map((row, i) => (
              <tr key={row[0]} className={i % 2 ? "b-alt" : ""}>
                {row.map((cell) => (
                  <td key={cell} style={{ padding: "1.15mm 1mm" }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-[3.4mm]">
          <div className="b-field-label">Technical Notes</div>
          <NumList items={WELDED.technicalNotes} />
        </div>
      </div>
    </Sheet>
  );
}

/* ── Page 11 · Welded gallery + Knitted Wire Mesh ── */

export function PageKnitted() {
  return (
    <Sheet page={11}>
      <div className="b-pad">
        <div className="grid h-[54mm] grid-cols-3 gap-[3mm]">
          {[1, 2, 3].map((i) => (
            <figure key={i} className="b-photo b-photo-tick">
              <img src={`/brochure/img/welded-${i}.jpg`} alt={`Welded wire mesh stock ${i}`} />
            </figure>
          ))}
        </div>

        <div className="mt-[4mm]">
          <QuoteBanner>{CONSULTANCY_QUOTE}</QuoteBanner>
        </div>

        <div className="mt-[5.5mm]">
          <SectionTag>Knitted Wire Mesh (Demister Pad)</SectionTag>
        </div>

        <div className="grid h-[74mm] grid-cols-2 gap-[3mm]">
          <figure className="b-photo b-photo-tick">
            <img src="/brochure/img/knitted-1.jpg" alt="Knitted wire mesh demister pad" />
          </figure>
          <figure className="b-photo b-photo-tick">
            <img src="/brochure/img/knitted-2.jpg" alt="Knitted mesh rolls in copper and stainless steel" />
          </figure>
        </div>

        <div className="mt-[4.4mm]">
          <Field label="Material">{KNITTED.material}</Field>
          <Field label="Mesh Types">{KNITTED.meshTypes}</Field>
          <Field label="Application">{KNITTED.application}</Field>
          <div className="b-field">
            <div className="b-field-label">Technical Notes</div>
            <NumList items={KNITTED.technicalNotes} />
          </div>
        </div>
      </div>
    </Sheet>
  );
}

/* ── Page 12 · Network / back cover ── */

function UnitCard({ unit }: { unit: BrochureUnit }) {
  return (
    <div className="b-unit">
      <div className="b-unit-name">
        {unit.name}
        {unit.name2 && (
          <>
            <br />
            {unit.name2}
          </>
        )}
      </div>
      <div className="b-unit-row">
        <IconPin />
        <span>{unit.address}</span>
      </div>
      <div className="b-unit-row">
        <IconGlobe />
        <span className="b-unit-mono">{unit.website}</span>
      </div>
      <div className="b-unit-row">
        <IconMail />
        <span className="b-unit-mono">{unit.emails.join("  ·  ")}</span>
      </div>
      <div className="b-unit-row">
        <IconPhone />
        <span className="b-unit-mono">{unit.phones.join("  ·  ")}</span>
      </div>
    </div>
  );
}

function CityBand({ city }: { city: string }) {
  return (
    <div className="mb-[3.6mm] mt-[6mm] flex items-center gap-[3mm]">
      <h3 className="b-tag !text-[13px]">{city}</h3>
      <span className="h-[1px] flex-1 bg-gradient-to-r from-[#e8521a66] via-[#2a2a2a] to-transparent" />
    </div>
  );
}

export function PageNetwork() {
  return (
    <Sheet className="b-hexbg">
      <div
        className="pointer-events-none absolute -left-[28mm] -top-[28mm] h-[85mm] w-[85mm] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(232,82,26,0.16), transparent 70%)" }}
      />
      <div className="relative flex h-full flex-col px-[11mm] pt-[10mm]">
        <div className="flex items-start justify-between">
          <img src="/logo/logo-stacked-dark.svg" alt="Jai Shree®" className="h-[26mm] w-auto" />
          <div className="pt-[2mm] text-right">
            <div className="text-[16px] font-black uppercase tracking-[0.06em] leading-[1.2] text-white">
              Our <span className="text-[#ff6b35]">Network</span>
            </div>
            <div className="mt-[1mm] text-[8px] font-bold uppercase tracking-[0.22em] text-[#8a8a8a]">
              Six Manufacturing Units · Pune &amp; Mumbai
            </div>
          </div>
        </div>

        <CityBand city="Pune" />
        <div className="grid grid-cols-3 gap-[3.2mm]">
          {NETWORK_PUNE.slice(0, 3).map((unit) => (
            <UnitCard key={unit.name} unit={unit} />
          ))}
        </div>
        <div className="mt-[3.2mm] grid grid-cols-2 gap-[3.2mm]">
          {NETWORK_PUNE.slice(3).map((unit) => (
            <UnitCard key={unit.name} unit={unit} />
          ))}
        </div>

        <CityBand city="Mumbai" />
        <div className="grid grid-cols-3 gap-[3.2mm]">
          {NETWORK_MUMBAI.map((unit) => (
            <UnitCard key={unit.name} unit={unit} />
          ))}
        </div>

        <div className="mt-auto pb-[10mm]">
          <div className="flex items-center justify-between gap-[6mm] rounded-[12px] border border-[#3a2a24] bg-gradient-to-r from-[#170d08] to-[#111111] px-[6mm] py-[4mm]">
            <div>
              <div className="text-[13.5px] font-black uppercase tracking-[0.04em] text-white">
                One Group. <span className="text-[#ff6b35]">Every Metal Solution.</span>
              </div>
              <div className="mt-[1.4mm] text-[9px] font-semibold uppercase tracking-[0.16em] text-[#a0a0a0]">
                www.jaishreegroup.com &ensp;·&ensp; Scan to visit
              </div>
            </div>
            <div className="rounded-[8px] bg-white p-[1.8mm]">
              <img src="/brochure/img/qr.png" alt="QR code — www.jaishreegroup.com" className="h-[20mm] w-[20mm]" />
            </div>
          </div>
        </div>
      </div>
    </Sheet>
  );
}
