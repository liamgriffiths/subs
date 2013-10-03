var TILESIZE = 80;
var PRESSED_KEYS = [];

var currentName = "liam";

var boardController = new BoardController();
var playersController = new PlayersController();
var minesController = new MinesController();

function setup() {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;

  var board_w = canvas.width / TILESIZE;
  var board_h = (canvas.height / TILESIZE) - 1;

  boardController.newBoard(board_w, board_h, TILESIZE);
  playersController.newPlayer(currentName, {x: randomInteger(board_w),
                                            y: randomInteger(board_h)});
}

// main game loop
function main() {
  draw();
  update();
  nextTick(main);
}

// does the screen drawing
function draw() {
  // clear the canvas
  clearCanvas();

  // NOTE: the order that these are drawn makes a difference, bottom to top
  boardController.draw();
  minesController.draw();
  playersController.draw();
}

// updates the current objects
function update() {

  for(var i = 0; i < PRESSED_KEYS.length; i++){
    if(PRESSED_KEYS[i] == 'zoomin'){
      TILESIZE += 1;
    }
    if(PRESSED_KEYS[i] == 'zoomout'){
      TILESIZE -= 1;
    }
  }


  boardController.update();
  minesController.update();
  playersController.update({keys: PRESSED_KEYS});
  PRESSED_KEYS = [];
}

var canvas;
var context;

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

function clearCanvas() {
  canvas.width = canvas.width;
}

function randomInteger(i) {
  return Math.floor(Math.random() * i);
}

function nextTick(fn) {
  window.requestAnimationFrame(fn);
}

function demoMessage() {
   console.log("hello");
   context.fillStyle = "blue";
   context.font = "bold 16px Arial";
   context.fillText("Hello World", canvas.width/2, canvas.height/2);
}
