import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function addMovie(movie) {
    console.log("adding movie", movie);
    const response = await fetch(
      "https://react-http-b57fe-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  }

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://react-http-b57fe-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
    } catch (error) {}
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <React.Fragment>
      <header>
        <AddMovie addMovie={addMovie} />
      </header>
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
