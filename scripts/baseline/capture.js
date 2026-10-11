// Phase 0.1 baseline: full-page screenshots + <head> of every public route.
// Usage: node scripts/baseline/capture.js <out-dir> [base-url]   (see docs/research/baseline.md)
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer-core");

const BASE = process.argv[3] || "http://localhost:3000";
const OUT = process.argv[2];
const ROUTES = [
  "/", "/landing", "/about", "/group", "/products", "/calculator", "/gallery", "/clients",
  "/certifications", "/contact", "/get-quote", "/industries", "/blog",
  "/products/perforated-sheets", "/products/laser-cutting", "/products/expanded-metal",
  "/products/turret-punching", "/products/precision-sheet-leveling", "/products/custom-components",
  "/industries/automobile", "/industries/construction", "/industries/food-beverage",
  "/industries/pharmaceutical", "/industries/petrochemical", "/industries/architecture-interior",
  "/industries/sugar-industry", "/industries/mining-quarrying",
  "/pune/perforated-sheet-manufacturers", "/pune/laser-cutting-services", "/pune/expanded-metal-manufacturers",
  "/mumbai/perforated-sheet-manufacturers", "/mumbai/laser-cutting-services", "/mumbai/expanded-metal-manufacturers",
  "/blog/how-to-calculate-open-area-perforated-sheet", "/blog/expanded-metal-vs-perforated-sheet",
  "/blog/laser-cutting-vs-turret-punching", "/blog/perforated-sheet-specification-guide",
  "/brochure", "/brochure/icons", "/this-page-does-not-exist",
];
const VIEWPORTS = [
  { name: "desktop-1440", width: 1440, height: 900, mobile: false },
  { name: "mobile-390", width: 390, height: 844, mobile: true },
];
const slug = (r) => (r === "/" ? "home" : r.slice(1).replace(/\//g, "__"));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  for (const v of VIEWPORTS) fs.mkdirSync(path.join(OUT, v.name), { recursive: true });
  fs.mkdirSync(path.join(OUT, "head"), { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: "new",
    args: ["--hide-scrollbars"],
  });
  const report = [];
  for (const v of VIEWPORTS) {
    for (const r of ROUTES) {
      const page = await browser.newPage();
      const errors = [];
      page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 200)));
      page.on("pageerror", (e) => errors.push(String(e).slice(0, 200)));
      await page.setViewport({ width: v.width, height: v.height, isMobile: v.mobile, hasTouch: v.mobile, deviceScaleFactor: 1 });
      let status = 0;
      try {
        const res = await page.goto(BASE + r, { waitUntil: "networkidle2", timeout: 60000 });
        status = res ? res.status() : 0;
        // Scroll through the page so scroll-triggered animations and the lazy map render.
        const height = await page.evaluate(() => document.documentElement.scrollHeight);
        for (let y = 0; y < height; y += Math.round(v.height * 0.6)) {
          await page.evaluate((yy) => window.scrollTo(0, yy), y);
          await sleep(180);
        }
        await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
        await sleep(1200);
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForNetworkIdle({ idleTime: 800, timeout: 15000 }).catch(() => {});
        await sleep(800);
        await page.screenshot({ path: path.join(OUT, v.name, slug(r) + ".png"), fullPage: true });
        if (v.name === "desktop-1440") {
          const head = await page.evaluate(() => document.head.outerHTML);
          fs.writeFileSync(path.join(OUT, "head", slug(r) + ".html"), head);
        }
      } catch (e) {
        errors.push("CAPTURE FAILED: " + String(e).slice(0, 200));
      }
      report.push({ viewport: v.name, route: r, status, errors });
      console.log(v.name, status, r, errors.length ? `(${errors.length} console errors)` : "");
      await page.close();
    }
  }
  await browser.close();
  fs.writeFileSync(path.join(OUT, "report.json"), JSON.stringify(report, null, 2));
})();
