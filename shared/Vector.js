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
