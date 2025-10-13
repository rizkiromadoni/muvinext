import MovieGrid from "@/components/MovieGrid";
import PaginationButtons from "@/components/PaginationButton";
import SearchInput from "@/components/SearchInput";
import fetchTmdb from "@/lib/tmdb";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

type SearchPageProps = {
  searchParams: Promise<{ q?: string; page?: string }>;
};

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const sParams = await searchParams;
  const q = sParams.q || "";
  const page = sParams.page ? parseInt(sParams.page) : 1;

  if (!q) {
    return {
      title: "Search",
      description: "Search",
      openGraph: {
        title: "Search",
        description: "Search",
      }
    };
  }

  return {
    title: `Search Results for "${q}" (Page ${page || 1})`,
    description: `Search Results for "${q}" (Page ${page || 1})`,
    openGraph: {
      title: `Search Results for "${q}" (Page ${page || 1})`,
      description: `Search Results for "${q}" (Page ${page || 1})`,
    },
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const sParams = await searchParams;
  const q = sParams.q || "";
  const page = sParams.page ? parseInt(sParams.page) : 1;

  if (page < 1) {
    notFound();
  }

  const data = await fetchTmdb(
    `/search/multi?query=${encodeURIComponent(
      q
    )}&include_adult=false&page=${page}`
  );
  const results = data.results.filter(
    (item: any) => item.media_type !== "person"
  );
  const totalPages = data.total_pages;

  if (page > totalPages && totalPages > 0) {
    notFound();
  }

  return (
    <div className="w-full relative overflow-x-hidden overflow-y-auto">
      <SearchInput defaultQuery={q} />
      {!q ? (
        <div className="text-4xl p-10 font-stretch-100% opacity-50 text-center h-[70vh] lg:h-[75vh]">
          Type something to search...
        </div>
      ) : (
        <>
          <MovieGrid
            title={`Search: ${q}`}
            data={results.map((item: any) => ({
              title: item.media_type === "movie" ? item.title : item.name,
              url: `/${item.media_type === "movie" ? "movies" : "tv"}/${
                item.id
              }`,
              poster: `https://image.tmdb.org/t/p/w1280${item.poster_path}`,
              rating: item.vote_average,
            }))}
          />
          <PaginationButtons currentPage={page} totalPages={totalPages} />
        </>
      )}
    </div>
  );
};

export default SearchPage;
