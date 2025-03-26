import MovieBanner from "@/components/MovieBanner";
import MovieSlider from "@/components/MovieSlider";

import React from "react";

const Home = () => {
  return (
    <div className="w-full relative overflow-x-hidden overflow-y-auto">
      <a href="/series/example" className="">
        <MovieBanner title="The Avengers (2020)" poster="https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg" description="Avengers: Endgame is the final chapter of the Marvel Cinematic Universe's Avengers film series. The film is directed by Joss Whedon from a screenplay by Joss Whedon and Zack Snyder, with a screenplay by Joss Whedon and Zack Snyder. It stars Robert Downey Jr. as Iron Man, Chris Hemsworth as Thor, Mark Ruffalo as Hulk, Benedict Cumberbatch as Ant-Man, and Henry Cavill as Loki. The Avengers: Endgame follows the heroes as they fight against the threat of Thanos, a mysterious being who seeks to conquer the universe. The film was released on June 22, 2019, by Marvel Studios." />
      </a>
      <MovieSlider
        title="Latest Movies"
        moreUrl="/movies"
        data={[
          {
            title: "Meet The Fress Indonesia",
            url: "/movies/example",
            poster:
              "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
            rating: null,
          },
          {
            title: "Meet The Fress Indonesia",
            url: "/movies/example",
            poster:
              "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
            rating: null,
          },
          {
            title: "Meet The Fress Indonesia",
            url: "/movies/example",
            poster:
              "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
            rating: null,
          },
          {
            title: "Meet The Fress Indonesia",
            url: "/movies/example",
            poster:
              "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
            rating: null,
          },
          {
            title: "Meet The Fress Indonesia",
            url: "/movies/example",
            poster:
              "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
            rating: null,
          },
          {
            title: "Meet The Fress Indonesia",
            url: "/movies/example",
            poster:
              "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
            rating: null,
          },
          {
            title: "Meet The Fress Indonesia",
            url: "/movies/example",
            poster:
              "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
            rating: null,
          },
          {
            title: "Meet The Fress Indonesia",
            url: "/movies/example",
            poster:
              "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
            rating: null,
          },
        ]}
      />
      <MovieSlider
        title="Latest TV Series"
        moreUrl="/series"
        data={[
          {
            title: "Meet The Fress Indonesia",
            url: "/series/example",
            poster:
              "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
            rating: 8.4,
          },
          {
            title: "Meet The Fress Indonesia",
            url: "/series/example",
            poster:
              "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
            rating: 8.4,
          },
          {
            title: "Meet The Fress Indonesia",
            url: "/series/example",
            poster:
              "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
            rating: 8.4,
          },
          {
            title: "Meet The Fress Indonesia",
            url: "/series/example",
            poster:
              "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
            rating: 8.4,
          },
          {
            title: "Meet The Fress Indonesia",
            url: "/series/example",
            poster:
              "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
            rating: 8.4,
          },
          {
            title: "Meet The Fress Indonesia",
            url: "/series/example",
            poster:
              "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
            rating: 8.4,
          },
          {
            title: "Meet The Fress Indonesia",
            url: "/series/example",
            poster:
              "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
            rating: null,
          },
          {
            title: "Meet The Fress Indonesia",
            url: "/series/example",
            poster:
              "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
            rating: null,
          },
        ]}
      />
    </div>
  );
};

export default Home;
