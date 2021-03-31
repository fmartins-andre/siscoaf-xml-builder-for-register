import React, { Component } from 'react'
import Form from 'react-jsonschema-form'
import debounce from 'lodash/debounce'
import getDataFromServer from './utils/getEventDataFromServer'
import getXmlFromServer from './utils/getXmlFromServer'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { data: {} }
    this.formSchema = require('./utils/formSchema/formSchema.json')
    this.uiSchema = require('./utils/formSchema/uiSchema.json')
    this.transformErrors = require('./utils/formSchema/formSchemaTransforms')
    this.log = (type) => console.log.bind(console, type)
  }

  isHandlingLocalDataOnly = (formData) => {
    const { originEventNumber, eventCity, eventState, notifierId } = formData
    const { originEventNumber: stateOriginNumber } = this.state.data

    const sanitizedOriginNumber = originEventNumber?.match(/\w/g)?.join('')
    const sanitizedStateNumber = stateOriginNumber?.match(/\w/g)?.join('')
    const numberIsSearchable =
      !originEventNumber?.match(/\D/) && originEventNumber?.length > 3

    if (
      originEventNumber === stateOriginNumber ||
      (!numberIsSearchable && sanitizedOriginNumber === sanitizedStateNumber)
    ) {
      this.setState({ data: formData })
      return true
    }

    if (!numberIsSearchable) {
      this.setState({
        data: {
          eventCity,
          eventState,
          notifierId,
          originEventNumber,
        },
      })
      return true
    }

    return false
  }

  downloadXml = async () => {
    const request = await getXmlFromServer(this.state.data)
    const { downloadUrl, fileName, message } = request

    if (!message) {
      const link = document.createElement('a')
      link.href = downloadUrl
      link.setAttribute('download', fileName)
      link.click()
      window.URL.revokeObjectURL(downloadUrl)
    }
  }

  onChange = debounce(({ formData }) => {
    const workingLocallyOnly = this.isHandlingLocalDataOnly(formData)

    if (!workingLocallyOnly) {
      getDataFromServer(formData.originEventNumber)
        .then((response) => this.setState({ data: response }))
        .catch((error) => console.error(error))
    }
  }, 500)

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">SISCOAF XML BUILDER for REGISTER</h1>
        </header>
        <nav className="App-nav"></nav>
        <div className="App-content">
          <main className="App-main">
            <Form
              schema={this.formSchema}
              uiSchema={this.uiSchema}
              formData={this.state.data}
              onChange={this.onChange}
              onSubmit={this.downloadXml}
              onError={this.log('Erro na validação do do formulário.')}
              transformErrors={this.transformErrors}
            />
          </main>
        </div>
      </div>
    )
  }
}

export default App
