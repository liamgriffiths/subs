function Sprite(size, context, position, animationSpeed) {
  this.context = context;
  this.size = size; // size of tile in pixels
  this.position = {x: position.x, y: position.y, z: position.z};
  this.currentFrame = 0;
  this.tick = 0;
  this.frames = [];
  this.cache = [];
  this.animationDelta = 0;
  this.animationSpeed = animationSpeed || 500; // approx msecs/frame
}

Sprite.prototype.update = function(delta) {
  if (this.animationDelta > this.animationSpeed) {
    this.currentFrame = this.tick % this.frames.length;
    this.tick++;
    this.animationDelta = 0;
  } else {
    this.animationDelta += delta;
  }
};

Sprite.prototype.draw = function() {
  if(! this.frames.length) return false;
  var frame = this.frames[this.currentFrame];

  var pos = {x: this.position.x * this.size,
             y: this.position.y * this.size}; // pixel location on canvas
  var key = this.currentFrame;

  if(! this.cache[key]) {
    // create a new canvas to cache the this frame drawing
    var cCanvas = document.createElement('canvas');
    var cContext = cCanvas.getContext('2d');
    cCanvas.width  = cCanvas.height = this.size;

    var len = frame.length;
    var pixelSize = Math.floor(this.size / len);

    for (var x = 0, ty = 0; x < this.size; x += pixelSize, ty++) {
      for (var y = 0, tx = 0; y < this.size; y += pixelSize, tx++) {
        cContext.fillStyle = frame[tx][ty];
        cContext.fillRect(x, y, pixelSize, pixelSize);
      }
    }

    this.context.drawImage(cCanvas, pos.x, pos.y);
    this.cache[key] = cCanvas;
  }else{
    this.context.drawImage(this.cache[key], pos.x, pos.y);
  }
};


