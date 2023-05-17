import React, { useState, useEffect, useCa, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();
    const transformedMovies = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });
    setMovies(transformedMovies);
    setIsLoading(false);
  };

  const stableFetchMovies = useCallback(fetchMovies, []);

  useEffect(() => {
    stableFetchMovies();
  }, [stableFetchMovies]);

  return (
    <React.Fragment>
      <section>
        <button>Fetch Movies</button>
      </section>
      <section>
        {isLoading ? <div>Loading...</div> : <MoviesList movies={movies} />}
      </section>
    </React.Fragment>
  );
}

export default App;
