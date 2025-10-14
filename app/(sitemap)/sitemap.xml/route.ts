import redis from "@/lib/redis";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function buildSitemapIndex(sitemaps: { url: string, lastModified: string | undefined }[]) {
   let xml = '<?xml version="1.0" encoding="UTF-8"?>';
   xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

   for (const sitemap of sitemaps) {
      xml += '<sitemap>';
      xml += `<loc>${sitemap.url}</loc>`;
      xml += sitemap.lastModified ? `<lastmod>${sitemap.lastModified}</lastmod>` : '';
      xml += '</sitemap>';
   }

   xml += '</sitemapindex>';
   return xml;
}

export async function GET() {
   try {
      const websiteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

      const currentDate = new Date().toISOString().split("T")[0];
      const movieTotalPages = process.env.MOVIE_SITEMAP_PAGES ? parseInt(process.env.MOVIE_SITEMAP_PAGES) : 40;
      const tvSeriesTotalPages = process.env.TV_SITEMAP_PAGES ? parseInt(process.env.TV_SITEMAP_PAGES) : 40;
      
      const movieSitemapKeys = await redis.keys('sitemap:movie:*');
      const tvSitemapKeys = await redis.keys('sitemap:tv:*');

      // If the number of cached sitemaps is less than the expected total pages, clear the cache
      if (movieSitemapKeys.length < movieTotalPages) {
         for (const key of movieSitemapKeys) {
            await redis.del(key);
         }
      }

      if (tvSitemapKeys.length < tvSeriesTotalPages) {
         for (const key of tvSitemapKeys) {
            await redis.del(key);
         }
      }

      const movieSitemapsCache = movieSitemapKeys.length > 0 ? await redis.mget(movieSitemapKeys) : [];
      const tvSitemapsCache = tvSitemapKeys.length > 0 ? await redis.mget(tvSitemapKeys) : [];
      const movieSitemaps = movieSitemapsCache.map(item => item ? JSON.parse(item) : []);
      const tvSitemaps = tvSitemapsCache.map(item => item ? JSON.parse(item) : []);

      const sitemaps = [
         {
            url: new URL('/misc-sitemap/sitemap.xml', websiteUrl).href,
            lastModified: currentDate,
         },
         {
            url: new URL('/pages-sitemap/sitemap.xml', websiteUrl).href,
            lastModified: currentDate,
         }
      ];

      for (let i = 1; i <= movieTotalPages; i++) {
         const sitemap = movieSitemaps.find((sitemap: any) => sitemap.page === i);

         sitemaps.push({
            url: new URL(`/movie-sitemap/sitemap/${i}.xml`, websiteUrl).href,
            lastModified: sitemap && sitemap.results.length > 0 ? sitemap.results[0].lastModified : currentDate
         })
      }

      for (let i = 1; i <= tvSeriesTotalPages; i++) {
         const sitemap = tvSitemaps.find((sitemap: any) => sitemap.page === i);

         sitemaps.push({
            url: new URL(`/tv-sitemap/sitemap/${i}.xml`, websiteUrl).href,
            lastModified: sitemap && sitemap.results.length > 0 ? sitemap.results[0].lastModified : currentDate
         })
      }

      const sitemapIndexXML = await buildSitemapIndex(sitemaps);
      return new NextResponse(sitemapIndexXML, {
         headers: {
            'Content-Type': 'application/xml',
            'Content-Length': Buffer.byteLength(sitemapIndexXML).toString(),
         },
      });
   } catch (error) {
      console.error("Error generating sitemap index:", error);
      return NextResponse.error();
   }
}