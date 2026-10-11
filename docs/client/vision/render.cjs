// Renders index.html to the client PDF (and optional PNG previews of each page).
// Usage: node docs/client/vision/render.cjs [--png <dir>]
// Needs Playwright (or puppeteer-core with CHROMIUM_PATH set to a Chrome/Chromium binary).
const path = require("path");
const { pathToFileURL } = require("url");

const OUT = path.join(__dirname, "..", "Jai-Shree-Group-Seven-Websites-Vision.pdf");
const SRC = pathToFileURL(path.join(__dirname, "index.html")).href;
const pngAt = process.argv.indexOf("--png");
const PNG_DIR = pngAt > -1 ? process.argv[pngAt + 1] : null;

async function launch() {
  try {
    const { chromium } = require("playwright");
    return { kind: "pw", browser: await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined }) };
  } catch {
    const puppeteer = require("puppeteer-core");
    return { kind: "pp", browser: await puppeteer.launch({ executablePath: process.env.CHROMIUM_PATH }) };
  }
}

(async () => {
  const { kind, browser } = await launch();
  const page = await browser.newPage();
  await page.setViewportSize?.({ width: 1280, height: 720 });
  await page.setViewport?.({ width: 1280, height: 720 });
  await page.goto(SRC, { waitUntil: kind === "pw" ? "networkidle" : "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: OUT, width: "1280px", height: "720px", printBackground: true, preferCSSPageSize: true });
  if (PNG_DIR) {
    const pages = await page.$$("section.page");
    for (let i = 0; i < pages.length; i++) {
      await pages[i].screenshot({ path: path.join(PNG_DIR, `p${String(i + 1).padStart(2, "0")}.png`) });
    }
  }
  await browser.close();
  console.log("wrote", OUT);
})();
