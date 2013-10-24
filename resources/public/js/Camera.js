function Camera(position) {
  this.position = new Vector(0,0);
  this.drawQueue = new PriorityQueue();
  this.start = new Vector(0,0); // top left of the board
  this.end = new Vector(0,0);   // bottom right of the board
}

Camera.prototype.setup = function() {
  // Tiles from center of board to edge of board
  this.distToEdge = new Vector(Math.ceil((canvas.width / TILESIZE) / 2) + 1,
                               Math.ceil((canvas.height / TILESIZE) / 2) + 1);
};

Camera.prototype.update = function(position) {
  // origin of current canvas view (in tiles not pixels)
  this.start = new Vector(position.x, position.y).sub(this.distToEdge);
  this.end = new Vector(position.x, position.y).add(this.distToEdge);
};

Camera.prototype.addDrawable = function(drawFn, position){
  // if the position to draw is within the camera view, add the draw function
  // to the draw queue
  if(position.x >= this.start.x && position.x <= this.end.x &&
     position.y >= this.start.y && position.y <= this.end.y) {
       //prioritize by position.z, the lower the sooner it is drawn
       this.drawQueue.enqueue(drawFn, position.z);
  }
  // this.debug(drawFn);
};

Camera.prototype.draw = function() {
  // remove from queue and execute function
  while(this.drawQueue.size()){
    var fn = this.drawQueue.dequeue();
    if(fn instanceof Function) fn();
  }
};

// TODO: fix this crazy function
Camera.prototype.zoom = function(amount) {
  // for(var i = 0; i < keys.length; i++){
  //   if(keys[i] == 'zoomin') TILESIZE += 1;
  //   if(keys[i] == 'zoomout') TILESIZE -= 1;
  // }
};
