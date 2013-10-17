var TILESIZE = 40;
var PRESSED_KEYS = [];
var FPS;
var lastFrameTime;

var currentName = "liam";

var board;
var playersCollection = new PlayersCollection();
var minesCollection = new MinesCollection();
var canvas;
var context;



// main game loop
function main() {
  var currentTime = new Date().getTime();
  var delta = (currentTime - lastFrameTime) / 1000; // divide by msecs
  lastFrameTime = currentTime;
  FPS = 1.0 / delta;

  draw();
  update();
  nextFrame(main);
}

function setup() {
  canvas.width = 800;
  canvas.height = 600;

  var board_w = 40;
  var board_h = 40;

  board = new Board(board_w, board_h, TILESIZE);

  // player start position, middle of board for now
  var playerPos = (new Vector(board_w, board_h)).mul(0.5);
  playersCollection.newPlayer(currentName, playerPos);
}

// does the screen drawing
function draw() {
  Utils.clearCanvas(); // clear the canvas

  var player = playersCollection.players[currentName];
  var newX = player.position.x * TILESIZE - (canvas.height / 2);
  var newY = player.position.y * TILESIZE - (canvas.width / 2);
  context.translate(-newX, -newY);

  var draws = [];
  // NOTE: the order that these are drawn makes a difference, bottom to top
  board.draw();
  playersCollection.draw();
  var minesDraws = minesCollection.draw();
  for(var i = 0; i < minesDraws.length; i++){
    if(minesDraws[i] !== null){
      if(draws[i] === undefined){
        draws[i] = [];
      }

      if(minesDraws[i] !== undefined){
        draws[i] = draws[i].concat(minesDraws[i]);
      }
    }
  }
  for(var j = 0; j < draws.length; j++){
    for(var k = 0; k < draws[j].length; k++){
      draws[j][k]();
    }
  }

  context.translate(newX, newY);
  drawFPSMeter();
}

// updates the current objects
function update() {
  board.update({keys: PRESSED_KEYS});
  minesCollection.update();
  playersCollection.update({keys: PRESSED_KEYS});
  // clear all pressed keys for this tick
  PRESSED_KEYS = [];
}

// set up the game and run it
window.onload = function herewego() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  setup();
  main();
};

window.addEventListener('keydown', function (event) {
  switch (event.keyCode) {
    case 37: //left
      PRESSED_KEYS.push('left');
      break;

    case 38: //up
      PRESSED_KEYS.push('up');
      break;

    case 39: //right
      PRESSED_KEYS.push('right');
      break;

    case 40: //down
      PRESSED_KEYS.push('down');
      break;

    case 65: //a
      PRESSED_KEYS.push('zoomin');
      break;

    case 83: //s
      PRESSED_KEYS.push('zoomout');
      break;

    case 32: //spacebar
      PRESSED_KEYS.push('leavemine');
      break;
  }
  event.preventDefault();
});


// TODO: this might not be xbrowser :-/
function nextFrame(fn) {
  window.requestAnimationFrame(fn);
}

function drawFPSMeter () {
  // context.font = 4bold 22px VT323";
  // context.fillStyle = "#FFF";
  // context.fillText(Math.floor(FPS) + "fps", 10, 30);
  debug(Math.floor(FPS) + "fps");
}

function debug(message){
  document.getElementById('debug').innerHTML = message;
}


