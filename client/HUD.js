function HUD() {
  this.canvas = document.getElementById('hud');
  this.context = this.canvas.getContext('2d');
  this.canvas.width = screen.width;
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

HUD.prototype.drawTitle = function() {
  this.context.fillStyle = '#fff';
  this.context.font = "bold 60px 'VT323'";
  this.context.fillText("fun game", 40, 65);
};

HUD.prototype.drawLife = function() {
  this.context.fillStyle = '#fff';
  this.context.font = "bold 60px 'VT323'";
  this.context.fillText("Life x" + Math.round(this.life), 400, 65);
};

HUD.prototype.drawMines = function() {
  this.context.fillStyle = '#fff';
  this.context.font = "bold 60px 'VT323'";
  this.context.fillText("Mine x" + this.mines, 650, 65);
};

HUD.prototype.drawPower = function() {
  this.context.fillStyle = '#fff';
  this.context.font = "bold 60px 'VT323'";
  this.context.fillText("Fire x" + this.power, 900, 65);
};

