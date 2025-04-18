"use client";

import React, { useState } from "react";
import EpisodePlayer from "../EpisodePlayer";
import Image from "next/image";

const SingleSeriesPage = ({ data }: {data: any}) => {
  const [active, setActive] = useState("overview");

  const post = {
    title: data.postTitle,
    content: data.postContent || "",
    poster: data.postMetas.find((item: any) => item.metaKey === "_knawatfibu_url")?.metaValue || data.postMetas.find((item: any) => item.metaKey === "IDMUVICORE_Poster")?.metaValue  || null,
    released: data.postMetas.find((item: any) => item.metaKey === "IDMUVICORE_Released")?.metaValue || null,
    runtime: data.postMetas.find((item: any) => item.metaKey === "IDMUVICORE_Runtime")?.metaValue || null,
    budget: data.postMetas.find((item: any) => item.metaKey === "IDMUVICORE_Budget")?.metaValue || null,
    revenue: data.postMetas.find((item: any) => item.metaKey === "IDMUVICORE_Revenue")?.metaValue || null,
    language: data.postMetas.find((item: any) => item.metaKey === "IDMUVICORE_Language")?.metaValue || null,
    genres: data.relationships.filter((item: any) => item.taxonomy.taxonomy === "category").map((item: any) => item.taxonomy.term),
    directors: data.relationships.filter((item: any) => item.taxonomy.taxonomy === "muvidirector").map((item: any) => item.taxonomy.term),
    actors: data.relationships.filter((item: any) => item.taxonomy.taxonomy === "muviactor").map((item: any) => item.taxonomy.term),
    episodes: data.episodes.map((item: any) => {
      const players = []
      const downloads = []

      for (let i = 1; i <= 10; i++) {
        const playerTitle = item.postMetas.find((x: any) => x.metaKey === `IDMUVICORE_Title_Player${i}`)?.metaValue || null;
        const playerUrl = item.postMetas.find((x: any) => x.metaKey === `IDMUVICORE_Player${i}`)?.metaValue || null;

        const downloadTitle = item.postMetas.find((x: any) => x.metaKey === `IDMUVICORE_Title_Download${i}`)?.metaValue || null;
        const downloadUrl = item.postMetas.find((x: any) => x.metaKey === `IDMUVICORE_Download${i}`)?.metaValue || null;

        if (downloadTitle && downloadUrl) {
          downloads.push({
            name: downloadTitle,
            src: downloadUrl,
          })
        }

        if (playerTitle && playerUrl) {
          players.push({
            name: playerTitle as string,
            src: playerUrl as string,
          })
        }
      }

      return {
        title: item.postTitle,
        episode: item.postMetas.find((item: any) => item.metaKey === "IDMUVICORE_Episodenumber")?.metaValue || null,
        players,
        downloads,
      }
    })
  }

  return (
    <>
      <div className="flex items-center justify-center gap-8 py-6">
        <button
          className={`text-xl p-3 ${active === "overview" ? "border-b-2 border-b-white" : "opacity-50"}`}
          onClick={() => setActive("overview")}
        >
          OVERVIEW
        </button>
        <button
          className={`text-xl p-3 ${active === "episodes" ? "border-b-2 border-b-white" : "opacity-50"}`}
          onClick={() => setActive("episodes")}
        >
          EPISODES
        </button>
      </div>
      {active === "overview" && (
        <div className="mx-auto flex p-4 gap-8 items-center justify-center max-w-300">
          <Image
            alt={post.title}
            src={post.poster}
            width={790}
            height={1080}
            className="hidden border-4 border-[#1f2022] w-79 md:block transition duration-400 object-cover aspect-[10/16]"
          />
          <div className="flex flex-col md:p-4 gap-6">
            <div>
              <h2 className="text-3xl mb-4">Storyline</h2>
              <div className="opacity-80">
                {post.content}
              </div>
            </div>
            <div className="text-sm opacity-80">
              <ul className="grid grid-cols-[max-content_1fr] lg:grid-cols-[max-content_1fr_max-content_1fr] gap-3 items-center">
              {post.released && (
                  <>
                    <div>Released</div>
                    <div>{post.released}</div>
                  </>
                )}
                {post.runtime && (
                  <>
                    <div>Runtime</div>
                    <div>{post.runtime} min</div>
                  </>
                )}
                {post.budget && (
                  <>
                    <div>Budget</div>
                    <div>{post.budget[0] != "$" ? "$" + post.budget : post.budget}</div>
                  </>
                )}
                {post.revenue && (
                  <>
                    <div>Revenue</div>
                    <div>{post.revenue[0] != "$" ? "$" + post.revenue : post.revenue}</div>
                  </>
                )}
                {post.genres.length > 0 && (
                  <>
                    <div>Genre</div>
                    <div className="flex flex-row flex-wrap gap-1">
                      {post.genres.map((genre: any) => (
                        <a
                        key={genre.slug}
                        href={`/genres/${genre.slug}`}
                        className="px-2 py-1 bg-gray-700 hover:bg-gray-800"
                      >
                        {genre.name}
                      </a>
                      ))}
                    </div>
                  </>
                )}
                {post.language && (
                  <>
                    <div>Language</div>
                    <div>{post.language}</div>
                  </>
                )}
                {post.directors.length > 0 && (
                  <>
                  <div>Director</div>
                  <div>{post.directors.map((item: any) => item.name).join(", ")}</div>
                  </>
                )}
                {post.actors.length > 0 && (
                  <>
                  <div>Actors</div>
                  <div>{post.actors.map((item: any) => item.name).join(", ")}</div>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
      {active === "episodes" && <EpisodePlayer data={post.episodes as any} />}
    </>
  );
};

export default SingleSeriesPage;
