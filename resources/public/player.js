function Player(name, position) {
  this.name = name;
  this.position = position;
  this.image = new Image();
  this.image.src = "/mariosub.png";
  // this.image.onload = this.draw;
}

Player.prototype.draw = function () {
  context.drawImage(this.image, this.position.x * TILESIZE, this.position.y * TILESIZE, TILESIZE, TILESIZE);
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
    }
  }
};

Player.prototype.canMoveTo = function(x, y){
  console.log(x,y);
  if(x < 0){ return false; }
  if(y < 0){ return false; }
  if(x > boardController.board.w){ return false; }
  if(y > boardController.board.h){ return false; }
  if(boardController.board.tiles[x][y].type == 'wall'){ return false; }
  return true;
};
