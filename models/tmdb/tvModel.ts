import redis from "@/lib/redis";
import fetchTmdb from "@/lib/tmdb";

export const getTVSeries = async (id: string | number) => {
   const cachedKey = `tmdb:tv:id:${id}`;

   const cachedData = await redis.get(cachedKey);
   if (cachedData) {
      return JSON.parse(cachedData);
   }

   const result = await fetchTmdb(`/tv/${id}?append_to_response=credits,videos,recommendations`);
   if (!result) return null;

   await redis.set(cachedKey, JSON.stringify(result), "EX", 60 * 60 * 24); // Cache for 24 hours
   return result;
}

export const getTVSeriesByGenre = async (genreId: string | number, page: string | number) => {
   const cachedKey = `tmdb:genres:tv:id:${genreId}:page:${page}`;

   const cachedData = await redis.get(cachedKey);
   if (cachedData) {
      return JSON.parse(cachedData);
   }

   const results = await fetchTmdb(`/discover/tv?with_genres=${genreId}&page=${page}`);
   await redis.set(cachedKey, JSON.stringify(results), "EX", 60 * 60 * 24); // Cache for 24 hours

   return results;
}

export const getAiringTodaySeries = async () => {
   const cacheKey = "tmdb:tv:airing_today";

   const cachedData = await redis.get(cacheKey);
   if (cachedData) {
      return JSON.parse(cachedData);
   }

   const { results } = await fetchTmdb("/tv/airing_today")
   await redis.set(cacheKey, JSON.stringify(results), "EX", 60 * 60 * 6); // Cache for 6 hours

   return results;
}

export const getOnTheAirSeries = async () => {
   const cacheKey = "tmdb:tv:on_the_air";

   const cachedData = await redis.get(cacheKey);
   if (cachedData) {
      return JSON.parse(cachedData);
   }

   const { results } = await fetchTmdb("/tv/on_the_air")
   await redis.set(cacheKey, JSON.stringify(results), "EX", 60 * 60 * 6); // Cache for 6 hours

   return results;
}

export const getTopRatedSeries = async () => {
   const cacheKey = "tmdb:tv:top_rated";

   const cachedData = await redis.get(cacheKey);
   if (cachedData) {
      return JSON.parse(cachedData);
   }

   const { results } = await fetchTmdb("/tv/top_rated")
   await redis.set(cacheKey, JSON.stringify(results), "EX", 60 * 60 * 6); // Cache for 6 hours

   return results;
}