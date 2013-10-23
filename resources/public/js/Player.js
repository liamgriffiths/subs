function Player( position) {
  this.alive = true;
  this.position = position; // 2d vector
  this.position.z = 1;
  this.direction = 'up';

  this.ghostImage = new Image();
  this.ghostImage.src = '/images/ghost.png';
  // this.image.onload = this.draw;
}

Player.prototype.draw = function() {
  if(this.alive){
    //context.drawImage(this.image, this.position.x * TILESIZE, this.position.y * TILESIZE, TILESIZE, TILESIZE);
    // context.drawImage(this.image, canvas.width/2, canvas.height/2, TILESIZE, TILESIZE);

    if(this.direction == 'up') this.drawUp();
    if(this.direction == 'down') this.drawDown();
    if(this.direction == 'left') this.drawLeft();
    if(this.direction == 'right') this.drawRight();
  }else{
    context.drawImage(this.ghostImage, this.position.x * TILESIZE, this.position.y * TILESIZE, TILESIZE, TILESIZE);
  }
};

Player.prototype.update = function(options) {
  if(options.keys.length){
    for(var i = 0; i < options.keys.length; i++){
      if(options.keys[i] == 'left'){
        this.direction = 'left';
        if(this.canMoveTo(this.position.x - 1, this.position.y)){
          this.position.x -= 1;
        }
      }
      if(options.keys[i] == 'right'){
        this.direction = 'right';
        if(this.canMoveTo(this.position.x + 1, this.position.y)){
          this.position.x += 1;
        }
      }
      if(options.keys[i] == 'up'){
        this.direction = 'up';
        if(this.canMoveTo(this.position.x, this.position.y - 1)){
          this.position.y -= 1;
        }
      }
      if(options.keys[i] == 'down'){
        this.direction = 'down';
        if(this.canMoveTo(this.position.x, this.position.y + 1)){
          this.position.y += 1;
        }
      }

      if(options.keys[i] == 'leavemine'){
        minesCollection.newMine(this.position);
      }
    }
  }

  // player is caught in the explosion
  if(board.tiles[this.position.x][this.position.y].exploding){
    this.alive = false;
  }
};

Player.prototype.canMoveTo = function(x, y){
  if(! board.exists(x,y)){ return false; }

  var cannotAccess = ['wall', 'hardwall'];
  for(var i = 0; i < cannotAccess.length; i++){
    if(board.tiles[x][y].type == cannotAccess[i]){
      return false;
    }
  }

  // TODO: come up with a better name for this
  // var blockingTypes = [Mine];
  // for(var j = 0; j < board.tiles[x][y].items.length; j++){
  //   for(var i = 0; i < blockingTypes.length; i++){
  //     if(board.tiles[x][y].items[j].constructor === blockingTypes[i]){
  //      return false;
  //     }
  //   }
  // }

  return true;
};


Player.prototype.drawUp = function() {
  context.beginPath();
  context.fillStyle = 'green';
  context.moveTo(this.position.x * TILESIZE + (TILESIZE/2), this.position.y * TILESIZE);
  context.lineTo(this.position.x * TILESIZE + TILESIZE - (TILESIZE/2), this.position.y * TILESIZE);
  context.lineTo(this.position.x * TILESIZE + TILESIZE, this.position.y * TILESIZE + TILESIZE);
  context.lineTo(this.position.x * TILESIZE, this.position.y * TILESIZE + TILESIZE);
  context.closePath();
  context.fill();
};

Player.prototype.drawDown = function() {
  context.beginPath();
  context.fillStyle = 'green';
  context.moveTo(this.position.x * TILESIZE, this.position.y * TILESIZE);
  context.lineTo(this.position.x * TILESIZE + TILESIZE, this.position.y * TILESIZE);
  context.lineTo(this.position.x * TILESIZE + (TILESIZE/2), this.position.y * TILESIZE + TILESIZE);
  context.lineTo(this.position.x * TILESIZE + (TILESIZE/2), this.position.y * TILESIZE + TILESIZE);
  context.closePath();
  context.fill();
};

Player.prototype.drawLeft = function() {
  context.beginPath();
  context.fillStyle = 'green';
  // take the pen and move to top left corner of tile
  context.moveTo(this.position.x * TILESIZE,
                 this.position.y * TILESIZE + (TILESIZE/2));

  // take the pen and move to the top right corner
  context.lineTo(this.position.x * TILESIZE + TILESIZE,
                 this.position.y * TILESIZE);

  // move to the opposite corner
  context.lineTo(this.position.x * TILESIZE + TILESIZE,
                 this.position.y * TILESIZE + TILESIZE);

  // move to 'bottom left'
  context.lineTo(this.position.x * TILESIZE,
                 this.position.y * TILESIZE + (TILESIZE/2));

  context.closePath();
  context.fill();
};

Player.prototype.drawRight = function() {
  context.beginPath();
  context.fillStyle = 'green';
  // take the pen and move to top left corner of tile
  context.moveTo(this.position.x * TILESIZE,
                 this.position.y * TILESIZE);

  // take the pen and move to the top right corner
  context.lineTo(this.position.x * TILESIZE + TILESIZE,
                 this.position.y * TILESIZE + (TILESIZE/2));

  // move to the opposite corner
  context.lineTo(this.position.x * TILESIZE + TILESIZE,
                 this.position.y * TILESIZE + (TILESIZE/2));

  // move to 'bottom left'
  context.lineTo(this.position.x * TILESIZE,
                 this.position.y * TILESIZE + TILESIZE);

  context.closePath();
  context.fill();
};
