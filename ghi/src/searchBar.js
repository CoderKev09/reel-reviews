import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./index.css";
import { CloseButton } from "react-bootstrap";

function SearchBar() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [hideSearch, setHideSearch] = useState(true);

  useEffect(() => {
    const movieSearch = async (search) => {
      const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&api_key=fed7f31bd9b9809594103276b2560e2f`;

      const response = await fetch(url);
      const data = await response.json();
      if (data.results) {
        setMovies(data.results);
      }
    };
    movieSearch(search);
    setHideSearch(search.length > 0);
  }, [search]);

  const closeSearch = () => {
    setHideSearch(false);
    setSearch("");
  };

  return (
    <>
      <div className="nav-search-button">
        <Link onClick={() => setHideSearch(!hideSearch)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </Link>
      </div>
      <div className="searchInputs">
        {hideSearch && (
          <input
            className="movie-inputs"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search for a movie"
          />
        )}
        <div>
          {hideSearch && (
            <div className="dataResult">
              <CloseButton className="close-button" onClick={closeSearch} />
              {movies.map((value, key) => {
                if (value.poster_path === null) {
                  return null;
                }
                return (
                  <div className="movie-columns">
                    <Link
                      className="movie-image"
                      to={`/movie/${value.id}`}
                      onClick={closeSearch}
                    >
                      <img
                        className="movie-image-dropdown"
                        src={`https://image.tmdb.org/t/p/w200${value.poster_path}`}
                        alt="movie-poster"
                      />
                    </Link>
                    <Link
                      className="movie-title-link"
                      to={`/movie/${value.id}`}
                      onClick={closeSearch}
                    >
                      <p className="movie-text">{value.title}</p>
                    </Link>
                    <p className="release-date">{value.release_date}</p>
                    <p className="average-rating">{`Rating: ${value.vote_average}`}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchBar;
