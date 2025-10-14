import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import redis from "@/lib/redis";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
   try {
      const cachedKeys = await redis.keys("settings:*");
      if (cachedKeys.length === 0) {
         const settings = await prisma.settings.findMany();
         for (const item of settings) {
            await redis.set(`settings:${item.name}`, item.value);
         }

         return NextResponse.json(settings);
      }

      const cached = await redis.mget(cachedKeys);
      return NextResponse.json(cached.map((item: any, index: number) => ({
         name: cachedKeys[index].replace("settings:", ""),
         value: item
      })));
   } catch (error) {
      return NextResponse.json({ message: (error as Error).message }, { status: 400 });
   }
}

export async function POST(req: Request) {
   try {
      const session = await auth()
      if (!session?.user) {
         return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
      }

      const body = await req.json();

      for (const item of body) {
         await prisma.settings.upsert({
            where: {
               name: item.name
            },
            create: {
               name: item.name,
               value: item.value
            },
            update: {
               value: item.value
            }
         })

         await redis.del(`settings:${item.name}`);
         await redis.set(`settings:${item.name}`, item.value);
      }

      const sitemapKeys = await redis.keys('sitemap:*');
      for (const key of sitemapKeys) {
         await redis.del(key);
      }

      return new Response(JSON.stringify({ message: "Settings updated" }), { status: 200 });
   } catch (error) {
      return new Response(JSON.stringify({ message: (error as Error).message }), { status: 400 });
   }
}