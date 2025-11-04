"use client";

import React from "react";
import {
  FilmStripIcon,
  HouseIcon,
  MagnifyingGlassIcon,
  PopcornIcon,
  SignOutIcon,
  TelevisionSimpleIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const SidebarMobile = () => {
  const { data: session } = useSession();

  return (
    <div className="fixed bottom-0 w-full lg:hidden bg-black p-5 border-t-1 border-gray-700 flex flex-row justify-evenly">
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
          <Link href="/admin">
            <PopcornIcon className="size-7" alt="Dashboard" />
          </Link>
          <button>
            <SignOutIcon
              className="size-7 cursor-pointer"
              alt="Sign Out"
              onClick={() => signOut()}
            />
          </button>
        </>
      )}
    </div>
  );
};

export default SidebarMobile;
