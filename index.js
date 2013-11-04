var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 9000}),
    // Board = require('./server/Board'),
    // PlayersCollection = require('./server/PlayersCollection'),
    // MinesCollection = require('./server/MinesCollection'),
    Utils = require('./shared/Utils'),
    lastFrameTime = new Date().getTime(),
    delta;

function setup() {
  global.delta = 0;
  global.board = undefined;
  // global.playersCollection = new PlayersCollection();
  // global.minesCollection = new MinesCollection();
}

function update() {
  // board.update();
  // playersCollection.update();
  // minesCollection.update();
}

function handleInput() {
}

var clients = [];

wss.on('connection', function(ws) {
  // client connected
  clients.push(ws);

  // message recieved
  ws.on('message', function(message) {
    console.log('received: %s', message);
  });

  // client disconnected
  ws.on('close', function() {

  });
});


