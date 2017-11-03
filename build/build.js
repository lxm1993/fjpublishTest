// https://github.com/shelljs/shelljs
require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var path = require('path')
var fs = require('fs')
var chalk = require('chalk')
var shell = require('shelljs')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
var version = require('./version')

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
shell.rm('-rf', assetsPath)
shell.mkdir('-p', assetsPath)
shell.config.silent = true
shell.cp('-R', 'static/*', assetsPath)
shell.config.silent = false

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
  hash: true,
  publicPath: true,
  assets: true,
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')
  
  
  stats = stats.compilation.getStats().toJson({
        hash: true,
        publicPath: true,
        assets: true,
        chunks: true,
        modules: true,
        source: false,
        errorDetails: false,
        timings: false
    });
  
    let chunk,staticList = {js:{},css:{}};
  
    for (var key in stats.assetsByChunkName) {
      
        if (stats.assetsByChunkName.hasOwnProperty(key)) {
            chunk = stats.assetsByChunkName[key];
      
      if(!(Array.isArray(chunk))) {
        chunk = [chunk];
      }
            for(var i=0; i< chunk.length; i++) {
        //console.log('---------------'+key);
        //console.log(chunk);
                if(chunk[i].endsWith('.css')){
                  staticList.css[key] = config.build.assetsPublicPath + chunk[i];
                }

                if(chunk[i].endsWith('.js')){
                  staticList.js[key] = config.build.assetsPublicPath + chunk[i]
                }
            }
        }
    }
  
  
  let jsonPath = config.build.versionPath;
  //console.log('%%%%%%%%%%%%%');
  //console.log(jsonPath);
    fs.writeFileSync(
        jsonPath,
        JSON.stringify(staticList, null, 2)
    );

  

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))
  
  version.start();
})
