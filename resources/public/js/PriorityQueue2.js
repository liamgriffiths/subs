// Took some lessons from:
// testing out a simpler queue
function PriorityQueue2() {
  this.queue = [[],[],[],[]];
}

PriorityQueue2.prototype.enqueue = function(item, priority) {
  this.queue[priority].push(item);
  return this;
};

PriorityQueue2.prototype.dequeue = function() {
  var i = 0, len = this.queue.length;
  while(i < len){
    while(this.queue[i].length){
      return this.queue[i].shift();
    }
    i++;
  }
  return false;
};

PriorityQueue2.prototype.isEmpty = function(){
  return this.size() === 0;
};

PriorityQueue2.prototype.size = function(){
  return this.queue.join('').length;
};


