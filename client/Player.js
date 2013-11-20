Player.prototype.init = function() {
  this.makeSprites();
};

Player.prototype.makeSprites = function() {
  var c0 = Color.BLACK(1/10);
  var c1 = Color.WHITE(8/10);

  var playerColors = Color.guidColors(this.id);
  var c2 = playerColors[0];
  var c6 = playerColors[1];

  var c3 = Color.WHITE(9/10);
  var c4 = Color.YELLOW();
  var c5 = Color.YELLOW(5/10);

  this.aliveSprite = new Sprite(TILESIZE, this.position);
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

  this.deadSprite = new Sprite(TILESIZE, this.position);
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

// FIXME: somehow the prevPosition and position are out of sync when a player
// updated server side, ie. availableMines++ || availableMines--;
Player.prototype.update = function(now, delta) {
  this.prevPosition = {
    x: Utils.linearTween(delta, this.prevPosition.x, this.position.x, 40),
    y: Utils.linearTween(delta, this.prevPosition.y, this.position.y, 40)
  };

  if(this.isAlive){
    this.aliveSprite.update(delta);
    this.aliveSprite.position = {
      x: this.prevPosition.x,
      y: this.prevPosition.y,
      z: this.position.z
    };
  }else{
    this.deadSprite.update(delta);
    this.deadSprite.position = {
      x: this.prevPosition.x,
      y: this.prevPosition.y,
      z: this.position.z
    };
  }
};
