"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { MagnifyingGlassIcon } from "@phosphor-icons/react";

const SearchInput = ({ defaultQuery }: { defaultQuery: string }) => {
  const [query, setQuery] = useState(defaultQuery);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (query.trim()) {
      // router.push(`?q=${encodeURIComponent(query.trim())}`);
      window.location.href = `?q=${encodeURIComponent(query.trim())}`;
    }
  };

  return (
    <form
      className="flex bg-[#282a2c] items-center px-6 py-4 gap-3 sticky"
      onSubmit={handleSubmit}
    >
      <button type="submit" className="cursor-pointer">
        <MagnifyingGlassIcon className="text-xl opacity-50" />
      </button>
      <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="text-2xl bg-transparent outline-none w-full"
      placeholder={"Search"}
      />
    </form>
  );
};

export default SearchInput;
