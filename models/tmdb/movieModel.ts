import redis from "@/lib/redis";
import fetchTmdb from "@/lib/tmdb";

export const getMovie = async (id: string | number) => {
   const cachedKey = `tmdb:movies:id:${id}`;

   const cachedData = await redis.get(cachedKey);
   if (cachedData) {
      return JSON.parse(cachedData);
   }

   const result = await fetchTmdb(`/movie/${id}?append_to_response=credits,videos,recommendations`);
   if (!result) return null;

   await redis.set(cachedKey, JSON.stringify(result), "EX", 60 * 60 * 24); // Cache for 24 hours
   return result;
}

export const getMoviesByGenre = async (genreId: string | number, page: string | number) => {
   const cachedKey = `tmdb:genres:movies:id:${genreId}:page:${page}`;

   const cachedData = await redis.get(cachedKey);
   if (cachedData) {
      return JSON.parse(cachedData);
   }

   const results = await fetchTmdb(`/discover/movie?with_genres=${genreId}&page=${page}`);
   await redis.set(cachedKey, JSON.stringify(results), "EX", 60 * 60 * 24); // Cache for 24 hours

   return results;
}

export const getNowPlayingMovies = async () => {
   const cacheKey = "tmdb:movies:now_playing";

   const cachedData = await redis.get(cacheKey);
   if (cachedData) {
      return JSON.parse(cachedData);
   }

   const { results } = await fetchTmdb("/movie/now_playing");
   await redis.set(cacheKey, JSON.stringify(results), "EX", 60 * 60 * 6); // Cache for 6 hours

   return results;
}

export const getTopRatedMovies = async () => {
   const cacheKey = "tmdb:movies:top_rated";

   const cachedData = await redis.get(cacheKey);
   if (cachedData) {
      return JSON.parse(cachedData);
   }

   const { results } = await fetchTmdb("/movie/top_rated");
   await redis.set(cacheKey, JSON.stringify(results), "EX", 60 * 60 * 6); // Cache for 6 hours

   return results;
}

export const getUpcomingMovies = async () => {
   const cacheKey = "tmdb:movies:upcoming";

   const cachedData = await redis.get(cacheKey);
   if (cachedData) {
      return JSON.parse(cachedData);
   }

   const { results } = await fetchTmdb("/movie/upcoming");
   await redis.set(cacheKey, JSON.stringify(results), "EX", 60 * 60 * 6); // Cache for 6 hours

   return results;
}