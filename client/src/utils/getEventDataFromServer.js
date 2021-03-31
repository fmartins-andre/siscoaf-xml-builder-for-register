const getDataFromServer = async (originEventNumber) => {
  const response = await fetch(`/api/${originEventNumber}`)

  if (response.status !== 200) {
    throw Error(response.statusText)
  }

  return response.json()
}

export default getDataFromServer
