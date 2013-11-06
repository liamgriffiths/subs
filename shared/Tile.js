function Tile(settings) {
  this.id = settings.id;
  this.type = settings.type;
  this.explodable = settings.explodable;
  this.items = settings.items || [];
  this.hasMine = settings.hasMine || false;
}

module.exports = Tile;
