var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 9000});
var Board = require('./Board');

var board = new Board(20, 20);



wss.on('connection', function(ws) {
  ws.send(JSON.stringify({board: board.tiles}));

  ws.on('message', function(message) {
    console.log('received: %s', message);
  });
});


