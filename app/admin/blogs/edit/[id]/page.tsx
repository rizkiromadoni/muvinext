import { SiteHeader } from "@/components/site-header";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
import EditBlogForm from "./form";

interface EditBlogProps {
  params: Promise<{
    id: string;
  }>;
}

const EditBlogPage: React.FC<EditBlogProps> = async ({ params }) => {
  const { id } = await params;
  if (isNaN(Number(id))) {
    notFound();
  }

  const blog = await prisma.blog.findUnique({
    where: { id: Number(id) },
    include: {
      blogCategories: true
    }
  });

  if (!blog) {
    notFound();
  }

  return (
    <>
      <SiteHeader title="Edit Blog" />
      <div className="flex min-h-svh w-full justify-center p-6 md:p-10">
        <div className="w-full">
          <EditBlogForm defaultValues={{
            title: blog.title,
            content: blog.content,
            imageUrl: blog.imageUrl || undefined,
            categories: blog.blogCategories.map((cat) => cat.name).join(",")
          }} id={id} />
        </div>
      </div>
    </>
  );
};

export default EditBlogPage;
