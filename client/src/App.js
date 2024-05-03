import React, { Fragment } from 'react'
import './App.css'

//components

import MovieInput from './components/MovieForm'
import MovieListnoAction from './components/MovieList'
import DeleteMovie from './components/DeleteMovie'
import UpdateMovie from './components/UpdateMovie'
import MovieList from './components/MovieListButtons'

function App() {
  return (
    <Fragment>
      <div className="navbar">
        <h1>IMDB Movie dataset</h1>
      </div>
      <div className="container">
        <MovieInput />
        <MovieList />
      </div>
    </Fragment>
  )
}

export default App
