"use client";

import React, { useState } from "react";
import Image from "next/image";

import ReviewSection from "../ReviewSection";
import { convertRatingToStarFill } from "@/lib/helper";
import CastList from "../custom/cast-list";
import Link from "next/link";

const SingleSeriesPage = ({ data }: { data: any }) => {
  const [active, setActive] = useState("overview");

  const directors = data.created_by;
  const producers = data.aggregate_credits.crew.filter(
    (item: any) => item.job === "Producer"
  );
  const actors = data.aggregate_credits.cast.filter(
    (item: any) => item.known_for_department === "Acting"
  );
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
              alt={data.name}
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
                  <div>{data.first_air_date}</div>
                  {data.episode_run_time[0] && (
                    <>
                      <div>Episode Runtime</div>
                      <div>{data.episode_run_time[0] + " min"}</div>
                    </>
                  )}
                  <div>Language</div>
                  <div>{data.spoken_languages[0].name}</div>
                  <div>Status</div>
                  <div>{data.status}</div>
                  <div>Genre</div>
                  <div className="flex flex-row flex-wrap gap-1 items-start">
                    {data.genres.map((genre: any) => (
                      <a
                        key={genre.id}
                        href={`/genres/tv/${genre.id}`}
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
                      <div>
                        {directors.map((item: any, index: number) => (
                          <Link
                            className="hover:underline"
                            key={index}
                            href={`/people/${item.id}`}
                          >
                            {item.name}
                            {index !== directors.length - 1 && ", "}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                  {producers.length > 0 && (
                    <>
                      <div>Producers</div>
                      <div>
                        {producers.map((item: any, index: number) => (
                          <Link
                            className="hover:underline"
                            key={index}
                            href={`/people/${item.id}`}
                          >
                            {item.name}
                            {index !== producers.length - 1 && ", "}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <CastList data={actors} />
              <div>
                <h2 className="text-3xl mb-4">Seasons</h2>
                <div className="flex flex-col gap-2">
                  {data.seasons.map((season: any) => (
                    <div
                      key={season.id}
                      className="flex flex-row rounded-md bg-[#141516] shadow-lg"
                    >
                      <div className="min-w-26 h-full">
                        <Image
                          src={`https://image.tmdb.org/t/p/w130_and_h195_bestv2${season.poster_path}`}
                          alt={season.name}
                          width={130}
                          height={195}
                          className="w-full h-full object-cover rounded-tl-md"
                        />
                      </div>
                      <div className="text-sm opacity-50 border-l border-l-black px-5 py-4 flex flex-col gap-2">
                        <div>
                          <Link className="text-lg lg:text-xl line-clamp-2 hover:underline" href={`/tv/${data.id}/seasons/${season.season_number}`}>
                            {season.name}
                          </Link>
                          <div className="flex flex-row flex-wrap gap-2 items-center">
                            {season.vote_average > 0 && (
                              <>
                                <div className="relative aspect-[11/2] w-20">
                                  <Image
                                    src="/stars.webp"
                                    className="absolute inset-0"
                                    alt=""
                                    width={100}
                                    height={100}
                                  />
                                  <Image
                                    src="/stars-filled.webp"
                                    className="absolute inset-0"
                                    style={{
                                      clipPath: `inset(0 ${
                                        Number(season.vote_average)
                                          ? convertRatingToStarFill(
                                              Number(season.vote_average)
                                            )
                                          : "100"
                                      }% 0 0)`,
                                    }}
                                    alt=""
                                    width={100}
                                    height={100}
                                  />
                                </div>
                                <div className="opacity-50 hidden md:block">
                                  {season.vote_average}
                                </div>
                                <span className="opacity-50">.</span>
                              </>
                            )}
                            {season.air_date && (
                              <>
                                <div className="opacity-50">
                                  {new Date(season.air_date).getFullYear()}
                                </div>
                              </>
                            )}
                            {season.episode_count && (
                              <>
                                <span className="opacity-50">.</span>
                                <div className="opacity-50">
                                  {season.episode_count} Episodes
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <p className="opacity-80 text-sm">
                          {season.overview.length < 1
                            ? `Season ${season.season_number} of ${data.name} premiered on ${season.air_date}.`
                            : season.overview}
                        </p>
                      </div>
                    </div>
                  ))}
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

export default SingleSeriesPage;
