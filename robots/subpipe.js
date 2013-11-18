var Sub = require('./Sub');
var sub = new Sub();

console.log('hello!');

process.stdin.on('data', function (buf) {
  var input = buf.toString().trim();

  switch (input) {
    case 'left': sub.left(); break;
    case 'right': sub.right(); break;
    case 'down': sub.down(); break;
    case 'up': sub.up(); break;
    case 'mine': sub.mine(); break;
  }

  console.log(input);

});
