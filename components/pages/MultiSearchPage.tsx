"use client";

import MovieGrid from "@/components/MovieGrid";
import fetchTmdb from "@/lib/tmdb";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const MultiSearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page") || "1");

  const [searchInput, setSearchInput] = useState(query);
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);

    fetchTmdb(
      `/search/multi?query=${encodeURIComponent(
        query
      )}&include_adult=false&page=${page}`
    ).then((data) => {
      const filtered = data.results.filter(
        (item: any) => item.media_type !== "person"
      );
      setResults(filtered);
      setTotalPages(data.total_pages);
      setLoading(false);
    });
  }, [query, page]);

  const handlePageChange = (newPage: any) => {
    router.push(`?query=${query}&page=${newPage}`);
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`?query=${encodeURIComponent(searchInput)}&page=1`);
    }
  };
  return (
    <>
      <form
        className="flex bg-[#282a2c] items-center px-6 py-4 gap-3 sticky"
        onSubmit={handleSearch}
      >
        <button type="submit" className="cursor-pointer">
          <MagnifyingGlass className="text-xl opacity-50" />
        </button>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="text-2xl bg-transparent outline-none w-full"
          placeholder={"Search"}
        />
      </form>
      {!query && (
        <div className="text-4xl p-10 font-stretch-100% opacity-50 text-center h-[70vh] lg:h-[75vh]">
          Type something to search...
        </div>
      )}

      {loading ? (
        <div className="text-4xl p-10 font-stretch-100% opacity-50 text-center h-[70vh] lg:h-[75vh]">
          Please Wait...
        </div>
      ) : (
        <>
          {query && (
            <>
              <MovieGrid
                title={`Search: ${query}`}
                data={results.map((item: any) => ({
                  title: item.media_type === "movie" ? item.title : item.name,
                  url: `/${item.media_type === "movie" ? "movies" : "tv"}/${
                    item.id
                  }`,
                  poster: `https://image.tmdb.org/t/p/w1280${item.poster_path}`,
                  rating: item.vote_average,
                }))}
              />
              {results.length > 0 && (
                <div className="flex flex-col items-center">
                  <span className="text-sm text-gray-700 dark:text-gray-400">
                    Page{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {page}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {totalPages}
                    </span>{" "}
                    Total Pages
                  </span>
                  <div className="inline-flex mt-2 xs:mt-0">
                    <button
                      className="disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-[#1f2022] hover:bg-[#36393c] rounded-s"
                      disabled={page === 1}
                      onClick={() => handlePageChange(page - 1)}
                    >
                      <svg
                        className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 5H1m0 0 4 4M1 5l4-4"
                        />
                      </svg>
                      Prev
                    </button>
                    <button
                      className="disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-[#1f2022] hover:bg-[#36393c] border-0 border-s border-[#36393c] rounded-e"
                      disabled={page === totalPages}
                      onClick={() => handlePageChange(page + 1)}
                    >
                      Next
                      <svg
                        className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default MultiSearchPage;
