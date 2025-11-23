import React from "react";
import Link from "next/link";
import ImageFallback from "@/components/ui/image-fallback";

function formatCombinedCredits(combinedCredits: any) {
  const mediaMap = new Map();

  [...combinedCredits.cast, ...combinedCredits.crew].forEach((credit) => {
    const mediaId = credit.id;

    if (!mediaMap.has(mediaId)) {
      mediaMap.set(mediaId, {
        id: mediaId,
        media_type: credit.media_type,
        title:
          credit.media_type === "movie"
            ? credit.title || "Unknown"
            : credit.name || "Unknown",
        release_date:
          credit.media_type === "movie"
            ? credit.release_date || ""
            : credit.first_air_date || "",
        poster_path: credit.poster_path || null,
        jobs: [],
        characters: [],
      });
    }

    const media = mediaMap.get(mediaId);

    if (credit.character) {
      if (!media.characters.includes(credit.character)) {
        media.characters.push(credit.character);
      }
      if (!media.jobs.includes("Actor")) {
        media.jobs.push("Actor");
      }
    }

    if (credit.job && !media.jobs.includes(credit.job)) {
      media.jobs.push(credit.job);
    }
  });

  return Array.from(mediaMap.values());
}

const PeopleFilmography = ({
  data,
  className,
}: {
  data: any;
  className?: string;
}) => {
  const credits = formatCombinedCredits(data.combined_credits);

  return (
    <div className={className}>
      <h2 className="font-bold text-md border-b-2 pb-2 mb-2">FILMOGRAPHY</h2>
      <div className="flex flex-col gap-4 max-h-96 overflow-y-scroll">
        {credits.map((item, index: number) => (
          <Link
            className="flex px-1 py-2 gap-4 hover:bg-[#1f2022]"
            key={index}
            href={
              item.media_type === "movie"
                ? `/movies/${item.id}`
                : `/tv/${item.id}`
            }
          >
            <ImageFallback
              defaultSrc={`https://image.tmdb.org/t/p/w1280${item.poster_path}`}
              fallback="/no-image.png"
              alt={item.title}
              width={120}
              height={180}
              className="w-18 rounded-md"
            />
            <div className="flex flex-col gap-1 my-auto">
              <h2 className="text-md">{item.title}</h2>
              <div className="opacity-80 text-xs flex">
               {item.release_date && (
                  <span className="pr-2 border-r border-white">
                  {item.release_date}
                </span>
               )}
                {item.jobs.length > 0 && (
                  <span className={item.release_date && "pl-2"}>{item.jobs.join(", ")}</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PeopleFilmography;
