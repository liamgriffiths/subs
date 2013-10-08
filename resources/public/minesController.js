var MinesController = function () {
  this.mines = [];
};

MinesController.prototype.draw = function () {
  var draws = [];
  for(var i = 0; i < this.mines.length; i++){

    if(draws[this.mines[i].position.z] === undefined){
      draws[this.mines[i].position.z] = [];
    }

    draws[this.mines[i].position.z].push(this.mines[i].draw.bind(this.mines[i]));
  }
  return draws;
};

MinesController.prototype.update = function () {
  for(var i = 0; i < this.mines.length; i++){
    this.mines[i].update();

    if(! this.mines[i].live) this.mines[i].explode();

    if(! this.mines[i].live && ! this.mines[i].exploding){
      this.removeMine(i);
    }
  }
};

MinesController.prototype.newMine = function (position) {
  var mine = new Mine(position);
  this.mines.push(mine);
  boardController.board.tiles[position.x][position.y].addItem(mine);
};

MinesController.prototype.removeMine = function (i) {
  var minePosition = this.mines[i].position;
  boardController.board.tiles[minePosition.x][minePosition.y].removeAllItems();
  this.mines[i].finishExplosion();
  this.mines.splice(i, 1);
};
