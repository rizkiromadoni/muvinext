import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const body = await req.json();
    const { title, content, imageUrl, categories } = body;

    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content are required" },
        { status: 400 }
      );
    }

    const isExist = await prisma.blog.findFirst({
      where: { slug: slugify(title) },
    });

    if (isExist) {
      return NextResponse.json(
        { message: "Blog with this title already exists" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: { username: session.user.username },
    })

    const blog = await prisma.blog.create({
      data: {
        userId: user?.id || 1,
        title,
        slug: slugify(title),
        content,
        imageUrl,
        blogCategories: {
          connectOrCreate: categories?.map((category: string) => {
            return {
              where: { slug: slugify(category) },
              create: { name: category, slug: slugify(category) },
            };
          }),
        },
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Blog creation failed" },
      { status: 500 }
    );
  }
}
