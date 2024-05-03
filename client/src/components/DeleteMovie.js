import React, { useState } from 'react'

const DeleteMovie = () => {
  const [tconst, setTconst] = useState('')

  const handleChange = (e) => {
    setTconst(e.target.value)
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/basics/${tconst}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        console.log('Movie deleted successfully')
        setTconst('')
      } else {
        console.error('Failed to delete movie')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h2>Delete Movie</h2>
      <input
        type="text"
        value={tconst}
        onChange={handleChange}
        placeholder="Enter tconst"
      />
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default DeleteMovie
