import React, { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";
import { MovieCard } from "./MovieCard";

export function Content() {
  const { selectedGenre, movies } = useContext(MovieContext);

  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {selectedGenre.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
              key={`movie-card-${movie.Title}-${movie.Runtime}`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
