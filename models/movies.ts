import { prisma } from "@/lib/prisma";

export async function getMovies(limit: number) {
  return await prisma.wpPost.findMany({
    where: {
      postType: "post",
      postStatus: "publish",
    },
    select: {
      postTitle: true,
      postName: true,
      postMetas: {
        select: {
          metaKey: true,
          metaValue: true,
        },
        where: {
          metaKey: {
            in: [
              "_knawatfibu_url",
              "IDMUVICORE_Poster",
              "IDMUVICORE_tmdbRating",
            ],
          },
        },
      },
    },
    take: limit,
    orderBy: {
      postModified: "desc",
    },
  });
}

export async function getSingleMovie(slug: string) {
  return await prisma.wpPost.findFirst({
    where: {
      postType: "post",
      postStatus: "publish",
      postName: slug,
    },
    select: {
      postTitle: true,
      postName: true,
      postContent: true,
      postMetas: {
        select: {
          metaKey: true,
          metaValue: true,
        },
      },
      relationships: {
        select: {
          taxonomy: {
            select: {
              taxonomy: true,
              term: {
                select: {
                  name: true,
                  slug: true,
                },
              },
            },
          },
        },
      },
    },
  });
}
