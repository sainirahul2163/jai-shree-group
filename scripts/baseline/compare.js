// Compare a fresh capture against the Phase 0.1 baseline.
// Usage: node scripts/baseline/compare.js <baseline-dir> <new-dir>
// Writes <new-dir>/diff/<viewport>/<page>.png (changed pixels in red) and prints a table.
const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");
const pixelmatch = require("pixelmatch").default ?? require("pixelmatch");

const [BASE_DIR, NEW_DIR] = process.argv.slice(2);
if (!BASE_DIR || !NEW_DIR) {
  console.error("Usage: node scripts/baseline/compare.js <baseline-dir> <new-dir>");
  process.exit(1);
}

const rows = [];
for (const viewport of ["desktop-1440", "mobile-390"]) {
  const dir = path.join(BASE_DIR, viewport);
  if (!fs.existsSync(dir)) continue;
  fs.mkdirSync(path.join(NEW_DIR, "diff", viewport), { recursive: true });
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".png")).sort()) {
    const newFile = path.join(NEW_DIR, viewport, file);
    if (!fs.existsSync(newFile)) {
      rows.push({ viewport, page: file, result: "MISSING in new capture" });
      continue;
    }
    const a = PNG.sync.read(fs.readFileSync(path.join(dir, file)));
    const b = PNG.sync.read(fs.readFileSync(newFile));
    // Compare the overlapping area; a height change is reported separately.
    const width = Math.min(a.width, b.width);
    const height = Math.min(a.height, b.height);
    const crop = (img) => {
      if (img.width === width && img.height === height) return img;
      const out = new PNG({ width, height });
      PNG.bitblt(img, out, 0, 0, width, height, 0, 0);
      return out;
    };
    const ca = crop(a);
    const cb = crop(b);
    const diff = new PNG({ width, height });
    const changed = pixelmatch(ca.data, cb.data, diff.data, width, height, { threshold: 0.1 });
    const pct = (100 * changed) / (width * height);
    fs.writeFileSync(path.join(NEW_DIR, "diff", viewport, file), PNG.sync.write(diff));
    const heightNote = a.height === b.height ? "" : ` height ${a.height}→${b.height}px`;
    rows.push({ viewport, page: file, result: `${pct.toFixed(2)}% changed${heightNote}` });
  }
}
for (const r of rows) console.log(`${r.viewport.padEnd(13)} ${r.page.padEnd(52)} ${r.result}`);
