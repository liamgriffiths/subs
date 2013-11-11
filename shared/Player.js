function Player(settings) {
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

Player.prototype._out = function() {
  return [
    this.position,
    this.power,
    this.isAlive,
    this.availableMines
  ];
};

if (typeof module !== 'undefined') module.exports = Player;

