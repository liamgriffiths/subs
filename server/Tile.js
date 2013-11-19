var Tile = require('../shared/Tile');

Tile.prototype.update = function(now, delta) {
  if(this.explodingTime > 0) {
    this.isExploding = true;
    this.explodingTime -= delta;

    if (this.mine) {
      // mines can explode other mines
      var mine = entities.find(this.mine);
      if (! mine.isExploding) {
        mine.countdown = -1;
      }
    }

    if (this.explodingTime <= 0 && this.isExplodable) this.type = 'water';

  } else {
    this.isExploding = false;
  }
};

module.exports = Tile;
