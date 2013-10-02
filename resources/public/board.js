function Board(w, h, tileSize) {
  this.w = w;
  this.h = h;
  this.tileSize = tileSize;
  this.pixelsW = this.w * this.tileSize;
  this.pixelsH = this.h * this.tileSize;

  this.tiles = [];

  // build up an array of arrays that hold a hash
  for(var x = 0; x < this.w; x++){
    this.tiles[x]= [];
    for(var y = 0; y < this.h; y++){

      var rand = Math.floor(Math.random() * 10);
      var type = 'water';
      if(rand > 7){
        type = 'wall';
      // }else if(rand < 2){
      //   type = 'hardwall';
      }

      this.tiles[x][y] = new Tile(type, {x: x, y: y});
    }
  }

}

Board.prototype.draw = function () {
  this.drawGrid();
  this.drawTiles();
};

Board.prototype.update = function () {
};

Board.prototype.drawGrid = function () {
  // "pencil" methods (does not leave the ink, just moves the pen)
  for (var x = 0.5; x < this.pixelsW; x += TILESIZE) {
    context.moveTo(x, 0);
    context.lineTo(x, this.pixelsH);
  }

  for (var y = 0.5; y < this.pixelsH; y += TILESIZE) {
    context.moveTo(0, y);
    context.lineTo(this.pixelsW, y);
  }

  // // "ink" methods (leaves the ink where where moved the pencil around)
  context.strokeStyle = "#eee";
  context.stroke();
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

