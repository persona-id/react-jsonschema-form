
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./mui.cjs.production.min.js')
} else {
  module.exports = require('./mui.cjs.development.js')
}
