import { prisma } from "@/lib/prisma";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
   const currentDate = new Date().toISOString().split("T")[0];
   const websiteUrl = await prisma.settings.findFirst({
       where: { name: "site-url" },
       select: { value: true },
     });
   
     if (!websiteUrl || !websiteUrl.value) {
       throw new Error("Site URL is not configured in settings.");
     }

   const sitemap: MetadataRoute.Sitemap = [
      {
         url: websiteUrl.value,
         lastModified: currentDate,
         changeFrequency: "daily",
         priority: 1,
      }
   ];

   return sitemap;
}