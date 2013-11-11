function Tile(settings) {
  this.type = settings.type;
  this.explodable = settings.explodable;
  this.items = settings.items || [];
  this.mine = settings.mine;
}

Tile.prototype._out = function() {
  return [
    this.type,
    this.explodable,
    this.mine ? this.mine._out() : undefined,
    this.items
  ];
};

if (typeof module !== 'undefined') module.exports = Tile;
