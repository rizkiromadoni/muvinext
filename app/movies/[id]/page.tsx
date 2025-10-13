import MovieBanner from "@/components/MovieBanner";
import MovieSlider from "@/components/MovieSlider";
import SingleMoviePage from "@/components/pages/SingleMoviePage";
import { getMovie } from "@/models/tmdb/movieModel";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React, { FC } from "react";

interface SingleMoviesProps {
  params: Promise<{
    id: string;
  }>
}

export async function generateMetadata({ params }: SingleMoviesProps): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovie(id);

  return {
    title: movie?.title,
    description: movie?.overview,
    openGraph: {
      title: movie?.title,
      description: movie?.overview,
      images: [
        {
          url: `https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}`,
          alt: movie?.title,
        },
      ],
    },
  }
}

const SingleMovies: FC<SingleMoviesProps> = async ({ params }) => {
  const { id } = await params;
  
  const movie = await getMovie(id);
  if (!movie) notFound();

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
