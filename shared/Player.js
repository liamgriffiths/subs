function Player(settings) {
  this.position = settings.position;
  this.power = settings.power;
  this.isAlive = settings.isAlive;
  this.availableMines = settings.availableMines;

  // web socket hooks
  if (settings.ws) {
    this.ws = settings.ws;
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

Player.prototype._in = function(data) {
  return {
    position: data[0],
    power: data[1],
    isAlive: data[2],
    availableMines: data[3]
  };
};


if (typeof module !== 'undefined') module.exports = Player;

