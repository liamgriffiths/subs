function Board(settings) {
  this.w = settings.w;
  this.h = settings.h;
  this.size = this.w * this.h;
  this.tiles = new Array(this.size);
}

// Check whether tile exists on board
Board.prototype.exists = function(position){
  return !!this.tile(position.x, position.y);
};

// Look up tile for {x,y} coords
Board.prototype.tile = function(position) {
  var tileId = this.tiles[this.w * position.x + position.y];
  return tileId;
};

// Look up {x,y} coords for tile index
Board.prototype.coords = function(index) {
  var y = Math.floor(index / this.w);
  var x = index - (y * this.h);
  return {x: x, y: y};
};

if (typeof module !== 'undefined') module.exports = Board;
