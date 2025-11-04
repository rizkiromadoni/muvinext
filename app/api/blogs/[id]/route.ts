import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const { id } = await params;
  const body = await request.json();
  const { title, content, imageUrl, categories } = body;

  if (!title || !content) {
    return NextResponse.json(
      { message: "Title and content are required" },
      { status: 400 }
    );
  }

  try {
    await prisma.blog.update({
      where: { id: Number(id) },
      data: {
        title,
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

    return NextResponse.json(
      { message: "Blog updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Blog update failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const p = await params;
  const blogId = Number(p.id);

  if (!blogId || isNaN(blogId)) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  try {
    await prisma.blog.delete({
      where: { id: blogId },
    });

    return NextResponse.json(
      { message: `Blog with id ${blogId} deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
