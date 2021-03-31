require('dotenv').config()
const getDatabaseData = require('./getDatabaseData')
const getOnlyDigits = require('../utils/getOnlyDigits')

const getProtocolData = async (request, response) => {
  const { originEventNumber } = request.params
  const { peopleRows, eventRows, error: dbError } = await getDatabaseData(
    originEventNumber
  )

  try {
    if (dbError) throw Error(dbError)
    if (originEventNumber.match(/\D/g))
      throw Error('O número informado contém caracteres não válidos!')

    const eventValue =
      eventRows[0] && +parseFloat(eventRows[0].eventValue || 0).toFixed(2)
    const eventDate = eventRows[0] ? eventRows[0].eventDate : null

    const people = peopleRows.map((person) => {
      const newPerson = { ...person }
      newPerson.personId = getOnlyDigits(person.personId)
      newPerson.personQualification = '1'
      return newPerson
    })

    response.send({
      originEventNumber,
      eventValue,
      eventInitialDate: eventDate,
      eventFinalDate: eventDate,
      eventCity: process.env.APP_DEFAULT_CITY || null,
      eventState: process.env.APP_DEFAULT_STATE || null,
      notifierId: getOnlyDigits(process.env.APP_DEFAULT_NOTIFIERID),
      eventAssociatedPeopleContainer: {
        eventAssociatedPeople: people,
      },
    })
  } catch (error) {
    console.error(`Erro: ${error.message}`)
    response.send({ message: error.message })
  }
}

module.exports = getProtocolData
