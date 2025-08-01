import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const ReviewSchama = z.object({
   tmdbId: z.number(),
   name: z.string(),
   rating: z.number().min(1).max(5),
   comment: z.string(),
})

export async function GET(req: Request) {
   const { searchParams } = new URL(req.url);
   const tmdbId = searchParams.get("tmdbId");

   if (!tmdbId) return NextResponse.json({ error: "TMDB ID is required" }, { status: 400 });

   const result = await prisma.review.findMany({
      where: {
         tmdbId: Number(tmdbId),
      },
      orderBy: { createdAt: "desc" },
   });

   return NextResponse.json(result);
}

export async function POST(req: Request) {
   const body = await req.json();
   const review = ReviewSchama.safeParse(body);

   if (review.success) {
      const result = await prisma.review.create({
         data: review.data,
      })

      return NextResponse.json(result);
   }

   return NextResponse.json({ error: review.error }, { status: 400 });
}