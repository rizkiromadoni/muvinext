"use client"

import { convertRatingToStarFill } from "@/lib/helper";
import Image from "next/image";
import Link from "next/link";
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
      <div className="flex flex-row items-center justify-between mt-5 py-3 px-4 lg:px-10 text-xl lg:text-2xl">
        <h1 className="">{title}</h1>
        {moreUrl && (
          <Link href={moreUrl} className="text-gray-500 text-base lg:text-lg">
            Explore More
          </Link>
        )}
      </div>
      <div className="relative">
        <div className="overflow-y-auto scrollbar scrollbar-thumb-[#36393c] scrollbar-track-[#1f2022]">
          <div className="flex w-max gap-2 p-2 px-4 lg:px-10">
            {data.map((item, index) => (
              <Link href={item.url} className="flex-1 w-40 md:w-60 pb-2" key={index}>
                <div className="block bg-[#1f2022] p-1 aspect-[10/16] hover:scale-105 transition duration-400 z-10">
                  <Image
                    alt={item.title}
                    src={item.poster}
                    width={400}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-2 text-lg">{ item.title }</div>
                <div className="flex text-sm gap-2 items-center">
                  <div className="relative aspect-[11/2] w-20">
                    <Image
                      alt="" src="/stars.webp" className="absolute inset-0" width={80} height={80} />
                    <Image
                      alt=""
                      src="/stars-filled.webp"
                      className="absolute inset-0"
                      style={{ clipPath: `inset(0 ${item.rating ? convertRatingToStarFill(item.rating) : "100"}% 0 0)` }}
                      width={80} height={80}
                    />
                  </div>
                  <div className="opacity-75">{ item.rating ?? "N/A" }</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieSlider;
