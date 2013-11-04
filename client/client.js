Player.prototype.makeSprites = function () {
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
};

Player.prototype.draw = function() {
  if(this.isAlive){
    return this.aliveSprite.draw();
  }else{
    return this.deadSprite.draw();
  }
};

Player.prototype.update = function(options) {
  this.isAlive = options.isAlive;
  this.position = options.position;
  this.power = options.power;
  this.power = options.availableMines;
  if(this.isAlive){
    this.aliveSprite.position = new Vector(this.position.x, this.position.y, this.position.z);
  }else{
    this.deadSprite.position = new Vector(this.position.x, this.position.y, this.position.z);
  }
};

Tile.prototype.update = function() {
  this.sprite.update();
  var len = this.items.length;
  for(var i = 0; i < len; i++){
    this.items[i].update();
  }
  if(this.exploding) this.hasMine = false;
};

Tile.prototype.draw = function() {
  var len = this.items.length;
  for(var i = 0; i < len; i++){
    this.items[i].draw();
  }
  if(this.exploding) return this.drawExplosion();
  if(this.type == 'water') return function(){};
  if(this.type == 'hardwall') return this.sprite.draw();
  return this.sprite.draw();
};

Tile.prototype.drawExplosion = function() {
  context.moveTo(this.position.x * TILESIZE, this.position.y * TILESIZE);

  var startX = this.position.x * TILESIZE;
  var startY = this.position.y * TILESIZE;
  var pixelSize = Math.floor(TILESIZE / 4);
  var p = 0;

  for(var x = startX; x < startX + TILESIZE; x += pixelSize){
    for(var y = startY; y < startY + TILESIZE; y += pixelSize){
      context.fillStyle = "rgba(255,0,0, "+(Utils.getRandomInt(0,10)/2)+")";
      context.fillRect(x, y, pixelSize, pixelSize);
      p++;
    }
  }
};

Tile.prototype.makeSprites = function() {
  switch(this.type){
    case 'wall':
      this.sprite = new Sprite(5, this.position);
      var frame = [[],[],[],[],[]];
      for(var x = 0; x < 5; x++){
        for(var y = 0; y < 5; y++){
          var rcolors = [Color.WHITE(Utils.getRandomInt(5,10)/10),
                         Color.CYAN(Utils.getRandomInt(5,10)/10)];
          frame[x][y] = rcolors[Math.floor(Math.random() * rcolors.length)];
        }
      }
      this.sprite.frames.push(frame);
      break;

    case 'hardwall':
      this.sprite = new Sprite(4, this.position, 600);
      var c1 = Color.BLUE();
      var c2 = Color.RED();
      var f1 = [[c1, c2, c1, c2],
                [c1, c2, c1, c2],
                [c1, c2, c1, c2],
                [c1, c2, c1, c2]];
      var f2 = [[c2, c1, c2, c1],
                [c2, c1, c2, c1],
                [c2, c1, c2, c1],
                [c2, c1, c2, c1]];
      this.sprite.frames = [f1];
      break;

    case 'water':
      this.sprite = new Sprite(1, this.position);
      var watercolor = Color.CLEAR();
      this.sprite.frames.push([[watercolor]]);
      break;

    case 'explosion':
      break;

    default:
      break;
  }
};

Item.prototype.draw = function() {
  return this.sprite.draw();
};

Item.prototype.update = function() {
  this.sprite.update();
};

