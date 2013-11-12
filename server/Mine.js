var Mine = require('../shared/Mine');

Mine.prototype.update = function(now, delta, board) {
  if (this.live) {
    if ((now - this.createdAt) > this.countdown) {
      this.live = false;
      this.explode(board);
      this.isExploding = true;
    }
  } else if (this.isExploding) {
    if ((now - (this.createdAt + this.countdown)) > this.explodingTime) {
      // this.finishExplosion();
      this.isExploding = false;
    }
  }
};

Mine.prototype.explode = function(board) {
  this.explodeTo(this.position.x + this.power, this.position.y, board);
  this.explodeTo(this.position.x - this.power, this.position.y, board);
  this.explodeTo(this.position.x, this.position.y + this.power, board);
  this.explodeTo(this.position.x, this.position.y - this.power, board);
};

Mine.prototype.finishExplosion = function() {
  this.finishExplosionTo(this.position.x + this.power, this.position.y);
  this.finishExplosionTo(this.position.x - this.power, this.position.y);
  this.finishExplosionTo(this.position.x, this.position.y + this.power);
  this.finishExplosionTo(this.position.x, this.position.y - this.power);
};


Mine.prototype.explodeTo = function(toX, toY, board) {
  if(toX > board.w) toX = board.w;
  if(toX < 0) toX = 0;
  if(toY > board.h) toY = board.h;
  if(toY < 0) toY = 0;

  // explode horizontally
  if(this.position.x < toX){
    for(x = this.position.x; x < toX; x++){
      var tileId = board.tile({x: x, y: toY});
      console.log('explode! %s', tileId);
      if(! this.explodeTile(tileId)){ return; }
    }
  }else{
    for(x = this.position.x; x > toX; x--){
      var tileId = board.tile({x: x, y: toY});
      console.log('explode! %s', tileId);
      if(! this.explodeTile(tileId)){ return; }
    }
  }

  // explode vertically
  if(this.position.y < toY){
    for(y = this.position.y; y < toY; y++){
      var tileId = board.tile({x: toX, y: y});
      console.log('explode! %s', tileId);
      if(! this.explodeTile(tileId)){ return; }
    }
  }else{
    for(y = this.position.y; y > toY; y--){
      var tileId = board.tile({x: toX, y: y});
      console.log('explode! %s', tileId);
      if(! this.explodeTile(tileId)){ return; }
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

Mine.prototype.explodeTile = function(tileId) {
  var tile = global.entities.find(tileId);
  if (! tile || ! tile.isExplodable) return false;
  tile.isExploding = true;
  // console.log(tile);
  return true;
};

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

module.exports = Mine;
