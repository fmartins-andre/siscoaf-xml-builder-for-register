const transformObject = require('../utils/transformObject')
const createXML = require('../utils/createXml')
const saveFile = require('../utils/saveFile')
const attributeMapping = require('../utils/attributeMapping')
const { staticFilesAddress, serverSideFiles } = require('../config')

const getXml = (req, res) => {
  const fileName = `${req.body.data.originEventNumber}.xml`
  const transformedObject = transformObject(req.body.data, attributeMapping)
  const xmlData = createXML(transformedObject)
  const status = saveFile(serverSideFiles, fileName, xmlData)
  const fileInfo = {
    status,
    fileName,
    url: `${staticFilesAddress}/${fileName}`,
  }
  res.send(fileInfo)
}

module.exports = getXml
