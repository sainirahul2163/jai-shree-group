"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { Map as LeafletMap, Marker } from "leaflet";

const LOCATIONS = [
  {
    name: "Pune",
    lat: 18.6469,
    lng: 73.7562,
    units: 3,
    color: "#E8521A",
    branches: [
      "Jai Shree Metal Perforators — Talawade",
      "Shree Perforators — Talawade",
      "Shree Weld Mesh — Talawade",
    ],
    description:
      "Our primary manufacturing hub in Maharashtra's industrial heartland.",
  },
  {
    name: "Mumbai",
    lat: 19.076,
    lng: 72.8777,
    units: 3,
    color: "#E8521A",
    branches: [
      "Jai Shree Filtration — Masjid Bunder",
      "Jai Shree Industries — Bhayander",
      "Jai Shree Perforator — Palghar",
    ],
    description:
      "Strategic units serving Mumbai's industrial and filtration sectors.",
  },
] as const;

const TILE_URL =
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

const POPUP_STYLES = `
  .custom-popup .leaflet-popup-content-wrapper {
    background: transparent !important;
    border: none !important;
    box-shadow: 0 25px 50px rgba(0,0,0,0.5) !important;
    border-radius: 12px !important;
    padding: 0 !important;
  }
  .custom-popup .leaflet-popup-content {
    margin: 0 !important;
  }
  .custom-popup .leaflet-popup-tip-container {
    display: none !important;
  }
  .custom-popup .leaflet-popup-close-button {
    color: #888888 !important;
    top: 8px !important;
    right: 8px !important;
  }
  .leaflet-control-zoom a {
    background: #1A1A1A !important;
    color: #FFFFFF !important;
    border-color: #2A2A2A !important;
  }
  .leaflet-control-zoom a:hover {
    background: #E8521A !important;
    color: #FFFFFF !important;
  }
  .leaflet-attribution-flag { display: none !important; }
  .leaflet-control-attribution {
    background: rgba(10,10,10,0.7) !important;
    color: #444 !important;
    font-size: 9px !important;
  }
  .leaflet-control-attribution a { color: #666 !important; }
`;

