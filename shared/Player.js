function Player(settings) {
  this.id = settings.id;
  this.position = settings.position;
  this.prevPosition = settings.prevPosition || settings.position;
  this.power = settings.power || 2;
  this.isAlive = settings.isAlive;
  this.availableMines = settings.availableMines || 1;
  this.maxMines = settings.maxMines || 1;
  this.createdAt = settings.createdAt || new Date().getTime();
  this.life = settings.life || 3;
  this.isConnected = settings.isConnected;
  this.name = settings.name || "yolo";
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
    this.id,
    this.life,
    this.prevPosition.x,
    this.prevPosition.y,
    this.maxMines,
    this.name
  ];
};

Player.prototype._in = function(data) {
  return {
    position: {x: data[0], y: data[1]},
    power: data[2],
    isAlive: data[3],
    availableMines: data[4],
    createdAt: data[5],
    id: data[6],
    life: data[7],
    prevPosition: {x: data[8], y: data[9]},
    maxMines: data[10],
    name: data[11]
  };
};


if (typeof module !== 'undefined') module.exports = Player;

