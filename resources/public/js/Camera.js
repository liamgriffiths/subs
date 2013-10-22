function Camera(position) {
  this.position = position;
  this.drawQueue = new PriorityQueue();
  this.start = new Vector(0,0); // top left of the board
  this.end = new Vector(0,0);   // bottom right of the board
}

Camera.prototype.update = function(position) {
  this.position = position;
  // Tiles from center of board to edge of board
  var distToYEdge = Math.ceil((canvas.height / TILESIZE) / 2) + 1;
  var distToXEdge = Math.ceil((canvas.width / TILESIZE) / 2) + 1;

  // origin of current canvas view (in tiles not pixels)
  this.start = new Vector(this.position.x, this.position.y);
  this.start.x = this.start.x - distToXEdge;
  this.start.y = this.start.y - distToYEdge;
  this.end = new Vector(this.start.x + 2 * distToXEdge, this.start.y + 2 * distToYEdge);
};

Camera.prototype.addDrawable = function(drawFn, position){
  // if the position to draw is within the camera view, add the draw function
  // to the draw queue
  if(position.x > this.start.x && position.x < this.end.x &&
     position.y > this.start.y && position.y < this.end.y) {
       //prioritize by position.z, the lower the sooner it is drawn
       this.drawQueue.enqueue(drawFn, position.z);
  }
  // this.debug(drawFn);
};

Camera.prototype.draw = function() {
  // remove from queue and execute function
  while(this.drawQueue.size()){
    var fn = this.drawQueue.dequeue();
    if(fn instanceof Function){
      // FIXME: for some reason there are undefs being added into my queue, not
      // sure if there is a prob with the queue implementation or if they are
      // sneaking in another way - so far only seems to be Tile objects
      fn();
    }
  }
};

// TODO: fix this crazy function
Camera.prototype.zoom = function(amount) {
  // for(var i = 0; i < keys.length; i++){
  //   if(keys[i] == 'zoomin') TILESIZE += 1;
  //   if(keys[i] == 'zoomout') TILESIZE -= 1;
  // }
};
