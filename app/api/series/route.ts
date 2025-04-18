import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const limit = req.nextUrl.searchParams.get("limit") || 10;

  const movies = await prisma.wpPost.findMany({
    where: {
        postType: "tv",
        postStatus: "publish"
    },
    select: {
      postTitle: true,
      postName: true,
      postMetas: {
        select: {
          metaKey: true,
          metaValue: true,
        },
        where: {
          metaKey: {
            in: ["_knawatfibu_url", "IDMUVICORE_Poster", "IDMUVICORE_tmdbRating"],
          },
        },
      },
    },
    take: Number(limit),
    orderBy: {
      postModified: "desc",
    },
  });

  return NextResponse.json(movies);
}
