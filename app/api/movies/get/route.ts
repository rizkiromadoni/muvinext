import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug") || null;
  if (!slug) return NextResponse.json({ error: "slug is required" }, { status: 400 });

  const post = await prisma.wpPost.findFirst({
    where: {
        postType: "post",
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

  if (!post) return NextResponse.json({ error: "post not found" }, { status: 404 });

  return NextResponse.json(post);
}
