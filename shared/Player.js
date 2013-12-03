function Player(settings) {
  this.id = settings.id;
  this.position = settings.position;
  this.prevPosition = settings.prevPosition || settings.position;
  this.power = settings.power || 2;
  this.isAlive = settings.isAlive;
  this.availableMines = settings.availableMines || 1;
  this.maxMines = settings.maxMines || 1;
  this.createdAt = settings.createdAt || new Date().getTime();
  this.life = settings.life || 1;
  this.isConnected = settings.isConnected;
  this.name = settings.name || "yolo";
}

Player.prototype.set = function(settings) {
  this.constructor(settings);
};

Player.prototype.canMoveTo = function(position, board) {
  // ghosts can walk through walls
  if (typeof this.isAlive !== 'undefined' && ! this.isAlive) return true;

  var tileId = board.tile(position);
  if (! tileId) return false;

  var tile = entities.find(tileId);
  if (! tile) return false;

  // live players cannot walk through walls :-P
  if (tile.type == 'wall' || tile.type == 'hardwall' || tile.mine) {
    return false;
  }

  // TODO: check positions of ghosts, if there is one in the tile, then ret false

  return true;
};

Player.prototype.move = function(position, board){
  if (this.canMoveTo(position, board)) {
    // move to new position
    this.prevPosition = this.position;
    this.position = position;

    if (this.isAlive) {
      // collect items at tile location
      var tileId = board.tile(this.position);
      var tile = entities.find(tileId);
      if (tile) {
        while (tile.items.length) {
          var itemId = tile.items.shift();
          this.addItem(itemId);
        }
      }
    }
    return true;
  }
  return false;
};

Player.prototype.addItem = function(itemId) {
  var item = entities.find(itemId);
  if (item) {
    console.log("Adding <Item %s> to <Player %s>", itemId, this.id);
    if(item.type == 'fire') this.power++;
    if(item.type == 'heart') this.life++;
    if(item.type == 'mine') {
      this.availableMines++;
      this.maxMines++;
    }
    entities.remove(itemId);
  }
};

Player.prototype._out = function() {
  return [
    this.position.x,
    this.position.y,
    this.power,
    this.isAlive,
    this.availableMines,
    this.createdAt,
    this.id,
    this.life,
    this.prevPosition.x,
    this.prevPosition.y,
    this.maxMines,
    this.name
  ];
};

Player.prototype._in = function(data) {
  return {
    position: {x: data[0], y: data[1]},
    power: data[2],
    isAlive: data[3],
    availableMines: data[4],
    createdAt: data[5],
    id: data[6],
    life: data[7],
    prevPosition: {x: data[8], y: data[9]},
    maxMines: data[10],
    name: data[11]
  };
};


if (typeof module !== 'undefined') module.exports = Player;

