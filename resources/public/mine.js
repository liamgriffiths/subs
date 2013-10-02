function Mine(position){
  this.position = {};
  this.position.x = position.x;
  this.position.y = position.y;
  this.countdown = 100;
  this.power = 4; // how many adjacent tiles it will affect
  this.live = true;
  this.explodingTime = 50;
  this.exploding = false;
}

Mine.prototype.draw = function () {
  var x = this.position.x * TILESIZE + TILESIZE / 4;
  var y = this.position.y * TILESIZE + TILESIZE / 4;
  var size = TILESIZE * 0.5;
  context.fillStyle = '#000';
  context.fillRect(x, y, size, size);
};

Mine.prototype.update = function () {
  if(this.countdown > 0){
    this.countdown -= 1;
  }else{
    this.live = false;
    this.exploding = true;
  }

  if(this.exploding){
    if(this.explodingTime > 0){
      this.explodingTime -= 1;
    }else{
      this.exploding = false;
    }
  }
};

Mine.prototype.explode = function () {
  this.explodeTo(this.position.x + this.power, this.position.y);
  this.explodeTo(this.position.x - this.power, this.position.y);
  this.explodeTo(this.position.x, this.position.y + this.power);
  this.explodeTo(this.position.x, this.position.y - this.power);
};

Mine.prototype.finishExplosion = function () {
  this.finishExplosionTo(this.position.x + this.power, this.position.y);
  this.finishExplosionTo(this.position.x - this.power, this.position.y);
  this.finishExplosionTo(this.position.x, this.position.y + this.power);
  this.finishExplosionTo(this.position.x, this.position.y - this.power);
};


Mine.prototype.explodeTo = function (toX, toY) {
  var x1 = this.position.x;
  var x2 = toX;
  var y1 = this.position.y;
  var y2 = toY;

  for(var x = x1; x < x2; x + (x1 > x2 ? -1 : 1)){
    for(var y = y1; y < y2; y + (y1 > y2 ? -1 : 1)){
      if(boardController.board.exists(x, y)){
        tile = boardController.board.tiles[x][y];
        tile.exploding = true;
        if(tile.type != 'water'){ return; }
      }else{
        return;
      }
    }
  }
};

Mine.prototype.finishExplosionTo = function (toX, toY) {
  var x1 = toX < this.position.x ? toX : this.position.x;
  var x2 = (toX > this.position.x ? toX : this.position.x) + 1;
  var y1 = toY < this.position.y ? toY : this.position.y;
  var y2 = (toY > this.position.y ? toY : this.position.y) + 1;

  for(var x = x1; x < x2; x++){
    for(var y = y1; y < y2; y++){
      if(boardController.board.exists(x, y)){
        tile = boardController.board.tiles[x][y];
        if(tile.exploding){
          tile.exploding = false;
          if(tile.explodable){
            tile.type = 'water';
          }
        }
      }
    }
  }
};
