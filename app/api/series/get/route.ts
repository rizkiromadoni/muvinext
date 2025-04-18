import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug") || null;
  if (!slug) return NextResponse.json({ error: "slug is required" }, { status: 400 });

  const post = await prisma.wpPost.findFirst({
    where: {
        postType: "tv",
        postStatus: "publish",
        postName: slug
    },
    select: {
      postTitle: true,
      postName: true,
      postContent: true,
      postMetas: {
        select: {
          metaKey: true,
          metaValue: true,
        }
      },
      relationships: {
        select: {
          taxonomy: {
            select: {
              taxonomy: true,
              term: {
                select: {
                  name: true,
                  slug: true
                }
              }
            }
          }
        }
      }
    }
  });

  if (!post) return NextResponse.json({ error: "series not found" }, { status: 404 });
  const tmdbId = post?.postMetas.find((item: any) => item.metaKey === "IDMUVICORE_tmdbID")?.metaValue;

  if (!tmdbId) {
    return NextResponse.json(post);
  }

  const episodes = await prisma.wpPost.findMany({
    where: {
      postMetas: {
        some: {
          metaKey: "IDMUVICORE_tmdbID",
          metaValue: tmdbId
        }
      },
      postType: "episode",
      postStatus: "publish",
    },
    select: {
      postTitle: true,
      postName: true,
      postMetas: {
        select: {
          metaKey: true,
          metaValue: true,
        }
      }
    }
  })

  return NextResponse.json({ ...post, episodes });
}
