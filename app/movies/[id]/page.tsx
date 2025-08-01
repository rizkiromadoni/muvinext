import MovieBanner from "@/components/MovieBanner";
import MovieSlider from "@/components/MovieSlider";
import NotFound from "@/components/NotFound";
import SingleMoviePage from "@/components/pages/SingleMoviePage";
import { getMovie } from "@/models/tmdb/movieModel";
import React, { FC } from "react";

interface SingleMoviesProps {
  params: Promise<{
    id: string;
  }>
}

const SingleMovies: FC<SingleMoviesProps> = async ({ params }) => {
  const { id } = await params;
  
  const movie = await getMovie(id);
  if (!movie) return <NotFound />

  return (
    <div className="w-full relative overflow-x-hidden overflow-y-auto">
      <MovieBanner
        title={movie.title}
        poster={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
        description={movie.overview}
        rating={movie.vote_average}
        reviews={movie.vote_count}
        year={movie.release_date}
        runtime={movie.runtime}
      />

      <SingleMoviePage data={movie} />

      {movie?.recommendations?.results?.length > 0 && (
        <MovieSlider
        title="More Like This"
        data={movie?.recommendations?.results?.map((item: any) => ({
          title: item.title,
          url: "/movies/" + item.id,
          poster: `https://image.tmdb.org/t/p/w1280${item.poster_path}`,
          rating: item.vote_average
        }))}
        />
      )}
    </div>
  );
};

export default SingleMovies;
