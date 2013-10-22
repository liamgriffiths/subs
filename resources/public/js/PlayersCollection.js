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
  for(var name in this.players){
    var player = this.players[name];
    camera.addDrawable(player.draw.bind(player), player.position);
  }
};

PlayersCollection.prototype.update = function(options) {
  this.players['liam'].update(options);
};
