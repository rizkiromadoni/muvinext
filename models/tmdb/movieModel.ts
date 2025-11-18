export const getMovie = async (id: string | number) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits,videos,recommendations`,
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
    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMoviesByGenre = async (
  genreId: string | number,
  page: string | number
) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&page=${page}`,
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
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getNowPlayingMovies = async () => {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
      next: { revalidate: 60 * 60 * 24 }, // Cache for 1 days
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getTopRatedMovies = async () => {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
      next: { revalidate: 60 * 60 * 24 }, // Cache for 1 days
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUpcomingMovies = async () => {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
      next: { revalidate: 60 * 60 * 24 }, // Cache for 1 days
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
};
