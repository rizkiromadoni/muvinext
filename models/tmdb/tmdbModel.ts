export const getBillboard = async () => {
  try {
    const res = await fetch("https://api.themoviedb.org/3/trending/all/week", {
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

    const billboard = data.results
      .filter(
        (item: any) => item.media_type === "movie" || item.media_type === "tv"
      )
      .shift();

    return billboard;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getTrendingMovies = async () => {
   try {
      const res = await fetch("https://api.themoviedb.org/3/trending/movie/day", {
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
    return data.results
   } catch (error) {
      console.error(error);
      return null;
   }
};

export const getTrendingTV = async () => {
   try {
      const res = await fetch("https://api.themoviedb.org/3/trending/tv/day", {
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
