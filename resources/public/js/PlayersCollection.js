function PlayersCollection() {
  this.players = {};
}

PlayersCollection.prototype.newPlayer = function (name, position) {
  this.players[name] = new Player(name, position);
};

PlayersCollection.prototype.removePlayer = function (name) {
  delete this.players[name];
};

PlayersCollection.prototype.draw = function () {
  for(var player in this.players){
    this.players[player].draw();
  }
};

PlayersCollection.prototype.update = function (options) {
  for(var player in this.players){
    if(this.players[player].name == currentName){
      this.players[player].update(options);
    }else{
      this.players[player].update();
    }
  }
};
