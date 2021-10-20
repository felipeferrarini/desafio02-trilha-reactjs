import { createContext, useCallback, useEffect, useState } from "react";
import { GenreResponseProps, MovieProps } from "../@types/projectProps";
import { api } from "../services/api";

interface MovieContextProps {
  genres: GenreResponseProps[];
  handleSelectGenre: (id: number) => void;
  selectedGenreId: number;
  selectedGenre: GenreResponseProps;
  movies: MovieProps[];
}

export const MovieContext = createContext({} as MovieContextProps);

export const MovieProvider: React.FC = ({ children }) => {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });

    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]);

  const handleSelectGenre = useCallback((id: number) => {
    setSelectedGenreId(id);
  }, []);

  return (
    <MovieContext.Provider
      value={{
        genres,
        handleSelectGenre,
        selectedGenreId,
        selectedGenre,
        movies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
