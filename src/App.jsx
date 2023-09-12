import { useState, useEffect } from 'react';
import axios from 'axios'


function App() {
  const API_URL = "https://api.themoviedb.org/3/"

  const fetchMovies = async () => {
    const data = await axios.get(`${API_URL}/discover/movie`, {
      params: {
        api_key: import.meta.env.VITE_REACT_APP_MOVIE_API_KEY
      }
    })
    console.log(data)
  }


  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <div>Hello World, I am here </div>

  )
}

export default App
