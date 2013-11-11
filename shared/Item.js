// Items are things that exist inside a game tile and can be collected by
// and used by a player
function Item(settings) {
  this.type = settings.type || '';
}

Item.prototype._out = function() {
  return [this.type];
};

Item.prototype._in = function(data) {
  return {type: data[0]};
};

if (typeof module != 'undefined') module.exports = Item;

