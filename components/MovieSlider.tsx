"use client"

import { convertRatingToStarFill } from "@/lib/helper";
import React from "react";

const MovieSlider = ({
  title,
  moreUrl,
  data,
}: {
  title: string;
  moreUrl?: string;
  data: {
    title: string;
    poster: string;
    url: string;
    rating: number | null;
  }[];
}) => {
  return (
    <>
      <div className="flex flex-row items-center justify-between mt-5 py-3 px-10">
        <div className="text-2xl">{title}</div>
        {moreUrl && (
          <a href={moreUrl} className="text-gray-500">
            Explore More
          </a>
        )}
      </div>
      <div className="relative">
        <div className="overflow-y-auto scrollbar scrollbar-thumb-[#36393c] scrollbar-track-[#1f2022]">
          <div className="flex w-max gap-2 p-2 px-10">
            {data.map((item, index) => (
              <a href={item.url} className="flex-1 w-40 md:w-60 pb-2" key={index}>
                <div className="block bg-[#1f2022] p-1 aspect-[10/16] hover:scale-105 transition duration-400 z-10">
                  <img
                    src={item.poster}
                    width={400}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-2 text-lg">{ item.title }</div>
                <div className="flex text-sm gap-2 items-center">
                  <div className="relative aspect-[11/2] w-20">
                    <img src="/stars.webp" className="absolute inset-0" />
                    <img
                      src="/stars-filled.webp"
                      className="absolute inset-0"
                      style={{ clipPath: `inset(0 ${item.rating ? convertRatingToStarFill(item.rating) : "100"}% 0 0)` }}
                    />
                  </div>
                  <div className="opacity-75">{ item.rating ?? "N/A" }</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieSlider;
