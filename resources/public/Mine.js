function Mine(position){
  this.position = {};
  this.position.x = position.x;
  this.position.y = position.y;
  this.position.z = position.z || 2;
  this.countdown = 100;
  this.power = 10; // how many adjacent tiles it will affect
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

  if(board.tiles[this.position.x][this.position.y].exploding){
    this.countdown = 0;
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
  // explode horizontally
  if(this.position.x < toX){
    for(x = this.position.x; x < toX; x++){
      if(! explodeTile(x, toY)){ return; }
    }
  }else{
    for(x = this.position.x; x > toX; x--){
      if(! explodeTile(x, toY)){ return; }
    }
  }

  // explode vertically
  if(this.position.y < toY){
    for(y = this.position.y; y < toY; y++){
      if(! explodeTile(toX, y)){ return; }
    }
  }else{
    for(y = this.position.y; y > toY; y--){
      if(! explodeTile(toX, y)){ return; }
    }
  }
};

Mine.prototype.finishExplosionTo = function (toX, toY) {
  if(this.position.x < toX){
    for(x = this.position.x; x < toX; x++){
      stopExplodingTile(x, toY);
    }
  }else{
    for(x = this.position.x; x > toX; x--){
      stopExplodingTile(x, toY);
    }
  }

  if(this.position.y < toY){
    for(y = this.position.y; y < toY; y++){
      stopExplodingTile(toX, y);
    }
  }else{
    for(y = this.position.y; y > toY; y--){
      stopExplodingTile(toX, y);
    }
  }
};

function explodeTile(x, y){
  if(board.exists(x, y)){
    tile = board.tiles[x][y];
    if(tile.explodable){
      tile.exploding = true;
      if(tile.type != 'water'){ return false; }
      return true;
    }else{
      return false;
    }
  }
}

function stopExplodingTile(x,y) {
  if(board.exists(x, y)){
    tile = board.tiles[x][y];
    if(tile.exploding){
      tile.exploding = false;
      if(tile.explodable){
        tile.type = 'water';
      }
    }
  }
}
