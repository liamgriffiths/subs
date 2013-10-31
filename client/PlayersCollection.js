function PlayersCollection() {
  this.players = {};
}

PlayersCollection.prototype.removePlayer = function(name) {
  return delete(this.players[name]);
};

PlayersCollection.prototype.draw = function() {
  for(var name in this.players){
    var player = this.players[name];
    camera.addDrawable(player.draw.bind(player), player.position);
  }
};

PlayersCollection.prototype.update = function(players) {
  for(var name in players){
    if(this.players.hasOwnProperty(name)) {
      this.players[name].update(players[name]);
    }else{
      this.players[name] = new Player(players[name]);
    }
  }
};

