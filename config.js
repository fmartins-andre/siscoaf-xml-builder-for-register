const path = require('path')

module.exports = {
  staticFilesAddress: '/static',
  clientFiles: path.join(__dirname, '/client/build'),
  serverSideFiles: path.join(__dirname, '/assets'),
  environmentEnv: process.env.NODE_ENV || 'development',
  httpPort: process.env.HTTP_PORT || 8099,
  httpsPort: process.env.HTTPS_PORT || 8499,
}
