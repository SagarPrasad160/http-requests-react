import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    openingText: "",
    releaseDate: new Date(),
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(formData);
  };

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
      <header>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="title"
            onChange={handleChange}
          />
          <textarea id="openingText" onChange={handleChange} />
          <label htmlFor="releaseDate">Release Date</label>
          <input type="date" id="releaseDate" onChange={handleChange} />
          <button>Add Movie</button>
        </form>
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
