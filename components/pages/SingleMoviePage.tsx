"use client";

import React, { useState } from "react";
import VideoPlayer from "../VideoPlayer";

const SingleMoviePage = () => {
  const [active, setActive] = useState("overview");

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
          className={`text-xl p-3 ${active === "videos" ? "border-b-2 border-b-white" : "opacity-50"}`}
          onClick={() => setActive("videos")}
        >
          VIDEOS
        </button>
      </div>
      {active === "overview" && (
        <div className="mx-auto flex p-4 gap-8 items-center justify-center max-w-300">
          <img
            src="https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg"
            className="hidden border-4 border-[#1f2022] w-79 md:block transition duration-400 object-cover aspect-[10/16]"
          />
          <div className="flex flex-col md:p-4 gap-6">
            <div>
              <h2 className="text-3xl mb-4">Storyline</h2>
              <div className="opacity-80">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod
                ipsum, soluta est ullam quis modi magnam et illo tenetur. Omnis
                debitis reiciendis doloribus possimus neque labore consequatur
                numquam optio ad?
              </div>
            </div>
            <div className="text-sm opacity-80">
              <ul className="grid grid-cols-[max-content_1fr] lg:grid-cols-[max-content_1fr_max-content_1fr] gap-3">
                <div>Released</div>
                <div>1/22/2025</div>
                <div>Runtime</div>
                <div>1h 31min</div>
                <div>Budget</div>
                <div> $25,000,000</div>
                <div>Revenue</div>
                <div> $40,420,193</div>
                <div>Genre</div>
                <div className="flex flex-row flex-wrap gap-1">
                  <a
                    href="#"
                    className="px-2 py-1 bg-gray-700 hover:bg-gray-800"
                  >
                    Action
                  </a>
                  <a
                    href="#"
                    className="px-2 py-1 bg-gray-700 hover:bg-gray-800"
                  >
                    Action
                  </a>
                  <a
                    href="#"
                    className="px-2 py-1 bg-gray-700 hover:bg-gray-800"
                  >
                    Action
                  </a>
                </div>
                <div>Status</div>
                <div>Released</div>
                <div>Language</div>
                <div>English</div>
                <div>Production</div>
                <div>
                  Davis Entertainment, Icon Productions, Hammerstone Studios,
                  Media Capital Technologies
                </div>
              </ul>
            </div>
          </div>
        </div>
      )}
      {active === "videos" && <VideoPlayer />}
    </>
  );
};

export default SingleMoviePage;
