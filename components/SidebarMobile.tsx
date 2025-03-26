"use client"

import React from 'react'
import {
  FilmStrip,
  House,
  MagnifyingGlass,
  TelevisionSimple,
} from "@phosphor-icons/react";

const SidebarMobile = () => {
  return (
    <div className='fixed bottom-0 w-full lg:hidden bg-black p-5 border-t-1 border-gray-700 flex flex-row justify-evenly'>
        <a href="/">
          <House weight="fill" className="size-7" />
        </a>
        <a href="/movies">
          <FilmStrip className="size-7" />
        </a>
        <a href="/series">
          <TelevisionSimple className="size-7" />
        </a>
        <a href="/search">
          <MagnifyingGlass className="size-7" />
        </a>
    </div>
  )
}

export default SidebarMobile