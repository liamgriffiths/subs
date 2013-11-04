var Player = require('../shared/Player');

Player.prototype.update = function(options) {
  if(options.keys.length){
    for(var i = 0; i < options.keys.length; i++){
      var newPosition = {x: this.position.x, y: this.position.y};

      if(options.keys[i] == 'left'){  
        newPosition.x -= 1;
      }
      if(options.keys[i] == 'right'){ 
        newPosition.x += 1;
      }
      if(options.keys[i] == 'up'){  
        newPosition.y -= 1;
      }
      if(options.keys[i] == 'down'){ 
        newPosition.y += 1;
      }

      if(this.canMoveTo(newPosition.x, newPosition.y) || !this.isAlive){
        this.position = newPosition;
      }

      if(options.keys[i] == 'mine' && this.isAlive){
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

module.exports = Player;
