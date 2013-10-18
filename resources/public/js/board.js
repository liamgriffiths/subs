function Board(w, h) {
  this.w = w;
  this.h = h;
  this.tiles = [];

  // build up an array of arrays that hold a hash
  for(var x = 0; x < this.w; x++){
    this.tiles[x]= [];
    for(var y = 0; y < this.h; y++){

      var rand = Math.floor(Math.random() * 10);
      var type = 'water';
      if(rand > 7){
        type = 'wall';
      }else if(rand < 2){
        type = 'hardwall';
      }

      this.tiles[x][y] = new Tile(type, new Vector(x, y));
    }
  }

}

Board.prototype.draw = function () {
  this.drawTiles();
};

Board.prototype.update = function (options) {
  this.handleZoom(options.keys);
};

Board.prototype.drawTiles = function () {
  for(var x = 0; x < this.w; x++){
    for(var y = 0; y < this.h; y++){
      this.tiles[x][y].draw();
    }
  }
};

Board.prototype.exists = function(x, y){
  if(typeof(this.tiles) != 'undefined'){
    if(typeof(this.tiles[x]) != 'undefined'){
      if(typeof(this.tiles[x][y]) != 'undefined'){
        return true;
      }
    }
  }
  return false;
};

Board.prototype.handleZoom = function (keys) {
  for(var i = 0; i < keys.length; i++){
    if(keys[i] == 'zoomin') TILESIZE += 1;
    if(keys[i] == 'zoomout') TILESIZE -= 1;
  }
};


