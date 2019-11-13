const spinnerstyle = require('../libs/spinners.json');
const ora = require('ora');
const chalk = require('chalk');
const spinner = ora({
  text: chalk.blue('generate template begin'),
  spinner: spinnerstyle.dots
})

module.exports = {
  spinner: spinner
}
