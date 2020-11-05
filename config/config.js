const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3030,
  jwtSecret: process.env.JWT_SECRET || 'My_secrete_key',
  mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST || 'mongodb://qnaservice:qwerasdf@' + (process.env.IP || 'localhost') + ':' + (process.env.MONGO_PORT || '27017') + '/qna-service-test',
}

module.exports = config