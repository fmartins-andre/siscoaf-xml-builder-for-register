require('dotenv').config()
const express = require('express')
const compression = require('compression')
const cors = require('cors')
const expressAutoSanitizer = require('express-autosanitizer')
const helmet = require('helmet')
const router = require('./routes')
const {
  staticFilesAddress,
  clientFiles,
  serverSideFiles,
  environmentEnv,
  httpsPort,
} = require('./config')

const app = express()

app.all('*', (req, res, next) => {
  if (!req.secure && environmentEnv === 'production') {
    const secureUrl = `https://${req.hostname}:${httpsPort}${req.path}`
    res.redirect(secureUrl)
    console.log(`Requisition redirected to the secure server: ${secureUrl}`)
  } else {
    next()
  }
})

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'script-src': ["'self'", 'https:', "'unsafe-eval'", "'unsafe-inline'"],
    },
  })
)
app.use(cors())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(expressAutoSanitizer.all)
app.use(staticFilesAddress, express.static(serverSideFiles))
app.use('/', express.static(clientFiles))
app.use('/api', router)

module.exports = app
