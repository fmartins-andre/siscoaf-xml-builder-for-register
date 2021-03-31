import axios from 'axios'

const requestXmlFromServer = async (data) => {
  const axiosDownloadParams = { method: 'GET', responseType: 'blob' }

  try {
    const request = await axios.post('/api/getXML', { data })
    const { status, url, fileName } = request.data

    if (status) {
      const xml = await axios({ ...axiosDownloadParams, url })
      const downloadUrl = window.URL.createObjectURL(new Blob([xml.data]))

      return { downloadUrl, fileName }
    }

    throw Error('Erro trying to get XML from server.')
  } catch (error) {
    console.error(error)
    return { message: error.message }
  }
}

export default requestXmlFromServer
