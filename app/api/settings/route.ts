import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

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
      }

      revalidateTag("settings");
      return new Response(JSON.stringify({ message: "Settings updated" }), { status: 200 });
   } catch (error) {
      return new Response(JSON.stringify({ message: (error as Error).message }), { status: 400 });
   }
}