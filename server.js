var jsdom = require("jsdom"),
    childProcess = require('child_process'),
    fs = require('fs'),
    schedule = require("node-schedule"),
    progress = require('request-progress'),
    request = require('request');

schedule.scheduleJob('0 */2 * * *', function() {
    getImageUrl(function(link) {
        download(link, function(file) {
            setWallpaper(file);
        });
    });
});


function setWallpaper(image) {
    childProcess.execFile('feh', ['--bg-scale', image], function(error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
}

function download(url, callback) {
    progress(request(url))
        .on('progress', function(state) {
            console.log(state);
        })
        .pipe(fs.createWriteStream('tmp.jpg'))
        .on('finish', function() {
            callback('tmp.jpg');
        });
}

function getImageUrl(callback) {
    jsdom.env("https://www.reddit.com/r/" + (process.argv[2] || "EarthPorn"), ["http://code.jquery.com/jquery.js"], function(error, window) {
        var links = window.$("a.title[href*='.jpg']");
        var link = links[Math.floor(links.length * Math.random())].href;
        if (link != 'undefined')
            callback(link);
    });
}
