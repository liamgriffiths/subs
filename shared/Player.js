function Player(settings) {
  this.id = settings.id;
  this.position = settings.position;
  this.power = settings.power;
  this.isAlive = settings.isAlive;
  this.availableMines = settings.availableMines;

  // web socket hooks
  this.ws = settings.ws || undefined;
  if(this.ws) {
    this.connect.bind(this)();
    this.ws.on('close', this.disconnect.bind(this));
    this.ws.on('message', this.message.bind(this));
  }
}

Player.prototype.toJSON = function() {
  return {
    id: this.id,
    position: this.position,
    power: this.power,
    isAlive: this.isAlive,
    availableMines: this.availableMines
  };
};


module.exports = Player;

