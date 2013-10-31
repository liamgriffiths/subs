function Tile(type, position) {
  this.position = position;
  this.type = type;
  this.explodable = false;
  this.items = [];
  this.hasMine = false;

  switch(this.type){
    case 'wall':
      this.explodable = true;
      this.sprite = new Sprite(5, this.position);
      var frame = [[],[],[],[],[]];
      for(var x = 0; x < 5; x++){
        for(var y = 0; y < 5; y++){
          var rcolors = [Color.WHITE(Utils.getRandomInt(5,10)/10),
                         Color.CYAN(Utils.getRandomInt(5,10)/10)];
          frame[x][y] = rcolors[Math.floor(Math.random() * rcolors.length)];
        }
      }
      this.sprite.frames.push(frame);
      break;

    case 'hardwall':
      this.explodable = false;
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
      this.explodable = true;
      this.sprite = new Sprite(1, this.position);
      var watercolor = Color.CLEAR();
      this.sprite.frames.push([[watercolor]]);
      break;

    case 'explosion':
      this.explodable = true;
      break;

    default:
      this.explodable = true;
      break;
  }

}

Utils.mixin(Tile, Eventable);
Utils.mixin(Tile, Explodable);

Tile.prototype.update = function() {
  this.sprite.update();
  var len = this.items.length;
  for(var i = 0; i < len; i++){
    this.items[i].update();
  }
  if(this.exploding) this.hasMine = false;
};

Tile.prototype.predraw = function() {
  this.sprite.predraw();
};

Tile.prototype.draw = function() {
  var len = this.items.length;
  for(var i = 0; i < len; i++){
    this.items[i].draw();
  }
  if(this.exploding) return this.drawExplosion();
  if(this.type == 'water') return function(){};
  if(this.type == 'hardwall') return this.sprite.draw();
  return this.sprite.draw();
};

Tile.prototype.drawExplosion = function() {
  context.moveTo(this.position.x * TILESIZE, this.position.y * TILESIZE);

  var startX = this.position.x * TILESIZE;
  var startY = this.position.y * TILESIZE;
  var pixelSize = Math.floor(TILESIZE / 4);
  var p = 0;

  for(var x = startX; x < startX + TILESIZE; x += pixelSize){
    for(var y = startY; y < startY + TILESIZE; y += pixelSize){
      context.fillStyle = "rgba(255,0,0, "+(Utils.getRandomInt(0,10)/2)+")";
      context.fillRect(x, y, pixelSize, pixelSize);
      p++;
    }
  }
};
