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

Tile.prototype._in = function(data) {
  return {
    type: data[0],
    explodable: data[1],
    mine: data[2],
    items: data[3]
  };
};

if (typeof module !== 'undefined') module.exports = Tile;
