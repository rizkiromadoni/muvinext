import { SiteHeader } from "@/components/site-header";
import React from "react";
import { DataTable } from "./data-table";
import { prisma } from "@/lib/prisma";
import { DeleteDialogProvider } from "./delete-dialog-context";

const Page = async () => {
  const data = await prisma.blog.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    }
  });

  return (
    <>
      <DeleteDialogProvider>
        <SiteHeader
          title="Blogs"
          buttonRight={{ title: "Create Blog", url: "/admin/blogs/create" }}
        />
        <div className="py-4 md:py-6">
          <DataTable data={data} />
          {/* <DataTable2 columns={columns} data={data} /> */}
        </div>
      </DeleteDialogProvider>
    </>
  );
};

export default Page;
