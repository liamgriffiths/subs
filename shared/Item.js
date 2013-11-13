// Items are things that exist inside a game tile and can be collected by
// and used by a player
function Item(settings) {
  this.id = settings.id;
  this.type = settings.type || '';
  this.createdAt = settings.createdAt || new Date().getTime();
  this.position = settings.position;
}

Item.prototype._out = function() {
  return [
    this.type,
    this.createdAt,
    this.id,
    this.position
  ];
};

Item.prototype._in = function(data) {
  return {
    type: data[0],
    createdAt: data[1],
    id: data[2],
    position: data[3]
  };
};

if (typeof module != 'undefined') module.exports = Item;