Item.prototype.makeSprite = function() {
  var sprite = new Sprite(5, this.position, 100);
  var frames = [];

  if(this.type === 'fire'){
    var c1 = Color.CLEAR();
    var c2 = Color.BLUE();
    var c3 = Color.YELLOW('rand');
    var c4 = Color.BLACK('rand');

    var f1 = [[c2, c2, c2, c2, c2],
              [c2, c3, c4, c3, c2],
              [c2, c3, c3, c3, c2],
              [c2, c3, c3, c3, c2],
              [c2, c2, c2, c2, c2]];
    var f2 = [[c2, c2, c2, c2, c2],
              [c2, c4, c3, c3, c2],
              [c2, c3, c3, c3, c2],
              [c2, c3, c3, c3, c2],
              [c2, c2, c2, c2, c2]];
    var f3 = [[c2, c2, c2, c2, c2],
              [c2, c3, c3, c4, c2],
              [c2, c3, c3, c3, c2],
              [c2, c3, c3, c3, c2],
              [c2, c2, c2, c2, c2]];

    frames = [f1,f2,f3];
  }

  if(this.type === 'mine'){
    var c1 = Color.CLEAR();
    var c2 = Color.BLUE();
    var c3 = Color.DPURPLE('rand');
    var c4 = Color.BLACK('rand');

    var f1 = [[c2, c2, c2, c2, c2],
              [c2, c3, c4, c3, c2],
              [c2, c3, c3, c3, c2],
              [c2, c3, c3, c3, c2],
              [c2, c2, c2, c2, c2]];
    var f2 = [[c2, c2, c2, c2, c2],
              [c2, c4, c3, c3, c2],
              [c2, c3, c3, c3, c2],
              [c2, c3, c3, c3, c2],
              [c2, c2, c2, c2, c2]];
    var f3 = [[c2, c2, c2, c2, c2],
              [c2, c3, c3, c4, c2],
              [c2, c3, c3, c3, c2],
              [c2, c3, c3, c3, c2],
              [c2, c2, c2, c2, c2]];

    frames = [f1,f2,f3];
  }

  sprite.frames = frames;
  return sprite;
};

Mine.prototype.makeSprite = function() {
  var sprite = new Sprite(5, this.position,100);
  var c1 = Color.CLEAR();
  var c2 = Color.RED();
  var c3 = Color.DPURPLE();
  var c4 = Color.YELLOW();
  var c5 = Color.ORANGE();

  var f1 = [[c3, c3, c3, c3, c3],
            [c3, c2, c2, c2, c3],
            [c3, c5, c5, c5, c3],
            [c3, c4, c4, c4, c3],
            [c3, c3, c3, c3, c3]];
  var f2 = [[c4, c4, c4, c4, c4],
            [c4, c3, c3, c3, c4],
            [c4, c2, c2, c2, c4],
            [c4, c5, c5, c5, c4],
            [c4, c4, c4, c4, c4]];
  var f3 = [[c5, c5, c5, c5, c5],
            [c5, c4, c4, c4, c5],
            [c5, c3, c3, c3, c5],
            [c5, c2, c2, c2, c5],
            [c5, c5, c5, c5, c5]];
  var f4 = [[c2, c2, c2, c2, c2],
            [c2, c5, c5, c5, c2],
            [c2, c4, c4, c4, c2],
            [c2, c3, c3, c3, c2],
            [c2, c2, c2, c2, c2]];
  sprite.frames = [f1,f2,f3,f4];
  return sprite;
};

Mine.prototype.draw = function() {
  return this.sprite.draw();
};

Mine.prototype.update = function() {

  if(this.live){
    if(this.animationDelta > 2000){
      this.animationDelta = 0;
      this.live = false;
      this.exploding = true;
    }else{
       this.animationDelta += delta;
    }
  }else{
    if(this.exploding){
      if(this.animationDelta > 1000){
        this.animationDelta = 0;
        this.exploding = false;
      }else{
        this.animationDelta += delta;
      }
    }
  }

  if(board.tiles[this.position.x][this.position.y].exploding){
    this.countdown = 0;
  }
  this.sprite.update();
};

PlayersCollection.prototype.draw = function() {
  for(var name in this.players){
    var player = this.players[name];
    camera.addDrawable(player.draw.bind(player), player.position);
  }
};

PlayersCollection.prototype.update = function(players) {
  for(var name in players){
    if(this.players.hasOwnProperty(name)) {
      this.players[name].update(players[name]);
    }else{
      this.players[name] = new Player(players[name]);
    }
  }
};

MinesCollection.prototype.draw = function() {
  for(var i = 0; i < this.mines.length; i++){
    var mine = this.mines[i];
    camera.addDrawable(mine.draw.bind(mine), mine.position);
  }
};

MinesCollection.prototype.update = function(mines) {
  this.mines = [];
  for(var i = 0; i < mines.length; i++){
    this.mines.push(new Mine(mines[i]));
  }
};

// add all the tile draw functions to the draw queue along with the position
Board.prototype.draw = function() {
  for(var x = camera.start.x; x < camera.end.x; x++){
    for(var y = camera.start.y; y < camera.end.y; y++){
      if(this.exists(x,y)){
        var tile = this.tiles[x][y];
        camera.addDrawable(tile.draw.bind(tile), tile.position);
      }
    }
  }
};

