Tile.prototype.makeSprites = function() {
  switch(this.type){
    case 'wall':
      this.sprite = new Sprite(5, this.position);
      var frame = [[],[],[],[],[]];
      for(var x = 0; x < 5; x++){
        for(var y = 0; y < 5; y++){
          var rcolors = [Color.WHITE(Utils.randBetween(5,10)/10),
                         Color.CYAN(Utils.randBetween(5,10)/10)];
          frame[x][y] = rcolors[Math.floor(Math.random() * rcolors.length)];
        }
      }
      this.sprite.frames.push(frame);
      break;

    case 'hardwall':
      this.sprite = new Sprite(4, this.position, 600);
      var c1 = Color.BLUE();
      var c2 = Color.RED();
      var f1 = [[c1, c2, c1, c2],
                [c1, c2, c1, c2],
                [c1, c2, c1, c2],
                [c1, c2, c1, c2]];
      var f2 = [[c2, c1, c2, c1],
                [c2, c1, c2, c1],
                [c2, c1, c2, c1],
                [c2, c1, c2, c1]];
      this.sprite.frames = [f1];
      break;

    case 'water':
      this.sprite = new Sprite(1, this.position);
      var watercolor = Color.CLEAR();
      this.sprite.frames.push([[watercolor]]);
      break;

    default:
      break;
  }
};

Tile.prototype.draw = function() {
  // if(this.exploding) return this.drawExplosion();
  if(this.type == 'water') return function(){};
  return this.sprite.draw();
};
