function saveFile(filePath, fileName, fileData) {
  const fs = require('fs')
  let status = true

  fs.writeFile(`${filePath}/${fileName}`, fileData, (error) => {
    if (error) {
      console.log(
        `Something gone wrong saving the "${fileName}" file!\n${error}`
      )
      status = false
    }
  })

  return status
}

module.exports = saveFile
