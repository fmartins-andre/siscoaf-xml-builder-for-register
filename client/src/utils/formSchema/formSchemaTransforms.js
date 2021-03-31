const transformErrors = (errors) => {
  return errors.map((error) => {
    const { property, name } = error

    if (property === '.originEventNumber') {
      if (name.includes('Length')) {
        const message = 'O valor deve ter entre 4 e 80 caracteres.'
        error.message = message
        error.stack = `Número origem: ${message}`
      }
      if (name === 'pattern') {
        const message =
          'O valor deve ser composto apenas por caracteres alfanuméricos.'
        error.message = message
        error.stack = `Número origem: ${message}`
      }
    }

    if (name === 'pattern' && property === '.eventDescription') {
      const message = 'Não são permitidos os seguintes caracteres: " \' & < >'
      error.message = message
      error.stack = `Descrição do Evento: ${message}`
    }

    if (property === '.eventValue') {
      if (['pattern', 'type'].includes(name)) {
        const message = 'O valor deve ser um número inteiro maior que 0 (zero).'
        error.message = message
        error.stack = `Valor da(s) operação(ões): ${message}`
      }
    }

    if (name.includes('Length') && property === '.eventCity') {
      const message = 'O nome deve ter entre 2 e 100 caracteres.'
      error.message = message
      error.stack = `Cidade: ${message}`
    }

    if (name === 'pattern' && property === '.notifierId') {
      const message = 'O campo deve ser preenchido com um CPF ou CNPJ válido.'
      error.message = message
      error.stack = `CPF/CNPJ do Notificador: ${message}`
    }

    if (property.includes('.personId')) {
      if (name === 'pattern') {
        const personPositionNumber = +property.match(/\d/).join('') + 1
        const message = 'O campo deve ser preenchido com um CPF ou CNPJ válido.'
        error.message = message
        error.stack = `Pessoa envolvida #${personPositionNumber}: ${message}`
      }
    }

    if (property.includes('.personName')) {
      const personPositionNumber = +property.match(/\d/).join('') + 1

      if (name === 'pattern') {
        const message = 'Não são permitidos os seguintes caracteres: " \' & < >'
        error.message = message
        error.stack = `Pessoa envolvida #${personPositionNumber}: ${message}`
      }

      if (name.includes('Length')) {
        const message = 'O nome deve ter entre 3 e 150 caracteres.'
        error.message = message
        error.stack = `Pessoa envolvida #${personPositionNumber}: ${message}`
      }
    }

    return error
  })
}

module.exports = transformErrors
