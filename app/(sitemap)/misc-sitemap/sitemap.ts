import { prisma } from "@/lib/prisma";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString().split("T")[0];
  const websiteUrlDB = await prisma.settings.findFirst({
    where: { name: "site-url" },
    select: { value: true },
  });
  const websiteUrl = websiteUrlDB?.value || "http://localhost:3000";

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
