var path = require('path')
var utils = require('./utils')
var config = require('../config')

var entris = utils.getMultiEntry(config.entryConsolePath)

module.exports = entris
