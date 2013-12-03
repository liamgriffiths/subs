var connect = require('connect');
var http = require('http');
var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var wss = new WebSocketServer({port: 9000});
var Entities = require('./shared/Entities');
var lastTime = new Date().getTime();
var GAMETIME = 1000 * 60 * 5; // 3 minutes
var runningTime = 0;
var delta = 0;
var board;

// global entities variable, holds onto all game objects
global.entities = new Entities();

// serve static files (index.html, minified client js)
var app = connect()
  .use(connect.static('public'))
  .use(connect.directory('public'));
http.createServer(app).listen(3000);

// short-hand function to send data as json to a connected client
WebSocket.prototype.sendJSON = function(data) {
  this.send(JSON.stringify(data));
};

// send json to all connected clients
WebSocketServer.prototype.broadcast = function(data) {
  for (var id in this.clients) {
    this.clients[id].sendJSON(data);
  }
};

// websocket server events
wss.on('connection', function(ws) {
  ws.on('close', function() { if (ws.player) ws.player.ondisconnect(); });
  ws.on('error', function(error) { console.log(error); });

  ws.on('message', function(message) {
    message = message.trim().toLowerCase();
    if (! message) return;

    // player exists, let player process message/command && return
    if (ws.player) return ws.player.onmessage(message, board);

    // player is reconnecting
    // if (message.match(/^hi, i am back \w+-\w+-\w+-\w+-\w+$/)) {
    //   var id = message.match(/^hi, i am back (\w+-\w+-\w+-\w+-\w+)$/)[1];
    //   var player = global.entities.find(id);
    //   if (player && ! player.isConnected) {
    //     ws.player = player;
    //     ws.sendJSON({hi: {id: ws.player.id}});
    //     ws.sendJSON({entities: global.entities._out()});
    //     ws.sendJSON({timeLeft: GAMETIME - runningTime});
    //     return ws.player.onconnect();
    //   }
    // }

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
      ws.sendJSON({timeLeft: GAMETIME - runningTime});
      return ws.player.onconnect();
    }

  });
});


function newGame() {
  // delete all non-player entities
  entities.each(function(entity) {
    if (entity.constructor !== 'Player') entity.object = undefined;
  });

  // create a new game board
  var boardId = global.entities.create('Board', {h: 60, w: 60});
  board = global.entities.find(boardId);

  // reset all players (bring them back to life)
  entities.each(function(entity) {
    if (entity.constructor === 'Player') entity.object.reset(board);
  });

  wss.broadcast({timeLeft: GAMETIME - runningTime});
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
  runningTime += delta;

  // crude way to restarting game after amount of time has passed
  if (runningTime >= GAMETIME) {
    runningTime = 0;
    newGame();
    return setTimeout(update, 10);
  }
  return setTimeout(update, 10);
}

// the game
newGame();
update();
