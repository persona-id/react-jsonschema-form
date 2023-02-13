
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./validator-ajv8.cjs.production.min.js')
} else {
  module.exports = require('./validator-ajv8.cjs.development.js')
}
