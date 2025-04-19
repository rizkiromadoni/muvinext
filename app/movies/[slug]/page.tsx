import MovieBanner from "@/components/MovieBanner";
import MovieSlider from "@/components/MovieSlider";
import NotFound from "@/components/NotFound";
import SingleMoviePage from "@/components/pages/SingleMoviePage";
import { getSingleGenre } from "@/models/genres";
import { getSingleMovie } from "@/models/movies";
import React, { FC } from "react";

interface SingleMoviesProps {
  params: Promise<{
    slug: string;
  }>
}

const SingleMovies: FC<SingleMoviesProps> = async ({ params }) => {
  const { slug } = await params;
  const post = await getSingleMovie(slug) as any;

  if (!post) return <NotFound />

  const genres = post.relationships.filter((item: any) => item.taxonomy.taxonomy === "category").map((item: any) => item.taxonomy.term)
  const similar = await getSingleGenre(genres[0].slug, 10, "modified") as any;

  return (
    <div className="w-full relative overflow-x-hidden overflow-y-auto">
      <MovieBanner
        title={post.postTitle}
        poster={post.postMetas.find((item: any) => item.metaKey === "_knawatfibu_url")?.metaValue || null}
        description={post.postContent}
        rating={post.postMetas.find((item: any) => item.metaKey === "IDMUVICORE_tmdbRating")?.metaValue || null}
        reviews={post.postMetas.find((item: any) => item.metaKey === "IDMUVICORE_tmdbVotes")?.metaValue || null}
        year={post.postMetas.find((item: any) => item.metaKey === "IDMUVICORE_Year")?.metaValue || null}
        runtime={post.postMetas.find((item: any) => item.metaKey === "IDMUVICORE_Runtime")?.metaValue || null}
      />

      <SingleMoviePage data={post} />

      <MovieSlider title="More Like This" data={similar.posts.map((item: any) => ({
          title: item.postTitle,
          url: `/${item.postType === "post" ? "movies" : "series"}/${item.postName}`,
          poster: item.postMetas.find((meta: any) => meta.metaKey === "_knawatfibu_url" || meta.metaKey === "IDMUVICORE_Poster")?.metaValue,
          rating: item.postMetas.find((meta: any) => meta.metaKey === "IDMUVICORE_tmdbRating")?.metaValue || null
        }))} />
    </div>
  );
};

export default SingleMovies;
