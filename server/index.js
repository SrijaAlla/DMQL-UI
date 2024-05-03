const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')

//middleware
app.use(cors())
app.use(express.json())

app.post('/basics', async (req, res) => {
  try {
    const {
      tconst,
      titletype,
      primarytitle,
      originaltitle,
      isadult,
      startyear,
      endyear,
      runtimeminutes,
    } = req.body

    const newTodo = await pool.query(
      'INSERT INTO basics_imdb (tconst, titletype, primarytitle, originaltitle, isadult, startyear, endyear, runtimeminutes) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [
        tconst,
        titletype,
        primarytitle,
        originaltitle,
        isadult,
        startyear,
        endyear,
        runtimeminutes,
      ],
    )

    res.json(newTodo.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

app.get('/basics', async (req, res) => {
  try {
    const allMovies = await pool.query(
      'SELECT * FROM basics_imdb ORDER BY tconst DESC LIMIT 1000',
    )
    res.json(allMovies.rows)
  } catch (err) {
    console.error(err.message)
  }
})

app.put('/basics/:tconst', async (req, res) => {
  try {
    const { tconst } = req.params
    const {
      titletype,
      primarytitle,
      originaltitle,
      isadult,
      startyear,
      endyear,
      runtimeminutes,
    } = req.body

    const updateMovie = await pool.query(
      'UPDATE basics_imdb SET titletype = $1, primarytitle = $2, originaltitle = $3, isadult = $4, startyear = $5, endyear = $6, runtimeminutes = $7 WHERE tconst = $8',
      [
        titletype,
        primarytitle,
        originaltitle,
        isadult,
        startyear,
        endyear,
        runtimeminutes,
        tconst,
      ],
    )

    res.json('Movie was updated!')
  } catch (err) {
    console.error(err.message)
  }
})

app.delete('/basics/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleteTodo = await pool.query(
      'DELETE FROM basics_imdb WHERE tconst = $1',
      [id],
    )
    res.json('Movie was deleted!')
  } catch (err) {
    console.log(err.message)
  }
})
app.post('/names', async (req, res) => {
  try {
    const { nconst, primaryname, birthyear, deathyear } = req.body
    const newName = await pool.query(
      'INSERT INTO names_imdb (nconst, primaryname, birthyear, deathyear) VALUES($1, $2, $3, $4) RETURNING *',
      [nconst, primaryname, birthyear, deathyear],
    )
    res.json(newName.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

app.get('/names', async (req, res) => {
  try {
    const allNames = await pool.query(
      'SELECT * FROM names_imdb ORDER BY nconst DESC LIMIT 1000',
    )
    res.json(allNames.rows)
  } catch (err) {
    console.error(err.message)
  }
})

app.put('/names/:nconst', async (req, res) => {
  try {
    const { nconst } = req.params
    const { primaryname, birthyear, deathyear } = req.body
    const updateName = await pool.query(
      'UPDATE names_imdb SET primaryname = $1, birthyear = $2, deathyear = $3 WHERE nconst = $4',
      [primaryname, birthyear, deathyear, nconst],
    )
    res.json('Name was updated!')
  } catch (err) {
    console.error(err.message)
  }
})

app.delete('/names/:nconst', async (req, res) => {
  try {
    const { nconst } = req.params
    const deleteName = await pool.query(
      'DELETE FROM names_imdb WHERE nconst = $1',
      [nconst],
    )
    res.json('Name was deleted!')
  } catch (err) {
    console.log(err.message)
  }
})
app.post('/genres', async (req, res) => {
  try {
    const { tconst, genre } = req.body
    const newGenre = await pool.query(
      'INSERT INTO genres_imdb (tconst, genre) VALUES($1, $2) RETURNING *',
      [tconst, genre],
    )
    res.json(newGenre.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

app.get('/genres', async (req, res) => {
  try {
    const allGenres = await pool.query(
      'SELECT * FROM genres_imdb ORDER BY tconst DESC LIMIT 1000',
    )
    res.json(allGenres.rows)
  } catch (err) {
    console.error(err.message)
  }
})

app.put('/genres/:tconst/:genre', async (req, res) => {
  try {
    const { tconst, genre } = req.params
    const { newGenre } = req.body
    const updateGenre = await pool.query(
      'UPDATE genres_imdb SET genre = $1 WHERE tconst = $2 AND genre = $3',
      [newGenre, tconst, genre],
    )
    res.json('Genre was updated!')
  } catch (err) {
    console.error(err.message)
  }
})

app.delete('/genres/:tconst/:genre', async (req, res) => {
  try {
    const { tconst, genre } = req.params
    const deleteGenre = await pool.query(
      'DELETE FROM genres_imdb WHERE tconst = $1 AND genre = $2',
      [tconst, genre],
    )
    res.json('Genre was deleted!')
  } catch (err) {
    console.log(err.message)
  }
})

app.listen(5000, () => {
  console.log('server has started on port 5000')
})
