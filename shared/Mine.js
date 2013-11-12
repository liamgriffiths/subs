function Mine(settings){
  this.position = settings.position;
  this.countdown = settings.countdown;
  this.power = settings.power;
  this.live = settings.live || true;
  this.explodingTime = settings.explodingTime;
  this.exploding = settings.exploding;
  this.owner = settings.owner;
}

Mine.prototype._out = function() {
  return [
    this.position,
    this.countdown,
    this.power,
    this.live,
    this.explodingTime,
    this.exploding,
    this.owner
  ];
};

Mine.prototype._in = function(data) {
  return {
    position: data[0],
    countdown: data[1],
    power: data[2],
    live: data[3],
    explodingTime: data[4],
    exploding: data[5],
    owner: data[6]
  };
};


if (typeof module != 'undefined') module.exports = Mine;
