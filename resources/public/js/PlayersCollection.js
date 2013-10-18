function PlayersCollection() {
  this.players = {};
}

PlayersCollection.prototype.newPlayer = function(name, position) {
  this.players[name] = new Player(position);
  return this.players[name];
};

PlayersCollection.prototype.removePlayer = function(name) {
  return delete(this.players[name]);
};

PlayersCollection.prototype.draw = function() {
  for(var player in this.players){
    this.players[player].draw();
  }
};

PlayersCollection.prototype.update = function(options) {
  this.players['liam'].update(options);
};
