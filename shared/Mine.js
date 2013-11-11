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
  return [];
};


if (typeof module != 'undefined') module.exports = Mine;
