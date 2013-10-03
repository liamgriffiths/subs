var MinesController = function () {
  this.mines = [];
};

MinesController.prototype.draw = function () {
  for(var i = 0; i < this.mines.length; i++){
    this.mines[i].draw();
  }
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
};
