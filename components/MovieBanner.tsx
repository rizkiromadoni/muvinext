"use client"

import React from "react";

const MovieBanner = ({ title, poster, description }: {
    title: string;
    poster: string;
    description: string;
}) => {
  return (
    <div className="relative aspect-[3/2] lg:aspect-[25/9] bg-black overflow-hidden">
      <div className="absolute top-0 right-0 left-0 lg:bottom-0 lg:left-1/3">
        <img
          src={poster}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-0 left-0 top-0 px-10 flex flex-col justify-center bg-gradient-to-t right-0 p-10 lg:px-26 lg:w-2/3 lg:bg-gradient-to-r from-black via-black to-transparent">
        <div className="flex flex-col gap-2">
          <h1 className="mt-2 text-4xl lg:text-5xl line-clamp-2">
            {title}
          </h1>
          <div className="flex flex-row flex-wrap gap-2 items-center mt-4">
            <div className="relative aspect-[11/2] w-25">
              <img src="/stars.webp" className="absolute inset-0" />
              <img
                src="/stars-filled.webp"
                className="absolute inset-0"
                style={{ clipPath: `inset(0 10% 0 0)` }}
              />
            </div>
            <div className="opacity-50 hidden md:block">9.0</div>
            <span className="opacity-50 hidden md:block">.</span>
            <div className="opacity-50 hidden md:block">123 Reviews</div>
            <span className="opacity-50">.</span>
            <div className="opacity-50">2020</div>
            <span className="opacity-50">.</span>
            <div className="opacity-50">1h 32min</div>
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
