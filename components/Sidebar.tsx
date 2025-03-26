"use client";

import React from "react";
import {
  FilmStrip,
  House,
  MagnifyingGlass,
  TelevisionSimple,
} from "@phosphor-icons/react";

const Sidebar = () => {
  return (
    <>
      <div className="fixed h-screen w-18 bg-black z-10 p-5 border-r-1 border-gray-700 flex-col justify-evenly hidden lg:flex">
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
    </>
  );
};

export default Sidebar;
