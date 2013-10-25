function Sprite(size, position, animationSpeed) {
  this.size = size; // in "pixels" per tile
  this.position = new Vector(position.x, position.y, position.z);
  this.currentFrame = 0;
  this.tick = 0;
  this.frames = [];
  this.cache = {};
  this.direction = 'up';
  this.animationDelta = 0;
  this.animationSpeed = animationSpeed || 50;
}

Sprite.prototype.update = function() {
  if(this.animationDelta > this.animationSpeed){
    this.currentFrame = this.tick % this.frames.length;
    this.tick++;
    this.animationDelta = 0;
  }else{
     this.animationDelta += delta;
  }

  this.pixelSize = Math.floor(TILESIZE / this.size);
};

Sprite.prototype.draw = function() {
  if(! this.frames.length) return false;
  var start = this.position.mul(TILESIZE); // pixel location on canvas
  var end = start.add(TILESIZE); // this is the opposite corner of the tile
  context.moveTo(start.x, start.y);
  // debugger;
  // TODO: refactor this one
  for(var x = start.x, ty = 0; x < end.x && ty < this.size; x += this.pixelSize, ty++){
    for(var y = start.y, tx = 0; y < end.y && tx < this.size; y += this.pixelSize, tx++){
      try{
        context.fillStyle = this.frames[this.currentFrame][tx][ty];
        context.fillRect(x, y, this.pixelSize, this.pixelSize);
      }catch(e){
        // FIXME: sometimes drawX or drawY exceeds the frame dimensions, why?
      }
    }
  }
};


