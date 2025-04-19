import { prisma } from "@/lib/prisma";

export async function getSeries(limit: number) {
  return await prisma.wpPost.findMany({
    where: {
      postType: "tv",
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

export async function getSingleSeries(slug: string) {
  const series = await prisma.wpPost.findFirst({
    where: {
      postType: "tv",
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

  if (!series) return null;

  const tmdbId = series.postMetas.find(
    (item: any) => item.metaKey === "IDMUVICORE_tmdbID"
  )?.metaValue;
  if (!tmdbId) {
    return series;
  }

  const episodes = await prisma.wpPost.findMany({
    where: {
      postMetas: {
        some: {
          metaKey: "IDMUVICORE_tmdbID",
          metaValue: tmdbId,
        },
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
        },
      },
    },
  });

  return { ...series, episodes };
}
