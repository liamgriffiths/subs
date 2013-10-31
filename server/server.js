var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 9000});
var Board = require('./app/Board');
var PlayersCollection = require('./app/PlayersCollection');
var MinesCollection = require('./app/MinesCollection');
global.Vector = require('./app/Vector');

var lastFrameTime = new Date().getTime();

global.delta = 0;
global.board = new Board(20, 20);
global.playersCollection = new PlayersCollection();
global.minesCollection = new MinesCollection();

playersCollection.newPlayer('liam', {x: 10, y: 10, z: 1});

function gameState() {
  var game = {board: board.tiles,
              players: playersCollection.players,
              mines: minesCollection.mines};
  return JSON.stringify(game);
}

wss.on('connection', function(ws) {
  // send generated board to client
  ws.send(gameState());
  ws.on('message', function(message) {
    if(message == 'left' || message == 'up' || message == 'right' ||
      message == 'down' || message == 'mine'){
      playersCollection.players.liam.update({keys: [message]});
    }
    console.log('received: %s', message);
  });

  var refresh = setInterval(function() {
    var currentTime = new Date().getTime();
    delta = (currentTime - lastFrameTime);
    lastFrameTime = currentTime;
    console.log("refreshing");
    board.update();
    minesCollection.update();
    playersCollection.update();
    ws.send(gameState());
  }, 100);


});


