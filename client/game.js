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

var TILESIZE = 40,
    STARTED = false,
    lastFrameTime = 0,
    // playersCollection = new PlayersCollection(),
    // minesCollection = new MinesCollection(),
    currentPlayer,
    canvas,
    context,
    delta; // time difference between frames

// set up the game and run it
window.onload = function herewego() {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  game = new Game();
  game.run();
};


function Game() {
  this.conn = new WebSocket("ws://localhost:9000");
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
  this.updateSpeed = 0;


  window.addEventListener('keydown', this.sendCommand.bind(this));

  canvas.width = 800;
  canvas.height = 600;
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
      if (message.entities) this.entities._in(message.entities);
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

  update: function() {
    var player = this.currentPlayer();
    this.camera.update(player.position);

    for (var id in this.entities.objects) {
      var object = this.entities.objects[id].object;
      if (object.update) {
        object.update();
      }
    }

  },

  draw: function() {
    Utils.clearCanvas();

    context.save();
    var player = this.currentPlayer();
    // find the pixel position of the current player
    var newX = player.position.x * TILESIZE - (canvas.width / 2);
    var newY = player.position.y * TILESIZE - (canvas.height / 2);
    // set origin in relation to current player position
    context.translate(-newX, -newY);

    // Queues up all the drawing functions from all the objects
    for (var id in this.entities.objects) {
      var object = this.entities.objects[id].object;
      if (object.position !== undefined && object.draw !== undefined) {
        this.camera.addDrawing(object.draw.bind(object), object.position);
      }
    }

    this.camera.draw();
    context.restore();
  },

  run: function() {
    var currentTime = new Date().getTime();
    delta = (currentTime - lastFrameTime);
    this.lastFrameTime = currentTime;

    if (this.id) {
      this.draw();
      this.update();
    }
    window.requestAnimFrame(this.run.bind(this));
  }
};



