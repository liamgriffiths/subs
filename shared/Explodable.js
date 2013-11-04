// Mixin to handle explodable objects
function Explodable() { }

Explodable.prototype.explode = function() {
  this.exploding = true;
  return this;
};

Explodable.prototype.stopExploding = function() {
  this.exploding = false;
  return this;
};
