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

    if(! this.mines[i].live){
      this.mines[i].explode();
    }

    if(! this.mines[i].live && ! this.mines[i].exploding){
      this.mines[i].finishExplosion();
      this.mines.splice(i, 1);
    }
  }
};

MinesController.prototype.newMine = function (position) {
  this.mines.push(new Mine(position));
};
