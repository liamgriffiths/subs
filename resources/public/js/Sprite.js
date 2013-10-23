function Sprite(size, position, animationSpeed, frames) {
  this.size = size; // in "pixels" per tile
  this.position = position; // 2d Vector
  this.currentFrame = 0;
  this.tick = 0;
  this.frames = frames || [];
  this.cache = {};
  this.animationDelta = 0;
  this.animationSpeed = animationSpeed || (Math.random() * 400) + 100;
}

// globally shared sprite cache
Sprite.cache = {};

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
  var start = this.position.mul(TILESIZE); // pixel location on canvas
  var end = start.add(TILESIZE); // this is the opposite corner of the tile
  context.moveTo(start.x, start.y);
  // debugger;
  // TODO: refactor this one
  for(var x = start.x, tx = 0; x < end.x; x += this.pixelSize, tx++){
    for(var y = start.y, ty = 0; y < end.y; y += this.pixelSize, ty++){
      try{
        context.fillStyle = this.frames[this.currentFrame][tx][ty];
        context.fillRect(x, y, this.pixelSize, this.pixelSize);
      }catch(e){
        // FIXME: sometimes drawX or drawY exceeds the frame dimensions, why?
      }
    }
  }
};

Sprite.prototype.cacheIt = function() {
  var cCanvas = document.createElement('canvas');
  cCanvas.height = TILESIZE;
  cCanvas.width = TILESIZE;
  var cContext = cCanvas.getContext('2d');
  cContext.moveTo(0,0);
  var pixelSize = Math.floor(TILESIZE / this.size);

  // TODO: refactor this one
  for(var x = 0, tx = 0; x < TILESIZE; x += pixelSize, tx++){
    for(var y = 0, ty = 0; y < TILESIZE; y += pixelSize, ty++){
      try{
        cContext.fillStyle = this.frames[this.currentFrame][tx][ty];
        cContext.fillRect(x, y, pixelSize, pixelSize);
      }catch(e){
        // FIXME: sometimes drawX or drawY exceeds the frame dimensions, why?
      }
    }
  }

  cContext.drawImage(cCanvas, 0, 0, TILESIZE, TILESIZE);
  this.cache[this.currentFrame] = cCanvas;
  return true;
};