export function IndiaMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let styleEl: HTMLStyleElement | null = null;

    import("leaflet").then((L) => {
      if (!mapRef.current || mapInstanceRef.current) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current, {
        center: [18.9, 73.5],
        zoom: 8,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
      });

      mapInstanceRef.current = map;

      L.tileLayer(TILE_URL, {
        attribution: TILE_ATTRIBUTION,
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(map);

      L.control
        .attribution({ position: "bottomright", prefix: false })
        .addTo(map);

      L.control.zoom({ position: "topright" }).addTo(map);

      LOCATIONS.forEach((loc) => {
        const markerHtml = `
          <div style="position: relative; width: 60px; height: 60px; transform: translate(-50%, -50%);">
            <div style="
              position: absolute;
              top: 50%; left: 50%;
              transform: translate(-50%, -50%);
              width: 60px; height: 60px;
              border-radius: 50%;
              background: rgba(232, 82, 26, 0.15);
              animation: pulse1 2.5s ease-out infinite;
            "></div>
            <div style="
              position: absolute;
              top: 50%; left: 50%;
              transform: translate(-50%, -50%);
              width: 40px; height: 40px;
              border-radius: 50%;
              background: rgba(232, 82, 26, 0.2);
              animation: pulse1 2.5s ease-out infinite 0.5s;
            "></div>
            <div style="
              position: absolute;
              top: 50%; left: 50%;
              transform: translate(-50%, -50%);
              width: 20px; height: 20px;
              border-radius: 50%;
              background: #E8521A;
              border: 3px solid #FF6B35;
              box-shadow: 0 0 20px rgba(232,82,26,0.8), 0 0 40px rgba(232,82,26,0.4);
            "></div>
          </div>
          <style>
            @keyframes pulse1 {
              0% { transform: translate(-50%,-50%) scale(0.5); opacity: 0.8; }
              100% { transform: translate(-50%,-50%) scale(1.8); opacity: 0; }
            }
          </style>
        `;

        const customIcon = L.divIcon({
          html: markerHtml,
          className: "",
          iconSize: [60, 60],
          iconAnchor: [30, 30],
          popupAnchor: [0, -35],
        });

        const popupHtml = `
          <div style="
            background: #111111;
            border: 1px solid rgba(232,82,26,0.4);
            border-radius: 12px;
            padding: 16px 20px;
            min-width: 240px;
            font-family: Arial, sans-serif;
          ">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
              <div style="width:8px;height:8px;border-radius:50%;background:#E8521A;box-shadow:0 0 8px #E8521A;"></div>
              <span style="color:#FFFFFF;font-size:16px;font-weight:700;">${loc.name}</span>
              <span style="color:#E8521A;font-size:11px;margin-left:auto;background:rgba(232,82,26,0.1);padding:2px 8px;border-radius:20px;">
                ${loc.units} Units
              </span>
            </div>
            <p style="color:#888888;font-size:11px;margin:0 0 10px 0;line-height:1.5;">${loc.description}</p>
            <div style="border-top:1px solid #2A2A2A;padding-top:10px;">
              ${loc.branches
                .map(
                  (b) => `
                <div style="
                  display:flex;align-items:center;gap:6px;
                  color:#CCCCCC;font-size:11px;
                  padding: 3px 0;
                ">
                  <div style="width:3px;height:3px;border-radius:50%;background:#E8521A;flex-shrink:0;"></div>
                  ${b}
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        `;

        const marker = L.marker([loc.lat, loc.lng], { icon: customIcon })
          .addTo(map)
          .bindPopup(popupHtml, {
            className: "custom-popup",
            maxWidth: 280,
            closeButton: true,
          });

        marker.on("mouseover", function (this: Marker) {
          this.openPopup();
        });
      });

      styleEl = document.createElement("style");
      styleEl.setAttribute("data-india-map", "true");
      styleEl.textContent = POPUP_STYLES;
      document.head.appendChild(styleEl);

      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }

      const bounds = L.latLngBounds(
        LOCATIONS.map((l) => [l.lat, l.lng] as [number, number])
      );
      map.fitBounds(bounds, { padding: [80, 80] });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      styleEl?.remove();
    };
  }, []);

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl"
        style={{
          border: "1px solid rgba(232, 82, 26, 0.2)",
          boxShadow:
            "0 0 40px rgba(232, 82, 26, 0.05), 0 0 0 1px rgba(232,82,26,0.1)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, transparent 20%, transparent 80%, rgba(10,10,10,0.4) 100%)",
          }}
        />

        <div
          ref={mapRef}
          className="min-h-[320px] w-full sm:min-h-[480px]"
          style={{ height: "480px" }}
        />

        <div className="absolute top-4 left-4 z-20 rounded-full border border-[#2A2A2A] bg-black/70 px-4 py-1.5 backdrop-blur-sm">
          <span className="text-xs font-semibold tracking-widest text-[#E8521A] uppercase">
            Our Locations
          </span>
        </div>
      </motion.div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {LOCATIONS.map((loc) => (
          <motion.div
            key={loc.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 rounded-xl border border-[#2A2A2A] bg-[#111111] px-5 py-4"
          >
            <div className="relative">
              <div className="h-3 w-3 rounded-full bg-[#E8521A]" />
              <div className="absolute inset-0 h-3 w-3 animate-ping rounded-full bg-[#E8521A] opacity-30" />
            </div>
            <div>
              <p className="text-base font-bold text-white">{loc.name}</p>
              <p className="text-xs text-[#E8521A]">
                {loc.units} Manufacturing Units
              </p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs text-[#666]">
                {loc.branches.length} branches
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
