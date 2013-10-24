var TILESIZE = 40,
    PRESSED_KEYS = [],
    lastFrameTime = 0,
    playersCollection = new PlayersCollection(),
    minesCollection = new MinesCollection(),
    camera = new Camera(),
    currentPlayer,
    canvas,
    context,
    delta, // time difference between frames
    board;


// main game loop
function main() {
  var currentTime = new Date().getTime();
  delta = (currentTime - lastFrameTime);
  lastFrameTime = currentTime;

  draw();
  update();
  window.requestAnimFrame(main);
}

function setup() {
  canvas.width = 800;
  canvas.height = 600;
  board = new Board(70, 70);
  camera.setup();

  // Create a new Player and add to the middle of the board
  var playerPos = new Vector(board.w, board.h).mul(0.5);
  currentPlayer = playersCollection.newPlayer('liam', playerPos);
}

// does the screen drawing
function draw() {
  Utils.clearCanvas();

  context.save();
  var player = currentPlayer;
  var newX = player.position.x * TILESIZE - (canvas.width / 2);
  var newY = player.position.y * TILESIZE - (canvas.height / 2);
  context.translate(-newX, -newY);

  // Queues up all the drawing functions from all the objects
  board.draw();
  playersCollection.draw();
  minesCollection.draw();

  // Camera.draw runs all the queued draw functions
  camera.draw();

  context.restore();
}

// updates the current objects
function update() {
  camera.update(currentPlayer.position);
  board.update();
  minesCollection.update();
  playersCollection.update({keys: PRESSED_KEYS});
  PRESSED_KEYS = []; // clear all pressed keys for this frame
}

// set up the game and run it
window.onload = function herewego() {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  setup();
  main();
};

window.addEventListener('keydown', function (event) {
  switch (event.keyCode) {
    case 37: PRESSED_KEYS.push('left'); break;
    case 38: PRESSED_KEYS.push('up'); break;
    case 39: PRESSED_KEYS.push('right'); break;
    case 40: PRESSED_KEYS.push('down'); break;
    case 65: PRESSED_KEYS.push('zoomin'); break; // a
    case 83: PRESSED_KEYS.push('zoomout'); break; // s
    case 32: PRESSED_KEYS.push('leavemine'); break; // space
  }
  // event.preventDefault();
});

