import "./index.css";
import SearchMovies from "./searchMovies";
import NewReleasesList from "./NewReleasesList";
import TopRatedList from "./TopRatedList";
import PopularMoviesList from "./PopularMoviesList";
import PopularMovieBackdrop from "./MainPageBackdrop";

function MainPage() {
  return (
    <div className="back-color">
      <PopularMovieBackdrop />
      <h1 className="display-5 fw-bold text-center text-light">Reel Reviews</h1>
      <div className="wrapper">
        <SearchMovies />
      </div>
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
  );
}

export default MainPage;
