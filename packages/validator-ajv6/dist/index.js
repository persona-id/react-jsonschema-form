
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./validator-ajv6.cjs.production.min.js')
} else {
  module.exports = require('./validator-ajv6.cjs.development.js')
}
