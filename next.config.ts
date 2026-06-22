import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/products/wire-mesh",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/products/welded-mesh",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/products/demister-pad",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/products/aluminum-grill-profile",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/pune/wire-mesh-manufacturers",
        destination: "/pune/perforated-sheet-manufacturers",
        permanent: true,
      },
      {
        source: "/mumbai/wire-mesh-manufacturers",
        destination: "/mumbai/perforated-sheet-manufacturers",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
