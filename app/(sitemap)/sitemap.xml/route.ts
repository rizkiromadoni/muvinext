import { buildSitemapIndex } from "@/lib/helper";
import { NextResponse } from "next/server";

export async function GET() {
  const currentDate = new Date().toISOString().split("T")[0];
  const websiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const sitemaps = [
    {
      url: new URL("/misc-sitemap/sitemap.xml", websiteUrl).href,
      lastModified: currentDate,
    },
    {
      url: new URL("/pages-sitemap/sitemap.xml", websiteUrl).href,
      lastModified: currentDate,
    },
    {
      url: new URL("/movie-sitemap/sitemap/sitemap.xml", websiteUrl).href,
      lastModified: currentDate,
    },
    {
      url: new URL("/tv-sitemap/sitemap/sitemap.xml", websiteUrl).href,
      lastModified: currentDate,
    },
    {
      url: new URL("/blog-sitemap/sitemap.xml", websiteUrl).href,
      lastModified: currentDate,
    },
  ];

  const sitemapIndexXML = buildSitemapIndex(sitemaps);
  return new NextResponse(sitemapIndexXML, {
    headers: {
      "Content-Type": "application/xml",
      "Content-Length": Buffer.byteLength(sitemapIndexXML).toString(),
    },
  });
}
