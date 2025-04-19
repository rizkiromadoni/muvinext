import { prisma } from "@/lib/prisma";

export async function getBillboard() {
  return await prisma.wpPost.findFirst({
    where: {
      postStatus: "publish",
      postType: {
        in: ["post"],
      },
    },
    orderBy: {
      postDate: "desc",
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
        },
      },
    },
  });
}
