// Hostname (no port) → site key.
// This file must stay a plain object with no imports — src/proxy.ts will load it.

export const domains = {
  "jaishreegroup.com": "group",
  "www.jaishreegroup.com": "group",
  "shreeperforators.com": "shree-perforators",
  "www.shreeperforators.com": "shree-perforators",
  "metalperforatedsheets.com": "jai-shree-metal-perforators",
  "www.metalperforatedsheets.com": "jai-shree-metal-perforators",
  "metalperforation.co.in": "jai-shree-perforator",
  "www.metalperforation.co.in": "jai-shree-perforator",
  "jaishreefiltration.com": "jai-shree-filtration",
  "www.jaishreefiltration.com": "jai-shree-filtration",
  "weldedmeshindia.com": "shree-weld-mesh",
  "www.weldedmeshindia.com": "shree-weld-mesh",
} as const;
