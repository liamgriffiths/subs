var Player = function (name, position) {
  this.alive = true;
  this.name = name;
  this.position = position;
  this.image = new Image();
  this.image.src = "/mariosub.png";

  this.ghostImage = new Image();
  this.ghostImage.src = "/ghost.png";
  // this.image.onload = this.draw;
  
  this.color1 = 0;
};

Player.prototype.draw = function () {
  if(this.alive){
    context.drawImage(this.image, this.position.x * TILESIZE, this.position.y * TILESIZE, TILESIZE, TILESIZE);
  }else{
    context.drawImage(this.ghostImage, this.position.x * TILESIZE, this.position.y * TILESIZE, TILESIZE, TILESIZE);
  }
};

Player.prototype.update = function (options) {
  if(options.keys){
    for(var i = 0; i < options.keys.length; i++){
      if(options.keys[i] == 'left'){
        if(this.canMoveTo(this.position.x - 1, this.position.y)){
          this.position.x -= 1;
        }
      }
      if(options.keys[i] == 'right'){
        if(this.canMoveTo(this.position.x + 1, this.position.y)){
          this.position.x += 1;
        }
      }
      if(options.keys[i] == 'up'){
        if(this.canMoveTo(this.position.x, this.position.y - 1)){
          this.position.y -= 1;
        }
      }
      if(options.keys[i] == 'down'){
        if(this.canMoveTo(this.position.x, this.position.y + 1)){
          this.position.y += 1;
        }
      }

      if(options.keys[i] == 'leavemine'){
        minesController.newMine(this.position);
      }
    }
  }

  // player is caught in the explosion
  if(boardController.board.tiles[this.position.x][this.position.y].exploding){
    this.alive = false;
  }
};

Player.prototype.canMoveTo = function(x, y){
  if(! boardController.board.exists(x,y)){ return false; }

  var cannotAccess = ['wall', 'hardwall'];
  for(var i = 0; i < cannotAccess.length; i++){
    if(boardController.board.tiles[x][y].type == cannotAccess[i]){
      return false;
    }
  }

  // TODO: come up with a better name for this
  var blockingTypes = [Mine];
  for(var j = 0; j < boardController.board.tiles[x][y].items.length; j++){
    for(var i = 0; i < blockingTypes.length; i++){
      if(boardController.board.tiles[x][y].items[j].constructor === blockingTypes[i]){
       return false;
      }
    }
  }

  return true;
};


Player.prototype.drawFrame1 = function () {
  context.beginPath();
  context.fillStyle = '#888';
  context.moveTo(this.position.x * TILESIZE, this.position.y * TILESIZE);
  context.lineTo(this.position.x * TILESIZE + TILESIZE, this.position.y * TILESIZE);
  context.lineTo(this.position.x * TILESIZE + TILESIZE, this.position.y * TILESIZE + TILESIZE);
  context.lineTo(this.position.x * TILESIZE, this.position.y * TILESIZE + TILESIZE);
  context.closePath();
  context.fill();
};
