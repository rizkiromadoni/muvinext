import type { MetadataRoute } from "next";

export async function generateSitemaps() {
  return new Array(
    process.env.TV_SITEMAP_PAGES ? parseInt(process.env.TV_SITEMAP_PAGES) : 40
  )
    .fill(0)
    .map((_, i) => ({ id: i + 1 }));
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const websiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const currentDate = new Date().toISOString().split("T")[0];
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/popular?page=${Number(id)}`,
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

  return data.results.map((movie: any) => ({
    url: new URL(`/tv/${movie.id}`, websiteUrl).href,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));
}
