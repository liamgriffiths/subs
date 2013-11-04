function Board(settings) {
  this.w = settings.w;
  this.h = settings.h;
  this.tiles = settings.tiles || [];
}

// Check whether tile exists on board
Board.prototype.exists = function(x, y){
  if(this.tiles[x] === undefined) return false;
  if(this.tiles[x][y] === undefined) return false;
  return true;
};


module.exports = Board;
