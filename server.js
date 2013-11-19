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
  board = new Board({h: 40, w: 40}).reticulateSplines();
}

function update() {
  var now = new Date().getTime();
  delta = now - lastTime;
  lastTime = now;


  for (var id in global.entities.objects) {
    var object = global.entities.objects[id].object;
    if (object && object.update) {
      object.update(now, delta, board);
    }
  }

  // send changes to all players
  var message = {entities: global.entities._out({diff: true})};
  if (message.entities.remove.length || Object.keys(message.entities.update).length) {
    wss.broadcast(message);
  }
}

setup();
var interval = setInterval(update, 20);

WebSocket.prototype.sendJSON = function(data) {
  this.send(JSON.stringify(data));
};

WebSocketServer.prototype.broadcast = function(data) {
  for (var id in this.clients) {
    this.clients[id].sendJSON(data);
  }
};

wss.on('connection', function(ws) {
  var playerId;

  console.log('Opened connection');

  ws.on('close', function() {
    if (ws.player) {
      console.log('Closed connection: %s', playerId);
      ws.player.isConnected = false;
    }
    // remove from entities
    // global.entities.remove(playerId);
  });

  ws.on('message', function(message) {
    message = message.trim().toLowerCase();
    if (message) {
      if (ws.player) {
        console.log('Command recieved from %s: %s', ws.player.id, message);
        return ws.player.message(message, ws.player.id, board);
      } else {
        if (message.match(/^hi, i am \w+.*$/)) {
          var name = message.match(/^hi, i am (.*)$/)[1].substring(0, 26);
          // create new player
          playerId = global.entities.create('Player', {
            position: board.spawnPosition(),
            power: 2,
            isAlive: true,
            availableMines: 1,
            isConnected: true,
            name: name
          });
          var player = global.entities.find(playerId);
          ws.sendJSON({hi: {id: playerId}});
          ws.player = player;
          console.log("Created session for: " + name);
          // send the whole game state to new player
          ws.sendJSON({entities: global.entities._out()});
        } else {
          // reconnect player, player id should be in session
          var player = global.entities.find(message);
          if (player) {
            if (! player.isConnected) {
              player.isConnected = true;
              console.log("Reconnected to session for: " + player.name);
              ws.player = player;
              ws.sendJSON({hi: {id: player.id}});
              // send the whole game state to new player
              ws.sendJSON({entities: global.entities._out()});
            } else {
              // already connected!
            }
          } else {
            ws.sendJSON({bye: true});
          }
        }
      }
    }
  });
});

