function Sprite(size, position, animationSpeed) {
  this.size = size; // in "pixels" per tile
  this.position = new Vector(position.x, position.y, position.z);
  this.currentFrame = 0;
  this.tick = 0;
  this.frames = [];
  this.cache = [];
  this.animationDelta = 0;
  this.animationSpeed = animationSpeed || 50;
  this.pixelSize = Math.floor(TILESIZE / this.size);
}

Sprite.prototype.update = function() {
  if(this.animationDelta > this.animationSpeed){
    this.currentFrame = this.tick % this.frames.length;
    this.tick++;
    this.animationDelta = 0;
  }else{
     this.animationDelta += delta;
  }
};

Sprite.prototype.predraw = function() {
  var len = this.frames.length;
  for(var i = 0; i < len; i++){
    this.currentFrame = i;
    this.draw();
  }
  this.currentFrame = 0;
};

Sprite.prototype.draw = function() {
  if(! this.frames.length) return false;
  var frame = this.frames[this.currentFrame];

  var pos = {x: this.position.x * TILESIZE,
             y: this.position.y * TILESIZE}; // pixel location on canvas
  var key = this.currentFrame;

  if(this.cache[key] === undefined){
    // create a new canvas to cache the this frame drawing
    var cCanvas = document.createElement('canvas');
    var cContext = cCanvas.getContext('2d');
    cCanvas.width  = cCanvas.height = TILESIZE;
    for(var x = 0, ty = 0; x < TILESIZE; x += this.pixelSize, ty++){
      for(var y = 0, tx = 0; y < TILESIZE; y += this.pixelSize, tx++){
        cContext.fillStyle = frame[tx][ty];
        cContext.fillRect(x, y, this.pixelSize, this.pixelSize);
      }
    }
    context.drawImage(cCanvas, pos.x, pos.y);
    this.cache[key] = cCanvas;
  }else{
    context.drawImage(this.cache[key], pos.x, pos.y);
  }
};

