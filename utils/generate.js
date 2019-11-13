const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const { spinner } = require('../utils/spinner')
const { axmlStr } = require('../utils/str')
const obj = {
  createFile: createFile
}
function createFile (filename, isComponent = false) {
  const dirPath = path.join(process.cwd(), filename)
  if (fs.existsSync(dirPath)) {
    spinner.fail(chalk.red(dirPath + ' directory is exist!!'))
  } else {
    fs.mkdirSync(dirPath)
    spinner.succeed(dirPath + ' directory generated successfully!')
    createAxmlFile(dirPath, filename, isComponent)
  }
}
function createAxmlFile (dirPath, filename, isComponent) {
  axmlStr(filename, isComponent)
    .then(data => {
      fs.writeFileSync(dirPath + '/index.axml', data)
      spinner.succeed(dirPath + '/index.axml generated successfully!')
    })
}
module.exports = obj
