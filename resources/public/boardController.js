function BoardController() {
  this.board = null;
}

BoardController.prototype.draw = function () {
  if(this.board !== null){ this.board.draw(); }
};

BoardController.prototype.update = function () {
  this.board.update();
};

BoardController.prototype.newBoard = function (w, h, tileSize) {
  this.board = new Board(w, h, tileSize);
};
