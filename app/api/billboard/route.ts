import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const post = await prisma.wpPost.findFirst({
        where: {
            postStatus: "publish",
            postType: {
                in: ["post"]
            }
        },
        orderBy: {
            postDate: "desc"
        },
        select: {
            postTitle: true,
            postName: true,
            postContent: true,
            postDate: true,
            postMetas: {
                select: {
                    metaKey: true,
                    metaValue: true,
                }
            },
        }
    })

    return NextResponse.json(post);
}