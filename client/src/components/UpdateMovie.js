import React, { useState } from 'react'

const UpdateMovie = () => {
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

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/basics/${formData.tconst}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      )
      if (response.ok) {
        console.log('Movie updated successfully')
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
      } else {
        console.error('Failed to update movie')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h2>Update Movie</h2>
      <input
        type="text"
        name="tconst"
        value={formData.tconst}
        onChange={handleChange}
        placeholder="tconst"
      />
      <input
        type="text"
        name="titletype"
        value={formData.titletype}
        onChange={handleChange}
        placeholder="Title Type"
      />
      <input
        type="text"
        name="primarytitle"
        value={formData.primarytitle}
        onChange={handleChange}
        placeholder="Primary Title"
      />
      <input
        type="text"
        name="originaltitle"
        value={formData.originaltitle}
        onChange={handleChange}
        placeholder="Original Title"
      />
      <input
        type="text"
        name="isadult"
        value={formData.isadult}
        onChange={handleChange}
        placeholder="Is Adult?"
      />
      <input
        type="number"
        name="startyear"
        value={formData.startyear}
        onChange={handleChange}
        placeholder="Start Year"
      />
      <input
        type="number"
        name="endyear"
        value={formData.endyear}
        onChange={handleChange}
        placeholder="End Year"
      />
      <input
        type="number"
        name="runtimeminutes"
        value={formData.runtimeminutes}
        onChange={handleChange}
        placeholder="Runtime (minutes)"
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  )
}

export default UpdateMovie
