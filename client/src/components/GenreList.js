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

const GenreList = () => {
  const [genres, setGenres] = useState([])
  const [updateGenre, setUpdateGenre] = useState(null)
  const [updatedFormData, setUpdatedFormData] = useState({
    tconst: '',
    genre: '',
  })
  const [filters, setFilters] = useState({
    tconst: '',
    genre: '',
  })

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('http://localhost:5000/genres')
        const data = await response.json()
        setGenres(data)
      } catch (error) {
        console.error(error)
      }
    }

    const interval = setInterval(fetchGenres, 1000) // Fetch genres every second

    return () => clearInterval(interval) // Clean up interval on component unmount
  }, [])

  const handleDelete = async (tconst, genre) => {
    try {
      const response = await fetch(
        `http://localhost:5000/genres/${tconst}/${genre}`,
        {
          method: 'DELETE',
        },
      )
      if (response.ok) {
        // Fetch the updated genre list after successful deletion
        const updatedResponse = await fetch('http://localhost:5000/genres')
        const updatedData = await updatedResponse.json()
        setGenres(updatedData)

        // Display a success message
        alert('Genre deleted successfully!')
      } else {
        // Display an error message
        const errorData = await response.json()
        // console.log()
        alert(`Failed to delete genre: ${errorData.message}`)
      }
    } catch (error) {
      console.error(error)
      alert('An error occurred while deleting the genre.')
    }
  }

  const handleUpdate = (genre) => {
    setUpdateGenre(genre)
    setUpdatedFormData({
      tconst: genre.tconst,
      genre: genre.genre,
    })
  }

  const handleUpdateChange = (e) => {
    setUpdatedFormData({ ...updatedFormData, [e.target.name]: e.target.value })
  }

  const handleUpdateSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/genres/${updatedFormData.tconst}/${updatedFormData.genre}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedFormData),
        },
      )
      if (response.ok) {
        console.log('Genre updated successfully')
        setUpdateGenre(null)
        setUpdatedFormData({
          tconst: '',
          genre: '',
        })
        // Fetch the updated genre list after successful update
        const updatedResponse = await fetch('http://localhost:5000/genres')
        const updatedData = await updatedResponse.json()
        setGenres(updatedData)
      } else {
        console.error('Failed to update genre')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const filteredGenres = genres.filter((genre) =>
    Object.keys(filters).every(
      (key) =>
        genre[key] != null &&
        genre[key]
          .toString()
          .toLowerCase()
          .includes(filters[key].toLowerCase()),
    ),
  )

  return (
    <div>
      <div className="centering">
        <h2>Genre List</h2>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>tconst</TableCell>
              <TableCell>Genre</TableCell>
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
                  label="Filter Genre"
                  name="genre"
                  value={filters.genre}
                  onChange={handleFilterChange}
                  size="small"
                />
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredGenres.map((genre, index) => (
              <TableRow key={index}>
                <TableCell>{genre.tconst}</TableCell>
                <TableCell>{genre.genre}</TableCell>
                <TableCell>
                  <ThemeProvider theme={theme}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDelete(genre.tconst, genre.genre)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleUpdate(genre)}
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

      <Modal open={updateGenre} onClose={() => setUpdateGenre(false)}>
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
          <h3>Update Genre</h3>
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
            label="Genre"
            name="genre"
            value={updatedFormData.genre}
            onChange={handleUpdateChange}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={handleUpdateSubmit}>
            Save Changes
          </Button>
        </Box>
      </Modal>
    </div>
  )
}

export default GenreList
