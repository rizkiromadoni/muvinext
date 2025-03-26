"use client"

import React from 'react'

const Footer = () => {
  return (
    <div className='p-10 mb-20 lg:mb-0 flex flex-col gap-2'>
      <div className='flex gap-2 items-center'>
        <img src="/vercel.svg" className='w-8 h-8' />
        <span className='text-3xl font-bold'>NextJS</span>
      </div>
      <div className='text-xs'>
        <p className='opacity-80'>Made with Love By Anonymous</p>
        <p className='opacity-80'>This project uses the TMDB API but is not endorsed or certified by TMDB.</p>
      </div>
    </div>
  )
}

export default Footer