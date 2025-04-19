import MovieGrid from "@/components/MovieGrid";
import NotFound from "@/components/NotFound";
import { getSingleGenre } from "@/models/genres";
import React from "react";

interface SingleGenreProps {
  params: Promise<{
    slug: string;
  }>;
}

const SingleGenre: React.FC<SingleGenreProps> = async ({ params }) => {
  const { slug } = await params;

  const genre = await getSingleGenre(slug, 24, "title");
  if (!genre) return <NotFound />;

  return (
    <div className="w-full relative overflow-x-hidden overflow-y-auto">
      <MovieGrid
        title={`Genre: ${genre.genre.name}`}
        data={genre.posts.map((item: any) => ({
          title: item.postTitle,
          url: `/${item.postType === "post" ? "movies" : "series"}/${
            item.postName
          }`,
          poster: item.postMetas.find(
            (meta: any) =>
              meta.metaKey === "_knawatfibu_url" ||
              meta.metaKey === "IDMUVICORE_Poster"
          )?.metaValue,
          rating:
            item.postMetas.find(
              (meta: any) => meta.metaKey === "IDMUVICORE_tmdbRating"
            )?.metaValue || null,
        }))}
      />
    </div>
  );
};

export default SingleGenre;
