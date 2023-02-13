
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./fluent-ui.cjs.production.min.js')
} else {
  module.exports = require('./fluent-ui.cjs.development.js')
}
