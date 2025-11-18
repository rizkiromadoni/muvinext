export const getTVSeries = async (id: string | number) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?append_to_response=credits,videos,recommendations`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
        next: { revalidate: 60 * 60 * 24 * 7}, // Cache for 7 days
      }
    );

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(res.statusText);
    }

    const data = await res.json();
    if (!data) return null;

    return data;
  } catch (error) {
   console.error(error)
   return null
  }
};

export const getTVSeriesByGenre = async (
  genreId: string | number,
  page: string | number
) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?with_genres=${genreId}&page=${page}`,
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
      if (res.status === 404) {
        return null;
      }
      throw new Error(res.statusText);
    }

    const data = await res.json();
    if (!data) return null;

    return data;
  } catch (error) {
   console.error(error)
   return null
  }
};

export const getAiringTodaySeries = async () => {
try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/airing_today`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
        next: { revalidate: 60 * 60 * 24 }, // Cache for 1 days
      }
    );

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();
    return data.results;
  } catch (error) {
   console.error(error)
   return null
  }
};

export const getOnTheAirSeries = async () => {
try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/on_the_air`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
        next: { revalidate: 60 * 60 * 24 }, // Cache for 1 days
      }
    );

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();
    return data.results;
  } catch (error) {
   console.error(error)
   return null
  }
};

export const getTopRatedSeries = async () => {
try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/top_rated`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
        next: { revalidate: 60 * 60 * 24 }, // Cache for 1 days
      }
    );

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();
    return data.results;
  } catch (error) {
   console.error(error)
   return null
  }
};
