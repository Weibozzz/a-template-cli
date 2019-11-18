const path = require('path');
const fs = require('fs');
const {template} = require('./index')

function resolvePath(suffix, isComponent){
  return path.resolve(
    __dirname,
    `../template/${isComponent ? 'component' : 'page'}/`,
    `index.${suffix}`
  );
}
module.exports = {
  axmlStr(filename, isComponent){
    return new Promise((resolve, reject) => {
      fs.readFile(resolvePath('axml', isComponent), (err, data) => {
        if (err) throw err;
        const afterStr = template(data)({filename})
        resolve(afterStr)
      })
    });
  },
  acssStr(filename, isComponent){
    return new Promise((resolve, reject) => {
      fs.readFile(resolvePath('acss', isComponent), (err, data) => {
        if (err) throw err;
        const afterStr = template(data)({filename})
        resolve(afterStr)
      })
    });
  },
  jsonStr(filename, isComponent){
    return new Promise((resolve, reject) => {
      fs.readFile(resolvePath('json', isComponent), (err, data) => {
        if (err) throw err;
        const afterStr = template(data)({filename})
        resolve(afterStr)
      })
    });
  },
  jsStr(filename, isComponent){
    return new Promise((resolve, reject) => {
      fs.readFile(resolvePath('js', isComponent), (err, data) => {
        if (err) throw err;
        const afterStr = template(data)({filename})
        resolve(afterStr)
      })
    });
  },
}
