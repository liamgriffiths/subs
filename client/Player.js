Player.prototype.init = function() {
  this.makeSprites();
};

Player.prototype.makeSprites = function() {
  var c0 = Color.BLACK(1/10);
  var c1 = Color.WHITE(8/10);

  var c2 = Color.Rand();
  var c6 = Color.Rand();

  var c3 = Color.WHITE(9/10);
  var c4 = Color.YELLOW();
  var c5 = Color.YELLOW(5/10);

  this.aliveSprite = new Sprite(5, this.position);
  var a1 = [[c0, c2, c2, c2, c0],
            [c6, c2, c2, c2, c6],
            [c6, c2, c0, c2, c6],
            [c0, c2, c2, c2, c0],
            [c4, c0, c0, c0, c4]];
  var a2 = [[c0, c2, c2, c2, c0],
            [c6, c2, c2, c2, c6],
            [c6, c2, c0, c2, c6],
            [c0, c2, c2, c2, c0],
            [c5, c0, c0, c0, c5]];
  this.aliveSprite.frames = [a1,a2];

  this.deadSprite = new Sprite(5, this.position);
  var d1 = [[c0, c1, c1, c1, c0],
            [c1, c0, c1, c0, c1],
            [c1, c1, c1, c1, c1],
            [c1, c1, c1, c1, c1],
            [c1, c0, c1, c0, c1]];
  var d2 = [[c0, c3, c3, c3, c0],
            [c3, c0, c3, c0, c3],
            [c3, c3, c3, c3, c3],
            [c3, c3, c3, c3, c3],
            [c3, c0, c3, c0, c3]];
  this.deadSprite.frames = [d1, d2];
};

Player.prototype.draw = function() {
  if(this.isAlive){
    return this.aliveSprite.draw();
  }else{
    return this.deadSprite.draw();
  }
};

Player.prototype.update = function(now, delta) {
  if(this.isAlive){
    this.aliveSprite.update(delta);
    this.aliveSprite.position = {
      x: this.position.x, 
      y: this.position.y, 
      z: this.position.z
    };
  }else{
    this.deadSprite.update(delta);
    this.deadSprite.position = {
      x: this.position.x, 
      y: this.position.y, 
      z: this.position.z
    };
  }
};
