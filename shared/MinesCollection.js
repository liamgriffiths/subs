var MinesCollection = function() {
  this.mines = {};
};

MinesCollection.prototype.addMine = function(settings) {
  this.mines[settings.id] = new Mine(settings);
  return this.mines[settings.id];
};

MinesCollection.prototype.removeMine = function(id) {
  return delete(this.mines[id]);
};

module.exports = MinesCollection;
