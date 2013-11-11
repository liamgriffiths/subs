var repl = require("repl"),
    WebSocket = require('ws'),
    websocketURL = "ws://localhost:9000";

console.log("Create a new sub to start: var sub = new Sub()");
var shell = repl.start({ prompt: "subs-shell> " });
shell.context.Sub = Sub;

function Sub() {
  this.conn = new WebSocket(websocketURL, {});
  if (this.conn) {
    this.conn.on('open', this.connected.bind(this));
    this.conn.on('close', this.disconnected.bind(this));
    this.conn.on('error', this.error.bind(this));
    this.conn.on('message', this.recieve.bind(this));
  } else {
    throw "No connection! :-(";
  }

  // what to expect
  this.update = undefined;
  this.id = undefined;
  this.lastUpdate = new Date().getTime();
  this.updateSpeed = 0;
}

Sub.prototype = {
  connected: function(){ },
  disconnected: function(){ return process.exit(); },
  error: function(err, description) { throw err; },

  recieve: function(message, flags) {
    if (message) {
      var currentTime = new Date().getTime();
      this.updateSpeed = currentTime - this.lastUpdate;
      this.lastUpdate = currentTime;

      message = JSON.parse(message);
      if (message.hi) this.id = message.hi.id;
      // if (message.entities) this.id = message.hi.id;
      this.update = message;
    }
  },

  show: function() {
    for(var i = 0; i < this.game.players.length; i++) {
      if (this.game.players[i].id === this.id ) {
        return this.game.players[i];
      }
    }
  },

  // shortcuts
  u: function() { this.send('up'); },
  d: function() { this.send('down'); },
  l: function() { this.send('left'); },
  r: function() { this.send('right'); },
  m: function() { this.send('mine'); },

  send: function(message) {
    if (this.conn.readyState === 1) {
      this.conn.send(message);
    } else {
      throw 'Not connected!';
    }
  }
};



shell.context.SpeedTest = SpeedTest;

function SpeedTest(subCount) {
  this.subs = [];
  for (var i = 0; i < subCount; i++) {
    this.subs.push(new Sub());
  }
}

SpeedTest.prototype = {
  averageSpeed: function() {
    var sum = 0;
    for (var i = 0; i < this.subs.length; i++) {
      sum += this.subs[i].updateSpeed;
    }
    return sum / this.subs.length;
  }
};


