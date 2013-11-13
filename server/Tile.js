var Tile = require('../shared/Tile');

Tile.prototype.update = function(now, delta) {
  if(this.isExploding) {
    if (this.mine) {
      // mines can explode other mines
      var mine = entities.find(this.mine);
      if (! mine.isExploding) {
        console.log(mine);
        mine.countdown = 0;
      }
    }
  }
};

module.exports = Tile;
