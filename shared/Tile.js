function Tile(settings) {
  this.type = settings.type;
  this.isExplodable = settings.isExplodable || true;
  this.isExploding = settings.isExploding || false;
  this.items = settings.items || [];
  this.mine = settings.mine;
  this.position = settings.position || {x: undefined, y: undefined};
  this.createdAt = settings.createdAt || new Date().getTime();
}

Tile.prototype._out = function() {
  return [
    this.type,
    this.isExplodable,
    this.mine,
    this.items,
    this.position,
    this.createdAt,
    this.isExploding
  ];
};

Tile.prototype._in = function(data) {
  return {
    type: data[0],
    isExplodable: data[1],
    mine: data[2],
    items: data[3],
    position: data[4],
    createdAt: data[5],
    isExploding: data[6]
  };
};

if (typeof module !== 'undefined') module.exports = Tile;
