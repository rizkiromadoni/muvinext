import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString().split("T")[0];
  const websiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const results: MetadataRoute.Sitemap = [
    {
      url: new URL("/movies", websiteUrl).href,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: new URL("/tv", websiteUrl).href,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  return results;
}
