import MovieBanner from "@/components/MovieBanner";
import MovieSlider from "@/components/MovieSlider";
import SingleMoviePage from "@/components/pages/SingleMoviePage";
import React from "react";

const SingleMovies = () => {
  return (
    <div className="w-full relative overflow-x-hidden overflow-y-auto">
      <MovieBanner
        title="The Avengers (2020)"
        poster="https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg"
        description="Avengers: Endgame is the final chapter of the Marvel Cinematic Universe's Avengers film series. The film is directed by Joss Whedon from a screenplay by Joss Whedon and Zack Snyder, with a screenplay by Joss Whedon and Zack Snyder. It stars Robert Downey Jr. as Iron Man, Chris Hemsworth as Thor, Mark Ruffalo as Hulk, Benedict Cumberbatch as Ant-Man, and Henry Cavill as Loki. The Avengers: Endgame follows the heroes as they fight against the threat of Thanos, a mysterious being who seeks to conquer the universe. The film was released on June 22, 2019, by Marvel Studios."
      />

      <SingleMoviePage />

      <MovieSlider title="More Like This" data={[
        {
          title: "The Avengers (2020)",
          poster: "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
          url: "/movies/the-avengers-2020",
          rating: 8.5,
        },
        {
          title: "The Avengers (2020)",
          poster: "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
          url: "/movies/the-avengers-2020",
          rating: 8.5,
        },
        {
          title: "Avengers: Endgame (2019)",
          poster: "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
          url: "/movies/avengers-endgame-2019",
          rating: 9.5,
        },
        {
          title: "Avengers: Endgame (2019)",
          poster: "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
          url: "/movies/avengers-endgame-2019",
          rating: 9.5,
        },
        {
          title: "Thor: Ragnarok (2017)",
          poster: "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
          url: "/movies/thor-ragnarok-2017",
          rating: 7.5,
        },
        {
          title: "Thor: Ragnarok (2017)",
          poster: "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
          url: "/movies/thor-ragnarok-2017",
          rating: 7.5,
        },
        {
          title: "Thor: Ragnarok (2017)",
          poster: "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
          url: "/movies/thor-ragnarok-2017",
          rating: 7.5,
        },
        {
          title: "Thor: Ragnarok (2017)",
          poster: "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
          url: "/movies/thor-ragnarok-2017",
          rating: 7.5,
        },
        {
          title: "Thor: Ragnarok (2017)",
          poster: "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
          url: "/movies/thor-ragnarok-2017",
          rating: 7.5,
        },
        {
          title: "Thor: Ragnarok (2017)",
          poster: "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
          url: "/movies/thor-ragnarok-2017",
          rating: 7.5,
        },
      ]} />
    </div>
  );
};

export default SingleMovies;
