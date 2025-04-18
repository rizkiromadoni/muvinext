import React from "react";
import SearchInput from "@/components/SearchInput";
import MovieGrid from "@/components/MovieGrid";

const Search = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) => {
  const { q } = await searchParams;

  if (!q) {
    return (
      <div className="w-full relative overflow-x-hidden overflow-y-auto">
        <SearchInput defaultQuery={q || ""} />
        <div className="text-4xl p-10 font-stretch-100% opacity-50 text-center h-[70vh] lg:h-[75vh]">
          Type something to search...
        </div>
      </div>
    );
  }

  const posts = await fetch(new URL(`/api/search?q=${q}`, process.env.APP_URL)).then((res) => res.json());

  return (
    <div className="w-full relative overflow-x-hidden overflow-y-auto">
      <SearchInput defaultQuery={q || ""} />
      <div>
        <MovieGrid
          title={`Search: ${q}`}
          data={posts.map((item: any) => ({
            title: item.postTitle,
            url: `/${item.postType === "post" ? "movies" : "series"}/${item.postName}`,
            poster: item.postMetas.find((meta: any) => meta.metaKey === "_knawatfibu_url" || meta.metaKey === "IDMUVICORE_Poster")?.metaValue,
            rating: item.postMetas.find((meta: any) => meta.metaKey === "IDMUVICORE_tmdbRating")?.metaValue || null
          }))}
        />
      </div>
    </div>
  );
};

export default Search;
