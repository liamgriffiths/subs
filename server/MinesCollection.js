var MinesCollection = require('../shared/MinesCollection');
var Mine = require('./Mine');

MinesCollection.prototype.update = function() {
  for(var i = 0; i < this.mines.length; i++){
    this.mines[i].update();

    if(! this.mines[i].live) this.mines[i].explode();

    if(! this.mines[i].live && ! this.mines[i].exploding){
      this.removeMine(i);
    }
  }
};

module.exports = MinesCollection;
