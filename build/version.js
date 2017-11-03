var ora = require('ora');

var fs = require('fs');
config = require('../config');
staticFileList = {},
    templateFileList = [];

function scanDirectory(path, isStatic) {
    var dirList = fs.readdirSync(path);
    dirList.forEach(function(item) {
        if (fs.statSync(path + '/' + item).isDirectory()) {
            scanDirectory(path + '/' + item, isStatic);
        } else {
            if (isStatic) {
                if (item.endsWith('.js') || item.endsWith('.css')) {
                    var reg = /(.*)\.(.*)\.(js|css)/g;
                    var fileArr = reg.exec(item);
                    var key = fileArr[1] + '.' + fileArr[3];
                    staticFileList[key] = fileArr.slice(1, 4);
                }
            } else {
                templateFileList.push(path + '/' + item);
            }
        }
    });
}


function readTemplate(filePath) {
    fs.readFile(filePath, function(err, data) {
        if (err) {
            return console.error(err);
            throw(err);
        }

        var datalist = data.toString().match(/(js|css)\/(.*)\.(.*)\.(js|css)?/g);
        var reg = /(js|css)\/(.*)\.(.*)\.(js|css)/g;

        if (!datalist) {
            return;
        }

        var result = data.toString();
        for (var i = 0; i < datalist.length; i++) {
            var content = datalist[i];
            var fileArr = reg.exec(content).slice(2, 5);
            reg.lastIndex = 0;
            var key = fileArr[0] + '.' + fileArr[2];
            var rcontent = fileArr.join('.');

            if(staticFileList[key]) {
                result = result.replace(rcontent, staticFileList[key].join('.'));
            }

        }

        if(result.length > 0) {
            writeTemplate(filePath, result);
        }
    });
}

function writeTemplate(filePath, result) {
    fs.writeFile(filePath, result, function(err) {
        if (err) {
            throw(err);
        }
    });
}


exports.start = function() {

    var spinner = ora('replace version...')
    spinner.start();

    scanDirectory(config.build.assetsRoot, true)
    scanDirectory(config.build.templateSrc);

    var i = 0,
        len = templateFileList.length;
    for (; i < len; i++) {
        var filePath = templateFileList[i];
        readTemplate(filePath);
    }

    spinner.stop();
}