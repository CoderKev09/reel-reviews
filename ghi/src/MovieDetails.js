import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./index.css";
import ReviewForm from "./ReviewForm";
import UpdateReviewForm from "./UpdateReviewForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Recommendations from "./Recommendations";
import { ModalHeader } from "react-bootstrap";

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const [HideReview, setHideReview] = useState(false);
  const [reviewConfirmation, setReviewConfirmation] = useState(false);
  const [review, setReviewData] = useState([]);
  const [show, setShow] = useState(false);
  const [backdropPath, setBackDropPath] = useState(false);
  const [trailer, setTrailer] = useState("");
  const [movieCast, setMovieCast] = useState([]);
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const { movie_id } = useParams();

  const handleCloseTrailerModal = () => setShowTrailerModal(false);
  const handleShowTrailerModal = () => setShowTrailerModal(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const url = "http://localhost:8000/token";
      const urlReviewsAll = "http://localhost:8000/api/reviews/all/loggedout";
      const fetchConfig = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      try {
        const responseToken = await fetch(url, fetchConfig);
        const tokenData = await responseToken.json();
        const responseReviewsAll = await fetch(urlReviewsAll, fetchConfig);
        const reviewsAllData = await responseReviewsAll.json();

        let reviewsArray = [];
        for (let reviews in reviewsAllData) {
          if (reviewsAllData[reviews].movie_id == movie_id) {
            reviewsArray.push(reviewsAllData[reviews]);
          }
        }
        setReviewData(reviewsArray);

        for (let review in reviewsAllData) {
          if (
            reviewsAllData[review].movie_id == movie_id &&
            reviewsAllData[review].username === tokenData.account.username
          ) {
            setReviewConfirmation(true);

            break;
          } else {
            setReviewConfirmation(false);
          }
        }

        if (tokenData === null) {
          setHideReview(false);
        } else {
          setHideReview(true);
        }
      } catch (error) {
        console.error("This is expected if logged out:", error);
      }
    };
    fetchReviews();
  }, [movie_id]);

  const fetchMovieDetails = async () => {
    const tmdbUrl = `https://api.themoviedb.org/3/movie/${movie_id}?&api_key=fed7f31bd9b9809594103276b2560e2f&append_to_response=videos,credits`;

    const tmdbResponse = await fetch(tmdbUrl);
    const tmdbData = await tmdbResponse.json();
    const imdbId = tmdbData.imdb_id;
    const backDrop = tmdbData.backdrop_path;
    const cast = tmdbData.credits.cast.slice(0, 10);
    setMovieCast(cast);
    setBackDropPath(backDrop);

    let video = null;
    if (tmdbData.videos && tmdbData.videos.results) {
      for (const result of tmdbData.videos.results) {
        if (result.type === "Trailer") {
          video = result.key;
          break;
        }
      }
    }
    setTrailer(video);

    const omdbUrl = `http://www.omdbapi.com/?i=${imdbId}&apikey=82116a62`;
    const omdbResponse = await fetch(omdbUrl);
    const omdbData = await omdbResponse.json();
    setMovieDetails(omdbData);
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [movie_id]);

  if (!movieDetails) {
    return <div>Fetching data</div>;
  }

  return (
    <>
      <div className="backdrop-container">
        <img
          src={`https://image.tmdb.org/t/p/original/${backdropPath}`}
          alt="backdrop"
          className="backdrop"
        />
        <button className="trailer-button" onClick={handleShowTrailerModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="65"
            height="65"
            fill="currentColor"
            class="bi bi-play-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
          </svg>
          <br />
          Watch Trailer
        </button>
      </div>
      <div className="movie-details-backdrop">
        <div className="detail-container">
          <div className="flex-container">
            <img
              src={movieDetails.Poster}
              alt="poster"
              className="card card-details"
            />
            <div className="movie-details">
              <h1 className="text-light movie-title">
                {movieDetails.Title}
                <span className="release-year"> ({movieDetails.Year}) </span>
                <span className="director">
                  Directed by {movieDetails.Director}{" "}
                </span>
              </h1>
              <h3 className="text-light movie-title-details">
                {movieDetails.Rated} &bull; {movieDetails.Runtime} &bull;{" "}
                {movieDetails.Genre}
              </h3>
              <h5 className="text-light synopsis">Synopsis</h5>
              <p className="plot text-light">{movieDetails.Plot}</p>
              <div className="text-light text-center secondary-details">
                <span className="metascore mb-2">
                  <strong>Metascore</strong> <br />{" "}
                  <h2>{movieDetails.Metascore}</h2>
                </span>{" "}
                <span className="writers mb-4">
                  <strong>Writers</strong>
                  <br />
                  {movieDetails.Writer}
                </span>{" "}
                <span className="metascore mb-4">
                  <strong>Released</strong>
                  <br />
                  {movieDetails.Released}
                </span>{" "}
              </div>
              {/* Released: {movieDetails.Released}
              <br />
              Director: {movieDetails.Director}
              <br />
              Writer: {movieDetails.Writer}
              <br />
              Language: {movieDetails.Language}
              <br />
              Country: {movieDetails.Country}
              <br />
              Awards: {movieDetails.Awards}
              <br /> */}
            </div>
          </div>
        </div>
        <div className="container-fluid cast-container">
          <h2 className="text-light m-4 cast-header">Cast</h2>
          <ol className="row">
            {movieCast.map((actor) => (
              <li className="card actor-picture">
                <img
                  key={actor.id}
                  src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                  alt="actor-picture"
                  className="card-img-top"
                />
                <p className="card-text text-dark text-center actor-name">
                  {actor.name}
                </p>
                <p className="character text-center">"{actor.character}"</p>
              </li>
            ))}
          </ol>
        </div>
        <Modal
          show={showTrailerModal}
          onHide={handleCloseTrailerModal}
          className="modal-xl"
        >
          <Modal.Header closeButton>
            <Modal.Title>Watch Trailer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <iframe
              width="100%"
              height="625px"
              src={`https://www.youtube.com/embed/${trailer}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseTrailerModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="container-fluid movie-reviews-container">
          <h2 className="review-header m-4 text-light">Reviews</h2>
          <div className="reviews-scroll m-4">
            {review.map((reviews, index) => (
              <div className="movie-review text-light">
                <div className="review-avatar-container">
                  <span>
                    {reviews.avatar ? (
                      <img
                        className="review-avatar rounded-circle"
                        src={reviews.avatar}
                        alt="avatar"
                      />
                    ) : (
                      <img
                        className="review-avatar rounded-circle"
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                        alt="avatar"
                      />
                    )}
                  </span>
                </div>
                <div className="movie-review-body">
                  <span className="review-username-span">
                    {reviews.username}
                  </span>{" "}
                  <br />
                  <span className="review-title-span">
                    <strong>{reviews.title}</strong>{" "}
                    {reviews.rating ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="blue"
                        className="thumbs-up"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="red"
                        className="thumbs-down"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z" />
                      </svg>
                    )}
                  </span>
                  <br />
                  <span className="review-body-span">{reviews.body}</span>{" "}
                  <br />
                  <span className="review-date-span">
                    {new Date(reviews.posted_time).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="m-4">
            {HideReview && reviewConfirmation === false && (
              <Button variant="primary" onClick={handleShow}>
                Leave a Reel Review!
              </Button>
            )}
            {HideReview && reviewConfirmation === true && (
              <Button variant="primary" onClick={handleShow}>
                Update your Reel Review!
              </Button>
            )}
          </div>
        </div>
        <div>
          {HideReview && reviewConfirmation === false && (
            <Modal
              show={show}
              onHide={handleClose}
              dialogClassName="modal-100w"
              aria-labelledby="example-custom-modal-styling-title"
            >
              <Modal.Header closeButton>
                <Modal.Title>Leave a Review</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ReviewForm movie_id={movie_id} />
              </Modal.Body>
            </Modal>
          )}
        </div>
        <div>
          {HideReview && reviewConfirmation === true && (
            <Modal
              show={show}
              onHide={handleClose}
              dialogClassName="modal-100w"
              aria-labelledby="example-custom-modal-styling-title"
            >
              <Modal.Header closeButton>
                <Modal.Title>Update Review</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <UpdateReviewForm movie_id={movie_id} />
              </Modal.Body>
            </Modal>
          )}
        </div>
        <div className="recommend-container">
          <Recommendations />
        </div>
      </div>
    </>
  );
};
export default MovieDetails;
