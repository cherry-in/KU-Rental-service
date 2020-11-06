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

// 배포용?
const isProduction = process.env.NODE_ENV === 'production'
let root_url = '/'
if (isProduction) {
  root_url = '/app/rental'
}

console.log('isProductiion=', isProduction)

const CURRENT_WORKING_DIR = process.cwd()
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(helmet())
app.use(cors())

console.log('path=', path.join(CURRENT_WORKING_DIR, 'client', 'build'))
app.use(path.join(root_url, '/'), express.static(path.join(CURRENT_WORKING_DIR, 'client', 'build')))

app.use(path.join(root_url, '/api/'), indexRouter);
app.use(path.join(root_url, '/api/users'), usersRouter, reservesRouter);
app.use(path.join(root_url, '/api/login'), loginRouter);
app.use(path.join(root_url, '/api/reserves'), reservesRouter);
app.use(path.join(root_url, '/api/notices'), noticeRouter);
app.use(path.join(root_url, '/api/writes'), writesRouter);

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
