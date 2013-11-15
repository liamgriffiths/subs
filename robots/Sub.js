var repl = require("repl"),
    WebSocket = require('ws'),
    websocketURL = "ws://localhost:9000";

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
  },

  send: function(message) {
    if (this.conn.readyState === 1) {
      this.conn.send(message);
    }
  },

  // shortcuts
  up: function() { this.send('up'); },
  down: function() { this.send('down'); },
  left: function() { this.send('left'); },
  right: function() { this.send('right'); },
  mine: function() { this.send('mine'); }
};
