import { blogArticles, pageSlugs } from "./site-data";
import { SITE_URL } from "./seo-config";

export default function sitemap() {
  const baseUrl = SITE_URL;
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...pageSlugs.map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: now,
      changeFrequency: slug === "gallery" || slug === "faq" ? "monthly" : "yearly",
      priority: ["venue", "features", "contact", "weddings", "corporate-conferences"].includes(slug) ? 0.9 : 0.75,
    })),
    {
      url: `${baseUrl}/dining-catering`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.9,
    },
    ...Object.keys(blogArticles).map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date("2026-08-04"),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}
