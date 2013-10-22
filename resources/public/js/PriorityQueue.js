// Took some lessons from:
// http://en.wikipedia.org/wiki/Priority_queue
//
// Not sure if this is the best way to do it, but using my BinaryHeap to
// organize my queue. This object is basically a thin layer of the heap to
// compare nodes by a priority key.

function PriorityQueue() {
  // use BinaryHeap as basis for queue, where each node in the heap is compared
  // by its priority value
  var compareFn = function(nodeA, nodeB) {
    if(nodeA === undefined || nodeB === undefined) return 0;
    if(nodeA.priority > nodeB.priority) return 1;
    if(nodeA.priority < nodeB.priority) return -1;
    return 0;
  };
  this.queue = new BinaryHeap(compareFn);
}

PriorityQueue.prototype.enqueue = function(item, priority) {
  priority = priority || 1;
  this.queue.add({item: item, priority: priority});
  return this;
};

PriorityQueue.prototype.dequeue = function() {
  if(this.isEmpty()){
    return false;
  }else{
    return this.queue.remove().item;
  }
};

PriorityQueue.prototype.isEmpty = function(){
  return this.queue.length === 0;
};

PriorityQueue.prototype.size = function(){
  return this.queue.size();
};


