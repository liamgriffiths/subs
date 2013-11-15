var WebSocket = require('ws'),
    URL = "ws://localhost:9000";

function Sub() {
  this.conn = new WebSocket(URL, {});
  if (this.conn) {
    this.conn.on('open', this.connected.bind(this));
    this.conn.on('close', this.disconnected.bind(this));
    this.conn.on('error', this.error.bind(this));
    this.conn.on('message', this.recieve.bind(this));
  } else {
    throw "No connection! :-(";
  }

  // what to expect
  this.entities = undefined;
  this.id = undefined;
  this.lastUpdate = new Date().getTime();
  this.updateDelta = 0;
}

Sub.prototype = {
  connected: function(){ },

  disconnected: function(){ return process.exit(); },

  error: function(err, description) { throw err; },

  recieve: function(e, flags) {
    if (e.data) {
      var currentTime = new Date().getTime();
      this.updateDelta = currentTime - this.lastUpdate;
      this.lastUpdate = currentTime;

      var message = JSON.parse(e.data);
      if (message.hi) this.id = message.hi.id;
      if (message.entities) this.entities = message.entities;
    }
  },

  send: function(message) {
    if (this.conn.readyState === 1) this.conn.send(message);
  },

  // commands the server accepts
  up: function() { this.send('up'); },
  down: function() { this.send('down'); },
  left: function() { this.send('left'); },
  right: function() { this.send('right'); },
  mine: function() { this.send('mine'); }
};

module.exports = Sub;
