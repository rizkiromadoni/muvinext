import { prisma } from '@/lib/prisma';
import type { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString().split("T")[0];
  const websiteUrl = await prisma.settings.findFirst({
    where: { name: "site-url" },
    select: { value: true },
  });

  if (!websiteUrl || !websiteUrl.value) {
    throw new Error("Site URL is not configured in settings.");
  }

  const results: MetadataRoute.Sitemap = [
    {
      url: new URL('/movies', websiteUrl.value).href,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: new URL('/tv', websiteUrl.value).href,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  return results;
}