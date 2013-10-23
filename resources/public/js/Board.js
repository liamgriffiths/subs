function Board(w, h) {
  this.w = w;
  this.h = h;
  this.tiles = [];
  this.generateTiles();
}

// TODO: replace this with a function that uses data from server
Board.prototype.generateTiles = function() {
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

      this.tiles[x][y] = new Tile(type, new Vector(x, y, 1));
    }
  }
  return this.tiles;
};

// add all the tile draw functions to the draw queue along with the position
Board.prototype.draw = function() {
  for(var x = camera.start.x; x < camera.end.x; x++){
    for(var y = camera.start.y; y < camera.end.y; y++){
      if(board.exists(x,y)){
        var tile = this.tiles[x][y];
        camera.addDrawable(tile.draw.bind(tile), tile.position);
      }
    }
  }
};

Board.prototype.update = function() { 
  for(var x = 0; x < this.w; x++){
    for(var y = 0; y < this.h; y++){
      this.tiles[x][y].update();
    }
  }
};

// Check whether tile exists on board
Board.prototype.exists = function(x, y){
  if(this.tiles[x] === undefined) return false;
  if(this.tiles[x][y] === undefined) return false;
  return true;
};

