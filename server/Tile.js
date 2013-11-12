var Tile = require('../shared/Tile');

// switch(this.type){
//   case 'wall': this.explodable = true; break;
//   case 'hardwall': this.explodable = false; break;
//   case 'water': this.explodable = true; break;
//   case 'explosion': this.explodable = true; break;
//   default: this.explodable = true; break;
// }

Tile.prototype.explode = function() {
  this.exploding = true;
  return this;
};

Tile.prototype.stopExploding = function() {
  this.exploding = false;
  return this;
};

Tile.prototype.update = function(now, delta) {
  if(this.exploding) this.hasMine = false;
};


module.exports = Tile;
