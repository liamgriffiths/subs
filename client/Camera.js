function Camera(position) {
  this.position = {x: 0, y: 0};
  this.drawQueue = new PriorityQueue();
  this.start = {x: 0, y: 0}; // top left of the board
  this.end = {x: 0, y: 0};   // bottom right of the board
}

Camera.prototype.setup = function() {
  // Tiles from center of board to edge of board
  this.distToEdge = {x: Math.ceil((canvas.width / TILESIZE) / 2) + 1,
                     y: Math.ceil((canvas.height / TILESIZE) / 2) + 1};
};

Camera.prototype.update = function(position) {
  // origin of current canvas view (in tiles not pixels)
  this.start.x = position.x - this.distToEdge.x;
  this.start.y = position.y - this.distToEdge.y;
  this.end.x = position.x + this.distToEdge.x;
  this.end.y = position.y + this.distToEdge.y;
};

Camera.prototype.addDrawing = function(drawFn, position){
  // if the position to draw is within the camera view, add the draw function
  // to the draw queue
  if(position.x >= this.start.x && position.x <= this.end.x &&
     position.y >= this.start.y && position.y <= this.end.y) {
       //prioritize by position.z, the lower the sooner it is drawn
       this.drawQueue.enqueue(drawFn, position.z);
   }
};

Camera.prototype.draw = function() {
  // remove from queue and execute function
  while(this.drawQueue.size()){
    var fn = this.drawQueue.dequeue();
    if(fn instanceof Function) fn();
  }
};
