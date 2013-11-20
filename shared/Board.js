function Board(settings) {
  this.w = settings.w;
  this.h = settings.h;
  this.size = this.w * this.h;
  this.tiles = new Array(this.size);
}

Board.prototype.set = function(settings) {
  this.constructor(settings);
};

Board.prototype._out = function() {
  return [
    this.w,
    this.h,
    this.size,
    this.tiles
  ];
};

Board.prototype._in = function(data) {
  return {
    w: data[0],
    h: data[1],
    size: data[2],
    tiles: data[3]
  };
};

// Check whether tile exists on board
Board.prototype.exists = function(position){
  return !!this.tile(position.x, position.y);
};

// Look up tile for {x,y} coords
Board.prototype.tile = function(position) {
  if (position.x >= 0 && position.x < this.w &&
      position.y >= 0 && position.y < this.h){

      // position = {x: Math.ceil(position.x), y: Math.ceil(position.y)};
      var tileId = this.tiles[this.w * position.x + position.y];
      return tileId;
  } else {
    return undefined;
  }
};

// Look up {x,y} coords for tile index
Board.prototype.coords = function(index) {
  var x = Math.floor(index / this.w);
  var y = index - (x * this.h);
  return {x: x, y: y};
};

if (typeof module !== 'undefined') module.exports = Board;
