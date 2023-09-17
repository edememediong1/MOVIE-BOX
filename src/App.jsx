import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./component/MovieCard";
// import MovieDetail from "./component/MovieDetails";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import YouTube from "react-youtube";

function App() {
  const API_URL = "https://api.themoviedb.org/3/";
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [selectMovie, setSelectMovie] = useState({});
  const [listNumber, setListNumber] = useState({ from: 0, to: 10 });
  const [playTrailer, setPlayTrailer] = useState(false);
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original/";

  const fetchMovies = async (searchKey) => {
    try {
      const {
        data: { results },
      } = await axios.get(
        `${API_URL}${searchKey ? "search/movie" : "discover/movie"}`,
        {
          params: {
            api_key: import.meta.env.VITE_REACT_APP_MOVIE_API_KEY,
            query: searchKey,
          },
        }
      );
      selectedMovie(results[0]);
      setMovies(results);
      console.log(movies, selectMovie);
    } catch (error) {
      console.log("There's an error", error);
    }
  };

  // Fetch appended details for the YouTube Video
  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: import.meta.env.VITE_REACT_APP_MOVIE_API_KEY,
        append_to_response: "videos",
      },
    });

    return data;
  };

  const selectedMovie = async (movie) => {
    const data = await fetchMovie(movie.id);
    setSelectMovie(data);
  };

  useEffect(() => {
    fetchMovies();
  }, [movies]);

  const paginate = () => {
    setListNumber((prev) => {
      return {
        from: (prev.from += 10),
        to: (prev.to += 10),
      };
    });
  };

  function limitMovies(movies) {
    return movies.slice(listNumber.from, listNumber.to);
  }

  const renderMovies = limitMovies(movies).map((movie) => {
    return (
      <MovieCard key={movie.id} movie={movie} selectMovie={selectedMovie} />
    );
  });

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  const renderTrailer = () => {
    const trailer = movies.videos.results.find(
      (vid) => vid.name === "Official Trailer"
    );
    return <YouTube videoId={trailer.key} />;
  };

  return (
    <div className="App">
      <header
        className="header"
        style={{
          backgroundImage: `url('${IMAGE_PATH}${selectMovie.backdrop_path}')`,
        }}
      >
        <div className="header-content">
          <img src="./Logo.svg" />
          <form onSubmit={searchMovies}>
            <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
            <button type="submit" className="search-button">
              {" "}
              <i className="fa fa-search"></i>
            </button>
          </form>
          <div>
            <a className="sign-in" href="#">
              Sign In
            </a>
            <img src="../src/assets/Menu.svg" />
          </div>
        </div>
        <div className="Hero">
          {selectedMovie.videos && playTrailer ? renderTrailer() : null}
          {/* <YouTube/> */}
          <h1>{selectMovie.title}</h1>
          <div className="rating">
            <span>
              <img src="./src/assets/imdb.svg" />
              <p>{selectMovie.vote_average}/10</p>
            </span>
            <span>
              <img src="./src/assets/rot.svg" />
              <p>97%</p>
            </span>
          </div>

          {selectMovie.overview ? <p>{selectMovie.overview}</p> : null}
          <button
            className="trailer-button"
            onClick={() => {
              setPlayTrailer(true), console.log(selectedMovie.videos.results);
            }}
          >
            <img src="./src/assets/button.svg" />
          </button>
        </div>
      </header>
      <div className="feature-header">
        <h1>Featured Movies</h1>
        <p onClick={() => paginate()}>{`See more >`}</p>
      </div>

      <div className="container">
        {movies.length > 0 ? renderMovies : <h1>Loading</h1>}
      </div>
    </div>
  );
}

export default App;
