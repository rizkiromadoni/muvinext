"use client"

import { convertRatingToStarFill } from "@/lib/helper";
import Image from "next/image";
import React from "react";

const MovieBanner = ({ title, poster, description, rating, reviews, year, runtime }: {
    title: string;
    poster: string;
    description: string;
    rating?: string | number;
    reviews?: number | string;
    year?: string | number;
    runtime?: string | number;
}) => {
  return (
    <div className="relative aspect-[3/2] lg:aspect-[25/9] bg-black overflow-hidden">
      <div className="absolute top-0 right-0 left-0 lg:bottom-0 lg:left-1/3">
        <Image
          src={poster}
          className="w-full h-full object-cover"
          alt={title}
          width={1920}
          height={1080}
        />
      </div>
      <div className="absolute bottom-0 left-0 top-0 px-10 flex flex-col justify-center bg-gradient-to-t right-0 p-10 lg:px-26 lg:w-2/3 lg:bg-gradient-to-r from-black via-black to-transparent">
        <div className="flex flex-col gap-2">
          <h1 className="mt-2 text-4xl lg:text-5xl line-clamp-2">
            {title}
          </h1>
          <div className="flex flex-row flex-wrap gap-2 items-center mt-4">
            {rating && (
              <>
                <div className="relative aspect-[11/2] w-25">
                <Image src="/stars.webp" className="absolute inset-0" alt="" width={100} height={100} />
                <Image
                  src="/stars-filled.webp"
                  className="absolute inset-0"
                  style={{ clipPath: `inset(0 ${Number(rating) ? convertRatingToStarFill(Number(rating)) : "100"}% 0 0)` }}
                  alt=""
                  width={100} height={100}
                />
              </div>
                <div className="opacity-50 hidden md:block">{rating}</div>
              </>
            )}
            {reviews && (
              <>
                <span className="opacity-50 md:block">.</span>
                <div className="opacity-50 hidden md:block">{reviews} Reviews</div>
              </>
            )}
            {year && (
              <>
                <span className="opacity-50">.</span>
                <div className="opacity-50">{year}</div>
              </>
            )}
            {runtime && (
              <>
                <span className="opacity-50">.</span>
                <div className="opacity-50">{runtime} min</div>
              </>
            )}
          </div>
          <p className="opacity-80 leading-relaxed overflow-hidden line-clamp-3 md:line-clamp-5">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieBanner;
