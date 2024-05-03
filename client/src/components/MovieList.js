import React, { useState, useEffect } from 'react'

const MovieList = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:5000/basics')
        const data = await response.json()
        setMovies(data)
      } catch (error) {
        console.error(error)
      }
    }

    const interval = setInterval(fetchMovies, 1000) // Fetch movies every second

    return () => clearInterval(interval) // Clean up interval on component unmount
  }, [])

  return (
    <div>
      {/* <h2>Movie List</h2> */}
      <div className="centering">
        <h2>Movie List</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>tconst</th>
            <th>titletype</th>
            <th>primarytitle</th>
            <th>originaltitle</th>
            <th>isadult</th>
            <th>startyear</th>
            <th>endyear</th>
            <th>runtimeminutes</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, index) => (
            <tr key={index}>
              <td>{movie.tconst}</td>
              <td>{movie.titletype}</td>
              <td>{movie.primarytitle}</td>
              <td>{movie.originaltitle}</td>
              <td>{movie.isadult}</td>
              <td>{movie.startyear}</td>
              <td>{movie.endyear}</td>
              <td>{movie.runtimeminutes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MovieList
