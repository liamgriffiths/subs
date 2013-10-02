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
      }

      this.tiles[x][y] = {
        type: type,   // each tile has a type which defines what you can do here
        contains: []  // each tile can be occupied by players, items, bombs, etc
      };
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
      if(this.tiles[x][y].type == 'wall'){
        context.beginPath();
        context.fillStyle = '#888';
        context.moveTo(x * TILESIZE, y * TILESIZE);
        context.lineTo(x * TILESIZE + TILESIZE, y * TILESIZE);
        context.lineTo(x * TILESIZE + TILESIZE, y * TILESIZE + TILESIZE);
        context.lineTo(x * TILESIZE, y * TILESIZE + TILESIZE);
        context.closePath();
        context.fill();
      }
      if(this.tiles[x][y].type == 'explosion'){
        context.beginPath();
        context.fillStyle = 'red';
        context.moveTo(x * TILESIZE, y * TILESIZE);
        context.lineTo(x * TILESIZE + TILESIZE, y * TILESIZE);
        context.lineTo(x * TILESIZE + TILESIZE, y * TILESIZE + TILESIZE);
        context.lineTo(x * TILESIZE, y * TILESIZE + TILESIZE);
        context.closePath();
        context.fill();
      }
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

Board.prototype.ifExists = function(x, y, fn){
  if(this.exists(x, y)){
    return fn(this.tiles[x][y]);
  }
};

