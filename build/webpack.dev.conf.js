var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var entris = require('./entris')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  output: {
      path: config.dev.assetsRoot,
      publicPath: config.dev.assetsPublicPath,
      filename: 'static/js/[name].js',
      chunkFilename: 'static/js/chunk/[id].[chunkhash].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor"],
      minChunks: 2
    }),
    new FriendlyErrorsPlugin()
  ]
})


console.log('--------------entris----------------');
console.log(entris)
console.log('------------------------------------');

Object.keys(entris).forEach(function(entry) {
    webpackConfig.plugins.push(
        new HtmlWebpackPlugin({
            chunks: ['vendor', entry],
            filename: entris[entry].split(config.moduleName+'/')[1]+'/index.html',
            template: 'src/template/index.html',
            inject: true
        })
    )
})

Object.keys(webpackConfig.entry).forEach(function(name) {
    webpackConfig.entry[name] = ['./build/dev-client'].concat(webpackConfig.entry[name])
})

module.exports = webpackConfig
