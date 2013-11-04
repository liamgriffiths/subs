var MinesCollection = function() {
  this.mines = {};
};

MinesCollection.prototype.addMine = function(settings) {
  if(('id' in settings) && !(settings.id in this.players)){
    this.mines[settings.id] = new Mine(settings);
    return this.mines[settings.id];
  }
};

MinesCollection.prototype.removeMine = function(id) {
  return delete(this.mines[id]);
  // var minePosition = this.mines[i].position;
  // this.mines[i].finishExplosion();
  // this.mines[i].owner.availableMines++;
  // this.mines.splice(i, 1);
};
