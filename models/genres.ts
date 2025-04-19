import { prisma } from "@/lib/prisma";

export async function getSingleGenre(
  slug: string,
  limit: number,
  orderBy: "title" | "modified"
) {
  const genre = await prisma.wpTerm.findFirst({
    where: {
      slug: slug,
      termTaxonomy: {
        taxonomy: "category",
      },
    },
    select: {
      name: true,
      termTaxonomy: {
        select: {
          ID: true,
        },
      },
    },
  });

  if (!genre) return null;

  const posts = await prisma.wpPost.findMany({
    where: {
      relationships: {
        some: {
          termTaxonomyId: genre.termTaxonomy?.ID,
        },
      },
      postStatus: "publish",
      postType: {
        in: ["post", "tv"],
      },
    },
    select: {
      postTitle: true,
      postName: true,
      postType: true,
      postMetas: {
        select: {
          metaKey: true,
          metaValue: true,
        },
        where: {
          metaKey: {
            in: ["_knawatfibu_url", "IDMUVICORE_tmdbRating"],
          },
        },
      },
    },
    take: limit,
    orderBy: {
      postTitle: orderBy === "title" ? "asc" : undefined,
      postModified: orderBy === "modified" ? "asc" : undefined,
    },
  });

  return {
    genre,
    posts,
  };
}
