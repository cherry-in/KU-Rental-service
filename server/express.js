const express = require('express')
const bodyParser = require('body-parser')
// import compress from 'compression'
const cors = require('cors')
const helmet = require('helmet')
const path = require('path')

// import userRoutes from './routes/user.routes'
// import authRoutes from './routes/auth.routes'
// import postRoutes from './routes/post.routes'


const CURRENT_WORKING_DIR = process.cwd()
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(compress())
app.use(helmet())
app.use(cors())

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

// app.use('/', userRoutes)
// app.use('/', authRoutes)
// app.use('/', postRoutes)

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      error: err.name + ': ' + err.message
    })
  } else if (err) {
    res.status(400).json({
      error: err.name + ': ' + err.message
    })
    console.log(err)
  }
})

module.exports = app