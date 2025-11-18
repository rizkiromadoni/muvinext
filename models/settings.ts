import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getSettings= unstable_cache(async () =>{
   return await prisma.settings.findMany();
}, ["settings"], { tags: ["settings"] });