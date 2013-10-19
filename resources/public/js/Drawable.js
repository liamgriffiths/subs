// Mixin to handle drawable functions, the idea here is that within an object
// draw functions can be added to a queue that will draw things off all types
// of object in the correct order. Also it should only draw objects which are
// within the viewport of the current player.
//
// This might not be the best way to accomplish this, but we'll see!
function Drawable() {}

Drawable.prototype._drawQueue = [];

Drawable.prototype.addDrawable = function(position, fn) {
  // TODO: move this logic into something else, maybe a Camera obj?
  var distToYEdge = Math.ceil((canvas.height / TILESIZE) / 2);
  var distToXEdge = Math.ceil((canvas.width / TILESIZE) / 2);

  // origin of current canvas view (in tiles not pixels)
  var start = new Vector(currentPlayer.x, currentPlayer.y);
  start.x = start.x - distToXEdge;
  start.y = start.y - distToYEdge;
  var end = new Vector(start.x + 2 * distToXEdge, start.y + 2 * distToYEdge);

  if(position.x > start.x && position.x < end.x && 
     position.y > start.y && position.y < end.y) {
    if(! Boolean(this._drawQueue[position.z])) this._drawQueue[position.z] = [];
    this._drawQueue[position.z].push(fn);
  }
};

Drawable.prototype.drawQueue = function() {
  var queues = Array.prototype.slice.call(arguments);
  if(queues.length){
    var combined = [];
    for(var i = 0; i < queues.length; i++){
      for(var k = 0; k < queues[i].length; k++){
        if(queues[i][k].length){
          combined[i] = combined[i].concat(queues[i][k]);
        }
      }
    }
    return queues;
  }
  return false;
};
