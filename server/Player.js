var Player = require('../shared/Player');

Player.prototype.onconnect = function() {
  console.log('<Player %s> connected', this.id);
  this.isConnected = true;
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
    if (message === 'left') {
      this.move({x: this.position.x - 1, y: this.position.y}, board);
    } else if (message === 'right') {
      this.move({x: this.position.x + 1, y: this.position.y}, board);
    } else if (message === 'up') {
      this.move({x: this.position.x, y: this.position.y - 1}, board);
    } else if (message === 'down') {
      this.move({x: this.position.x, y: this.position.y + 1}, board);
    }
  }
};

Player.prototype.reset = function(board) {
  this.position = board.spawnPosition();
  this.prevPosition = this.position;
  this.power = undefined;
  this.isAlive = true;
  this.availableMines = 1;
  this.maxMines = 1;
  this.life = 1;
};

Player.prototype.update = function(now, delta, board) {
  var tileId = board.tile(this.position);
  if (this.isAlive) {
    if (tileId) {
      var tile = entities.find(tileId);
      if (tile) {
        if (tile.isExploding) this.life = 0;
      }
    }
  }
  if (this.life <= 0) this.isAlive = false;
};


module.exports = Player;
