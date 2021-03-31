const dateformat = require('dateformat')
const dateRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/g

function transformObject(
  object,
  attributesMap,
  excludeNonMappedAttributes = true
) {
  if (typeof object !== 'object') {
    return object
  }

  const newObject = {}

  Object.keys(object).forEach((attribute) => {
    let attributeValue = object[attribute]

    if (Array.isArray(object[attribute])) {
      attributeValue = object[attribute].map((arrayItem) => {
        return transformObject(
          arrayItem,
          attributesMap,
          excludeNonMappedAttributes
        )
      })
    } else if (object[attribute] instanceof Object) {
      attributeValue = transformObject(
        object[attribute],
        attributesMap,
        excludeNonMappedAttributes
      )
    }

    if (typeof attributeValue === 'boolean') {
      attributeValue = `${+attributeValue}`
    }

    if (
      typeof attributeValue === 'string' &&
      !!attributeValue.match(dateRegex)
    ) {
      attributeValue = dateformat(attributeValue, 'dd/mm/yyyy')
    }

    if (Object.prototype.hasOwnProperty.call(attributesMap, attribute)) {
      newObject[attributesMap[attribute]] = attributeValue
    } else if (!excludeNonMappedAttributes) {
      newObject[attribute] = attributeValue
    }
  })

  return newObject
}

module.exports = transformObject
