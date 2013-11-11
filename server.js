var WebSocket = require('ws'),
    WebSocketServer = WebSocket.Server,
    wss = new WebSocketServer({port: 9000}),
    Entities = require('./shared/Entities'),
    Board = require('./server/Board'),
    Tile = require('./server/Tile'),
    Item = require('./shared/Item'),
    Mine = require('./server/Mine'),
    Player = require('./server/Player'),
    Utils = require('./shared/Utils'),
    lastTime = new Date().getTime();

var entities,
    delta,
    board;

function setup() {
  global.Tile = Tile;
  global.Item = Item;
  global.Player = Player;
  global.Mine = Mine;
  global.entities = new Entities();

  delta = 0;
  board = new Board({h: 4, w: 4}).reticulateSplines();
  // global.game = {
  //   board: board,
  //   players: wss.clients.map(function(c) { return c.player; }),
  //   mines: mines
  // };
  // console.log(game);
}

function update() {
  var currentTime = new Date().getTime();
  delta = currentTime - lastTime;
  lastTime = currentTime;

  // board.update();

  // // send to all players
  // wss.broadcast({game: {
  //   board: board,
  //   players: wss.clients.map(function(c) { return c.player; }),
  //   mines: mines
  // }});
  wss.broadcast(entities);
}

setup();
// var interval = setInterval(update, 4000);

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
  var playerId = global.entities.create('Player', {
    ws: ws,
    position: board.spawnPosition(),
    power: 2,
    isAlive: true,
    availableMines: 1
  });

  if (playerId) {
    var player = global.entities.find(playerId);
    ws.player = player;
    ws.send(JSON.stringify(global.entities._out()));
  }
});


