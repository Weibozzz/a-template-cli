const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const { spinner } = require('../utils/spinner')
const {
  vueStr
} = require('../utils/strVue')

const {
  scssStr,
  vueStr: vueTempStr,
  vuePageStr,
  jsStr: vueJsStr
} = vueStr()
function createVueFile (filename, arg) {
  const { isLess = false, isTs = false, isVueSinger = false } = arg
  let dirPath = path.join(process.cwd(), filename)
  let fileType = 'directory'
  if(isVueSinger){
    dirPath = `${dirPath}.vue`
    fileType = 'file'
  }
  if (fs.existsSync(dirPath)) {
    spinner.fail(chalk.red(dirPath + ` ${fileType} is exist!!`))
  } else {
    if(!isVueSinger){
      fs.mkdirSync(dirPath)
      spinner.succeed(dirPath + ' directory generated successfully!')
    }
    const args = [dirPath, filename, isLess]
    const {
      scss,
      js,
      vueTemp,
      vueSingerTemp
    } = createTemplateFile(args).vue()
    if(!isVueSinger){
      scss(isLess)
      js(isTs)
      vueTemp(isTs, isLess)
    }
    isVueSinger && vueSingerTemp(isTs, isLess, isVueSinger)
  }
}
function createVue (dirPath, suffix, data) {
  let file = `/index.${suffix}`
  if(suffix === 'other'){
    file = `/page.vue`
  }
  const path = suffix === 'other' ? dirPath : dirPath + file
  fs.writeFileSync(path, data)
  spinner.succeed(`${path} generated successfully!`)
}
function createTemplateFile (args) {
  const [dirPath, filename] = args
  return {
    vue(){
      return {
        vueTemp(isTs, isLess){
          return vueTempStr(filename, isTs, isLess)
            .then(data => {
              createVue (dirPath, 'vue', data)
            })
        } ,
        scss(isLess){
          return scssStr(filename, isLess)
            .then(data => {
              createVue (dirPath, isLess ? 'less' : 'scss', data)
            })
        },
        js(isTs){
          return vueJsStr(filename, isTs)
            .then(data => {
              createVue(dirPath, isTs ? 'ts' : 'js', data)
            })
        },
        // 创建单个 vue 文件
        vueSingerTemp(isTs, isLess, isVueSinger) {
          return vuePageStr(filename, isTs, isLess, isVueSinger)
            .then(data => {
              createVue(dirPath, 'other', data)
            })
        }
      };
    },
  };
}
module.exports = {
  createVueFile: createVueFile
}
