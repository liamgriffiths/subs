var Utils = {
  // TODO: figure out why this clears the canvas
  clearCanvas: function(c){ c.width = c.width; },

  // returns a random integer between min and max
  // using math.round() will give you a non-uniform distribution!
  // via: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FMath%2Frandom
  getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
};
