var fs = require('fs'),
    jsdom = require("jsdom"),
    request = require('request'),
    notifier = require('node-notifier'),
    schedule = require("node-schedule"),
    progress = require('request-progress'),
    childProcess = require('child_process');

(function start() {
    getImageUrl(function(link) {
        download(link, setWallpaper);
    });
})();

notifier.notify({
    title: 'RedditWallpaper',
    message: 'Starting schedule'
});

// Cron like schedule every hour
schedule.scheduleJob('0 */1 * * *', function() {
    start();
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
