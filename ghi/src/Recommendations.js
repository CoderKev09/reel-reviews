import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { useParams } from "react-router-dom";

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const { movie_id } = useParams();

  const fetchRecommendationsData = async () => {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=fed7f31bd9b9809594103276b2560e2f`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setRecommendations(data.results);
    }
  };

  useEffect(() => {
    fetchRecommendationsData();
    window.scrollTo(0, 0);
  }, [movie_id]);

  if (recommendations.length === 0) {
    return null;
  } else {
    return (
      <>
        <div>
          <h2 className="text-center text-light header">Recommendations</h2>
        </div>
        <div className="container-fluid movie-row">
          <div className="row">
            {recommendations.map((movie) => (
              <div
                key={movie.id}
                className="col d-flex justify-content-start m-1"
              >
                <Link to={`/movie/${movie.id}`}>
                  <img
                    key={movie.id}
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className="card border-0"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default Recommendations;
