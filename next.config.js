const nextConfig = {
  async rewrites() {
    const cmsApi = process.env.CMS_API_URL || process.env.NEXT_PUBLIC_CMS_API_URL || "";
    if (!cmsApi) {
      return { beforeFiles: [], afterFiles: [], fallback: [] };
    }
    const backendOrigin = cmsApi.replace(/\/api\/v1\/?$/, "").replace(/\/$/, "");
    const assetFolders = ["home-assets", "gallery", "event-assets", "service-assets", "hotel-assets", "contact-assets", "dining-catering"];
    const rootImages = ["magnoliya-grand-share.jpg", "magnoliya-hero.png", "og.jpg", "og.png"];
    return {
      beforeFiles: [
        ...rootImages.map((file) => ({
          source: `/${file}`,
          destination: `${backendOrigin}/uploads/frontend-assets/root/${file}`,
        })),
        ...assetFolders.map((folder) => ({
        source: `/${folder}/:path+`,
        destination: `${backendOrigin}/uploads/frontend-assets/${folder}/:path+`,
        })),
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return [
      {
        source: "/home-assets/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000" },
        ],
      },
      {
        source: "/gallery/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000" },
        ],
      },
      {
        source: "/og.jpg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000" },
        ],
      },
    ];
  },
};
export default nextConfig;
