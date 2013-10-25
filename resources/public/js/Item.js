// Items are things that exist inside a game tile and can be collected by
// and used by a player
function Item(position, type) {
  this.position = new Vector(position.x, position.y);
  this.type = type;
  this.sprite = this.makeSprite();
}

Item.prototype.draw = function() {
};

Item.prototype.update = function() {
};

Item.prototype.makeSprite = function() {
  var sprite = new Sprite(5, this.position, 100);
  var frames = [];

  if(this.type === 'fire'){
    var c1 = Color.CLEAR();
    var c2 = Color.BLUE();
    var c3 = Color.YELLOW('rand');
    var c4 = Color.BLACK('rand');

    var f1 = [[c1, c1, c1, c1, c1],
              [c1, c1, c1, c1, c1],
              [c1, c1, c1, c1, c1],
              [c1, c1, c1, c1, c1],
              [c1, c1, c1, c1, c1]];

    frames = [f1,f2];
  }

  sprite.frames = frames;
  return sprite;


};
