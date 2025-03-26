"use client"

import React from 'react'
import VideoPlayer from './VideoPlayer';
import { FilmStrip } from '@phosphor-icons/react';

const EpisodePlayer = () => {
    const episodes = [
        {
            id: 1,
            episodeNumber: "1"
        },
        {
            id: 2,
            episodeNumber: "2"
        },
        {
            id: 3,
            episodeNumber: "3"
        },
    ];

  return (
    <>
        <VideoPlayer />
        <div className="w-full h-full flex flex-col justify-center items-center gap-4 p-4">
            <div className="max-w-4xl max-h-96 overflow-auto flex flex-col h-full w-full scrollbar-thumb-zinc-900 scrollbar-track-zinc-800 scrollbar-thin">
                    {Array(20).fill(0).map((_, index) => (
                        <button key={index} className='p-4 bg-zinc-900 hover:bg-zinc-800 border-b-2 border-b-zinc-800 text-left flex gap-4 items-center cursor-pointer'>
                            <div className='bg-zinc-700 p-2 rounded'>
                                <FilmStrip size="1.5rem" weight="fill"/>
                            </div>
                            <span className='font-semibold'>Episode {index + 1}</span>
                        </button>
                    ))}
            </div>
        </div>
    </>
  )
}

export default EpisodePlayer