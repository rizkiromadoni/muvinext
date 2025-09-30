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

const SidebarMobile = () => {
  const { data: session } = useSession();

  return (
    <div className="fixed bottom-0 w-full lg:hidden bg-black p-5 border-t-1 border-gray-700 flex flex-row justify-evenly">
      <Link href="/">
        <HouseIcon weight="fill" className="size-7"/>
      </Link>
      <Link href="/movies">
        <FilmStripIcon className="size-7" />
      </Link>
      <Link href="/tv">
        <TelevisionSimpleIcon className="size-7" />
      </Link>
      <Link href="/search">
        <MagnifyingGlassIcon className="size-7" />
      </Link>
      {session?.user && (
        <>
          <Link href="/settings">
            <GearSixIcon weight="fill" className="size-7" />
          </Link>
          <button>
            <SignOutIcon
              className="size-7 cursor-pointer"
              onClick={() => signOut()}
            />
          </button>
        </>
      )}
    </div>
  );
};

export default SidebarMobile;
