function Mine(settings) {
  this.id = settings.id;
  this.position = settings.position;
  this.countdown = settings.countdown;
  this.power = settings.power;
  this.explodingTime = settings.explodingTime;
  this.isExploding = settings.isExploding || false;
  this.owner = settings.owner;
  this.createdAt = settings.createdAt || new Date().getTime();
}

Mine.prototype.set = function(settings) {
  this.constructor(settings);
};

Mine.prototype._out = function() {
  return [
    this.position.x,
    this.position.y,
    this.countdown,
    this.power,
    this.explodingTime,
    this.isExploding,
    this.owner,
    this.id
  ];
};

Mine.prototype._in = function(data) {
  return {
    position: {x: data[0], y: data[1]},
    countdown: data[2],
    power: data[3],
    explodingTime: data[4],
    isExploding: data[5],
    owner: data[6],
    id: data[7]
  };
};


if (typeof module != 'undefined') module.exports = Mine;
