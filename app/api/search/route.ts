import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const q = req.nextUrl.searchParams.get("q");
    const limit = req.nextUrl.searchParams.get("limit") || 24;
    const page = req.nextUrl.searchParams.get("page") || 1;

    if (!q) return NextResponse.json({ error: "q is required" }, { status: 400 });

    const posts = await prisma.wpPost.findMany({
        where: {
            postTitle: {
                contains: q
            },
            postStatus: "publish",
            postType: {
                in: ["post", "tv"]
            }
        },
        select: {
            postTitle: true,
            postName: true,
            postType: true,
            postMetas: {
                select: {
                    metaKey: true,
                    metaValue: true,
                },
                where: {
                    metaKey: {
                        in: ["_knawatfibu_url", "IDMUVICORE_Poster", "IDMUVICORE_tmdbRating"]
                    },
                },
            },
        },
        take: Number(limit),
        skip: (Number(page) - 1) * Number(limit),
        orderBy: {
            postTitle: "asc"
        }
    })

    return NextResponse.json(posts)
}