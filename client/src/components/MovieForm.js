import React, { useState } from 'react'
import { Box, TextField, Button, styled } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

// Create a custom styled Box component with a black background
const BlackBox = styled(Box)(({}) => ({
  // backgroundColor: 'black',
  // color: 'white', // Set the text color to white for better contrast
  // padding: theme.spacing(2), // Add some padding for better spacing
  display: 'flex',
  // justifyContent: 'space-between',
  // marginRight: '2em',
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
  // display: 'flex',
  // justifyContent: 'space-between',
  marginRight: '2em',
}))
const MovieForm = () => {
  const [formData, setFormData] = useState({
    tconst: '',
    titletype: '',
    primarytitle: '',
    originaltitle: '',
    isadult: '',
    startyear: '',
    endyear: '',
    runtimeminutes: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/basics', {
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
        tconst: '',
        titletype: '',
        primarytitle: '',
        originaltitle: '',
        isadult: '',
        startyear: '',
        endyear: '',
        runtimeminutes: '',
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    // <Box display="flex" flexDirection="column" alignItems="center">
    <BlackBox display="flex" flexDirection="column" alignItems="center">
      <Box>
        <h2>Insert Movie Information</h2>
      </Box>
      <Box component="form" onSubmit={handleSubmit}>
        <ThemeField
          label="tconst"
          name="tconst"
          value={formData.tconst}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <ThemeField
          label="Title Type"
          name="titletype"
          value={formData.titletype}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <ThemeField
          label="Primary Title"
          name="primarytitle"
          value={formData.primarytitle}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <ThemeField
          label="Original Title"
          name="originaltitle"
          value={formData.originaltitle}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <br />
        <ThemeField
          label="Is Adult?"
          name="isadult"
          value={formData.isadult}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <ThemeField
          label="Start Year"
          name="startyear"
          value={formData.startyear}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          type="number"
        />
        <ThemeField
          label="End Year"
          name="endyear"
          value={formData.endyear}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          type="number"
        />
        <ThemeField
          label="Runtime (minutes)"
          name="runtimeminutes"
          value={formData.runtimeminutes}
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
      {/* </Box> */}
    </BlackBox>
  )
}

export default MovieForm
