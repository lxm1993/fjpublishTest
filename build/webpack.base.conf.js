var path = require('path')
var webpack = require('webpack')
var utils = require('./utils')
var config = require('../config')
var entris = require('./entris')
var vueLoaderConfig = require('./vue-loader.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

var baseWebpackConfig = {
    entry: {
        commons: ['~src/assets/js/common.js'],
        vendor: ['vue']
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    externals: {
        //'jquery': 'jQuery'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            '~src': path.resolve(__dirname, '../src'),
            '~api': path.resolve(__dirname, '../src/api/index'),
            '~api-config': process.env.NODE_ENV === 'production' ? path.resolve(__dirname, '../src/api/config') : path.resolve(__dirname, '../src/api/config.dev'),
            '~components': path.resolve(__dirname, '../src/components'),
            '~utils': path.resolve(__dirname, '../src/utils')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery'}),
    ]
}
baseWebpackConfig.entry = Object.assign(baseWebpackConfig.entry, entris)
module.exports = baseWebpackConfig
