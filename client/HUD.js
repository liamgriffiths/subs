function HUD() {
  this.canvas = document.getElementById('hud');
  this.context = this.canvas.getContext('2d');
  this.canvas.width = document.documentElement.clientWidth;
  this.canvas.height = 100;

  this.life = 0;
  this.mines = 0;
  this.power = 0;
  this.points = 0;
  this.time = 0;
  this.players = [];
}

HUD.prototype.update = function(settings, delta) {
  this.life = settings.life;
  this.mines = settings.mines;
  this.power = settings.power;
  this.players = settings.players;
};

HUD.prototype.draw = function() {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.context.fillStyle = '#fff';
  this.context.font = "bold 20px 'VT323'";
  this.drawTitle();
  this.drawLife();
  this.drawMines();
  this.drawPower();
  this.drawPlayers();
};

HUD.prototype.drawText = function(text, xpos, ypos) {
  var ypos = ypos || 35;
  this.context.fillText(text, xpos, ypos);
};

HUD.prototype.drawTitle = function() {
  this.drawText("bit bomber", 40);
};

HUD.prototype.drawLife = function() {
  this.drawText("Life x" + Math.round(this.life), 400);
};

HUD.prototype.drawMines = function() {
  this.drawText("Mine x" + this.mines, 650);
};

HUD.prototype.drawPower = function() {
  this.drawText("Fire x" + this.power, 900);
};

function spritePos(i) {
  return {x: 8 + ((i - 1) * 3 + 0.4), y: 2.2};
}

HUD.prototype.drawPlayers = function() {
  this.drawText("Players:", 40, 60);

  for (var i = 0; i < this.players.length; i++) {
    if (this.players[i]) {
      this.drawText(this.players[i].name, 160 + i * 90, 60);
      var sprite = this.players[i].miniAliveSprite;
      sprite.position = spritePos(i);
      sprite.draw();
    }
  }
};

