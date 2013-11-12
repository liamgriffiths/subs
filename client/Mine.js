Mine.prototype.makeSprites = function() {
 this.sprite = new Sprite(5, this.position,100);
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

Mine.prototype.update = function() {
   if(this.live){
    if(this.animationDelta > 2000){
      this.animationDelta = 0;
      this.live = false;
      this.exploding = true;
    }else{
       this.animationDelta += delta;
    }
  }else{
    if(this.exploding){
      if(this.animationDelta > 1000){
        this.animationDelta = 0;
        this.exploding = false;
      }else{
        this.animationDelta += delta;
      }
    }
  }

  this.sprite.update();
};
