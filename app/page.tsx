import MovieBanner from "@/components/MovieBanner";
import MovieSlider from "@/components/MovieSlider";
import Link from "next/link";

import React from "react";
import { getBillboard, getTrendingMovies, getTrendingTV } from "@/models/tmdb/tmdbModel";

const Home = async () => {
  const billboard = await getBillboard();

  const movies = await getTrendingMovies();
  const series = await getTrendingTV();

  return (
    <div className="w-full relative overflow-x-hidden overflow-y-auto">
      <Link
        href={`/${billboard.media_type === "movie" ? "movies" : "tv"}/${
          billboard.id
        }`}
      >
        <MovieBanner
          title={billboard.title || billboard.name}
          poster={`https://image.tmdb.org/t/p/w1280${billboard.backdrop_path}`}
          description={billboard.overview}
          rating={billboard.vote_average}
          reviews={billboard.vote_count}
          year={new Date(
            billboard.release_date || billboard.first_air_date
          ).getFullYear()}
        />
      </Link>
      <MovieSlider
        title="Trending Movies"
        moreUrl="/movies"
        data={movies?.map((item: any) => ({
          title: item.title,
          url: "/movies/" + item.id,
          poster: `https://image.tmdb.org/t/p/w1280${item.poster_path}`,
          rating: item.vote_average
        }))}
      />
      <MovieSlider
        title="Trending TV Series"
        moreUrl="/tv"
        data={series?.map((item: any) => ({
          title: item.name,
          url: "/tv/" + item.id,
          poster: `https://image.tmdb.org/t/p/w1280${item.poster_path}`,
          rating: item.vote_average
        }))}
      />
    </div>
  );
};

export default Home;
