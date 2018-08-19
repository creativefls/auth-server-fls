var csrf = require('csurf')
var bodyParser = require('body-parser')


var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })

module.exports = {
  csrfProtection,
  parseForm
}
