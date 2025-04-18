import MovieGrid from '@/components/MovieGrid'
import React from 'react'

const Movies = async () => {
  const posts = await fetch(process.env.APP_URL + "/api/movies?limit=20").then((res) => res.json());

  return (
    <div className="w-full relative overflow-x-hidden overflow-y-auto">
        <MovieGrid title="Latest Movies" data={posts.map((item: any) => ({
            title: item.postTitle,
            url: "/movies/" + item.postName,
            poster: item.postMetas.find((meta: any) => meta.metaKey === "_knawatfibu_url" || meta.metaKey === "IDMUVICORE_Poster")?.metaValue,
            rating: item.postMetas.find((meta: any) => meta.metaKey === "IDMUVICORE_tmdbRating")?.metaValue || null
        }))} />
</div>
  )
}

export default Movies