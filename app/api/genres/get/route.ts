import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const slug = req.nextUrl.searchParams.get("slug") || null;
    const limit = Number(req.nextUrl.searchParams.get("limit")) || 24;
    const orderBy = req.nextUrl.searchParams.get("orderBy") || "title";

    if (!slug) return NextResponse.json({ error: "slug is required" }, { status: 400 });

    const genre = await prisma.wpTerm.findFirst({
        where: {
            slug: slug,
            termTaxonomy: {
                taxonomy: "category"
            }
        },
        select: {
            name: true,
            termTaxonomy: {
                select: {
                    ID: true
                }
            }
        }
    })

    if (!genre) return NextResponse.json({ error: "genre not found" }, { status: 404 });

    const posts = await prisma.wpPost.findMany({
        where: {
            relationships: {
                some: {
                    termTaxonomyId: genre.termTaxonomy?.ID,
                }
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
                        in: ["_knawatfibu_url", "IDMUVICORE_tmdbRating"],
                    },
                },
            },
        },
        take: limit,
        orderBy: {
            postTitle: orderBy === "title" ? "asc" : undefined,
            postModified: orderBy === "modified" ? "asc" : undefined,
        }
    })

    return NextResponse.json({
        genre,
        posts
    });
}