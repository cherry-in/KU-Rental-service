const mongoose = require('mongoose')
const app = require('./express')
const config = require('../config/config')

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
})

app.listen(config.port, () => {
  console.info('Server started on port %s.', config.port)
})