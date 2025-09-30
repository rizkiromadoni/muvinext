"use client";

import React from "react";
import {
  FilmStripIcon,
  GearSixIcon,
  HouseIcon,
  MagnifyingGlassIcon,
  SignOutIcon,
  TelevisionSimpleIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <>
      <div className="fixed h-screen w-18 bg-black z-10 p-5 border-r-1 border-gray-700 flex-col justify-evenly hidden lg:flex">
        <Link href="/">
          <HouseIcon weight="fill" className="size-7" alt="Home" />
        </Link>
        <Link href="/movies">
          <FilmStripIcon className="size-7" alt="Movies" />
        </Link>
        <Link href="/tv">
          <TelevisionSimpleIcon className="size-7" alt="TV Series" />
        </Link>
        <Link href="/search">
          <MagnifyingGlassIcon className="size-7" alt="Search" />
        </Link>
        {session?.user && (
          <>
            <Link href="/settings">
              <GearSixIcon weight="fill" className="size-7" alt="Settings" />
            </Link>
            <button>
              <SignOutIcon className="size-7 cursor-pointer" alt="Sign Out" onClick={() => signOut()} />
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Sidebar;
