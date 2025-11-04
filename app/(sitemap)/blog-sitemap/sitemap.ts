import { prisma } from "@/lib/prisma";
import { MetadataRoute } from "next";

export async function generateSitemaps() {
   const totalBlogPosts = await prisma.blog.count();
   const blogsPerPage = 20;
   const totalPages = Math.ceil(totalBlogPosts / blogsPerPage);
   return new Array(totalPages).fill(0).map((_, i) => ({ id: i + 1 }));
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
   const websiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
   const blogsPerPage = 20;
   const page = id;
   const skip = (page - 1) * blogsPerPage;

   const blogs = await prisma.blog.findMany({
      skip: skip,
      take: blogsPerPage,
      orderBy: {
         createdAt: 'asc',
      },
      select: {
         slug: true,
         updatedAt: true,
      },
   });
   
   const sitemapEntries: MetadataRoute.Sitemap = blogs.map((blog) => ({
      url: new URL(`/blogs/${blog.slug}`, websiteUrl).href,
      lastModified: blog.updatedAt,
      changeFrequency: "weekly",
      priority: 0.9,
   }));

   return sitemapEntries;
}