import MovieSlider from '@/components/MovieSlider';
import { getNowPlayingMovies, getTopRatedMovies, getUpcomingMovies } from '@/models/tmdb/movieModel';
import React from 'react'

const Movies = async () => {
  const nowPlaying = await getNowPlayingMovies();
  const topRatedMovies = await getTopRatedMovies();
  const upcomingMovies = await getUpcomingMovies();

  return (
    <div className="w-full relative overflow-x-hidden overflow-y-auto">
        <MovieSlider title='Now Playing' data={nowPlaying?.map((item: any) => ({
          title: item.title,
          url: `/movies/${item.id}`,
          poster: `https://image.tmdb.org/t/p/w1280${item.poster_path}`,
          rating: item.vote_average
        }))} />
        <MovieSlider title='Top Rated Movies' data={topRatedMovies?.map((item: any) => ({
          title: item.title,
          url: `/movies/${item.id}`,
          poster: `https://image.tmdb.org/t/p/w1280${item.poster_path}`,
          rating: item.vote_average
        }))} />
        <MovieSlider title='Upcoming Movies' data={upcomingMovies?.map((item: any) => ({
          title: item.title,
          url: `/movies/${item.id}`,
          poster: `https://image.tmdb.org/t/p/w1280${item.poster_path}`,
          rating: item.vote_average
        }))} />
    </div>
  )
}

export default Movies