"use client"

import React from 'react'
import {
  FilmStrip,
  House,
  MagnifyingGlass,
  TelevisionSimple,
} from "@phosphor-icons/react";
import Link from 'next/link';

const SidebarMobile = () => {
  return (
    <div className='fixed bottom-0 w-full lg:hidden bg-black p-5 border-t-1 border-gray-700 flex flex-row justify-evenly'>
        <Link href="/">
          <House weight="fill" className="size-7" />
        </Link>
        <Link href="/movies">
          <FilmStrip className="size-7" />
        </Link>
        <Link href="/tv">
          <TelevisionSimple className="size-7" />
        </Link>
        <Link href="/search">
          <MagnifyingGlass className="size-7" />
        </Link>
    </div>
  )
}

export default SidebarMobile