function Tile(type, position) {
  this.position = position;
  this.type = type;
  this.items = [];
  this.explodable = false;
  this.colors = [];

  switch(this.type){
    case 'wall':
      this.explodable = true;
      for(var i = 0; i < 16; i++){
        var rcolors = ['rgba(255, 225, 225, '+(Utils.getRandomInt(5,10)/2)+')',
                       'rgba(0, 255, 200, '+(Utils.getRandomInt(5,10)/2)+')'];
        this.colors.push(rcolors[Math.floor(Math.random() * rcolors.length)]);
      }
      break;

    case 'hardwall':
      this.explodable = false;
      this.sprite = new Sprite(4, this.position);
      var c1 = 'rgba(0, 0, 255, '+(Utils.getRandomInt(5,10)/2)+')';
      var c2 = 'rgba(255, 0, 0, '+(Utils.getRandomInt(5,10)/2)+')';
      this.sprite.frames.push([[c1, c1, c1, c1],
                               [c2, c2, c2, c2],
                               [c1, c1, c1, c1],
                               [c2, c2, c2, c2]]);
      this.sprite.frames.push([[c1, c1, c1, c1],
                               [c2, c2, c2, c2],
                               [c1, c1, c1, c1],
                               [c2, c2, c2, c2]]);
      this.sprite.frames.push([[c2, c2, c2, c2],
                               [c1, c1, c1, c1],
                               [c2, c2, c2, c2],
                               [c1, c1, c1, c1]]);
      this.sprite.frames.push([[c2, c2, c2, c2],
                               [c1, c1, c1, c1],
                               [c2, c2, c2, c2],
                               [c1, c1, c1, c1]]);
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
  if(this.exploding) this.items = [];
};

Tile.prototype.draw = function() {
  if(this.exploding){
    return this.drawExplosion();
  }else{
    if(this.type == 'water') return;
    if(this.type == 'hardwall'){

      this.sprite.draw();
    }else{
      return this.drawTile();

    }
  }
};

Tile.prototype.addItem = function (item) {
  this.items.push(item);
};

Tile.prototype.removeItem = function(i) {
  this.items.splice(i, 1);
};

Tile.prototype.removeAllItems = function() {
  this.items = [];
};

Tile.prototype.setupSprites = function() {
  var scanvas = document.createElement('canvas');
  scanvas.setAttribute('id', 'wall');
  var scontext = scanvas.getContext('2d');

  var sectionSize = Math.floor(TILESIZE/2);
  var colors = ['rgba(0, 255, 200, 0.5)'];

  context.moveTo(0, 0);

  for(var x = 0; x < TILESIZE; x + sectionSize){
    for(var y = 0; 0 < TILESIZE; y + sectionSize){
      // var color = colors[Math.floor(Math.random() * colors.length)];
      // context.fillStyle = color.replace("[[opacity]]", Math.random());
      var color = colors[0];
      scontext.beginPath();
      scontext.fillStyle = color;
      scontext.moveTo(x, y); // move pen to top left corner of tile
      scontext.lineTo(x + sectionSize, y); // move pen to the top right corner
      scontext.lineTo(x + sectionSize, y + sectionSize); //  opposite corner
      scontext.lineTo(x, y + sectionSize); // move to 'bottom left'
      scontext.closePath(); // move back to start path (moveTo)
      scontext.fill(); // fill in the shape with the fillStyleColor
    }
  }
  SPRITES.wall = true;
};

Tile.prototype.drawHardWall = function(x, y) {
  context.moveTo(this.position.x * TILESIZE, this.position.y * TILESIZE);

  var startX = this.position.x * TILESIZE;
  var startY = this.position.y * TILESIZE;
  var pixelSize = Math.floor(TILESIZE / 4);
  var p = 0;

  for(var x = startX; x < startX + TILESIZE; x += pixelSize){
    for(var y = startY; y < startY + TILESIZE; y += pixelSize){
      context.fillStyle = this.colors[p];
      context.fillRect(x, y, pixelSize, pixelSize);
      p++;
    }
  }
};

Tile.prototype.drawExplosion = function(x, y) {
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


Tile.prototype.drawTile = function() {
  context.moveTo(this.position.x * TILESIZE, this.position.y * TILESIZE);

  var startX = this.position.x * TILESIZE;
  var startY = this.position.y * TILESIZE;
  var pixelSize = Math.floor(TILESIZE / 4);
  var p = 0;

  for(var x = startX; x < startX + TILESIZE; x += pixelSize){
    for(var y = startY; y < startY + TILESIZE; y += pixelSize){
      context.fillStyle = this.colors[p];
      context.fillRect(x, y, pixelSize, pixelSize);
      p++;
    }
  }
};

