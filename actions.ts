import redis from "./lib/redis"

export const getSettings = async () => {
   const keys = await redis.keys("settings:*");
   if (keys.length === 0) return [];

   const settings = await redis.mget(keys);
   return settings.map((item: any, index: number) => ({
      name: keys[index].replace("settings:", ""),
      value: item
   }))
}