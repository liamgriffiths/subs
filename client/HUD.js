function HUD() {
  this.canvas = document.getElementById('hud');
  this.conext = this.canvas.getContext('2d');
  this.canvas.width = screen.width;
  this.canvas.height = 100;
}

HUD.prototype.update = function() {
};

HUD.prototype.draw = function() {

};
