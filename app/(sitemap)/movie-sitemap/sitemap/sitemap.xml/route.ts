import { buildSitemapIndex } from "@/lib/helper";
import { NextResponse } from "next/server";

export function GET() {
   const movieTotalPages = process.env.MOVIE_SITEMAP_PAGES ? Number(process.env.MOVIE_SITEMAP_PAGES) : 40;

   const currentDate = new Date().toISOString().split("T")[0];
   const websiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

   const sitemaps = new Array(movieTotalPages).fill(0).map((_, i) => ({ id: i })).map(({ id }) => ({
      url: new URL(`/movie-sitemap/sitemap/${id + 1}.xml`, websiteUrl).href,
      lastModified: currentDate,
   }));

   const sitemapIndexXML = buildSitemapIndex(sitemaps);
   return new NextResponse(sitemapIndexXML, {
      headers: {
         "Content-Type": "application/xml",
         "Content-Length": Buffer.byteLength(sitemapIndexXML).toString(),
      },
   });
}