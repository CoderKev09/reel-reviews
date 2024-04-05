import "./index.css";
import SearchMovies from "./searchMovies";
import NewReleasesList from "./NewReleasesList";
import TopRatedList from "./TopRatedList";
import PopularMoviesList from "./PopularMoviesList";
import PopularMovieBackdrop from "./MainPageBackdrop";

function MainPage() {
  return (
    <div className="main-page-container">
      <PopularMovieBackdrop />
      <div className="tagline">
        <h1 className="display-5 fw-bold text-center text-light font-italic">
          Captivating cinematic chronicles <br /> Find your next adventure{" "}
          <br /> Keep it Reel <br />{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="#2D8FDA"
            class="bi bi-camera-reels"
            viewBox="0 0 16 16"
          >
            <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0M1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0" />
            <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm6 8.73V7.27l-3.5 1.555v4.35zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1" />
            <path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6M7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
          </svg>
        </h1>
      </div>
      <div className="wrapper">
        <SearchMovies />
      </div>
      <div className="movie-lists">
        <div>
          <NewReleasesList />
        </div>
        <div>
          <TopRatedList />
        </div>
        <div>
          <PopularMoviesList />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
