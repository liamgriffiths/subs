// Generic vector class
function Vector(/* vector values */){
  var args = Array.prototype.slice.call(arguments);
  if(args.length == 1 && typeof(args) == 'object'){
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
Vector.prototype.add = function(n){
  if(typeof(n) == 'object'){
  }else if(typeof(n) == 'number'){
    return new Vector(this.value.map(function(i){ return i + n; }));
  }
};

// subtract vectors
Vector.prototype.sub = function(n){
  if(typeof(n) == 'object'){
  }else if(typeof(n) == 'number'){
    return new Vector(this.value.map(function(i){ return i - n; }));
  }
};

// multiply vectors
Vector.prototype.mul = function(n){
  if(typeof(n) == 'object'){
  }else if(typeof(n) == 'number'){
    return new Vector(this.value.map(function(i){ return i * n; }));
  }
};

