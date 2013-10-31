var Utils = require('./Utils');
var Explodable = require('./Explodable');

function Tile(type, position) {
  this.position = position;
  this.type = type;
  this.explodable = false;
  this.items = [];
  this.hasMine = false;

  switch(this.type){
    case 'wall': this.explodable = true; break;
    case 'hardwall': this.explodable = false; break;
    case 'water': this.explodable = true; break;
    case 'explosion': this.explodable = true; break;
    default: this.explodable = true; break;
  }

}

Tile.prototype.explode = function() {
  this.exploding = true;
  return this;
};

Tile.prototype.stopExploding = function() {
  this.exploding = false;
  return this;
};

Tile.prototype.update = function() {
  var len = this.items.length;
  for(var i = 0; i < len; i++){
    this.items[i].update();
  }
  if(this.exploding) this.hasMine = false;
};


module.exports = Tile;
