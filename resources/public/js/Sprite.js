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

// TODO: fix this function, the idea here is to cache this sprite by drawing
// it to a hidden canvas, so that when we do the drawing on the visible
// canvas we can do a drawImage using the image that we have predrawn.
// this is theoretically much faster
Sprite.prototype.cacheFrames = function() {
  // cCanvas is a sprite sheet containing the drawn frames
  var cCanvas = document.createElement('canvas');
  cCanvas.height = TILESIZE;
  cCanvas.width = TILESIZE * this.frames.length;
  var cContext = cCanvas.getContext('2d');
  var pixelSize = Math.floor(TILESIZE / this.size);

  for(var frame = 0; frame < this.frames.length; frame++){
    cContext.moveTo(frame * TILESIZE, 0);

    // draw frame to section of sprite sheet canvas
    for(var x = 0, tx = 0; x < TILESIZE; x += pixelSize, tx++){
      for(var y = 0, ty = 0; y < TILESIZE; y += pixelSize, ty++){
        try{
          cContext.fillStyle = this.frames[frame][tx][ty];
          cContext.fillRect(x, y, pixelSize, pixelSize);
        }catch(e){
          // FIXME: sometimes drawX or drawY exceeds the frame dimensions, why?
        }
      }
    }

    // use frame contents as cache-key
    cacheKey = this.frames[frame].join('');
    Sprite.cache[cacheKey] = cCanvas;
  }
  return Sprite.cache;
};



