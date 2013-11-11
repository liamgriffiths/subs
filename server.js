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
  board = new Board({h: 10, w: 10}).reticulateSplines();
}

function update() {
  var currentTime = new Date().getTime();
  delta = currentTime - lastTime;
  lastTime = currentTime;

  // send to all players
  wss.broadcast({entities: global.entities._out()});
}

setup();
var interval = setInterval(update, 60);
console.log(global.entities);

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
    position: board.spawnPosition(),
    power: 2,
    isAlive: true,
    availableMines: 1
  });


  if (playerId) {
    console.log('%s connected', playerId);
    var player = global.entities.find(playerId);

    ws.on('close', function() {
      console.log('%s disconnected', playerId);
      // remove from entities
      global.entities.remove(playerId);
    });

    ws.on('message', function(message) {
      return player.message(message, entities, board);
    });

    ws.sendJSON({hi: {id: playerId}});
    ws.player = player;
    ws.sendJSON({entities: global.entities._out()});
  }
});


