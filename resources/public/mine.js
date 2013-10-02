function Mine(position){
  this.position = position;
  this.countdown = 10;
  this.live = true;
}

Mine.prototype.draw = function () {
  context.fillStyle = 'red';
  var x = this.position.x * TILESIZE + TILESIZE / 2;
  var y = this.position.y * TILESIZE + TILESIZE / 2;
  context.strokeRect(x, y,100,100);
};

Mine.prototype.update = function () {
  if(this.countdown === 0){
    this.countdown -= 1;
    this.live = false;
  }else{
  }
};


