"use client";

import React from "react";
import {
  FilmStrip,
  House,
  MagnifyingGlass,
  TelevisionSimple,
} from "@phosphor-icons/react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <>
      <div className="fixed h-screen w-18 bg-black z-10 p-5 border-r-1 border-gray-700 flex-col justify-evenly hidden lg:flex">
      <Link href="/">
        <House weight="fill" className="size-7" />
      </Link>
      <Link href="/movies">
        <FilmStrip className="size-7" />
      </Link>
      <Link href="/series">
        <TelevisionSimple className="size-7" />
      </Link>
      <Link href="/search">
        <MagnifyingGlass className="size-7" />
      </Link>
    </div>
    </>
  );
};

export default Sidebar;
