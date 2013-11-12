function Tile(settings) {
  this.type = settings.type;
  this.explodable = settings.explodable;
  this.items = settings.items || [];
  this.mine = settings.mine;
  this.position = settings.position || {x: undefined, y: undefined};
  this.createdAt = settings.createdAt || new Date().getTime();
}

Tile.prototype._out = function() {
  return [
    this.type,
    this.explodable,
    this.mine ? this.mine._out() : undefined,
    this.items,
    this.position,
    this.createdAt
  ];
};

Tile.prototype._in = function(data) {
  return {
    type: data[0],
    explodable: data[1],
    mine: data[2],
    items: data[3],
    position: data[4],
    createdAt: data[5]
  };
};

if (typeof module !== 'undefined') module.exports = Tile;
