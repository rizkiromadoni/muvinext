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

export async function getSetting(name: string) {
   const cached = await redis.get(`settings:${name}`);
   if (cached) return cached;

   const setting = await prisma.settings.findUnique({
      where: { name }
   })

   if (setting) {
      await redis.set(`settings:${name}`, setting.value);
      return setting.value;
   }

   return null;
}