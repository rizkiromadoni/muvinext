import React from "react";
import Image from "next/image";

import { getSeason } from "@/models/tmdb/seasonModel";
import ImageFallback from "@/components/ui/image-fallback";
import { convertRatingToStarFill } from "@/lib/helper";

interface SeasonProps {
  params: Promise<{
    id: string;
    season_number: string;
  }>;
}

const SeasonPage: React.FC<SeasonProps> = async ({ params }) => {
  const { id, season_number } = await params;

  const data = await getSeason(id, season_number);

  return (
    <div className="mx-auto flex flex-col p-4 gap-4 items-start justify-center max-w-300">
      <div className="py-4 w-full flex gap-4">
        <ImageFallback
          defaultSrc={`https://image.tmdb.org/t/p/w1280${data.poster_path}`}
          fallback="/no-image.png"
          alt={data.name}
          width={1280}
          height={720}
          className="w-18"
        />
        <div className="flex flex-col gap-1 justify-center">
          <h2 className="text-xl">{`${data.name} (${new Date(
            data.air_date
          ).getFullYear()})`}</h2>
          <div className="flex gap-2 items-center">
            <div className="relative aspect-[11/2] w-18">
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
                    Number(data.vote_average)
                      ? convertRatingToStarFill(Number(data.vote_average))
                      : "100"
                  }% 0 0)`,
                }}
                alt=""
                width={100}
                height={100}
              />
            </div>
            <div className="opacity-50 text-xs">{data.vote_average}</div>
          </div>
        </div>
      </div>

      {data.overview && (
        <div className="w-full">
          <h2 className="font-bold text-md border-b-2 pb-2 mb-2">OVERVIEW</h2>
          <div className="opacity-80 text-sm">{data.overview}</div>
        </div>
      )}

      {data.episodes.length > 0 && (
        <div className="w-full">
          <h2 className="font-bold text-md border-b-2 pb-2 mb-2">EPISODES</h2>
          <div className="flex flex-col gap-2 w-full">
            {data.episodes.map((item: any, index: number) => (
              <div
                className="flex flex-row gap-2 bg-[#141516] shadow-lg h-full w-full"
                key={index}
              >
                <div className="w-24 md:w-42 shrink-0">
                  <ImageFallback
                    defaultSrc={`https://media.themoviedb.org/t/p/w454_and_h254_face${item.still_path}`}
                    fallback="/no-image.png"
                    alt={item.name}
                    width={454}
                    height={254}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="p-2 flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-sm md:text-base">{`${item.episode_number}. ${item.name}`}</h2>
                    <div className="flex items-center">
                      <div className="relative aspect-[11/2] w-18 md:w-20">
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
                              Number(item.vote_average)
                                ? convertRatingToStarFill(
                                    Number(item.vote_average)
                                  )
                                : "100"
                            }% 0 0)`,
                          }}
                          alt=""
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="opacity-50 text-xs ml-2">
                        {item.vote_average}
                      </div>
                      {item.air_date && (
                        <span className="opacity-50 text-xs ml-1 hidden md:block">
                          {`. ${new Date(item.air_date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}`}
                        </span>
                      )}
                      {item.runtime && (
                        <span className="opacity-50 text-xs ml-1">{`. ${item.runtime} min`}</span>
                      )}
                    </div>
                  </div>
                  <p className="opacity-60 text-xs md:text-sm ">
                    {item.overview}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SeasonPage;
