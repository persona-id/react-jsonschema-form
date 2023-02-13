
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./antd.cjs.production.min.js')
} else {
  module.exports = require('./antd.cjs.development.js')
}
