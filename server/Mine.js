var Mine = require('../shared/Mine');

Mine.prototype.update = function(now, delta, board) {
  if (! this.isExploding) {
    if (this.countdown < 0) {
      this.explode(board);
    } else {
      this.countdown -= delta;
    }
  } else {
    if (this.explodingTime < 0) {
      this.finishExplosion(board);
    } else {
      this.explodingTime -= delta;
    }
  }
};

Mine.prototype.explode = function(board) {
  this.isExploding = true;
  this.explodeTo(this.position.x + this.power, this.position.y, board);
  this.explodeTo(this.position.x - this.power, this.position.y, board);
  this.explodeTo(this.position.x, this.position.y + this.power, board);
  this.explodeTo(this.position.x, this.position.y - this.power, board);
};

Mine.prototype.finishExplosion = function(board) {
  this.isExploding = false;

  // give player back mine
  var player = entities.find(this.owner);
  player.availableMines++;
  player.prevPosition = player.position;

  // mark for deletion
  entities.remove(this.id);

  // remove this mine from tile
  var tileId = board.tile(this.position);
  var tile = entities.find(tileId);
  tile.mine = undefined;
};


Mine.prototype.explodeTo = function(toX, toY, board) {
  if(toX > board.w) toX = board.w;
  if(toY > board.h) toY = board.h;

  var tileId = board.tile({x: this.position.x, y: this.position.y});
  if (! tileId) return;
  if (! this.explodeTile(tileId)) return;

  // explode horizontally
  if(this.position.x < toX){
    for(x = this.position.x; x < toX; x++){
      tileId = board.tile({x: x, y: toY});
      if (! tileId) return;
      if (! this.explodeTile(tileId)) return;
    }
  }else{
    for(x = this.position.x; x > toX; x--){
      tileId = board.tile({x: x, y: toY});
      if (! tileId) return;
      if (! this.explodeTile(tileId)) return;
    }
  }

  // explode vertically
  if(this.position.y < toY){
    for(y = this.position.y; y < toY; y++){
      tileId = board.tile({x: toX, y: y});
      if (! tileId) return;
      if (! this.explodeTile(tileId)) return;
    }
  }else{
    for(y = this.position.y; y > toY; y--){
      tileId = board.tile({x: toX, y: y});
      if (! tileId) return;
      if (! this.explodeTile(tileId)) return;
    }
  }
};

Mine.prototype.explodeTile = function(tileId) {
  var tile = global.entities.find(tileId);
  if (tile && tile.isExplodable){
    tile.explodingTime = this.explodingTime;
    return tile.type === 'water';
  }
  return false;
};

module.exports = Mine;
