"use client"

import React, { useState } from "react";

const VideoPlayer = () => {
  const players = [
    {
      name: "SERVER 1",
      src: "https://playsobat.xyz/e/slwrldb4cpam",
    },
    {
      name: "SERVER 2",
      src: "example.com",
    },
  ];

  const downloads = [
    {
      name: "SERVER 1",
      url: "#",
    },
    {
      name: "SERVER 2",
      url: "#",
    },
    {
      name: "Server 3",
      url: "#",
    },
  ];

  const [player, setPlayer] = useState(players[0]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4 p-4">
      <div className="max-w-4xl flex flex-col h-full w-full gap-4">
        <h2 className="text-2xl text-center">Title Example</h2>
        <div className="w-full h-full aspect-video">
          <iframe
            src={player.src}
            className="w-full h-full"
            allowFullScreen
          ></iframe>
        </div>

        <div className="flex flex-col gap-1 bg-[#1f2022] p-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center text-lg font-bold pb-2 border-b-1 border-gray-700 opacity-50">PLAYERS</div>
            <div className="flex gap-2">
              {players.map((item, index) => (
                <button
                  key={index}
                  className={`uppercase text-sm px-3 py-2  hover:bg-gray-800 ${
                    player.name === item.name
                      ? "bg-gray-800"
                      : "bg-gray-700"
                  }`}
                  onClick={() => setPlayer(item)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 pb-4">
            <div className="flex items-center justify-center text-lg font-bold pb-2 border-b-1 border-gray-700 opacity-50">DOWNLOADS</div>
            <div className="flex gap-2">
              {downloads.map((item, index) => (
                <a
                  href={item.url}
                  key={index}
                  className="uppercase text-sm px-3 py-2 bg-gray-700 hover:bg-gray-800"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
