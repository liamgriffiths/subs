function BoardController() {
  this.board = null;
}

BoardController.prototype.draw = function () {
  if(this.board !== null){ this.board.draw(); }
};

BoardController.prototype.update = function (options) {
  this.board.update();
  this.handleZoom(options.keys);
  this.snapToPlayer();
};

BoardController.prototype.newBoard = function (w, h, tileSize) {
  this.board = new Board(w, h, tileSize);
};

BoardController.prototype.handleZoom = function (keys) {
  for(var i = 0; i < keys.length; i++){
    if(keys[i] == 'zoomin') TILESIZE += 1;
    if(keys[i] == 'zoomout') TILESIZE -= 1;
  }
};

BoardController.prototype.snapToPlayer = function () {

  var player = playersController.players[currentName];
  var newX = player.position.x - (canvas.height / 2);
  var newY = player.position.y - (canvas.width / 2);

  context.translate(newX, newY);

};
