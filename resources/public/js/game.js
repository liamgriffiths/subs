var TILESIZE = 40,
    PRESSED_KEYS = [],
    FPS = 0,
    lastFrameTime = 0,
    currentName = 'liam',
    playersCollection = new PlayersCollection(),
    minesCollection = new MinesCollection(),
    canvas,
    context,
    board;



// main game loop
function main() {
  var currentTime = new Date().getTime();
  var diff = (currentTime - lastFrameTime) / 1000; // divide by msecs
  lastFrameTime = currentTime;
  FPS = 1.0 / diff;

  draw();
  update();
  window.requestAnimationFrame(main);
}

function setup() {
  canvas.width = 800;
  canvas.height = 600;
  board = new Board(40, 40);

  // Create a new Player and add to the middle of the board
  var playerPos = new Vector(board.w, board.h).mul(0.5);
  playersCollection.newPlayer(currentName, playerPos);
}

// does the screen drawing
function draw() {
  Utils.clearCanvas(canvas);

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
  document.getElementById('debug').innerHTML = Math.floor(FPS) + 'fps';
}

// updates the current objects
function update() {
  board.update({keys: PRESSED_KEYS});
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
