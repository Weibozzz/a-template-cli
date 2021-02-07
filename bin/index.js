#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const {createFile} = require('../utils/generate')
const {createVueFile} = require('../utils/generateVue')
const {spinner} = require('../utils/spinner')

program
  .version(require('../package').version, '-V, --version')
  .description('quick generate template file')
  .usage('<command> [options]')
  .option('-P, --pages', 'generate pages')
  .option('-V, --version', 'version')
  .option('-U, --vue', 'generate vue pages')
  .option('-S, --vuesinger', 'generate vue singer pages')
  .option('-C, --component', 'generate component')
  .option('-T, --ts', 'use ts')
  .option('-L, --less', 'use less default scss')


program.on('--help', function() {
  console.log('  Examples:');
  console.log('');
  console.log('    $ a-cli -P page-example');
  console.log('    $ a-cli --vue vue-example');
  console.log('    $ a-cli -PT page-example');
  console.log('    $ a-cli -C component-example');
  console.log('    $ a-cli -CT component-example');
  console.log('');
  console.log(chalk.green('    # create a new vue-example directory with an template'));
  console.log('    $ a-cli -S my-page');
  console.log(chalk.green('    # create a new vue-example singer page with an template'));
  console.log('    $ a-cli --vue my-page');
  console.log(chalk.green('    # create a new vue-page-example directory with an template'));
  console.log('    $ a-cli -P my-page');
  console.log(chalk.green('    # create a new component-example directory with an template'));
  console.log('    $ a-cli -C my-component');
  console.log(chalk.green('    # create a new page-example directory with an ts template'));
  console.log('    $ a-cli -PT my-page');
  console.log(chalk.green('    # create a new component-example directory with an ts template'));
  console.log('    $ a-cli -CT my-component');
});

program.parse(process.argv);

/**
 * Help
 */
(function help () {
  if (program.args.length < 1) return program.help();
})()


spinner.start('Generating, please wait......');
console.log('');

if(program.vue === true){
  // 创建 vue 文件
  const dirName = program.args[0]
  createVueFile(dirName, {
    isLess: program.less,
    isTs: program.ts,
    isVueSinger: program.vuesinger,
  })
  return ;
}
if(program.pages === true){
  // 创建 page 文件
  const dirName = program.args[0]
  createFile(dirName, { isTs: program.ts })
  return ;
}
if(program.component === true){
  // 创建 component 文件
  const dirName = program.args[0]
  createFile(dirName, { isTs: program.ts, isComponent: true })
  return ;
}

if(program.args[0]){
  // 默认创建 page 文件
  const dirName = program.args[0]
  createFile(dirName)
  return ;
}
