var Board = require('../shared/Board');

// Create a new board w/ Tiles
Board.prototype.reticulateSplines = function() {
  for (var i = 0; i < this.size; i++) {
    var type = 'water';
    var rand = Math.floor(Math.random() * 10);
    if (rand > 7) type = 'wall';
    if (rand < 2) type = 'hardwall';
    var tileId = entities.create('Tile', {
      type: type,
      position: this.coords(i),
      isExplodable: type == 'hardwall' ? false : true
    });
    this.tiles[i] = tileId;

    if(type == 'wall'){
      var hasItem = Math.floor(Math.random() * 10) < 2;
      if(hasItem){
        var itemTypes = ['fire','mine'];
        var whatItem = itemTypes[Math.floor(Math.random() * itemTypes.length)];
        var itemId = entities.create('Item', {
          type: whatItem,
          position: this.coords(i)
        });
        entities.find(tileId).items.push(itemId);
      }
    }
  }

  // check we have a playable board
  if (this.spawnPosition()) {
    return this;
  } else {
    return this.reticulateSplines();
  }
};

// Update all the tiles on the board
Board.prototype.update = function() {
  for (var i = 0; i < this.size; i++) {
    this.tiles[i].update();
  }
};

// Look up a good location to spawn a new player, a position where the player
// can move around to at least 2 other adjacent tiles
Board.prototype.spawnPosition = function() {
  var index = Math.floor(Math.random() * this.size);
  var attempts = 0;
  while (attempts < this.size) {
    attempts++;
    index = index > this.size ? 0 : index + 1;
    var pos = this.coords(index);

    if (Player.prototype.canMoveTo(pos, this)) {
      var cnt = 0;
      if (Player.prototype.canMoveTo({x: pos.x + 1, y: pos.y}, this)) cnt++;
      if (Player.prototype.canMoveTo({x: pos.x + 1, y: pos.y}, this)) cnt++;
      if (Player.prototype.canMoveTo({x: pos.x, y: pos.y + 1}, this)) cnt++;
      if (Player.prototype.canMoveTo({x: pos.x, y: pos.y - 1}, this)) cnt++;
      if (cnt > 1) {
        return pos; // found a good position
      }
    }
  }
  // bad board, no suitable spawn positions
  return undefined;
};

module.exports = Board;
