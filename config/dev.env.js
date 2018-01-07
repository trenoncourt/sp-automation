var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  apiURL: '"http://tre-sp.westeurope.cloudapp.azure.com/sites/sical/_api/"',
  baseApiURL: '"http://tre-sp.westeurope.cloudapp.azure.com"'
})
