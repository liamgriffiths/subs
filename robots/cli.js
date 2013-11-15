var Sub = require('./Sub'),
    repl = require('repl');

var sub = new Sub();
var shell = repl.start({ prompt: "sub> " });

