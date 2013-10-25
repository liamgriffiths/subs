function Player(position) {
  this.isAlive = true;
  this.position = position;
  this.position.z = 1;
  this.direction = 'up';
  this.power = 2;
  this.countdown = undefined;
  this.explodeTile = undefined;

  var c0 = Color.BLACK(1/10);
  var c1 = Color.WHITE(8/10);

  var c2 = Color.Rand();
  var c6 = Color.Rand();

  var c3 = Color.WHITE(9/10);
  var c4 = Color.YELLOW();
  var c5 = Color.YELLOW(5/10);

  this.aliveSprite = new Sprite(5, this.position);
  var a1 = [[c0, c2, c2, c2, c0],
            [c6, c2, c2, c2, c6],
            [c6, c2, c0, c2, c6],
            [c0, c2, c2, c2, c0],
            [c4, c0, c0, c0, c4]];
  var a2 = [[c0, c2, c2, c2, c0],
            [c6, c2, c2, c2, c6],
            [c6, c2, c0, c2, c6],
            [c0, c2, c2, c2, c0],
            [c5, c0, c0, c0, c5]];
  this.aliveSprite.frames = [a1,a2];

  this.deadSprite = new Sprite(5, this.position);
  var d1 = [[c0, c1, c1, c1, c0],
            [c1, c0, c1, c0, c1],
            [c1, c1, c1, c1, c1],
            [c1, c1, c1, c1, c1],
            [c1, c0, c1, c0, c1]];
  var d2 = [[c0, c3, c3, c3, c0],
            [c3, c0, c3, c0, c3],
            [c3, c3, c3, c3, c3],
            [c3, c3, c3, c3, c3],
            [c3, c0, c3, c0, c3]];
  this.deadSprite.frames = [d1, d2];
}

Player.prototype.draw = function() {
  if(this.isAlive){
    return this.aliveSprite.draw();
  }else{
    return this.deadSprite.draw();
  }
};

Player.prototype.update = function(options) {
  if(options.keys.length){
    for(var i = 0; i < options.keys.length; i++){
      if(options.keys[i] == 'left'){
        this.direction = 'left';
        if(this.canMoveTo(this.position.x - 1, this.position.y) || !this.isAlive){
          this.position.x -= 1;
        }
      }
      if(options.keys[i] == 'right'){
        this.direction = 'right';
        if(this.canMoveTo(this.position.x + 1, this.position.y) || !this.isAlive){
          this.position.x += 1;
        }
      }
      if(options.keys[i] == 'up'){
        this.direction = 'up';
        if(this.canMoveTo(this.position.x, this.position.y - 1) || !this.isAlive){
          this.position.y -= 1;
        }
      }
      if(options.keys[i] == 'down'){
        this.direction = 'down';
        if(this.canMoveTo(this.position.x, this.position.y + 1) || !this.isAlive){
          this.position.y += 1;
        }
      }

      if(options.keys[i] == 'leavemine' && this.isAlive){
        minesCollection.newMine(this.position, this);
      }

      var tileItems = board.tiles[this.position.x][this.position.y].items;
      if(tileItems.length){
        for(var ti = 0; ti < tileItems.length; ti++){
          this.addItem(tileItems[ti]);
        }
        board.tiles[this.position.x][this.position.y].items = [];
      }
    }
  }

  // player is caught in the explosion
  if(board.tiles[this.position.x][this.position.y].exploding){
    this.isAlive = false;
  }
  if(this.isAlive){
    this.aliveSprite.update();
    this.aliveSprite.position = new Vector(this.position.x, this.position.y, this.position.z);
  }else{
    this.deadSprite.update();
    this.deadSprite.position = new Vector(this.position.x, this.position.y, this.position.z);
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

Player.prototype.addItem = function(item) {
  if(item.type == 'fire'){
    this.power++;
  }
};
