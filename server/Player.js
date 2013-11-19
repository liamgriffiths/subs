var Player = require('../shared/Player');

Player.prototype.onconnect = function() {
  this.isConnected = true;
};

Player.prototype.ondestroy = function () {
};

Player.prototype.ondisconnect = function() {
  console.log('<Player %s> disconnected', this.id);
  this.isConnected = false;
};

Player.prototype.onmessage = function(message, board) {
  console.log('Command recieved from %s: %s', this.id, message);
  if (message == 'mine' && this.isAlive) {
    if(this.availableMines > 0){
      var tileId = board.tile({x: this.position.x, y: this.position.y});
      var tile = entities.find(tileId);
      if (! tile.mine) {
        var mineId = global.entities.create('Mine', {
          position: {x: this.position.x, y: this.position.y},
          countdown: 3000,
          power: this.power,
          explodingTime: 1000,
          owner: this.id
        });
        if (mineId) {
          this.availableMines--;
          this.prevPosition = this.position;
          if (tile) {
            tile.mine = mineId;
          }
        }
      }
    }
  } else {
    if (message == 'left') {
      this.move({x: this.position.x - 1, y: this.position.y}, board);
    } else if (message == 'right') {
      this.move({x: this.position.x + 1, y: this.position.y}, board);
    } else if (message == 'up') {
      this.move({x: this.position.x, y: this.position.y - 1}, board);
    } else if (message == 'down') {
      this.move({x: this.position.x, y: this.position.y + 1}, board);
    }
  }
};

Player.prototype.update = function(now, delta, board) {
  var tileId = board.tile(this.position);
  if (this.isAlive) {
    if (tileId) {
      var tile = entities.find(tileId);
      if (tile) {
        if (tile.isExploding) this.life -= 0.1;
      }
    }
  }
  if (this.life < 0) this.isAlive = false;
};

Player.prototype.canMoveTo = function(position, board) {
  var tileId = board.tile(position);
  if (! tileId) return false;

  var tile = entities.find(tileId);
  if (! tile) return false;

  if (typeof this.isAlive !== 'undefined' && ! this.isAlive) {
    return true;
  }

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
    if(item.type == 'heart') this.life++;
    if(item.type == 'mine') {
      this.availableMines++;
      this.maxMines++;
    }
    entities.remove(itemId);
  }
};

module.exports = Player;
