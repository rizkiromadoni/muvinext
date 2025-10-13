import { prisma } from "./lib/prisma";
import redis from "./lib/redis"

export const getSettings = async () => {
   let keys = await redis.keys("settings:*");
   if (keys.length === 0) {
      const settings = await prisma.settings.findMany();
      for (const item of settings) {
         await redis.set(`settings:${item.name}`, item.value);
      }
   };

   keys = await redis.keys("settings:*");
   if (keys.length === 0) return [];
   
   const settings = await redis.mget(keys);
   return settings.map((item: any, index: number) => ({
      name: keys[index].replace("settings:", ""),
      value: item
   }))
}