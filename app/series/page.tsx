import MovieGrid from '@/components/MovieGrid'
import { getSeries } from '@/models/series'
import React from 'react'

const Series = async () => {
  const posts = await getSeries(24)

  return (
    <div className="w-full relative overflow-x-hidden overflow-y-auto">
         <MovieGrid title="Latest TV Series" data={posts.map((item: any) => ({
            title: item.postTitle,
            url: "/series/" + item.postName,
            poster: item.postMetas.find((meta: any) => meta.metaKey === "_knawatfibu_url" || meta.metaKey === "IDMUVICORE_Poster")?.metaValue,
            rating: item.postMetas.find((meta: any) => meta.metaKey === "IDMUVICORE_tmdbRating")?.metaValue || null
        }))} />
</div>
  )
}

export default Series