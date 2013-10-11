var MinesController = function () {
  this.mines = [];
};

MinesController.prototype.draw = function () {
  var drawFns = [];
  for(var i = 0; i < this.mines.length; i++){

    if(drawFns[this.mines[i].position.z] === undefined){
      drawFns[this.mines[i].position.z] = [];
    }
    drawFns[this.mines[i].position.z].push(this.mines[i].draw.bind(this.mines[i]));
  }
  return drawFns;
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
  board.tiles[position.x][position.y].addItem(mine);
};

MinesController.prototype.removeMine = function (i) {
  var minePosition = this.mines[i].position;
  board.tiles[minePosition.x][minePosition.y].removeAllItems();
  this.mines[i].finishExplosion();
  this.mines.splice(i, 1);
};
