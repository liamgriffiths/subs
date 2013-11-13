var Player = require('../shared/Player');

Player.prototype.message = function(message, playerId, board) {
  message = message.trim().toLowerCase();
  if(! message) return;

  if (message == 'mine' && this.isAlive) {
    if(this.availableMines > 0){
      var mineId = global.entities.create('Mine', {
        position: {x: this.position.x, y: this.position.y},
        countdown: 3000,
        power: this.power,
        explodingTime: 1000,
        owner: playerId
      });
      if (mineId) {
        this.availableMines--;
        var tileId = board.tile({x: this.position.x, y: this.position.y});
        var tile = entities.find(tileId);
        if (tile) {
          tile.mine = mineId;
        }
      }
    }
  } else {
    var dist = this.speed / Player.maxSpeed;
    if (message == 'left') {
      this.move({x: this.position.x - dist, y: this.position.y}, board);
    } else if (message == 'right') {
      this.move({x: this.position.x + dist, y: this.position.y}, board);
    } else if (message == 'up') {
      this.move({x: this.position.x, y: this.position.y - dist}, board);
    } else if (message == 'down') {
      this.move({x: this.position.x, y: this.position.y + dist}, board);
    }
  }
};

Player.prototype.update = function(now, delta, board) {
  var tileId = board.tile(this.position);
  if (tileId) {
    var tile = entities.find(tileId);
    if (tile) {
      if (tile.isExploding) this.life -= 0.1;
    }
  }
  if (this.life < 1) this.isAlive = false;
};

Player.prototype.canMoveTo = function(position, board) {

  if (this.position) {
    // if moving from another tile, round one way or the other
    position = {
      x: position.x < this.position.x ? Math.floor(position.x) : Math.ceil(position.x),
      y: position.y < this.position.y ? Math.floor(position.y) : Math.ceil(position.y)
    };
  }

  var tileId = board.tile(position);
  if (! tileId) return false;

  var tile = entities.find(tileId);
  if (! tile) return false;

  if (! this.isAlive) return true;

  if (tile.type == 'wall' || tile.type == 'hardwall' || tile.mine) {
    return false;
  }
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
    if(item.type == 'mine') this.availableMines++;
    entities.remove(itemId);
  }
};

module.exports = Player;
