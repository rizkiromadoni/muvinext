"use client";

import MovieGrid from "@/components/MovieGrid";
import NotFound from "@/components/NotFound";
import maFetch from "@/lib/fetch";
import {
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useEffect, useState } from "react";

const GenreTVPage = () => {
  const { id } = useParams();
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [genreName, setGenreName] = useState<null | string>(null);
  
  const [notFound, setNotFound] = useState(false)
  
  useEffect(() => {
     setLoading(true);
     
     if (!genreName) {
        maFetch("/api/genres/tv").then((data: any) => {
           const name = data.find(
              (item: any) => item.id == Number(id)
            )?.name;
            if (name) {
               setGenreName(name);
            } else {
         setNotFound(true)
        }
      });
    }
    
    maFetch(
       `/api/genres/tv/get?genreId=${id}&page=${page}`
      ).then((data) => {
         setResults(data.results);
         setTotalPages(data.total_pages);
         setLoading(false);
      });
   }, [page, genreName, id]);
   
   const handlePageChange = (newPage: any) => {
      router.push(`?page=${newPage}`);
   };
   
  if (!parseInt(id as any)) return <NotFound />;
  if (notFound) return <NotFound />;


  return (
    <div className="w-full relative overflow-x-hidden overflow-y-auto">
      {loading ? (
        <div className="text-4xl p-10 font-stretch-100% opacity-50 text-center h-[70vh] lg:h-[75vh]">
          Please Wait...
        </div>
      ) : (
        <>
          <MovieGrid
            title={`TV Genre: ${genreName}`}
            data={results.map((item: any) => ({
              title: item.name,
              url: `/tv/${item.id}`,
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
    </div>
  );
};

export default GenreTVPage;
