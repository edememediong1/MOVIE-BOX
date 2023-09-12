import { useState, useEffect } from 'react';
import axios from 'axios'
import MovieCard from './component/MovieCard';


function App() {
  const API_URL = "https://api.themoviedb.org/3/"
  const [movies, setMovies] = useState([])

  const fetchMovies = async () => {
    try {
      const {data:{results}} = await axios.get(`${API_URL}/movie/top_rated`, {
        params: {
          api_key: import.meta.env.VITE_REACT_APP_MOVIE_API_KEY
        }
      })    
    setMovies(results)
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
  

  return (
    <div>
      <div>Hello World, I am here </div>
      <div className='container'>
        {movies.length > 0 ? renderMovies : <h1>Loading</h1>}
      </div>
    </div>
  )
}

export default App
