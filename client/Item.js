Item.prototype.init = function() {
  this.sprite = makeItemSprite(this.type, this.position);
};

Item.prototype.draw = function() {
  return this.sprite.draw();
};

Item.prototype.update = function(now, delta) {
  this.sprite.update(delta);
};

function makeItemSprite(type, position) {
  var sprite = new Sprite(TILESIZE, position, 200);
  var frames = [];

  if(type === 'fire'){
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

  if(this.type === 'heart'){
    this.sprite = new Sprite(TILESIZE, this.position, 200);
    var c = Color.CLEAR();
    var r = Color.LRED('rand');
    var b = Color.BLACK();

    var f1 = [[c, b, b, c, b, b, c],
              [b, r, r, b, r, r, b],
              [b, r, r, r, r, r, b],
              [c, b, r, r, r, b, c],
              [c, b, r, r, r, b, c],
              [c, c, b, r, b, c, c],
              [c, c, c, b, c, c, c]];

    frames = [f1];
  }

  if(type === 'mine'){
    var c1 = Color.CLEAR();
    var c2 = Color.BLUE();
    var c3 = Color.DPURPLE('rand');
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
