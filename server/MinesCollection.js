var Mine = require('./Mine');

var MinesCollection = function() {
  this.mines = [];
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

module.exports = MinesCollection;
