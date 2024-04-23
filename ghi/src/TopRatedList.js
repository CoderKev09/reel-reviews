import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";

function TopRatedList() {
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  const fetchTopRatedData = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/top_rated?api_key=fed7f31bd9b9809594103276b2560e2f";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setTopRatedMovies(data.results);
    }
  };

  useEffect(() => {
    fetchTopRatedData();
  }, []);

  return (
    <>
      <div>
        <h2 className="text-center text-light header">Top Rated</h2>
      </div>
      <div className="container-fluid movie-row">
        <div className="row">
          {topRatedMovies.map((movie) => (
            <div key={movie.id} className="movie-list-card col">
              <Link to={`/movie/${movie.id}`} className="card border-0">
                <img
                  key={movie.id}
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
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
          ))}
        </div>
      </div>
    </>
  );
}

export default TopRatedList;
