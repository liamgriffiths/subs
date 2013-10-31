var MinesCollection = function() {
  this.mines = [];
};

MinesCollection.prototype.draw = function() {
  for(var i = 0; i < this.mines.length; i++){
    var mine = this.mines[i];
    camera.addDrawable(mine.draw.bind(mine), mine.position);
  }
};

MinesCollection.prototype.update = function(mines) {
  this.mines = [];
  for(var i = 0; i < mines.length; i++){
    this.mines.push(new Mine(mines[i]));
  }
};

MinesCollection.prototype.newMine = function(position, who) {
  var mine = new Mine(position, who);
  this.mines.push(mine);
};

MinesCollection.prototype.removeMine = function(i) {
  var minePosition = this.mines[i].position;
  this.mines[i].finishExplosion();
  this.mines[i].owner.availableMines++;
  this.mines.splice(i, 1);
};
