import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import redis from "@/lib/redis";

export async function GET(req: Request) {
   try {
      const settings = await prisma.settings.findMany();
      return new Response(JSON.stringify(settings))
   } catch (error) {
      return new Response(JSON.stringify({ message: (error as Error).message }), { status: 500 });
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

      return new Response(JSON.stringify({ message: "Settings updated" }), { status: 200 });
   } catch (error) {
      return new Response(JSON.stringify({ message: (error as Error).message }), { status: 400 });
   }
}