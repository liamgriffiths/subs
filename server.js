var WebSocket = require('ws'),
    WebSocketServer = WebSocket.Server,
    wss = new WebSocketServer({port: 9000}),
    Board = require('./server/Board'),
    // PlayersCollection = require('./server/PlayersCollection'),
    // MinesCollection = require('./server/MinesCollection'),
    Player = require('./server/Player.js'),
    Utils = require('./shared/Utils'),
    lastTime = new Date().getTime();

function setup() {
  global.delta = 0;
  global.board = new Board({h: 10, w: 10}).reticulateSplines();
  global.game = {
    board: board,
    players: wss.clients.map(function(c) { return c.player; })
  };
}

setup();

function update() {
  var currentTime = new Date().getTime();
  delta = currentTime - lastTime;
  lastTime = currentTime;

  // board.update();
  // playersCollection.update();
  // minesCollection.update();

  wss.broadcast({game: {
    board: board,
    players: wss.clients.map(function(c) { return c.player; }),
    mines: []
  }});
}

var interval = setInterval(update, 2);

WebSocket.prototype.sendJSON = function(data) {
  this.send(JSON.stringify(data));
};

WebSocketServer.prototype.broadcast = function(data) {
  for (var id in this.clients) {
    this.clients[id].sendJSON(data);
  }
};

wss.on('connection', function(ws) {
  // client connected, create new player
  ws.player = new Player({
    id: Utils.guid(),
    ws: ws,
    position: board.spawnPosition(),
    power: 2,
    isAlive: true,
    availableMines: 1
  });
});


