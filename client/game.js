var TILESIZE = 40,
    STARTED = false,
    lastFrameTime = 0,
    playersCollection = new PlayersCollection(),
    minesCollection = new MinesCollection(),
    camera = new Camera(),
    currentPlayer,
    canvas,
    context,
    delta, // time difference between frames
    board;

var serverState = {};


var ws = new WebSocket("ws://localhost:9000");

function setup() {
  canvas.width = 800;
  canvas.height = 600;
  board = new Board(serverState.board);
  playersCollection.update(serverState.players);
  camera.setup();

  // Create a new Player and add to the middle of the board
  /* var playerPos = new Vector(board.w, board.h).mul(0.5); */
  currentPlayer = playersCollection.players['liam'];
}


// main game loop
function main() {
  var currentTime = new Date().getTime();
  delta = (currentTime - lastFrameTime);
  lastFrameTime = currentTime;

  draw();
  update();
  window.requestAnimFrame(main);
}

// does the screen drawing
function draw() {
  Utils.clearCanvas();

  context.save();
  var player = currentPlayer;
  // find the pixel position of the current player
  var newX = player.position.x * TILESIZE - (canvas.width / 2);
  var newY = player.position.y * TILESIZE - (canvas.height / 2);
  // set origin in relation to current player position
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
  minesCollection.update(serverState.mines);
  playersCollection.update(serverState.players);
}

// set up the game and run it
window.onload = function herewego() {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  ws.onclose = function() { console.log("websocket closed down."); };
  ws.onerror = function() { console.log("websocket had an error."); };
  ws.onopen = function() {
    console.log('on open?');
  };
  ws.onmessage = function(e) {
    // ws.send("open connection");
    // console.log('on message?');
    var data = JSON.parse(e.data);
    serverState = data;
    if(!STARTED){
      STARTED = true;
      setup();
      main();
    }
  };
};

