var jsdom = require("jsdom");

jsdom.env("https://www.reddit.com/r/" + (process.argv[2] || "EarthPorn"), ["http://code.jquery.com/jquery.js"],
    function(error, window) {
        var links = window.$("a.title").filter((i, value) => {
            return /(\.jpg|\.jpeg|\.png)$/.test(value.href);
        });
        console.log(links[Math.floor(links.length * Math.random())].href);
    });
