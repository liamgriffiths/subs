function Camera(width, height) {
  this.drawQueue = new PriorityQueue();
  this.start = {x: 0, y: 0}; // top left of the board
  this.end = {x: 0, y: 0};   // bottom right of the board
  // Tiles from center of board to edge of board
  this.distToEdge = {x: Math.ceil((width / TILESIZE) / 2) + 3,
                     y: Math.ceil((height / TILESIZE) / 2) + 3};
}

Camera.prototype.update = function(position) {
  // origin of current canvas view (in tiles not pixels)
  if (position && position.x && position.y) {
    this.start.x = position.x - this.distToEdge.x;
    this.start.y = position.y - this.distToEdge.y;
    this.end.x = position.x + this.distToEdge.x;
    this.end.y = position.y + this.distToEdge.y;
  }
};

Camera.prototype.isInView = function(position) {
  if (position.x < this.start.x) return false;
  if (position.x > this.end.x) return false;
  if (position.y < this.start.y) return false;
  if (position.y > this.end.y) return false;
  return true;
};

Camera.prototype.addDrawing = function(object){
  // if the position to draw is within the camera view, add the draw function
  // to the draw queue
  var position = object.position;
  if (this.isInView(position)) {
    var drawFn = object.draw.bind(object);
    //prioritize by position.z, the lower the sooner it is drawn
    this.drawQueue.enqueue(drawFn, position.z);
   }
};

Camera.prototype.draw = function() {
  // remove from queue and execute function
  while(this.drawQueue.size()){
    var fn = this.drawQueue.dequeue();
    fn();
  }
};
