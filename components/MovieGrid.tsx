"use client";

import { convertRatingToStarFill } from "@/lib/helper";
import Image from "next/image";
import React from "react";

const MovieGrid = ({
  title,
  data,
}: {
  title: string;
  data: {
    title: string;
    poster: string;
    url: string;
    rating: number | null;
  }[];
}) => {
  return (
    <div>
      <h1 className="px-8 pt-8 gap-2 text-3xl">{title}</h1>
      {data.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 p-8">
          {data.map((item, index) => (
            <a href={item.url} className="pb-2" key={index}>
              <div className="block bg-[#1f2022] p-1 aspect-[10/16] transition duration-500 hover:scale-105 z-10">
                <Image
                  alt={item.title}
                  src={item.poster || "/no-image.png"}
                  width={400}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-2">{item.title}</div>
              <div className="flex text-sm gap-2 items-center">
                <div className="relative aspect-[11/2] w-20">
                  <Image
                    alt="stars"
                    src="/stars.webp"
                    className="absolute inset-0"
                    width={80}
                    height={80}
                  />
                  <Image
                    alt="stars"
                    src="/stars-filled.webp"
                    className="absolute inset-0"
                    style={{
                      clipPath: `inset(0 ${
                        item.rating
                          ? convertRatingToStarFill(item.rating)
                          : "100"
                      }% 0 0)`,
                    }}
                    width={80}
                    height={80}
                  />
                </div>
                <div className="opacity-75">{item.rating ?? "N/A"}</div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="text-4xl p-10 font-stretch-100% opacity-50 text-center h-[70vh] lg:h-[75vh]">
          No Data Found
        </div>
      )}
    </div>
  );
};

export default MovieGrid;
