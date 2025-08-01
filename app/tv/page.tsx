import MovieSlider from '@/components/MovieSlider'
import { getAiringTodaySeries, getOnTheAirSeries, getTopRatedSeries } from '@/models/tmdb/tvModel'
import React from 'react'

const Series = async () => {
  const airingTodaySeries = await getAiringTodaySeries()
  const onTheAirSeries = await getOnTheAirSeries()
  const topRatedSeries = await getTopRatedSeries()

  return (
    <div className="w-full relative overflow-x-hidden overflow-y-auto">
      <MovieSlider title='Airing Today' data={airingTodaySeries?.map((item: any) => ({
        title: item.name,
        url: `/tv/${item.id}`,
        poster: `https://image.tmdb.org/t/p/w1280${item.poster_path}`,
        rating: item.vote_average
      }))} />
      <MovieSlider title='On The Air' data={onTheAirSeries?.map((item: any) => ({
        title: item.name,
        url: `/tv/${item.id}`,
        poster: `https://image.tmdb.org/t/p/w1280${item.poster_path}`,
        rating: item.vote_average
      }))} />
      <MovieSlider title='Top Rated Series' data={topRatedSeries?.map((item: any) => ({
        title: item.name,
        url: `/tv/${item.id}`,
        poster: `https://image.tmdb.org/t/p/w1280${item.poster_path}`,
        rating: item.vote_average
      }))} />
    </div>
  )
}

export default Series