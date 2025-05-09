import MovieBanner from "@/components/MovieBanner";
import MovieSlider from "@/components/MovieSlider";
import NotFound from "@/components/NotFound";
import SingleSeriesPage from "@/components/pages/SingleSeriesPage";
import { getSingleGenre } from "@/models/genres";
import { getSingleSeries } from "@/models/series";
import React, { FC } from "react";

interface SingleSeriesProps {
  params: Promise<{
    slug: string;
  }>;
}

const SingleSeries: FC<SingleSeriesProps> = async ({ params }) => {
  const { slug } = await params;

  const post = (await getSingleSeries(slug)) as any;
  if (!post) return <NotFound />;

  const tmdbId = post.postMetas.find((item: any) => item.metaKey === "IDMUVICORE_tmdbID")?.metaValue;
  const details = await fetch(`https://api.themoviedb.org/3/tv/${tmdbId.slice(0, tmdbId.length - 1)}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.TMDB_API_KEY}`
    }
  }).then((res) => res.json());

  if (details.overview) {
    post.postContent = details.overview;
  }

  const genres = post.relationships
    .filter((item: any) => item.taxonomy.taxonomy === "category")
    .map((item: any) => item.taxonomy.term);
  const similar = (await getSingleGenre(genres[0].slug, 10, "modified")) as any;

  return (
    <div className="w-full relative overflow-x-hidden overflow-y-auto">
      <MovieBanner
        title={post.postTitle}
        poster={
          post.postMetas.find((item: any) => item.metaKey === "_knawatfibu_url")
            ?.metaValue || null
        }
        description={details.overview || ""}
        rating={
          post.postMetas.find(
            (item: any) => item.metaKey === "IDMUVICORE_tmdbRating"
          )?.metaValue || null
        }
        reviews={
          post.postMetas.find(
            (item: any) => item.metaKey === "IDMUVICORE_tmdbVotes"
          )?.metaValue || null
        }
        year={
          post.postMetas.find((item: any) => item.metaKey === "IDMUVICORE_Year")
            ?.metaValue || null
        }
        runtime={
          post.postMetas.find(
            (item: any) => item.metaKey === "IDMUVICORE_Runtime"
          )?.metaValue || null
        }
      />

      <SingleSeriesPage data={post} />

      <MovieSlider
        title="More Like This"
        data={similar.posts.map((item: any) => ({
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

export default SingleSeries;
