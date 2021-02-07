const path = require('path');
const fs = require('fs');
const {template} = require('./index')

function vuePath(suffix){
  if(suffix === 'less'){
    suffix = 'scss'
  }
  if(suffix === 'ts'){
    suffix = 'js'
  }
  let fileName = `index.${suffix}`;
  if (suffix === 'other'){
    fileName = `page.vue`
  }
  return path.resolve(
    __dirname,
    `../template/vue/`,
    fileName
  );
}
// 生成单个文件
function geneVueSinglePage (filename, suffix, isTs = false, isLess = false) {
  return new Promise((resolve, reject) => {
    fs.readFile(vuePath(suffix), (err, data) => {
      if (err) throw err
      let afterStr = template(data)({ filename })
      if (suffix === 'vue' || suffix === 'other') {
        if (isLess){
          afterStr = afterStr.replace(/scss/gi, 'less')
        }
        if (isTs){
          afterStr = afterStr.replace(/js/gi, 'ts')
        }
      }
      resolve(afterStr)
    })
  })
}
module.exports = {
  // vue scss/less page
  vueStr(){
    return {
      scssStr (filename, isLess) {
        return geneVueSinglePage (filename, isLess ? 'less' : 'scss');
      },
      vueStr (filename, isTs, isLess) {
        return geneVueSinglePage (filename, 'vue', isTs, isLess);
      },
      vuePageStr (filename, isTs, isLess, isVueSinger) {
        return geneVueSinglePage (filename, 'other', isTs, isLess, isVueSinger);
      },
      jsStr (filename, isTs) {
        return geneVueSinglePage (filename, isTs ? 'ts' : 'js');
      },
    };
  },
}
