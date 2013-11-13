function Player(settings) {
  this.id = settings.id;
  this.position = settings.position;
  this.power = settings.power;
  this.isAlive = settings.isAlive;
  this.availableMines = settings.availableMines;
  this.createdAt = settings.createdAt || new Date().getTime();
}

Player.prototype.set = function(settings) {
  this.constructor(settings);
};

Player.prototype._out = function() {
  return [
    this.position,
    this.power,
    this.isAlive,
    this.availableMines,
    this.createdAt,
    this.id
  ];
};

Player.prototype._in = function(data) {
  return {
    position: data[0],
    power: data[1],
    isAlive: data[2],
    availableMines: data[3],
    createdAt: data[4],
    id: data[5]
  };
};


if (typeof module !== 'undefined') module.exports = Player;

