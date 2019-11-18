const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const { spinner } = require('../utils/spinner')
const { axmlStr, acssStr, jsonStr, jsStr } = require('../utils/str')

function createFile (filename, isComponent = false) {
  const dirPath = path.join(process.cwd(), filename)
  if (fs.existsSync(dirPath)) {
    spinner.fail(chalk.red(dirPath + ' directory is exist!!'))
  } else {
    fs.mkdirSync(dirPath)
    spinner.succeed(dirPath + ' directory generated successfully!')
    const args = [dirPath, filename, isComponent]
    createTemplateFile(args).axml()
    createTemplateFile(args).acss()
    createTemplateFile(args).json()
    createTemplateFile(args).js()
  }
}
function create (dirPath, suffix, data) {
  fs.writeFileSync(dirPath + `/index.${suffix}`, data)
  spinner.succeed(dirPath + `/index.${suffix} generated successfully!`)
}
function createTemplateFile (args) {
  const [dirPath, filename, isComponent] = args
  return {
    axml(){
      return axmlStr(filename, isComponent)
        .then(data => {
          create (dirPath, 'axml', data)
        })
    },
    acss(){
      return acssStr(filename, isComponent)
        .then(data => {
          create (dirPath, 'acss', data)
        })
    },
    json(){
      return jsonStr(filename, isComponent)
        .then(data => {
          create (dirPath, 'json', data)
        })
    },
    js(){
      return jsStr(filename, isComponent)
        .then(data => {
          create (dirPath, 'js', data)
        })
    },
  };
}
module.exports = {
  createFile: createFile
}
