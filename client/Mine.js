// function Mine(position, owner, tile){
//   this.position = new Vector(position.x, position.y, position.z);
//   this.position.z = position.z || 1;
//   this.countdown = owner.countdown || 100;
//   this.power = owner.power || 2; // how many adjacent tiles it will affect
//   this.live = true;
//   this.explodingTime = owner.explodingTime || 50;
//   this.exploding = false;
//   this.animationDelta = 0;
//   this.owner = owner;
//   board.tiles[position.x][position.y].hasMine = true;
// 
//   this.sprite = this.makeSprite();
// }

function Mine(mine){
  this.position = mine.position;
  this.countdown = mine.countdown;
  this.power = mine.power;
  this.live = mine.live;
  this.explodingTime = mine.explodingTime;
  this.exploding = mine.exploding;
  this.animationDelta = 0;
  this.owner = mine.owner;
  board.tiles[this.position.x][this.position.y].hasMine = true;
  this.sprite = this.makeSprite();
}

Mine.prototype.makeSprite = function() {
  var sprite = new Sprite(5, this.position,100);
  var c1 = Color.CLEAR();
  var c2 = Color.RED();
  var c3 = Color.DPURPLE();
  var c4 = Color.YELLOW();
  var c5 = Color.ORANGE();

  var f1 = [[c3, c3, c3, c3, c3],
            [c3, c2, c2, c2, c3],
            [c3, c5, c5, c5, c3],
            [c3, c4, c4, c4, c3],
            [c3, c3, c3, c3, c3]];
  var f2 = [[c4, c4, c4, c4, c4],
            [c4, c3, c3, c3, c4],
            [c4, c2, c2, c2, c4],
            [c4, c5, c5, c5, c4],
            [c4, c4, c4, c4, c4]];
  var f3 = [[c5, c5, c5, c5, c5],
            [c5, c4, c4, c4, c5],
            [c5, c3, c3, c3, c5],
            [c5, c2, c2, c2, c5],
            [c5, c5, c5, c5, c5]];
  var f4 = [[c2, c2, c2, c2, c2],
            [c2, c5, c5, c5, c2],
            [c2, c4, c4, c4, c2],
            [c2, c3, c3, c3, c2],
            [c2, c2, c2, c2, c2]];
  sprite.frames = [f1,f2,f3,f4];
  return sprite;
};

Mine.prototype.draw = function() {
  return this.sprite.draw();
};

Mine.prototype.update = function() {

  if(this.live){
    if(this.animationDelta > 2000){
      this.animationDelta = 0;
      this.live = false;
      this.exploding = true;
    }else{
       this.animationDelta += delta;
    }
  }else{
    if(this.exploding){
      if(this.animationDelta > 1000){
        this.animationDelta = 0;
        this.exploding = false;
      }else{
        this.animationDelta += delta;
      }
    }
  }

  if(board.tiles[this.position.x][this.position.y].exploding){
    this.countdown = 0;
  }
  this.sprite.update();
};

Mine.prototype.explode = function() {
  this.explodeTo(this.position.x + this.power, this.position.y);
  this.explodeTo(this.position.x - this.power, this.position.y);
  this.explodeTo(this.position.x, this.position.y + this.power);
  this.explodeTo(this.position.x, this.position.y - this.power);
};

Mine.prototype.finishExplosion = function() {
  this.finishExplosionTo(this.position.x + this.power, this.position.y);
  this.finishExplosionTo(this.position.x - this.power, this.position.y);
  this.finishExplosionTo(this.position.x, this.position.y + this.power);
  this.finishExplosionTo(this.position.x, this.position.y - this.power);
};


Mine.prototype.explodeTo = function(toX, toY) {
  if(toX > board.w) toX = board.w;
  if(toX < 0) toX = 0;
  if(toY > board.h) toY = board.h;
  if(toY < 0) toY = 0;

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

Mine.prototype.finishExplosionTo = function(toX, toY) {
  if(toX > board.w) toX = board.w;
  if(toX < 0) toX = 0;
  if(toY > board.h) toY = board.h;
  if(toY < 0) toY = 0;

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
      tile.explode();
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
      tile.stopExploding();
      if(tile.explodable){
        tile.type = 'water';
      }
    }
  }
}
