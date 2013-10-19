// Took some lessons from:
// http://eloquentjavascript.net/appendix2.html
// http://opendatastructures.org/versions/edition-0.1e/ods-java/10_1_BinaryHeap_Implicit_Bi.html
//
// This is a re-invention of the wheel, but hey sometimes it is useful to know
// how the wheel was made.

function BinaryHeap(compareFn) {
  this.elements = [];
  this._compare = compareFn || function(a, b){
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };
}

// return the index of the left child element for element at index i
BinaryHeap.prototype.left = function(i) {
  return 2 * i  + 1;
};

// return the index of the right child element for element at index i
BinaryHeap.prototype.right = function(i) {
  return 2 * i  + 2;
};

// return the index of the parent element for element at index i
BinaryHeap.prototype.parent = function(i) {
  return Math.floor((i + 1) / 2) - 1;
};

BinaryHeap.prototype.push = function(element) {
  // add element to the end of the array
  this.elements.push(element);

  // let the element at index 'bubble up' the array until
  this._bubbleUp(this.elements.length - 1);

  return this;
};

// swap element at index i until it is less than it's parent(i)
BinaryHeap.prototype._bubbleUp = function(i) {
  var pi = this.parent(i); // look up parent index of i
  while(i > 0){
    if(this._compare(this.elements[i], this.elements[pi]) > 0) break;

    var current = this.elements[i];
    var parent = this.elements[pi];

    this.elements[i] = parent;
    this.elements[pi] = current;
    i = pi;
    pi = this.parent(i);
  }
};

var bh = new BinaryHeap();
bh.push(5);
console.log(bh.elements);
bh.push(15);
console.log(bh.elements);
bh.push(1);
console.log(bh.elements);
bh.push(2);
console.log(bh.elements);
