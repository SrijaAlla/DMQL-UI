import React, { useState } from 'react'
import { Box, TextField, Button, styled } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

// Create a custom styled Box component with a black background
const BlackBox = styled(Box)(({}) => ({
  display: 'flex',
}))

// Define your custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#f4883d', // Your custom primary color
    },
    secondary: {
      main: '#479254', // Your custom secondary color
    },
  },
})

const ThemeField = styled(TextField)(({}) => ({
  marginRight: '2em',
}))

const NameForm = () => {
  const [formData, setFormData] = useState({
    nconst: '',
    primaryname: '',
    birthyear: '',
    deathyear: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/names', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      console.log(data)
      // Reset form after successful submission
      setFormData({
        nconst: '',
        primaryname: '',
        birthyear: '',
        deathyear: '',
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <BlackBox display="flex" flexDirection="column" alignItems="center">
      <Box>
        <h2>Insert Name Information</h2>
      </Box>
      <Box component="form" onSubmit={handleSubmit}>
        <ThemeField
          label="nconst"
          name="nconst"
          value={formData.nconst}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <ThemeField
          label="Primary Name"
          name="primaryname"
          value={formData.primaryname}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <ThemeField
          label="Birth Year"
          name="birthyear"
          value={formData.birthyear}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          type="number"
        />
        <ThemeField
          label="Death Year"
          name="deathyear"
          value={formData.deathyear}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          type="number"
        />
        <div className="button-submit">
          <ThemeProvider theme={theme}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </ThemeProvider>
        </div>
      </Box>
    </BlackBox>
  )
}

export default NameForm
