function PlayersCollection() {
  this.players = {};
}

PlayersCollection.prototype.newPlayer = function(name, position) {
  // this.players[name] = new Player(position);
  this.players[name] = {isAlive: true,
                        position: position,
                        power: 2,
                        availableMines: 1};
  return this.players[name];
};

PlayersCollection.prototype.removePlayer = function(name) {
  return delete(this.players[name]);
};

PlayersCollection.prototype.update = function(options) {
  this.players['liam'].update(options);
};


module.exports = PlayersCollection;
