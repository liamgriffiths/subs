function Player(position) {
  this.isAlive = true;
  this.position = position;
  this.position.z = 1;
  this.power = 2;
  this.maxMines = 1;
  this.availableMines = 1;

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
      // var newPosition = new Vector(this.position.x, this.position.y);
      var newPosition = this.position;

      var left = new Vector(-1, 0);
      var right = new Vector(1, 0);
      var up = new Vector(0, -1);
      var down = new Vector(0, 1);

      if(options.keys[i] == 'left')  newPosition = newPosition.add(left);
      if(options.keys[i] == 'right') newPosition = newPosition.add(right);
      if(options.keys[i] == 'up')    newPosition = newPosition.add(up);
      if(options.keys[i] == 'down')  newPosition = newPosition.add(down);


      if(this.canMoveTo(newPosition.x, newPosition.y) || !this.isAlive){
        this.position = newPosition;
      }

      if(options.keys[i] == 'leavemine' && this.isAlive){
        if(this.availableMines > 0){
          minesCollection.newMine(this.position, this);
          this.availableMines--;
        }
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
  if(! board.exists(x,y)) return false;
  var tile = board.tiles[x][y];
  if(tile.type == 'wall') return false;
  if(tile.type == 'hardwall') return false;
  if(tile.hasMine) return false;
  return true;
};

Player.prototype.addItem = function(item) {
  if(item.type == 'fire') this.power++;
  if(item.type == 'mine') this.availableMines++;
};
