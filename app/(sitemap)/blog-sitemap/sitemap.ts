import { prisma } from "@/lib/prisma";
import { MetadataRoute } from "next";
import { unstable_cache } from "next/cache";

const getBlogSitemaps = unstable_cache(async () => {
   return await prisma.blog.findMany({
      orderBy: {
         createdAt: 'asc',
      },
      select: {
         slug: true,
         updatedAt: true,
      },
   });
}, ["blog-sitemaps"], { tags: ["blog-sitemaps"], revalidate: 60 * 60 * 24 * 7 });

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
   const websiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

   const blogs = await getBlogSitemaps();
   
   return blogs.map((blog) => ({
      url: new URL(`/blogs/${blog.slug}`, websiteUrl).href,
      lastModified: new Date(blog.updatedAt).toISOString().split("T")[0],
      changeFrequency: "weekly",
      priority: 0.9,
   }));
}