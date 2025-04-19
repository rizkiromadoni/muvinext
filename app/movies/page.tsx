import MovieGrid from '@/components/MovieGrid'
import { getMovies } from '@/models/movies';
import React from 'react'

const Movies = async () => {
  const movies = await getMovies(24);

  return (
    <div className="w-full relative overflow-x-hidden overflow-y-auto">
        <MovieGrid title="Latest Movies" data={movies.map((item: any) => ({
            title: item.postTitle,
            url: "/movies/" + item.postName,
            poster: item.postMetas.find((meta: any) => meta.metaKey === "_knawatfibu_url" || meta.metaKey === "IDMUVICORE_Poster")?.metaValue,
            rating: item.postMetas.find((meta: any) => meta.metaKey === "IDMUVICORE_tmdbRating")?.metaValue || null
        }))} />
</div>
  )
}

export default Movies