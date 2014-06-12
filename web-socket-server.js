/*jslint nomen: true */
/*jslint node: true */
/*global */

var handler,
    app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs'),
    path = require('path'),
    port = 1337,
    utilTimer;

app.listen(port);

//file server implementation
function handler(req, res) {
    "use strict";
    var filePath = req.url,
        extentionName  = path.extname(filePath),
        contentType = 'text/html';
    console.log('req url is ' + req.url);
    
    if (filePath === '/') {
        filePath = '/index.html';
    } else {
        filePath = req.url;
    }
    
    console.log('extention name is ' + extentionName);
    
    
    switch (extentionName) {
    case '.js':
        contentType = 'text/javascript';
        break;
    case '.css':
        contentType = 'text/css';
        break;
    case '.png':
        contentType = 'image/png';
        break;
    }
    console.log('content type is ' + contentType);
    
    fs.readFile(__dirname + filePath, function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }

        res.writeHead(200, {'Content-Type': contentType});
        res.end(data);
    });
}

//websocket implementation
io.sockets.on('connection', function (socket) {
    "use strict";
    var rate = 1000,
        randEmit = function () {
            var rand = Math.random() * 100;
            socket.emit('news', {dataCount: rand});
        };
    utilTimer.startTimer(randEmit, rate);
    
    socket.on('my other event', function (data) {
        console.log("received my other event");
        //rate = data.rate;
        utilTimer.stopTimer();
        rate = data.rate;
        utilTimer.startTimer(randEmit, rate);
    });
});

//helper objects
utilTimer = (function () {
    "use strict";
    var stopped = false,
        internalTimerObject,
        startTimer = function (callback, interval) {
            stopped = false;
            internalTimerObject = setInterval(callback, interval);
            console.log("new interval is" + interval);
        },
        stopTimer = function () {
            clearInterval(internalTimerObject);
            console.log("clearInteval called");
        };
    return {
        startTimer: startTimer,
        stopTimer: stopTimer
    };
}());