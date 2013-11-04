// Took some lessons from:
// http://eloquentjavascript.net/appendix2.html
// http://opendatastructures.org/versions/edition-0.1e/ods-java/10_1_BinaryHeap_Implicit_Bi.html
// http://en.wikipedia.org/wiki/Binary_heap
//
// This is a re-invention of the wheel, but hey sometimes it is useful to know
// how the wheel was made. :-)
//
//
// A binary heap is a way of organizing a binary tree in such a way that it can
// be represented as an array. Like a binary tree, each node in the Heap can
// only have two children, starting from the root node.
//
// This is a "binary-min" tree, meaning that the root node is the lowest valued
// node the child nodes are of greater value. Another implementation might do
// the opposite where the root node is the greatest valued node in the tree.

function BinaryHeap(_compareFn) {
  // nodes are stored in a regular array
  this.nodes = [];

  // compare the values of two nodes at indexA and indexB
  // returns 1 if A is greater
  // returns -1 if B is greater
  // returns 0 if they are equal
  this.compareFn = _compareFn || function(nodeA, nodeB) {
    if(nodeA > nodeB) return 1;
    if(nodeA < nodeB) return -1;
    return 0;
  };
}

// left child for node at index i
// returns the index in the array for the child node
BinaryHeap.prototype.left = function(i) {
  return 2 * i + 1;
};

// right child for node at index i
// returns the index in the array for the child node
BinaryHeap.prototype.right = function(i) {
  return 2 * i + 2;
};

// find the parent node of a child at index i
// return the parent node's index
BinaryHeap.prototype.parent = function(i) {
  return Math.floor((i - 1) / 2);
};

// insert a new node into the heap of nodes
BinaryHeap.prototype.add = function(node) {
  this.nodes.push(node); // add node to the end of the array
  this.bubbleUp(this.nodes.length - 1);
  return this;
};

// swap nodes in the nodes array
BinaryHeap.prototype.swapNodes = function(indexA, indexB) {
  var nodeA = this.nodes[indexA];
  var nodeB = this.nodes[indexB];
  this.nodes[indexA] = nodeB;
  this.nodes[indexB] = nodeA;
  return this;
};

// reorder the nodes array to ensure that the node at index i on the array is
// less than it's parents value
BinaryHeap.prototype.bubbleUp = function(i) {
  pi = this.parent(i);
  // loop until node at index i is <= it's parent node
  while(this.compare(i, pi) < 0){
    this.swapNodes(i, pi);
    i = pi;
    pi = this.parent(i);
  }
  return this;
};

// remove node at index 0, which will be the smallest valued node in the 'tree',
// the important thing when popping off this node though is reordering the array
// afterward so the next root node is the smallest value
BinaryHeap.prototype.remove = function() {
  var rootNode = this.nodes.shift();
  this.bubbleDown();
  return rootNode;
};

// use the this.compareFn to compare the nodes at indexA and indexB
BinaryHeap.prototype.compare = function(indexA, indexB) {
  var nodeA = this.nodes[indexA];
  var nodeB = this.nodes[indexB];
  return this.compareFn(nodeA, nodeB);
};

// this operation takes the last node of the nodes array and makes it the first
// value in the tree. then push this node down the tree swapping it with it's
// children until it has no more children of greater value
BinaryHeap.prototype.bubbleDown = function() {
  if(this.size() < 1) return; // 
  // take last node in array off and put at the front of the array
  var lastNode = this.nodes.pop();
  this.nodes.unshift(lastNode);

  var i = 0;
  var l = this.left(0);
  var r = this.right(0);

  // while the current node's value is greater than its children
  while(this.compare(i, l) > 0 || this.compare(i, r) > 0){

    if(this.compare(l, r) < 0){
      // left child is less than right
      this.swapNodes(i, l);
      i = l;
    }else{
      // right child is less than left
      this.swapNodes(i, r);
      i = r;
    }
    l = this.left(i);
    r = this.right(i);
  }
  return this;
};

BinaryHeap.prototype.size = function() {
  return this.nodes.length;
};

