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
}

HUD.prototype.update = function(settings, delta) {
  this.life = settings.life;
  this.mines = settings.mines;
  this.power = settings.power;
};

HUD.prototype.draw = function() {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.drawTitle();
  this.drawLife();
  this.drawMines();
  this.drawPower();
};

HUD.prototype.drawText = function(text, xpos) {
  var ypos = 65;
  this.context.fillStyle = '#fff';
  this.context.font = "bold 60px 'VT323'";
  this.context.fillText(text, xpos, ypos);
}
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

