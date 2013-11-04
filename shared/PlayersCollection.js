function PlayersCollection() {
  this.players = {};
}

PlayersCollection.prototype.addPlayer = function(settings) {
  if(('id' in settings) && !(settings.id in this.players)){
    this.players[settings.id] = new Player(settings);
    return this.players[settings.id];
  }
};

PlayersCollection.prototype.removePlayer = function(id) {
  return delete(this.players[id]);
};

