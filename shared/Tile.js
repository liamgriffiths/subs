function Tile(settings) {
  this.type = settings.type;
  this.isExplodable = settings.isExplodable;
  this.isExploding = settings.isExploding;
  this.explodingTime = settings.explodingTime || 0;
  this.items = settings.items || [];
  this.mine = settings.mine;
  this.position = settings.position || {x: undefined, y: undefined};
  this.createdAt = settings.createdAt || new Date().getTime();
  this.id = settings.id;
}

Tile.prototype.set = function(settings) {
  this.constructor(settings);
};

Tile.prototype._out = function() {
  return [
    this.type,
    this.isExplodable,
    this.mine,
    this.items,
    this.position.x,
    this.position.y,
    this.createdAt,
    this.isExploding,
    this.id,
    this.explodingTime
  ];
};

Tile.prototype._in = function(data) {
  return {
    type: data[0],
    isExplodable: data[1],
    mine: data[2],
    items: data[3],
    position: {x: data[4], y: data[5]},
    createdAt: data[6],
    isExploding: data[7],
    id: data[8],
    explodingTime: data[9]
  };
};

if (typeof module !== 'undefined') module.exports = Tile;
