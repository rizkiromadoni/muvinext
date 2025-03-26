import React from 'react'

async function kontol(params:string) {
    return Promise.resolve(params)
}

const SearchResult = async ({ query }: { query: string }) => {
    const res = await kontol(query)
  return (
    <div>{res}</div>
  )
}

export default SearchResult