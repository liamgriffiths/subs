var types = ['fire', 'mine'];

function Tile(settings) {
  this.type = settings.type;
  this.explodable = settings.explodable;
  this.items = settings.items || [];
  this.mine = settings.mine;
}

Tile.prototype._out = function() {
  var items = [];
  for (var i = 0; i < this.items.length; i++) {
    items.push(this.items._out());
  }

  return [
    this.type,
    this.explodable,
    this.mine ? this.mine._out() : undefined,
    items
  ];
};

Tile.prototype.updateFromJSON = function(json) {
  if (json.id == this.id) {
    this.type = json.type;
    this.explodable = json.explodable;
    this.items = json.items;
    this.mine = json.mine;
  } else {
    throw 'wtf';
  }
};

if (typeof module !== 'undefined') module.exports = Tile;
