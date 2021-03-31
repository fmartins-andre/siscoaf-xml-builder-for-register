const { create } = require('xmlbuilder2')
const dateformat = require('dateformat')

const ocorrenciasId = `SISCOAF${dateformat(Date.now(), 'ddmmyyyy')}`

function createXML(jsonData) {
  const fullJsonObject = {
    LOTE: {
      OCORRENCIAS: {
        '@ID': ocorrenciasId,
        OCORRENCIA: jsonData,
      },
    },
  }
  const xmlData = create(fullJsonObject)
  return xmlData.end({ prettyPrint: true })
}

module.exports = createXML
