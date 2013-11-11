var Player = require('../shared/Player');

Player.prototype.connect = function() {
  this.ws.sendJSON({hi: "hello"});
  console.log('player connected');
};

Player.prototype.disconnect = function() {
  console.log('player disconnected');
};

Player.prototype.message = function(message) {
  message = message.trim().toLowerCase();
  if(! message) return;
  console.log('Message recieved from %s: %s', this.id, message);

  if (message == 'mine') {
    if(this.availableMines > 0){
      mines.push(new Mine({
        position: this.position,
        countdown: 3000,
        power: this.power,
        explodingTime: 1000,
        owner: this
      }));
      this.availableMines--;
    }
  } else if (message == 'left') {
    this.move({x: this.position.x - 1, y: this.position.y});
  } else if (message == 'right') {
    this.move({x: this.position.x + 1, y: this.position.y});
  } else if (message == 'up') {
    this.move({x: this.position.x, y: this.position.y - 1});
  } else if (message == 'down') {
    this.move({x: this.position.x, y: this.position.y + 1});
  }
};

Player.prototype.update = function(options) {

};

Player.prototype.canMoveTo = function(position, board) {
  var tileId = board.tile(position);
  var tile = entities.find(tileId);
  if (!tile.object || tile.type == 'wall' || tile.type == 'hardwall' || tile.hasMine) {
    return false;
  }
  return true;
};

Player.prototype.move = function(position){
  if (this.canMoveTo(position)) {
    // move to new position
    this.position = position;
    // collect items at tile location
    // var items = board.tile(this.position).items;
    // while (items) {
    //   this.addItem(items.shift());
    // }
    return true;
  }
  return false;
};

Player.prototype.addItem = function(item) {
  if(item.type == 'fire') this.power++;
  if(item.type == 'mine') this.availableMines++;
};

module.exports = Player;
