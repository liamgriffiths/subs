var Tile = function (type, position) {
  this.position = position;
  this.type = type;
  this.items = [];
  this.explodable = false;
  this.exploding = false;

  switch(this.type){
    case 'wall':
      this.explodable = true;
      break;

    case 'hardwall':
      this.explodable = false;
      break;

    case 'explosion':
      this.explodable = true;
      break;

    default:
      this.explodable = true;
      break;
  }
};

Tile.prototype.update = function () {
  if(this.exploding) this.items = [];
};

Tile.prototype.draw = function () {
  if(this.exploding){ return this.drawExplosion(); }

  switch(this.type){
    case 'wall':
      this.drawWall();
      break;

    case 'hardwall':
      this.drawHardWall();
      break;
  }
};

Tile.prototype.addItem = function (item) {
  this.items.push(item);
};

Tile.prototype.removeItem = function (i) {
  this.items.splice(i, 1);
};

Tile.prototype.removeAllItems = function () {
  this.items = [];
};

Tile.prototype.drawHardWall = function (x, y) {
  context.beginPath();
  context.fillStyle = 'blue';
  context.moveTo(this.position.x * TILESIZE, this.position.y * TILESIZE);
  context.lineTo(this.position.x * TILESIZE + TILESIZE, this.position.y * TILESIZE);
  context.lineTo(this.position.x * TILESIZE + TILESIZE, this.position.y * TILESIZE + TILESIZE);
  context.lineTo(this.position.x * TILESIZE, this.position.y * TILESIZE + TILESIZE);
  context.closePath();
  context.fill();
};

Tile.prototype.drawExplosion = function (x, y) {
  context.beginPath();
  context.fillStyle = 'red';
  context.moveTo(this.position.x * TILESIZE, this.position.y * TILESIZE);
  context.lineTo(this.position.x * TILESIZE + TILESIZE, this.position.y * TILESIZE);
  context.lineTo(this.position.x * TILESIZE + TILESIZE, this.position.y * TILESIZE + TILESIZE);
  context.lineTo(this.position.x * TILESIZE, this.position.y * TILESIZE + TILESIZE);
  context.closePath();
  context.fill();
};


Tile.prototype.drawWall = function () {
  context.beginPath();
  context.fillStyle = '#888';
  context.moveTo(this.position.x * TILESIZE, this.position.y * TILESIZE);
  context.lineTo(this.position.x * TILESIZE + TILESIZE, this.position.y * TILESIZE);
  context.lineTo(this.position.x * TILESIZE + TILESIZE, this.position.y * TILESIZE + TILESIZE);
  context.lineTo(this.position.x * TILESIZE, this.position.y * TILESIZE + TILESIZE);
  context.closePath();
  context.fill();
};

