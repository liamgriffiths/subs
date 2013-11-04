function Tile(settings) {
  this.id = setting.id || guid();
  this.position = settings.position;
  this.type = settings.type;
  this.explodable = settings.explodable;
  this.items = settings.items || [];
  this.hasMine = settings.hasMine || false;
}

