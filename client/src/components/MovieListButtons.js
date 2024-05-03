import { ThemeProvider, createTheme } from '@mui/material/styles'
import React, { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  TextField,
} from '@mui/material'

// Define your custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#D85C41', // Your custom primary color
    },
    secondary: {
      main: '#479254', // Your custom secondary color
    },
  },
})

const MovieList = () => {
  const [movies, setMovies] = useState([])
  const [updateMovie, setUpdateMovie] = useState(null)
  const [updatedFormData, setUpdatedFormData] = useState({
    tconst: '',
    titletype: '',
    primarytitle: '',
    originaltitle: '',
    isadult: '',
    startyear: '',
    endyear: '',
    runtimeminutes: '',
  })
  //   const [open, s/tOpen] = useState(false)
  const [filters, setFilters] = useState({
    tconst: '',
    titletype: '',
    primarytitle: '',
    originaltitle: '',
    isadult: '',
    startyear: '',
    endyear: '',
    runtimeminutes: '',
  })
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

  const handleDelete = async (tconst) => {
    try {
      const response = await fetch(`http://localhost:5000/basics/${tconst}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        console.log('Movie deleted successfully')
        // Fetch the updated movie list after successful deletion
        const updatedResponse = await fetch('http://localhost:5000/basics')
        const updatedData = await updatedResponse.json()
        setMovies(updatedData)
      } else {
        console.error('Failed to delete movie')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdate = (movie) => {
    setUpdateMovie(movie)
    setUpdatedFormData({
      tconst: movie.tconst,
      titletype: movie.titletype,
      primarytitle: movie.primarytitle,
      originaltitle: movie.originaltitle,
      isadult: movie.isadult,
      startyear: movie.startyear,
      endyear: movie.endyear,
      runtimeminutes: movie.runtimeminutes,
    })
  }
  const handleUpdateChange = (e) => {
    setUpdatedFormData({ ...updatedFormData, [e.target.name]: e.target.value })
  }
  const handleUpdateSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/basics/${updatedFormData.tconst}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedFormData),
        },
      )
      if (response.ok) {
        console.log('Movie updated successfully')
        setUpdateMovie(null)
        setUpdatedFormData({
          tconst: '',
          titletype: '',
          primarytitle: '',
          originaltitle: '',
          isadult: '',
          startyear: '',
          endyear: '',
          runtimeminutes: '',
        })
        // Fetch the updated movie list after successful update
        const updatedResponse = await fetch('http://localhost:5000/basics')
        const updatedData = await updatedResponse.json()
        setMovies(updatedData)
      } else {
        console.error('Failed to update movie')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const filteredMovies = movies.filter((movie) =>
    Object.keys(filters).every((key) =>
      movie[key].toString().toLowerCase().includes(filters[key].toLowerCase()),
    ),
  )
  return (
    <div>
      <div className="centering">
        <h2>Movie List</h2>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>tconst</TableCell>
              <TableCell>Title type"</TableCell>
              <TableCell>Primary title"</TableCell>
              <TableCell>Original title</TableCell>
              <TableCell>Is adult</TableCell>
              <TableCell>Start year</TableCell>
              <TableCell>End year</TableCell>
              <TableCell>Run time minutes</TableCell>
              {/* <TableCell>Actions</TableCell> */}
            </TableRow>
            <TableRow>
              <TableCell>
                <TextField
                  label="Filter tconst"
                  name="tconst"
                  value={filters.tconst}
                  onChange={handleFilterChange}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  label="Filter Title Type"
                  name="titletype"
                  value={filters.titletype}
                  onChange={handleFilterChange}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  label="Filter Primary title"
                  name="primarytitle"
                  value={filters.primarytitle}
                  onChange={handleFilterChange}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  label="Filter Original title"
                  name="originaltitle"
                  value={filters.originaltitle}
                  onChange={handleFilterChange}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  label="Filter Is adult"
                  name="isadult"
                  value={filters.isadult}
                  onChange={handleFilterChange}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  label="Filter Start year"
                  name="startyear"
                  value={filters.startyear}
                  onChange={handleFilterChange}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  label="Filter End year"
                  name="endyear"
                  value={filters.endyear}
                  onChange={handleFilterChange}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  label="Filter Run time minutes"
                  name="runtimeminutes"
                  value={filters.runtimeminutes}
                  onChange={handleFilterChange}
                  size="small"
                />
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMovies.map((movie, index) => (
              <TableRow key={index}>
                <TableCell>{movie.tconst}</TableCell>
                <TableCell>{movie.titletype}</TableCell>
                <TableCell>{movie.primarytitle}</TableCell>
                <TableCell>{movie.originaltitle}</TableCell>
                <TableCell>{movie.isadult}</TableCell>
                <TableCell>{movie.startyear}</TableCell>
                <TableCell>{movie.endyear}</TableCell>
                <TableCell>{movie.runtimeminutes}</TableCell>
                <TableCell>
                  <ThemeProvider theme={theme}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDelete(movie.tconst)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleUpdate(movie)}
                    >
                      Update
                    </Button>
                  </ThemeProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={updateMovie} onClose={() => setUpdateMovie(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '20em',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h3>Update Movie</h3>
          <TextField
            label="tconst"
            name="tconst"
            value={updatedFormData.tconst}
            onChange={handleUpdateChange}
            disabled
            fullWidth
            margin="normal"
          />
          <TextField
            label="Title Type"
            name="titletype"
            value={updatedFormData.titletype}
            onChange={handleUpdateChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Primary Title"
            name="primarytitle"
            value={updatedFormData.primarytitle}
            onChange={handleUpdateChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Original Title"
            name="originaltitle"
            value={updatedFormData.originaltitle}
            onChange={handleUpdateChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Is Adult?"
            name="isadult"
            value={updatedFormData.isadult}
            onChange={handleUpdateChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Start Year"
            name="startyear"
            value={updatedFormData.startyear}
            onChange={handleUpdateChange}
            type="number"
            fullWidth
            margin="normal"
          />
          <TextField
            label="End Year"
            name="endyear"
            value={updatedFormData.endyear}
            onChange={handleUpdateChange}
            type="number"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Runtime (minutes)"
            name="runtimeminutes"
            value={updatedFormData.runtimeminutes}
            onChange={handleUpdateChange}
            type="number"
            fullWidth
            margin="normal"
          />
          {/* <div className="button-submit"> */}
          <Button variant="contained" onClick={handleUpdateSubmit}>
            Save Changes
          </Button>
          {/* </div> */}
        </Box>
      </Modal>
    </div>
  )
}

export default MovieList
