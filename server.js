var express = require('express');
var app = express.createServer();
var io = require('socket.io').listen(app);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.set('transports', [
  'flashsocket'
, 'htmlfile'
, 'xhr-polling'
, 'jsonp-polling'
]);

io.set('log level', 1);

io.sockets.on('connection', function (socket) {
  socket.on('frame', function (data) {
    io.sockets.emit('frame', data);
  });
});

app.listen(3000);
