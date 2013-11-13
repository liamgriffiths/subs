// borrowed from http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return window.requestAnimationFrame       ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         function( callback ){
           window.setTimeout(callback, 1000 / 60);
         };

})();

var TILESIZE = 60,
    STARTED = false,
    currentPlayer,
    canvas,
    context,
    delta; // time difference between frames

var oldX = 0, oldY = 0;

// set up the game and run it
window.onload = function herewego() {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  game = new Game();
  game.run();
};


function Game() {
  this.conn = new WebSocket("ws://10.0.1.44:9000");
  if (this.conn) {
    this.conn.onopen = this.connected.bind(this);
    this.conn.onclose = this.disconnected.bind(this);
    this.conn.onerror = this.error.bind(this);
    this.conn.onmessage = this.recieve.bind(this);
  } else {
    throw "No connection! :-(";
  }

  this.entities = new Entities();
  this.camera = new Camera();
  this.id = undefined;
  this.lastUpdate = new Date().getTime();
  this.lastFrameTime = (new Date()).getTime(),
  this.updateSpeed = 0;


  window.addEventListener('keydown', this.sendCommand.bind(this));

  canvas.width = screen.width;
  canvas.height = screen.height * 0.7;
  this.camera.setup();

}

Game.prototype = {
  connected: function(){ },

  disconnected: function(){ return process.exit(); },

  error: function(err, description) { throw err; },

  recieve: function(e, flags) {
    if (e.data) {
      var currentTime = new Date().getTime();
      this.updateSpeed = currentTime - this.lastUpdate;
      this.lastUpdate = currentTime;

      var message = JSON.parse(e.data);
      if (message.hi) this.id = message.hi.id;
      if (message.entities) {
        // console.log(message.entities);
        this.entities._in(message.entities);
      }
    }
  },

  sendCommand: function() {
    switch (event.keyCode) {
      case 37: this.send('left'); break;
      case 38: this.send('up'); break;
      case 39: this.send('right'); break;
      case 40: this.send('down'); break;
      case 32: this.send('mine'); break; // space
    }
  },

  send: function(message) {
    if (this.conn.readyState === 1) {
      this.conn.send(message);
    } else {
      throw 'Not connected!';
    }
  },

  currentPlayer: function() {
    return this.entities.find(this.id);
  },

  update: function(now, delta) {
    var player = this.currentPlayer();
    this.camera.update(player.position);

    for (var id in this.entities.objects) {
      var object = this.entities.objects[id].object;
      if (object.update) {
        object.update(now, delta);
      }
    }

  },

  draw: function() {
    Utils.clearCanvas();

    context.save();
    var player = this.currentPlayer();
    if (player) {
      // find the pixel position of the current player
      var newX = player.position.x * TILESIZE - (canvas.width / 2);
      var newY = player.position.y * TILESIZE - (canvas.height / 2);

      var x = Utils.linearTween(delta, oldX, newX, 1000, 0.000001);
      var y = Utils.linearTween(delta, oldY, newY, 500, 0.000001);
      // set origin in relation to current player position
      context.translate(-x, -y);
      oldX = x;
      oldY = y;

      // Queues up all the drawing functions from all the objects
      for (var id in this.entities.objects) {
        var object = this.entities.objects[id].object;
        if (object.position !== undefined && object.draw !== undefined) {
          this.camera.addDrawing(object.draw.bind(object), object.position);
        }
      }

      this.camera.draw();
    }
    context.restore();
  },

  run: function() {
    var currentTime = new Date().getTime();
    delta = currentTime - this.lastFrameTime;
    this.lastFrameTime = currentTime;

    if (this.id) {
      this.draw();
      this.update(currentTime, delta);
    }
    window.requestAnimFrame(this.run.bind(this));
  }
};



