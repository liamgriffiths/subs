function Sprite(size, position) {
  this.size = size; // in "pixels" per tile
  this.position = position; // 2d Vector
  this.z = 0; // z-index for sprite - determines when this tile is drawn in
              // in relation to other sprites in this tile
  this.currentFrame = 0;
  this.tick = 0;
}

Sprite.prototype.update = function() {
  this.currentFrame = this.tick % this.frames.length;
  this.tick++;
};

Sprite.prototype.draw = function() {
  var start = this.position.mul(TILESIZE); // scale positon by tilesize to get the
                                                    // pixel location on the canvas
  var end = start.add(TILESIZE); // this is the opposite corner of the tile

  context.moveTo(start.x, start.y);
  var pixelSize = Math.floor(TILESIZE / this.size);

  // TODO: refactor this one
  var drawX = 0;
  for(var x = start.x; x < end.x; x += pixelSize){
    var drawY = 0;
    for(var y = start.y; y < end.y; y += pixelSize){
      context.fillStyle = this.frames[this.currentFrame][drawX][drawY];
      context.fillRect(x, y, pixelSize, pixelSize);
      drawY += 1;
    }
    drawX += 1;
  }
};

// TODO: look into a way to write the frames to hidden canvases to hopefully
// make rendering a wee bit faster
Sprite.prototype.cache = function() {};
Sprite.prototype.cacheFrame = function() {
};




