var repl = require("repl"),
    WebSocket = require('ws'),
    websocketURL = "ws://localhost:9000";

function RandomSub() {
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

RandomSub.prototype = {
  connected: function(){ },
  disconnected: function(){ return process.exit(); },
  error: function(err, description) { throw err; },

  recieve: function(message, flags) {
    // if (message) {
    //   var currentTime = new Date().getTime();
    //   this.updateSpeed = currentTime - this.lastUpdate;
    //   this.lastUpdate = currentTime;

    //   message = JSON.parse(message);
    //   if (message.hi) this.id = message.hi.id;
    //   this.update = message;
    // }
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
      // throw 'Not connected!';
    }
  },

  run: function() {
    var stuff = [this.u, this.d, this.l, this.r, this.m, function(){}];
    var i = Math.floor(Math.random() * (stuff.length - 1));
    var thing = stuff[i];
    console.log(i);
    thing.bind(this)();
    console.log(thing.toString());
    setTimeout(this.run.bind(this), 2000);
  }
};


for (var i = 0; i < 20; i++) {
  new RandomSub().run();
}
