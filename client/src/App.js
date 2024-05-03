// import React, { Fragment } from 'react'
// import './App.css'

// //components

// import MovieInput from './components/MovieForm'
// import MovieList from './components/MovieListButtons'

// function App() {
//   return (
//     <Fragment>
//       <div className="navbar">
//         <h1>IMDB Movie dataset</h1>
//       </div>
//       <div className="container">
//         <MovieInput />
//         <MovieList />
//       </div>
//     </Fragment>
//   )
// }

// export default App
import React, { useState } from 'react'
import './App.css'
import MovieInput from './components/MovieForm'
import MovieList from './components/MovieListButtons'
import NameForm from './components/Namesinput'
import NameList from './components/NamesList'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

function App() {
  const [selectedTable, setSelectedTable] = useState('')

  const handleTableChange = (event) => {
    setSelectedTable(event.target.value)
  }

  const renderContainerContent = () => {
    switch (selectedTable) {
      case 'basics_imdb':
        return (
          <div>
            <MovieInput />
            <MovieList />
          </div>
        )
      case 'names_imdb':
        return (
          <div>
            <NameForm />
            <NameList />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <>
      <div className="navbar">
        <h1>IMDB Movie dataset</h1>
        <div className="drop-down">
          <FormControl>
            <Select value={selectedTable} onChange={handleTableChange}>
              <MenuItem value="">Select a table</MenuItem>
              <MenuItem value="basics_imdb">Basics</MenuItem>
              <MenuItem value="names_imdb">Names</MenuItem>
              <MenuItem value="akas_imdb">Akas</MenuItem>
              <MenuItem value="directors_imdb">Directors</MenuItem>
              <MenuItem value="episode_imdb">Episode</MenuItem>
              <MenuItem value="genres_imdb">Genres</MenuItem>
              <MenuItem value="knownfortitles_imdb">KnownForTitles</MenuItem>
              <MenuItem value="primaryprofession_imdb">
                Primary Profession
              </MenuItem>
              <MenuItem value="principals_imdb">Principals</MenuItem>
              <MenuItem value="ratings_imdb">Ratings</MenuItem>
              <MenuItem value="writers_imdb">Writers</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="container">{renderContainerContent()}</div>
    </>
  )
}

export default App
