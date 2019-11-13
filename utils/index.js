const handlebars = require('handlebars')

module.exports = {
  template (stream) {
    return handlebars.compile(stream.toString())
  }
}
