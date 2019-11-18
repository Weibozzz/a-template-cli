#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const {createFile} = require('../utils/generate')
const {spinner} = require('../utils/spinner')

program
  .version(require('../package').version, '-V, --version')
  .description('quick generate vue file')
  .usage('<command> [options]')
  .option('-P, --pages', 'generate pages')
  .option('-C, --component', 'generate component')
  .option('-T, --ts', 'use ts')


program.on('--help', function() {
  console.log('  Examples:');
  console.log('');
  console.log('    $ a-cli -P page-example');
  console.log('    $ a-cli -PT page-example');
  console.log('    $ a-cli -C component-example');
  console.log('    $ a-cli -CT component-example');
  console.log('');
  console.log(chalk.green('    # create a new page-example directory with an template'));
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
