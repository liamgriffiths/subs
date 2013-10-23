var MinesCollection = function() {
  this.mines = [];
};

MinesCollection.prototype.draw = function() {
  for(var i = 0; i < this.mines.length; i++){
    var mine = this.mines[i];
    // camera.addDrawable(mine.draw.bind(mine), mine.position);
    // var p = new Vector(currentPlayer.position.x, currentPlayer.position.y, 2);
    // mine.position.z = 2;
    camera.addDrawable(mine.draw.bind(mine), mine.position);
  }
};

MinesCollection.prototype.update = function() {
  for(var i = 0; i < this.mines.length; i++){
    this.mines[i].update();

    if(! this.mines[i].live) this.mines[i].explode();

    if(! this.mines[i].live && ! this.mines[i].exploding){
      this.removeMine(i);
    }
  }
};

MinesCollection.prototype.newMine = function(position) {
  var mine = new Mine(position);
  this.mines.push(mine);
};

MinesCollection.prototype.removeMine = function(i) {
  var minePosition = this.mines[i].position;
  this.mines[i].finishExplosion();
  this.mines.splice(i, 1);
};
