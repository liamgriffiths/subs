function Mine(position){
  this.position = {};
  this.position.x = position.x;
  this.position.y = position.y;
  this.countdown = 100;
  this.power = 1; // how many adjacent tiles it will affect
  this.live = true;
  this.explodingTime = 50;
  this.exploding = false;
}

Mine.prototype.draw = function () {
  var x = this.position.x * TILESIZE + TILESIZE / 4;
  var y = this.position.y * TILESIZE + TILESIZE / 4;
  var size = TILESIZE * 0.5;
  context.fillStyle = 'red';
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
  for(var x = this.position.x - this.power; x < this.position.x + this.power + 1; x++){
    boardController.board.ifExists(x, this.position.y, function(tile){
      tile.type = 'explosion';
    });
  }
  for(var y = this.position.y - this.power; y < this.position.y + this.power + 1; y++){
    boardController.board.ifExists(this.position.x, y, function(tile){
      tile.type = 'explosion';
    });
  }
};

Mine.prototype.finishExplosion = function () {
  for(var x = this.position.x - this.power; x < this.position.x + this.power + 1; x++){
    boardController.board.ifExists(x, this.position.y, function(tile){
      tile.type = 'water';
    });
  }
  for(var y = this.position.y - this.power; y < this.position.y + this.power + 1; y++){
    boardController.board.ifExists(this.position.x, y, function(tile){
      tile.type = 'water';
    });
  }
};

