import redis from "@/lib/redis";
import fetchTmdb from "@/lib/tmdb";

export const getMovieGenres = async () => {
   const cacheKey = "tmdb:genres:movies"

   const cachedData = await redis.get(cacheKey);
   if (cachedData) {
      return JSON.parse(cachedData);
   }

   const { genres } = await fetchTmdb("/genre/movie/list");
   await redis.set(cacheKey, JSON.stringify(genres), "EX", 60 * 60 * 24 * 7); // Cache for 7 days

   return genres;
}

export const getTVGenres = async () => {
   const cacheKey = "tmdb:genres:tv";

   const cachedData = await redis.get(cacheKey);
   if (cachedData) {
      return JSON.parse(cachedData);
   }

   const { genres } = await fetchTmdb("/genre/tv/list");
   await redis.set(cacheKey, JSON.stringify(genres), "EX", 60 * 60 * 24 * 7); // Cache for 7 days

   return genres;
}