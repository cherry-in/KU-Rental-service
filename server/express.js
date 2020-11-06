const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const path = require('path')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const reservesRouter = require('./routes/reserves');
const noticeRouter = require('./routes/notices');
const writesRouter = require('./routes/writes');

const CURRENT_WORKING_DIR = process.cwd()
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(helmet())
app.use(cors())

console.log('path=', path.join(CURRENT_WORKING_DIR, 'client', 'build'))
app.use('/', express.static(path.join(CURRENT_WORKING_DIR, 'client', 'build')))

app.use('/', indexRouter);
app.use('/users', usersRouter, reservesRouter);
app.use('/login', loginRouter);
app.use('/reserves', reservesRouter);
app.use('/notices', noticeRouter);
app.use('/writes', writesRouter);

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