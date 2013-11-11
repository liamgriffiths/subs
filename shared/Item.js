// Items are things that exist inside a game tile and can be collected by
// and used by a player
function Item(settings) {
  this.type = settings.type || '';
}

Item.prototype._out = function() {
  return [this.type];
};

if (typeof module != 'undefined') module.exports = Item;

