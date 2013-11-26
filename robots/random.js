var Sub = require('./Sub');

function RandomSub() {
  this.actions = [
    this.up,
    this.down,
    this.left,
    this.right,
    this.mine,
    function() {}
  ];
}

RandomSub.prototype = new Sub();

RandomSub.prototype.randomAction = function() {
  var rand = Math.floor(Math.random() * (this.actions.length - 1));
  var action = this.actions[rand].bind(this);
  return action();
};

RandomSub.prototype.run = function() {
  this.randomAction();
  setTimeout(this.run.bind(this), Math.random() * 1000);
};

// for (var i = 0 ; i < 20; i++){
  new RandomSub().run();
// }
