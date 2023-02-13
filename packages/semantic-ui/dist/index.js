
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./semantic-ui.cjs.production.min.js')
} else {
  module.exports = require('./semantic-ui.cjs.development.js')
}
