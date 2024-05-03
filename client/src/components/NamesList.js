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

const NameList = () => {
  const [names, setNames] = useState([])
  const [updateName, setUpdateName] = useState(null)
  const [updatedFormData, setUpdatedFormData] = useState({
    nconst: '',
    primaryname: '',
    birthyear: '',
    deathyear: '',
  })
  const [filters, setFilters] = useState({
    nconst: '',
    primaryname: '',
    birthyear: '',
    deathyear: '',
  })

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await fetch('http://localhost:5000/names')
        const data = await response.json()
        setNames(data)
      } catch (error) {
        console.error(error)
      }
    }

    const interval = setInterval(fetchNames, 1000) // Fetch names every second

    return () => clearInterval(interval) // Clean up interval on component unmount
  }, [])

  const handleDelete = async (nconst) => {
    try {
      const response = await fetch(`http://localhost:5000/names/${nconst}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        // Fetch the updated movie list after successful deletion
        const updatedResponse = await fetch('http://localhost:5000/names')
        const updatedData = await updatedResponse.json()
        setNames(updatedData)

        // Display a success message
        alert('Movie deleted successfully!')
      } else {
        // Display an error message
        const errorData = await response.json()
        alert(`Failed to delete movie: ${errorData.message}`)
      }
    } catch (error) {
      console.error(error)
      alert('An error occurred while deleting the movie.')
    }
  }

  const handleUpdate = (name) => {
    setUpdateName(name)
    setUpdatedFormData({
      nconst: name.nconst,
      primaryname: name.primaryname,
      birthyear: name.birthyear,
      deathyear: name.deathyear,
    })
  }

  const handleUpdateChange = (e) => {
    setUpdatedFormData({ ...updatedFormData, [e.target.name]: e.target.value })
  }

  const handleUpdateSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/names/${updatedFormData.nconst}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedFormData),
        },
      )
      if (response.ok) {
        console.log('Name updated successfully')
        setUpdateName(null)
        setUpdatedFormData({
          nconst: '',
          primaryname: '',
          birthyear: '',
          deathyear: '',
        })
        // Fetch the updated name list after successful update
        const updatedResponse = await fetch('http://localhost:5000/names')
        const updatedData = await updatedResponse.json()
        setNames(updatedData)
      } else {
        console.error('Failed to update name')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const filteredNames = names.filter((name) =>
    Object.keys(filters).every(
      (key) =>
        name[key] != null &&
        name[key].toString().toLowerCase().includes(filters[key].toLowerCase()),
    ),
  )

  return (
    <div>
      <div className="centering">
        <h2>Name List</h2>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>nconst</TableCell>
              <TableCell>Primary Name</TableCell>
              <TableCell>Birth Year</TableCell>
              <TableCell>Death Year</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <TextField
                  label="Filter nconst"
                  name="nconst"
                  value={filters.nconst}
                  onChange={handleFilterChange}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  label="Filter Primary Name"
                  name="primaryname"
                  value={filters.primaryname}
                  onChange={handleFilterChange}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  label="Filter Birth Year"
                  name="birthyear"
                  value={filters.birthyear}
                  onChange={handleFilterChange}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  label="Filter Death Year"
                  name="deathyear"
                  value={filters.deathyear}
                  onChange={handleFilterChange}
                  size="small"
                />
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredNames.map((name, index) => (
              <TableRow key={index}>
                <TableCell>{name.nconst}</TableCell>
                <TableCell>{name.primaryname}</TableCell>
                <TableCell>{name.birthyear}</TableCell>
                <TableCell>{name.deathyear}</TableCell>
                <TableCell>
                  <ThemeProvider theme={theme}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDelete(name.nconst)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleUpdate(name)}
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

      <Modal open={updateName} onClose={() => setUpdateName(false)}>
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
          <h3>Update Name</h3>
          <TextField
            label="nconst"
            name="nconst"
            value={updatedFormData.nconst}
            onChange={handleUpdateChange}
            disabled
            fullWidth
            margin="normal"
          />
          <TextField
            label="Primary Name"
            name="primaryname"
            value={updatedFormData.primaryname}
            onChange={handleUpdateChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Birth Year"
            name="birthyear"
            value={updatedFormData.birthyear}
            onChange={handleUpdateChange}
            type="number"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Death Year"
            name="deathyear"
            value={updatedFormData.deathy}
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

export default NameList
