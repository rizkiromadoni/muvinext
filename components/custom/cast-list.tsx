"use client";

import Link from "next/link";
import React from "react";
import ImageFallback from "../ui/image-fallback";

const CastList = ({ data, className }: { data: any; className?: string }) => {
  return (
    <div className={className}>
      <h2 className="font-bold text-md border-b-2 pb-2 mb-2">CASTS</h2>
      <div className="flex flex-col gap-2 max-h-96 overflow-y-scroll">
        {data.map((item: any, index: number) => (
          <Link
            className="flex px-1 py-1 gap-4 hover:bg-[#1f2022]"
            key={index}
            href={`/people/${item.id}`}
          >
            <ImageFallback
              defaultSrc={`https://image.tmdb.org/t/p/w1280${item.profile_path}`}
              fallback="/no-image.png"
              alt={item.name}
              width={120}
              height={180}
              className="w-18 rounded-md"
            />
            <div className="flex flex-col gap-1 my-auto">
              <h2 className="text-md">{item.name}</h2>
              <div className="opacity-80 text-xs flex">
                {item.character ? (
                  <span>{item.character}</span>
                ) : item.roles && (
                  <span>{item.roles[0].character || ""}</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CastList;
