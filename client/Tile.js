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
  if(this.isExploding) { return this.drawExplosion(); }
  if(this.type == 'water') return function(){};
  return this.sprite.draw();
};

Tile.prototype.update = function(now, delta) {
  this.sprite.update(delta);
};

Tile.prototype.drawExplosion = function() {
  context.moveTo(this.position.x * TILESIZE, this.position.y * TILESIZE);

  var startX = this.position.x * TILESIZE;
  var startY = this.position.y * TILESIZE;
  var pixelSize = Math.floor(TILESIZE / 4);
  var p = 0;

  for(var x = startX; x < startX + TILESIZE; x += pixelSize){
    for(var y = startY; y < startY + TILESIZE; y += pixelSize){
      context.fillStyle = "rgba(255,0,0, "+(Utils.randBetween(0,10)/2)+")";
      context.fillRect(x, y, pixelSize, pixelSize);
      p++;
    }
  }
};
