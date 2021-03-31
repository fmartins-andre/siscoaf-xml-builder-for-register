function getOnlyDigits(string) {
  const digits = string.match(/\d+/g)
  if (Array.isArray(digits)) {
    return digits.join('')
  }
  return null
}

module.exports = getOnlyDigits
