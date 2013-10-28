// function Board(w, h) {
//   this.w = w;
//   this.h = h;
//   this.tiles = [];
//   this.generateTiles();
// }

function Board(board) {
  this.w = board.length;
  this.h = board[0].length;
  this.tiles = new Array(this.w);

  for(var x = 0; x < this.w; x++){
    this.tiles[x] = [];
    for(var y = 0; y < this.h; y++){
      var btile = board[x][y];
      this.tiles[x][y] = new Tile(btile.type, new Vector(x, y, 1));
      for(var i = 0; i < btile.items.length; i++){
        var newItem = new Item(btile.items[i].type, new Vector(x, y, 1));
        this.tiles[x][y].items.push(newItem);
      }
    }
  }
}

// add all the tile draw functions to the draw queue along with the position
Board.prototype.draw = function() {
  for(var x = camera.start.x; x < camera.end.x; x++){
    for(var y = camera.start.y; y < camera.end.y; y++){
      if(this.exists(x,y)){
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

