Mine.prototype.init = function() {
  this.makeSprites();
};

Mine.prototype.makeSprites = function() {
 this.sprite = new Sprite(5, this.position, 50);
  var c1 = Color.CLEAR();
  var c2 = Color.RED();
  var c3 = Color.DPURPLE();
  var c4 = Color.YELLOW();
  var c5 = Color.ORANGE();

  var f1 = [[c3, c3, c3, c3, c3],
            [c3, c2, c2, c2, c3],
            [c3, c5, c5, c5, c3],
            [c3, c4, c4, c4, c3],
            [c3, c3, c3, c3, c3]];
  var f2 = [[c4, c4, c4, c4, c4],
            [c4, c3, c3, c3, c4],
            [c4, c2, c2, c2, c4],
            [c4, c5, c5, c5, c4],
            [c4, c4, c4, c4, c4]];
  var f3 = [[c5, c5, c5, c5, c5],
            [c5, c4, c4, c4, c5],
            [c5, c3, c3, c3, c5],
            [c5, c2, c2, c2, c5],
            [c5, c5, c5, c5, c5]];
  var f4 = [[c2, c2, c2, c2, c2],
            [c2, c5, c5, c5, c2],
            [c2, c4, c4, c4, c2],
            [c2, c3, c3, c3, c2],
            [c2, c2, c2, c2, c2]];
  this.sprite.frames = [f1,f2,f3,f4];
};


Mine.prototype.draw = function() {
  return this.sprite.draw();
};

Mine.prototype.update = function(now, delta) {
  this.sprite.update(delta);
};
