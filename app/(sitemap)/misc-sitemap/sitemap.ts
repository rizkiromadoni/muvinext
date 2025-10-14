import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString().split("T")[0];
  const websiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const sitemap: MetadataRoute.Sitemap = [
    {
      url: websiteUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  return sitemap;
}
