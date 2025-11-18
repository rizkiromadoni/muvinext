export const getMovieGenres = async () => {
      try {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list`,
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
    return data.genres;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const getTVGenres = async () => {
   try {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/tv/list`,
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
    return data.genres;
  } catch (error) {
    console.error(error);
    return null;
  }
}