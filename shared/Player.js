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
    this.position.x,
    this.position.y,
    this.power,
    this.isAlive,
    this.availableMines,
    this.createdAt,
    this.id
  ];
};

Player.prototype._in = function(data) {
  return {
    position: {x: data[0], y: data[1]},
    power: data[2],
    isAlive: data[3],
    availableMines: data[4],
    createdAt: data[5],
    id: data[6]
  };
};


if (typeof module !== 'undefined') module.exports = Player;

