var Utils = {
  // TODO: figure out why this clears the canvas
  clearCanvas: function() {
    // hacky-slow way to clear canvas
    // canvas.width = canvas.width;

    // marginally faster, easier to understand canvas-clearing
    return context.clearRect(0, 0, canvas.width, canvas.height);
  },

  // returns a random integer between min and max
  // using math.round() will give you a non-uniform distribution!
  // via: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FMath%2Frandom
  getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  // mixin function, take functions from objects
  mixin: function(to, from) {
    for(var prop in from.prototype) {
      if(!to.prototype[prop]) {
        to.prototype[prop] = from.prototype[prop];
      }
    }
  }

};

// borrowed from http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return window.requestAnimationFrame       ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         function( callback ){
           window.setTimeout(callback, 1000 / 60);
         };
})();
