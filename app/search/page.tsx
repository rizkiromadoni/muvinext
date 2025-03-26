import React from 'react'
import SearchInput from '@/components/SearchInput'
import MovieGrid from '@/components/MovieGrid';

const Search = async ({ searchParams }: { searchParams: Promise<{ q?: string }> }) => {
  const { q } = await searchParams;

  return (
    <div className="w-full relative overflow-x-hidden overflow-y-auto">
      <SearchInput defaultQuery={q || ""} />
      {!q ? (
        <div className='text-4xl p-10 font-stretch-100% opacity-50 text-center h-[70vh] lg:h-[75vh]'>
        Type something to search...
      </div>
      ) : (
          <div>
            <MovieGrid title={`Search: ${q}`} data={[
                {
                    title: "Meet The Fress Indonesia",
                    url: "#",
                    poster: "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
                    rating: 7.5
                },
                {
                    title: "Meet The Fress Indonesia",
                    url: "#",
                    poster: "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
                    rating: 7.5
                },
                {
                    title: "Meet The Fress Indonesia",
                    url: "#",
                    poster: "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
                    rating: 7.5
                }
              ]} />
          </div>
      )}
    </div>
  )
}

export default Search