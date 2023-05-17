import React from "react";

import Movie from "./Movie";

const MovieList = (props) => {
  return (
    <ul>
      {props.movies.map((movie) => (
        <Movie
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
        />
      ))}
    </ul>
  );
};

export default MovieList;
