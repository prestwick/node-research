/*jslint nomen: true */
/*jslint node: true */

var handler,
    app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs'),
    path = require('path'),
    port = 1337;

app.listen(port);

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

console.log('node static running');

io.sockets.on('connection', function (socket) {
//    socket.emit('news', {hello: 'my little friend.  I own the world'});
//    socket.on('my other event', function (data) {
//        console.log(data);
//        console.log(__dirname);
    "use strict";
    var count = 0,
        counter = function () {
            count += 1;
            socket.emit('news', {dataCount: count});
        };
    
    setInterval(counter, 250);
});