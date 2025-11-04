"use client";

import React, { useState } from "react";
import Image from "next/image";
import ReviewSection from "../ReviewSection";

const SingleMoviePage = ({ data }: { data: any }) => {
  const [active, setActive] = useState("overview");

  const directors = data.credits.crew
    .filter((item: any) => item.job === "Director")
    .map((item: any) => item.name);
  const producers = data.credits.crew
    .filter((item: any) => item.job === "Producer")
    .map((item: any) => item.name);
  const actors = data.credits.cast
    .filter((item: any) => item.known_for_department === "Acting")
    .map((item: any) => item.name);
  const trailer = data?.videos?.results?.filter(
    (item: any) => item.type === "Trailer"
  )[0];

  return (
    <>
      <div className="flex items-center justify-center gap-8 py-6">
        <button
          className={`text-lg md:text-xl p-3 cursor-pointer ${
            active === "overview" ? "border-b-2 border-b-white" : "opacity-50"
          }`}
          onClick={() => setActive("overview")}
        >
          OVERVIEW
        </button>
        {trailer && (
          <button
            className={`text-lg md:text-xl p-3 cursor-pointer ${
              active === "trailer" ? "border-b-2 border-b-white" : "opacity-50"
            }`}
            onClick={() => setActive("trailer")}
          >
            TRAILER
          </button>
        )}
        <button
            className={`text-lg md:text-xl p-3 cursor-pointer ${
              active === "review" ? "border-b-2 border-b-white" : "opacity-50"
            }`}
            onClick={() => setActive("review")}
          >
            REVIEW
          </button>
      </div>
      <div className="mx-auto flex p-4 gap-8 items-start justify-center max-w-300">
        {active === "overview" && (
          <>
            <Image
              src={`https://image.tmdb.org/t/p/w1280${data.poster_path}`}
              alt={data.title}
              width={790}
              height={1080}
              className="hidden border-4 border-[#1f2022] w-79 md:block transition duration-400 object-cover aspect-[10/16]"
            />
            <div className="flex flex-col md:p-4 gap-6">
              <div>
                <h2 className="text-3xl mb-4">Storyline</h2>
                <div className="opacity-80">{data.overview}</div>
              </div>
              <div className="text-sm opacity-80">
                <div className="grid grid-cols-[max-content_1fr] lg:grid-cols-[max-content_1fr_max-content_1fr] gap-3">
                  <div>Released</div>
                  <div>{data.release_date}</div>
                  <div>Runtime</div>
                  <div>{data.runtime}</div>
                  <div>Budget</div>
                  <div>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                    }).format(data.budget)}
                  </div>
                  <div>Revenue</div>
                  <div>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                    }).format(data.revenue)}
                  </div>
                  <div>Language</div>
                  <div>{data.spoken_languages[0].name}</div>
                  <div>Status</div>
                  <div>{data.status}</div>
                  <div>Genre</div>
                  <div className="flex flex-row flex-wrap gap-1 items-start">
                    {data.genres.map((genre: any) => (
                      <a
                        key={genre.id}
                        href={`/genres/movie/${genre.id}`}
                        className="px-2 py-1 bg-[#1f2022] hover:bg-[#36393c]"
                      >
                        {genre.name}
                      </a>
                    ))}
                  </div>
                  <div>Production</div>
                  <div>
                    {data.production_companies
                      .map((item: any) => item.name)
                      .join(", ")}
                  </div>
                  {directors.length > 0 && (
                    <>
                      <div>Directors</div>
                      <div>{directors.join(", ")}</div>
                    </>
                  )}
                  {producers.length > 0 && (
                    <>
                      <div>Producers</div>
                      <div>{producers.join(", ")}</div>
                    </>
                  )}
                  {actors.length > 0 && (
                    <>
                      <div>Actors</div>
                      <div>{actors.join(", ")}</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        {active === "trailer" && (
          <div className="w-full h-full">
            <iframe
              className="w-full aspect-video"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={trailer.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        )}
        {active === "review" && (
          <div className="w-full h-full">
            <ReviewSection tmdbId={data.id} />
          </div>
        )}
      </div>
    </>
  );
};

export default SingleMoviePage;
