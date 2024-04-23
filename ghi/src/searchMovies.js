import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";

function SearchMovies() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const movieSearch = async (search) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&api_key=fed7f31bd9b9809594103276b2560e2f`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.results) {
      setMovies(data.results);
    }
  };

  const MovieList = (props) => {
    return (
      <>
        {props.movies.map((movie) => {
          if (movie.poster_path === null) {
            return null;
          }
          return (
            <div key={movie.id} className="movie-list-card col">
              <Link to={`/movie/${movie.id}`} className="card border-0">
                <img
                  key={movie.id}
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt="poster"
                  className="card"
                />
                <div className="card-overlay">
                  <div className="card-info text-center">
                    <h5>{movie.title}</h5>
                    <div className="rating-circle">
                      <p className="movie-rating">
                        {Math.round(movie.vote_average * 10) / 10}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </>
    );
  };

  useEffect(() => {
    movieSearch(search);
  }, [search]);

  return (
    <>
      <div className="search">
        <h2 className="text-center text-light header">Movie Search</h2>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Find your next favorite film!"
          className="form-control text-dark text-center"
        />
      </div>
      <div className="container-fluid movie-row">
        <div className="row">
          {search.length > 0 ? (
            <MovieList movies={movies} />
          ) : (
            <div class="search-results-row">
              {/* <h1 className="text-center text-light">
                Find your next favorite film!
              </h1> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default SearchMovies;
