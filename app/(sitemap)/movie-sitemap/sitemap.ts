import { prisma } from "@/lib/prisma";
import redis from "@/lib/redis";
import type { MetadataRoute } from "next";

export async function generateSitemaps() {
  return new Array(
    process.env.MOVIE_SITEMAP_PAGES
      ? parseInt(process.env.MOVIE_SITEMAP_PAGES)
      : 40
  )
    .fill(0)
    .map((_, i) => ({ id: i }));
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const cacheKey = `sitemap:movie:${Number(id) + 1}`;

  // Try cache first
  const cached = await redis.get(cacheKey);
  if (cached) {
    const parsed = JSON.parse(cached);
    return parsed.results;
  }

  const websiteUrlDB = await prisma.settings.findFirst({
    where: { name: "site-url" },
    select: { value: true },
  });
  const websiteUrl = websiteUrlDB?.value || "http://localhost:3000";

  const currentDate = new Date().toISOString().split("T")[0];
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?page=${Number(id) + 1}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY!}`,
      },
    }
  );

  const data = await res.json();
  if (!data.results?.length) {
    return [];
  }

  const results = data.results.map((movie: any) => ({
    url: new URL(`/movies/${movie.id}`, websiteUrl).href,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  await redis.set(
    cacheKey,
    JSON.stringify({
      page: id + 1,
      results,
    }),
    "EX",
    60 * 60 * 24 * 7
  ); // Cache for 7 days
  return results;
}
