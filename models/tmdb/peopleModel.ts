export const getPeople = async (id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}?append_to_response=combined_credits,images`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
      next: { revalidate: 60 * 60 * 24 * 7 }, // Cache for 7 days
    }
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();
  return data;
};