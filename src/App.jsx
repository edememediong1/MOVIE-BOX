import { useState, useEffect } from 'react';
import axios from 'axios'
import MovieCard from './component/MovieCard';


function App() {
  const API_URL = "https://api.themoviedb.org/3/"
  const [movies, setMovies] = useState([])
  const [searchKey, setSearchKey]= useState([])
  const [selectMovie, setSelectMovie] = useState({})
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original/"

  const fetchMovies = async (searchKey) => {
   
    try {
      const {data:{results}} = await axios.get(`${API_URL}/${searchKey ? "search/movie" : "discover/movie"}`, {
        params: {
          api_key: import.meta.env.VITE_REACT_APP_MOVIE_API_KEY,
          query: searchKey
        } 
      }) 
    setMovies(results)
    setSelectMovie(results[0])
    }
    catch(error){
      console.log("There's an error", error)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  const renderMovies = movies.map((movie) =>{
    return(<MovieCard
      key = {movie.id}
      movie = {movie}
    />)
  })
  
const searchMovies = (e) => {
  e.preventDefault()
  fetchMovies(searchKey)
}
  return (
    <div className='App'>
      <header className="header" style={{backgroundImage: `url('${IMAGE_PATH}${selectMovie.backdrop_path}')`}}>
        <div className='header-content'>
          <img src='./Logo.svg' />
          <form onSubmit={searchMovies}>
              <input type="text" onChange={(e => setSearchKey(e.target.value))}/>
              <button type='submit'> <i className="fa fa-search"></i></button>
          </form>
        </div>
        <div className='Hero'>
          <h1>{selectMovie.title}</h1>
          <div className='rating'>
            <span><img src="./src/assets/imdb.svg"/><p>{selectMovie.vote_average}/10</p></span>
            <span><img src="./src/assets/rot.svg"/><p>97%</p></span>
          </div>
          {selectMovie.overview ? <p>{selectMovie.overview}</p> : null}
          <button className='trailer-button'><img src="./src/assets/button.svg"/></button>
        </div>

      </header>
      
      <h1>Featured Movies</h1>
      <div className='container'>
        {movies.length > 0 ? renderMovies : <h1>Loading</h1>}
      </div>
    </div>
  )
}

export default App
