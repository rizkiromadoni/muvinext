import { prisma } from '@/lib/prisma';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const ReviewSchema = z.object({
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
   const { searchParams } = new URL(req.url);
   const token = searchParams.get("token");

   if (!token) return NextResponse.json({ error: "Token is required" }, { status: 400 });

   // verify recaptcha
   const secretKey = process.env.CAPTCHA_SECRET_KEY;
   const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
   
   const response = await fetch(verifyUrl, {
      method: "POST",
   });

   const captchaResponse = await response.json();
   if (!captchaResponse.success) {
      return NextResponse.json({ error: "Failed to verify reCAPTCHA" }, { status: 400 });
   }

   const body = await req.json();
   const review = ReviewSchema.safeParse(body);

   if (review.success) {
      const result = await prisma.review.create({
         data: review.data,
      })

      revalidateTag(`review:${review.data.tmdbId}`);
      return NextResponse.json(result);
   }

   return NextResponse.json({ error: review.error }, { status: 400 });
}