
var TILESIZE = 80;
var PRESSED_KEYS = [];

var currentName = "liam";

var boardController = new BoardController();
var playersController = new PlayersController();
var minesController = new MinesController();


// main game loop
function main() {
  draw();
  update();
  nextFrame(main);
}

function setup() {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;

  var board_w = 20;
  var board_h = 20;

  boardController.newBoard(board_w, board_h, TILESIZE);
  playersController.newPlayer(currentName, {x: board_w /2,
                                            y: board_h /2});
}

// does the screen drawing
function draw() {
  clearCanvas(); // clear the canvas

  var draws = [];

  // NOTE: the order that these are drawn makes a difference, bottom to top
  boardController.draw();
  playersController.draw();

  var minesDraws = minesController.draw();
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

}

// updates the current objects
function update() {
  boardController.update({keys: PRESSED_KEYS});
  minesController.update();
  playersController.update({keys: PRESSED_KEYS});
  // clear all pressed keys for this tick
  PRESSED_KEYS = [];
}

var canvas;
var context;

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
});


// TODO: this might not be xbrowser :-/
function nextFrame(fn) {
  window.requestAnimationFrame(fn);
}
