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
    const allMovies = await pool.query('SELECT * FROM basics_imdb')
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

app.listen(5000, () => {
  console.log('server has started on port 5000')
})
