function Board(w, h) {
  this.w = w;
  this.h = h;
  this.tiles = [];
  this.generateTiles();
}

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
      // var tile = new Tile(type, new Vector(x, y, 1));
      var tile = {items: [], type: type};
      this.tiles[x][y] = tile;

      if(type == 'wall'){
        var hasItem = Math.floor(Math.random() * 10) < 2;
        if(hasItem){
          var itemTypes = ['fire','mine'];
          var whatItem = itemTypes[Math.floor(Math.random() * itemTypes.length)];
          // var newItem = new Item(whatItem, new Vector(x, y, 1));
          var newItem = {type: whatItem};
          this.tiles[x][y].items.push(newItem);
        }
      }
    }
  }
  return this.tiles;
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


module.exports = Board;
