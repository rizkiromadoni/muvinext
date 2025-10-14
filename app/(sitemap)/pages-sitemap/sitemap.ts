import { prisma } from '@/lib/prisma';
import type { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString().split("T")[0];
  const websiteUrlDB = await prisma.settings.findFirst({
         where: { name: "site-url" },
         select: { value: true },
      });
      const websiteUrl = websiteUrlDB?.value || "http://localhost:3000";

  const results: MetadataRoute.Sitemap = [
    {
      url: new URL('/movies', websiteUrl).href,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: new URL('/tv', websiteUrl).href,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  return results;
}