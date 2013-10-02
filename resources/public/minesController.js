function MinesController() {
  this.mines = [];
}

MinesController.prototype.draw = function () {
  for(var i = 0; i < this.mines.length; i++){
    this.mines[i].draw();
  }
};

MinesController.prototype.update = function () {
  for(var i = 0; i < this.mines.length; i++){
    this.mines[i].update();
  }
};

MinesController.prototype.newMine = function (position) {
  this.mines.push(new Mine(position));
};

MinesController.prototype.removeMine = function () {
};
