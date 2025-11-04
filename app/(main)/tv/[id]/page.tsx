import MovieBanner from "@/components/MovieBanner";
import MovieSlider from "@/components/MovieSlider";
import SingleSeriesPage from "@/components/pages/SingleSeriesPage";
import { getTVSeries } from "@/models/tmdb/tvModel";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React, { FC } from "react";

interface SingleSeriesProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: SingleSeriesProps): Promise<Metadata> {
  const { id } = await params;
  const tv = await getTVSeries(id);
  
  return {
    title: tv.name,
    description: tv.overview,
    openGraph: {
      title: tv.name,
      description: tv.overview,
      images: [
        {
          url: `https://image.tmdb.org/t/p/w1280${tv.backdrop_path}`,
          width: 1280,
          height: 720,
          alt: tv.name,
        },
      ],
    },
  };
}

const SingleSeries: FC<SingleSeriesProps> = async ({ params }) => {
  const { id } = await params;

  const tv = await getTVSeries(id);
  if (!tv) notFound();

  return (
    <div className="w-full relative overflow-x-hidden overflow-y-auto">
      <MovieBanner
        title={tv.name}
        poster={`https://image.tmdb.org/t/p/w1280${tv.backdrop_path}`}
        description={tv.overview}
        rating={tv.vote_average}
        reviews={tv.vote_count}
        year={new Date(tv.first_air_date).getFullYear()}
        runtime={tv.runtime}
      />

      <SingleSeriesPage data={tv} />

      {tv?.recommendations?.results?.length > 0 && (
        <MovieSlider
          title="More Like This"
          data={tv?.recommendations?.results?.map((item: any) => ({
            title: item.name,
            url: "/tv/" + item.id,
            poster: `https://image.tmdb.org/t/p/w1280${item.poster_path}`,
            rating: item.vote_average,
          }))}
        />
      )}
    </div>
  );
};

export default SingleSeries;
