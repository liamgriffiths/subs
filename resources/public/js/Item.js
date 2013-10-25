// Items are things that exist inside a game tile and can be collected by
// and used by a player
function Item(type, position) {
  this.position = new Vector(position.x, position.y, position.z);
  this.type = type;
  this.sprite = this.makeSprite();
}

Item.prototype.draw = function() {
  return this.sprite.draw();
};

Item.prototype.update = function() {
  this.sprite.update();
};

Item.prototype.makeSprite = function() {
  var sprite = new Sprite(5, this.position, 100);
  var frames = [];

  if(this.type === 'fire'){
    var c1 = Color.CLEAR();
    var c2 = Color.BLUE();
    var c3 = Color.YELLOW('rand');
    var c4 = Color.BLACK('rand');

    var f1 = [[c2, c2, c2, c2, c2],
              [c2, c3, c4, c3, c2],
              [c2, c3, c3, c3, c2],
              [c2, c3, c3, c3, c2],
              [c2, c2, c2, c2, c2]];
    var f2 = [[c2, c2, c2, c2, c2],
              [c2, c4, c3, c3, c2],
              [c2, c3, c3, c3, c2],
              [c2, c3, c3, c3, c2],
              [c2, c2, c2, c2, c2]];
    var f3 = [[c2, c2, c2, c2, c2],
              [c2, c3, c3, c4, c2],
              [c2, c3, c3, c3, c2],
              [c2, c3, c3, c3, c2],
              [c2, c2, c2, c2, c2]];

    frames = [f1,f2,f3];
  }

  sprite.frames = frames;
  return sprite;
};
