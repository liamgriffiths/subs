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

Board.prototype.draw = function() {
  // draw all tiles
  // TODO: move this logic into something else, maybe a Camera obj?
  // var distToYEdge = Math.ceil((canvas.height / TILESIZE) / 2);
  // var distToXEdge = Math.ceil((canvas.width / TILESIZE) / 2);

  // // origin of current canvas view (in tiles not pixels)
  // var start = new Vector(currentPlayer.position.x, currentPlayer.position.y);
  // start.x = start.x - distToXEdge - 1;
  // start.y = start.y - distToYEdge - 1;
  // var end = new Vector(start.x + 2 * distToXEdge + 1, start.y + 2 * distToYEdge + 1);

  for(var x = 0; x < this.w; x++){
    for(var y = 0; y < this.h; y++){
      // if(x > start.x && x < end.x && y > start.y && y < end.y) {
      //   this.tiles[x][y].draw();
      // }
      var tile = this.tiles[x][y];
      camera.addDrawable(tile.draw.bind(tile), tile.position);

    }
  }
};

Board.prototype.update = function(options) {
  this.handleZoom(options.keys);
};

// Check whether tile exists on board
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

Board.prototype.handleZoom = function(keys) {
  for(var i = 0; i < keys.length; i++){
    if(keys[i] == 'zoomin') TILESIZE += 1;
    if(keys[i] == 'zoomout') TILESIZE -= 1;
  }
};


