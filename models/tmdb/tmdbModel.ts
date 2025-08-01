import redis from "@/lib/redis";
import fetchTmdb from "@/lib/tmdb";

export const getBillboard = async () => {
   const cacheKey = "tmdb:billboard";

   const cachedData = await redis.get(cacheKey);
   if (cachedData) {
      return JSON.parse(cachedData);
   }

   const data = await fetchTmdb("/trending/all/week")
   const billboard = data.results.filter((item: any) => item.media_type === "movie" || item.media_type === "tv").shift()

   await redis.set(cacheKey, JSON.stringify(billboard), "EX", 60 * 60 * 6); // Cache for 6 hours
   return billboard;
}

export const getTrendingMovies = async () => {
   const cacheKey = "tmdb:trending:movies";

   const cachedData = await redis.get(cacheKey);
   if (cachedData) {
      return JSON.parse(cachedData);
   }

   const { results } = await fetchTmdb("/trending/movie/day")

   await redis.set(cacheKey, JSON.stringify(results), "EX", 60 * 60 * 6); // Cache for 6 hours
   return results;
}

export const getTrendingTV = async () => {
   const cacheKey = "tmdb:trending:tv";

   const cachedData = await redis.get(cacheKey);
   if (cachedData) {
      return JSON.parse(cachedData);
   }

   const { results } = await fetchTmdb("/trending/tv/day")

   await redis.set(cacheKey, JSON.stringify(results), "EX", 60 * 60 * 6); // Cache for 6 hours
   return results;
}