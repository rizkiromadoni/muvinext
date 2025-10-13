import MovieGrid from "@/components/MovieGrid";
import { cn } from "@/lib/utils";
import { getMovieGenres } from "@/models/tmdb/genreModel";
import { getMoviesByGenre } from "@/models/tmdb/movieModel";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { id } = await params;

  const genreData = await getMovieGenres();
  const genreName = genreData.find((item: any) => item.id == Number(id))?.name;

  return {
    title: `Movies Genre: ${genreName}`,
    description: `Explore movies in the ${genreName} genre.`,
    openGraph: {
      title: `Movies Genre: ${genreName}`,
      description: `Explore movies in the ${genreName} genre.`,
    },
  };
}

const GenreMoviePage = async ({ params, searchParams }: any) => {
  const { id } = await params;
  const queries = await searchParams;
  const page = parseInt(queries.page || "1");

  const genres = await getMovieGenres();
  const genre = genres.find((item: any) => item.id == Number(id));
  if (!genre) notFound();

  const moviesData = await getMoviesByGenre(id, page);
  const movies = moviesData.results;
  const totalPages = moviesData.total_pages;

  return (
    <div className="w-full relative overflow-x-hidden overflow-y-auto">
      <MovieGrid
        title={`Movies Genre: ${genre.name}`}
        data={movies.map((item: any) => ({
          title: item.title,
          url: `/movies/${item.id}`,
          poster: `https://image.tmdb.org/t/p/w1280${item.poster_path}`,
          rating: item.vote_average,
        }))}
      />
      {movies.length > 0 && (
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
            <Link
              href={`/genres/movie/${id}?page=${page - 1}`}
              className={cn(
                "flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-[#1f2022] hover:bg-[#36393c] rounded-s",
                page === 1 && "opacity-50 pointer-events-none"
              )}
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
            </Link>
            <Link
              href={`/genres/movie/${id}?page=${page + 1}`}
              className={cn(
                "flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-[#1f2022] hover:bg-[#36393c] rounded-s",
                page === totalPages && "opacity-50 pointer-events-none"
              )}
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
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenreMoviePage;
