var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 9000});
var Board = require('./app/Board');
var PlayersCollection = require('./app/PlayersCollection');
// var Player = require('./Player');

var board = new Board(20, 20);
var playersCollection = new PlayersCollection();
playersCollection.newPlayer('liam');

var game = {board: JSON.stringify(board.tiles),
            players: playersCollection.players,
            mines: []};


wss.on('connection', function(ws) {
  // send generated board to client
  ws.send(JSON.stringify(game));

  ws.on('message', function(message) {
    switch(message) {
      case 'left':
        break;
      case 'up':
        break;
      case 'right':
        break;
      case 'down':
        break;
      case 'mine':
        break;
    }

    console.log('received: %s', message);
  });
});


