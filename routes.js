const express = require('express')
const router = express.Router()

const getProtocolData = require('./controllers/getProtocolData')
const getXml = require('./controllers/getXml')

router.get('/:originEventNumber', getProtocolData)
router.post('/getXML', getXml)

module.exports = router
