import MovieBanner from "@/components/MovieBanner";
import MovieSlider from "@/components/MovieSlider";
import { getBillboard } from "@/models/billboard";
import { getMovies } from "@/models/movies";
import { getSeries } from "@/models/series";
import Link from "next/link";

import React from "react";

const Home = async () => {
  const billboard = await getBillboard() as any;

  const movies = await getMovies(20);
  const series = await getSeries(20);

  return (
    <div className="w-full relative overflow-x-hidden overflow-y-auto">
      <Link href={`/movies/${billboard.postName}`}>
        <MovieBanner title={billboard.postTitle} poster={billboard.postMetas.find((item: any) => {
          return item.metaKey === "_knawatfibu_url" || item.metaKey === "IDMUVICORE_Poster";
        })?.metaValue} description={billboard.postContent} rating={billboard.postMetas.find((item: any) => item.metaKey === "IDMUVICORE_tmdbRating")?.metaValue || null} reviews={billboard.postMetas.find((item: any) => item.metaKey === "IDMUVICORE_tmdbVotes")?.metaValue || null} year={billboard.postMetas.find((item: any) => item.metaKey === "IDMUVICORE_Year")?.metaValue || null} runtime={billboard.postMetas.find((item: any) => item.metaKey === "IDMUVICORE_Runtime")?.metaValue || null} />
      </Link>
      <MovieSlider
        title="Latest Movies"
        moreUrl="/movies"
        data={movies.map((item: any) => ({
          title: item.postTitle,
          url: "/movies/" + item.postName,
          poster: item.postMetas.find((meta: any) => meta.metaKey === "_knawatfibu_url")?.metaValue,
          rating: item.postMetas.find((meta: any) => meta.metaKey === "IDMUVICORE_tmdbRating")?.metaValue || null
        }))}
      />
      <MovieSlider
        title="Latest TV Series"
        moreUrl="/series"
        data={series.map((item: any) => ({
          title: item.postTitle,
          url: "/series/" + item.postName,
          poster: item.postMetas.find((meta: any) => meta.metaKey === "_knawatfibu_url")?.metaValue,
          rating: item.postMetas.find((meta: any) => meta.metaKey === "IDMUVICORE_tmdbRating")?.metaValue || null
        }))}
      />
    </div>
  );
};

export default Home;
