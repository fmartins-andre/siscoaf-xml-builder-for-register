require('dotenv').config()

const https = require('https')
const http = require('http')
const fs = require('fs')
const app = require('./app')

const { httpPort, httpsPort } = require('./config')

const sslOptions = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
}

http.createServer(app).listen(httpPort, () => {
  console.log(`Server listening on port ${httpPort}`)
})

https.createServer(sslOptions, app).listen(httpsPort, () => {
  console.log(`Secure server listening on port ${httpsPort}`)
})
