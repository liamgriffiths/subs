function Player(settings) {
  this.id = settings.id || guid();
  this.position = settings.position;
  this.power = settings.power;
  this.isAlive = settings.isAlive;
  this.availableMines = settings.availableMines;
}

