var connect = require('connect');
var http = require('http');

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
    lastTime = new Date().getTime(),
    GAMETIME = 10000,
    delta,
    board;


// server static files
var app = connect()
  .use(connect.static('public'))
  .use(connect.directory('public'));
http.createServer(app).listen(3000);



// new methods for WebSockets
WebSocket.prototype.sendJSON = function(data) {
  try {
    this.send(JSON.stringify(data));
  } catch(e) {
    console.log("[%s]%s", e, data);
  }
};

WebSocketServer.prototype.broadcast = function(data) {
  for (var id in this.clients) {
    this.clients[id].sendJSON(data);
  }
};

function setup() {
  // global vars, for now
  // TODO: move these into Entities (client && serverside)?
  global.Tile = Tile;
  global.Item = Item;
  global.Player = Player;
  global.Mine = Mine;
  global.Board = Board;
  global.entities = new Entities();
  delta = 0;
}

function newGame() {
  entities.each(function(entity) {
    if (entity.constructor !== 'Player')  entity.object = undefined;
  });

  var boardId = global.entities.create('Board', {h: 60, w: 60});
  board = global.entities.find(boardId);

  entities.each(function(entity) {
    if (entity.constructor === 'Player') entity.object.reset(board);
  });
}

function update() {
  // update delta (time since last update)
  var now = new Date().getTime();
  delta = now - lastTime;
  lastTime = now;

  // update all game entities
  global.entities.update(now, delta, board);

  // send updates/deletes to all players if there are any
  var message = {entities: global.entities._out({diff: true})};
  if (message.entities.remove.length || Object.keys(message.entities.update).length) {
    wss.broadcast(message);
  }
}

setup();
newGame();
var interval = setInterval(update, 10);

wss.on('connection', function(ws) {

  ws.on('close', function() { if (ws.player) ws.player.ondisconnect(); });
  ws.on('error', function(error) { console.log(error); });

  ws.on('message', function(message) {
    message = message.trim().toLowerCase();
    if (! message) return;

    // player exists, let player process message/command && return
    if (ws.player) return ws.player.onmessage(message, board);

    // player is reconnecting
    if (message.match(/^hi, i am back \w+-\w+-\w+-\w+-\w+$/)) {
      var id = message.match(/^hi, i am back (\w+-\w+-\w+-\w+-\w+)$/)[1];
      var player = global.entities.find(id);
      if (player && ! player.isConnected) {
        ws.player = player;
        ws.sendJSON({hi: {id: ws.player.id}});
        ws.sendJSON({entities: global.entities._out()});
        return ws.player.onconnect();
      }
    }

    // create a new player
    if (message.match(/^hi, i am \w+.*$/)) {
      var name = message.match(/^hi, i am (.*)$/)[1].substring(0, 26);
      var playerId = global.entities.create('Player', {
        position: board.spawnPosition(),
        isAlive: true,
        isConnected: true,
        name: name
      });

      ws.player = global.entities.find(playerId);
      ws.sendJSON({hi: {id: ws.player.id}});
      ws.sendJSON({entities: global.entities._out()});
      return ws.player.onconnect();
    }

  });
});

