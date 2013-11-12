// Items are things that exist inside a game tile and can be collected by
// and used by a player
function Item(settings) {
  this.type = settings.type || '';
  this.createdAt = settings.createdAt || new Date().getTime();
}

Item.prototype._out = function() {
  return [
    this.type,
    this.createdAt
  ];
};

Item.prototype._in = function(data) {
  return {
    type: data[0],
    createdAt: data[1]
  };
};

if (typeof module != 'undefined') module.exports = Item;

