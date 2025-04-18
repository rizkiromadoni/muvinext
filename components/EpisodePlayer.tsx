"use client"

import React, { useState } from 'react'
import VideoPlayer from './VideoPlayer';
import { FilmStrip } from '@phosphor-icons/react';

const EpisodePlayer = ({ data }: {
    data: {
        title: string;
        episode: string;
        players: {
            name: string;
            src: string;
        }[],
        downloads: {
            name: string;
            src: string;
        }[]
    }[]
}) => {
  const [activeEpisode, setActiveEpisode] = useState<number | null>(data.length > 0 ? 0 : null);

  return (
    <>
        {activeEpisode != null ? (
            <VideoPlayer title={data[activeEpisode].title} players={data[activeEpisode].players} downloads={data[activeEpisode].downloads} />
        ) : (
            <h1 className="text-4xl font-bold flex items-center justify-center my-36">
                PLEASE SELECT AN EPISODE
            </h1>
        )}
        <div className="w-full h-full flex flex-col justify-center items-center gap-4 p-4">
            <div className="max-w-4xl max-h-96 overflow-auto flex flex-col h-full w-full scrollbar-thumb-zinc-900 scrollbar-track-zinc-800 scrollbar-thin">
                    {data.map((item, index) => (
                        <button key={index} onClick={() => setActiveEpisode(index)} className='p-4 bg-zinc-900 hover:bg-zinc-800 border-b-2 border-b-zinc-800 text-left flex gap-4 items-center cursor-pointer'>
                            <div className={`p-2 rounded ${index === activeEpisode ? "bg-blue-800" : "bg-zinc-700"}`}>
                                <FilmStrip size="1.5rem" weight="fill"/>
                            </div>
                            <span className='font-semibold'>Episode {item.episode}</span>
                        </button>
                    ))}
            </div>
        </div>
    </>
  )
}

export default EpisodePlayer