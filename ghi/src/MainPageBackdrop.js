import React, { useState, useEffect } from "react";

function PopularMovieBackdrop() {
  const [backdropPath, setBackdropPath] = useState("");

  useEffect(() => {
    const getPopularMovie = async () => {
      const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=fed7f31bd9b9809594103276b2560e2f`;

      try {
        // Fetch the list of popular movies
        const response = await fetch(popularMoviesUrl);
        const data = await response.json();

        // Randomly select a movie from the list
        const mostPopularMovie = data.results[0];

        // Set the backdrop path of the selected movie
        if (mostPopularMovie && mostPopularMovie.backdrop_path) {
          setBackdropPath(mostPopularMovie.backdrop_path);
        }
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    getPopularMovie();
  }, []);

  return (
    <div className="main-backdrop-container">
      {backdropPath && (
        <img
          src={`https://image.tmdb.org/t/p/original${backdropPath}`}
          alt="Random Movie Backdrop"
          className="main-backdrop"
        />
      )}
    </div>
  );
}

export default PopularMovieBackdrop;
