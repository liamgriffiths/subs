// Generic vector class
function Vector(/* vector values as args or array */) {
  var args = Array.prototype.slice.call(arguments);
  if(args.length == 1 && args.constructor == Array){
    this.value = args[0];
  }else{
    this.value = args;
  }
  this.x = this.value[0];
  this.y = this.value[1];
  this.z = this.value[2];
  this.length = this.value.length;
}

// add vectors
Vector.prototype.add = function(n) {
  if(n instanceof Vector && this.length == n.length){
    var a = [];
    for(var i = 0; i < this.value.length; i++){
      a.push(this.value[i] + n.value[i]);
    }
    return new Vector(a);
  }else if(typeof(n) == 'number'){
    return new Vector(this.value.map(function(i){ return i + n; }));
  }
};

// subtract vectors
Vector.prototype.sub = function(n) {
  if(n instanceof Vector && this.length == n.length){
    var a = [];
    for(var i = 0; i < this.value.length; i++){
      a.push(this.value[i] - n.value[i]);
    }
    return new Vector(a);
  }else if(typeof(n) == 'number'){
    return new Vector(this.value.map(function(i){ return i - n; }));
  }
};

// multiply vectors
Vector.prototype.mul = function(n) {
  if(n instanceof Vector && this.length == n.length){
    var a = [];
    for(var i = 0; i < this.value.length; i++){
      a.push(this.value[i] * n.value[i]);
    }
    return new Vector(a);
  }else if(typeof(n) == 'number'){
    return new Vector(this.value.map(function(i){ return i * n; }));
  }
};
